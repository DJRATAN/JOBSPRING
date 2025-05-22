import React, { useState, useMemo, useEffect } from "react";

import { Resume, ResumeScore, JobDescription } from "@/types/resume";
import { analyzeResumes } from "@/services/resumeAnalysis";
import { ArrowLeft, ArrowRight, BarChart2, Briefcase, FileText, Users, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Import the store we just created
import { useResumeStore } from "@/store/resumeStore";
import { toast } from "sonner";
import ResumeDropzone from "./ResumeDropzone";
import QuestionList from "./QuestionList";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// Enhanced animation variants
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 13,
            mass: 0.8
        }
    }
};

const slideInFromRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 12
        }
    }
};

const slideInFromLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 12
        }
    }
};

const popIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 250,
            damping: 20
        }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.25
        }
    }
};

const cardHoverEffect = {
    rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
    hover: {
        scale: 1.015,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        transition: { duration: 0.2, ease: "easeOut" }
    }
};

const JobDescriptionAnalysis = ({ onHandleInputChange, formData, GoToNext }) => {
    // formData = {
    //     jobTitle: "Frontend Developer",
    //     companyName: "TechnoML Solutions",
    //     department: "Engineering",
    //     reqExperience: "2-4 years",
    //     employmentType: "Full-time",
    //     location: "Remote",
    //     salaryRange: "₹6,00,000 - ₹9,00,000 per annum",
    //     applicationDeadline: "2025-06-30",
    //     jobDescription: "We are looking for a passionate Frontend Developer with experience in React.js and modern UI frameworks. You will work closely with the product and design teams to build user-centric web applications."
    // };

    const [appStage, setAppStage] = useState('welcome');
    const [jobDescription, setJobDescription] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [newStep, setNewStep] = useState(1);
    const [noOfQuestions, setNoOfQuestions] = useState('');
    const [timeDuration, setTimeDuration] = useState('');
    const router = useRouter();
    useEffect(() => {
        if (noOfQuestions || timeDuration) {
            onHandleInputChange('noOfQuestions', noOfQuestions);
            onHandleInputChange('timeDuration', timeDuration);
        }
    }, [noOfQuestions, timeDuration]);
    // Use the store to save resume analysis results

    const {
        setResumeScores,
        setErroredFiles,
        setJobInfo,
        setResumeCount,
        addJobAnalysis,
        clearCurrentJob
    } = useResumeStore();

    // Extract list of filenames with errors
    const erroredFiles = useMemo(() => {
        return resumes
            .filter(resume => resume.error)
            .map(resume => resume.fileName);
    }, [resumes]);

    const handleStartNewJob = () => {
        setAppStage('job-description');
    };
    const MotionButton = motion.create(Button);


    const handleJobDescriptionSave = (jd) => {
        // Save the job description while preserving any existing data
        setJobDescription(prevJobDescription => {
            if (!prevJobDescription) {
                return jd;
            }

            // Preserve any existing data that might not be in the form
            return {
                ...jd,
                skills: jd.skills.length ? jd.skills : prevJobDescription.skills,
                requirements: jd.requirements.length ? jd.requirements : prevJobDescription.requirements,
                responsibilities: jd.responsibilities.length ? jd.responsibilities : prevJobDescription.responsibilities,
            };
        });

        // Clear any previous resume data
        setResumes([]);

        // Clear current job in the store
        clearCurrentJob();

        // Proceed to the resume upload stage
        setAppStage('upload-resumes');

        // toast({
        //     title: "Job details saved",
        //     description: "Now upload resumes to analyze against this job description.",
        // });
    };

    const handleResumeUpload = (uploadedResumes) => {
        // Add new resumes to the existing collection
        setResumes((prev) => [...prev, ...uploadedResumes]);

        // If we have received resumes, proceed to analyze them
        if (uploadedResumes.length > 0 && formData) {
            analyzeNewResumes(uploadedResumes, formData);
        }
    };

    const analyzeNewResumes = async (resumesToAnalyze, jd) => {
        setIsAnalyzing(true);
        setAnalysisComplete(false);

        try {
            const newScores = await analyzeResumes(resumesToAnalyze, jd);

            // Save the scores to the store
            setResumeScores(newScores);
            setErroredFiles(erroredFiles);
            setJobInfo(jd.title, jd.company || '');
            setResumeCount(resumesToAnalyze.length);

            // Save the analysis to store history
            addJobAnalysis();

            // Show success toast but don't navigate automatically
            if (newScores.length > 0) {
                // Mark analysis as complete
                setAnalysisComplete(true);

                toast({
                    title: "Analysis complete",
                    description: `Successfully analyzed ${newScores.length} resumes. You can view results using the "View Results" button.`,
                    action: (
                        <Button
                            onClick={() => router.push('/results')}
                            variant="outline"
                            className="bg-resume-primary text-white hover:bg-resume-primary/90 border-none"
                        >
                            View Results
                        </Button>
                    ),
                    duration: 10000, // Give users more time to see the button
                });
            }

            // If there were errors, show a summary toast
            const erroredResumes = resumesToAnalyze.filter(resume => resume.error);
            if (erroredResumes.length > 0) {
                toast({
                    title: "Some resumes had issues",
                    description: `${erroredResumes.length} out of ${resumesToAnalyze.length} resumes had processing issues but were analyzed with limited data.`,
                    variant: "default",
                });
            }
        } catch (error) {
            console.error("Error analyzing resumes:", error);
            toast({
                title: "Analysis failed",
                description: "There was an error analyzing the resumes. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-resume-background/40 to-resume-background/60"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            {/* Header with back button only */}
            <div className="px-6 py-6">
                {appStage === 'upload-resumes' && (
                    <div className="flex items-start mb-4">
                        <motion.button
                            onClick={() => setAppStage('job-description')}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-resume-primary text-resume-primary rounded-lg shadow-sm hover:bg-resume-primary/5 transition-all"
                            whileHover={{ scale: 1.03, x: -2 }}
                            whileTap={{ scale: 0.97 }}
                            variants={slideInFromLeft}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </motion.button>
                    </div>
                )}

                {appStage === 'job-description' && (
                    <div className="flex items-start mb-4">
                        <motion.button
                            onClick={() => setAppStage('welcome')}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-resume-primary text-resume-primary rounded-lg shadow-sm hover:bg-resume-primary/5 transition-all"
                            whileHover={{ scale: 1.03, x: -2 }}
                            whileTap={{ scale: 0.97 }}
                            variants={slideInFromLeft}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </motion.button>
                    </div>
                )}
            </div>

            <AnimatePresence mode="wait">





                <motion.div
                    key="upload-resumes"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -20 }}
                    variants={slideIn}
                    className="w-full px-4"
                >
                    <div className="mb-6">
                        {/* Job description header - always visible */}
                        <motion.div
                            initial="rest"
                            whileHover="hover"
                            variants={cardHoverEffect}
                            className="bg-white p-5 rounded-t-xl shadow-md border border-gray-200"
                        >
                            <div className="flex items-center">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        className="bg-resume-primary/10 p-2 rounded-lg"
                                        whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                                    >
                                        <BarChart2 className="h-5 w-5 text-resume-primary" />
                                    </motion.div>
                                    <h2 className="text-xl font-semibold text-resume-text ">Job Description Analysis</h2>
                                </div>
                            </div>
                        </motion.div>

                        {/* Job details content - always visible */}
                        <motion.div
                            className="bg-white p-5 rounded-b-xl shadow-md border-x border-b border-gray-200"
                            variants={popIn}
                        >
                            {/* Consolidated job details in a single container */}
                            <motion.div
                                variants={staggerContainer}
                                className="space-y-5"
                            >
                                {/* Job title and company */}
                                <div className="flex justify-between items-start">
                                    <motion.h3
                                        className="font-semibold text-xl text-resume-text relative inline-block"
                                        whileHover={{
                                            color: "#4A6CF7",
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        {formData.jobTitle}
                                        <motion.span
                                            className="absolute -bottom-1 left-0 h-0.5 bg-resume-primary/60"
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                                        />
                                    </motion.h3>
                                    {formData.companyName && (
                                        <motion.span
                                            className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600"
                                            whileHover={{
                                                backgroundColor: "#f3f4ff",
                                                color: "#4A6CF7",
                                                transition: { duration: 0.3 }
                                            }}
                                            initial={{ scale: 0.95, opacity: 0.8 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                        >
                                            {formData.companyName}
                                        </motion.span>
                                    )}
                                </div>

                                {/* All job details in a unified grid */}
                                <motion.div
                                    className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg"
                                    initial="rest"
                                    whileHover="hover"
                                    variants={cardHoverEffect}
                                >
                                    {formData.department && (
                                        <motion.div
                                            className="flex items-start gap-2"
                                            whileHover={{ x: 2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <span className="font-medium text-resume-text">Department:</span>
                                            <span className="text-gray-700">{formData.department}</span>
                                        </motion.div>
                                    )}
                                    {formData.reqExperience && (
                                        <motion.div
                                            className="flex items-start gap-2"
                                            whileHover={{ x: 2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <span className="font-medium text-resume-text">Experience:</span>
                                            <span className="text-gray-700">{formData.reqExperience}</span>
                                        </motion.div>
                                    )}
                                    {formData.employmentType && (
                                        <motion.div
                                            className="flex items-start gap-2"
                                            whileHover={{ x: 2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <span className="font-medium text-resume-text">Type:</span>
                                            <span className="text-gray-700">{formData.employmentType}</span>
                                        </motion.div>
                                    )}
                                    {formData.location && (
                                        <motion.div
                                            className="flex items-start gap-2"
                                            whileHover={{ x: 2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <span className="font-medium text-resume-text">Location:</span>
                                            <span className="text-gray-700">{formData.location}</span>
                                        </motion.div>
                                    )}
                                    {formData.salaryRange && (
                                        <motion.div
                                            className="flex items-start gap-2"
                                            whileHover={{ x: 2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <span className="font-medium text-resume-text">Salary:</span>
                                            <span className="text-gray-700">{formData.salaryRange}</span>
                                        </motion.div>
                                    )}
                                    {formData.applicationDeadline && (
                                        <motion.div
                                            className="flex items-start gap-2"
                                            whileHover={{ x: 2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <span className="font-medium text-resume-text">Deadline:</span>
                                            {/* <span className="text-gray-700">{jobDescription.applicationDeadline.toLocaleDateString()}</span> */}
                                            <span className="text-gray-700">{formData.applicationDeadline}</span>
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* Job description */}
                                <motion.div
                                    initial={{ opacity: 0.8 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <h4 className="font-medium text-resume-text mb-2  inline-block">Job Description</h4>
                                    <motion.p
                                        className="text-sm text-gray-600 whitespace-pre-line bg-gray-50 p-4 rounded-lg border-l-2 border-resume-primary/30"
                                        initial="rest"
                                        whileHover="hover"
                                        variants={cardHoverEffect}
                                    >
                                        {formData.jobDescription}
                                    </motion.p>
                                </motion.div>

                                <div className='p-5 bg-white rounded-xl shadow-md'>
                                    <h1 className='text-2xl mb-5'>Questions Details</h1>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div>
                                            <h2 className='text-sm font-medium'>No. of Questions <span className="text-red-500">*</span></h2>
                                            <Input placeholder='e.g. No of Quetins' required className='mt-2' value={formData.noOfQuestions || ''} // ← Use value from formData
                                                onChange={(event) => onHandleInputChange('noOfQuestions', event.target.value)} />
                                        </div>            <div>
                                            <h2 className='text-sm font-medium'>Time Duration
                                            </h2>
                                            <Input placeholder='e.g. Engineering' className='mt-2' value={formData.timeDuration || ''} // ← Use value from formData
                                                onChange={(event) => onHandleInputChange('timeDuration', event.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                {/* Analyze button at the bottom corner of container */}
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        onClick={() => {
                                            GoToNext();
                                            setNewStep(newStep + 1);
                                            console.log(formData);
                                        }}
                                        className="flex items-center gap-2 px-5 py-2"
                                    >
                                        <BarChart2 className="h-4 w-4" />
                                        <span className="relative">Generate Questions</span>
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                    {/* <motion.div variants={popIn}>
                        {newStep == 2 && <QuestionList formData={formData} />}
                    </motion.div> */}
                    <motion.div variants={popIn}>
                        <ResumeDropzone
                            onResumeUpload={handleResumeUpload}
                        />
                    </motion.div>
                </motion.div>

            </AnimatePresence >
        </motion.div >
    );
};

export default JobDescriptionAnalysis; 