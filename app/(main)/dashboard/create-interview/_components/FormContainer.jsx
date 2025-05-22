import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { InterviewType } from '@/services/Constants'
import { SelectTrigger } from '@radix-ui/react-select'
import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const FormContainer = ({ onHandleInputChange, GoToNext }) => {
    const [interviewType, setInterviewType] = useState([]);
    // useEffect(() => {
    //     if (interviewType) {
    //         onHandleInputChange('type', interviewType)
    //     }
    // }, [interviewType]);
    const AddInterviewType = (type) => {
        const data = interviewType.includes(type);
        if (!data) {
            setInterviewType(prev => [...prev, type])
        } else {
            const result = interviewType.filter(item => item != type)
            setInterviewType(result)
        }
    }
    return (
        <div className='p-5 bg-white rounded-xl shadow-md'>
            <h1 className='text-2xl mb-5'>Job Details</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <h2 className='text-sm font-medium'>Job Title <span className="text-red-500">*</span></h2>
                    <Input placeholder='e.g. Senior Software Engineer' required className='mt-2' onChange={(event) => onHandleInputChange('jobTitle', event.target.value)} />
                </div>            <div>
                    <h2 className='text-sm font-medium'>Department
                    </h2>
                    <Input placeholder='e.g. Engineering' className='mt-2' onChange={(event) => onHandleInputChange('department', event.target.value)} />
                </div>
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Company Name</h2>
                <Input placeholder='e.g. TechnoML' required className='mt-2' onChange={(event) => onHandleInputChange('companyName', event.target.value)} />
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Job Description <span className="text-red-500">*</span></h2>
                <Textarea className='h-[200px] mt-2' required placeholder='Enter details job description'
                    onChange={(event) => onHandleInputChange('jobDescription', event.target.value)} />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
                <div>
                    <h2 className='text-sm font-medium'>Required Experience <span className="text-red-500">*</span></h2>
                    <Input placeholder='e.g. 3+ Years' required className='mt-2' onChange={(event) => onHandleInputChange('reqExperience', event.target.value)} />
                </div>
                <div >
                    <h2 className='text-sm font-medium'>Employment Type <span className="text-red-500">*</span></h2>
                    <Select onValueChange={(value) => onHandleInputChange('employmentType', value)}>
                        <SelectTrigger className='w-full mt-2'>
                            <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
                <div>
                    <h2 className='text-sm font-medium'>Location <span className="text-red-500">*</span></h2>
                    <Input placeholder='e.g. New York, NY' required className='mt-2' onChange={(event) => onHandleInputChange('location', event.target.value)} />
                </div>            <div>
                    <h2 className='text-sm font-medium'>Salary Range
                    </h2>
                    <Input placeholder='e.g. $100,000 - $120,000/year' className='mt-2' onChange={(event) => onHandleInputChange('salaryRange', event.target.value)} />
                </div>
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Application Deadline</h2>
                <Input type="date" placeholder='e.g. TechnoML' required className='mt-2' onChange={(event) => onHandleInputChange('applicationDeadline', event.target.value)} />
            </div>
            
            <div className='mt-7 justify-end flex'>
                <Button onClick={() => GoToNext()}> Analyze Job Description<ArrowRight /></Button>
            </div>
            
        </div>
    )
}

export default FormContainer
