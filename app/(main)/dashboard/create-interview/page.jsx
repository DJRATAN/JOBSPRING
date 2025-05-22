'use client'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';
import { useUser } from '@/app/provider';
import JobDescriptionAnalysis from './_components/JobDescriptionAnalysis';

const CreateInterview = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState();
    const [interviewId, setInterviewId] = useState();
    const { user } = useUser();
    const GoToNext = () => {
        // if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type) {
        //     toast("Please enter all required details")
        //     return;
        // }
        setStep(step + 1);
    }

    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        console.log('FormData', formData);
    };
    const onCreateLink = (interview_id) => {
        setInterviewId(interview_id);
        setStep(step + 1)
    }
    return (
        <div className='mt-10 px-10 md:px-8 lg:px-14 xl:px-20'>
            <div className='flex gap-5 items-center'>
                <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                <h2 className='font-bold text-2xl'>Create New Interview</h2>
            </div>
            <Progress value={step * 33.33} className='my-5' />
            {step == 1 ? <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={() => GoToNext()} /> : step == 2 ? <JobDescriptionAnalysis onHandleInputChange={onHandleInputChange} GoToNext={() => GoToNext()} formData={formData} /> : step == 3 ? <QuestionList formData={formData} onCreateLink={(interview_id) => onCreateLink(interview_id)} /> : step == 4 ? <InterviewLink interview_id={interviewId} formData={formData} /> : null}
        </div>
    )
}

export default CreateInterview
