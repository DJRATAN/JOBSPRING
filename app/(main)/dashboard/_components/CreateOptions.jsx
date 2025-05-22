import { FileText, PenTool, User2 } from 'lucide-react'
import React from 'react'
import LatestInterviwList from './LatestInterviwList'
import Link from 'next/link'

const CreateOptions = () => {
    return (
        <div>
            <div className='grid grid-cols-3 gap-5'>
                <Link href={'/dashboard/create-interview'} className='bg-white border border-gray-200 rounded-lg p-5'>
                    <PenTool className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
                    <h2 className='font-bold'>1. Describe the Job</h2>
                    <p className='text-gray-500'>Fill out the job details including title, requirements, and other important information.</p>
                </Link>
                <div className='bg-white border border-gray-200 rounded-lg p-5'>
                    <FileText className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
                    <h2 className='font-bold'>2. Upload Resumes</h2>
                    <p className='text-gray-500'>Upload candidate resumes to be analyzed and matched against your job requirements.</p>
                </div>                <div className='bg-white border border-gray-200 rounded-lg p-5'>
                    <User2 className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
                    <h2 className='font-bold'>3. Review Rankings</h2>
                    <p className='text-gray-500'>Get instant rankings of candidates based on their match with your job requirements.</p>
                </div>
            </div>
            <LatestInterviwList />
        </div>
    )
}

export default CreateOptions
