import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import CreateOptions from './_components/CreateOptions'
import { Briefcase, Video } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const DashboardPage = () => {
  return (
    <div> 
      <div>
        <div className='my-5'>
          < div className='p-5 flex flex-col gap-3 items-center bg-white mt-5'>
            <Briefcase className='h-10 w-10 text-primary' />
            <h2 className='font-bold text-2xl'>Create a New Job Posting</h2>
            <h2 className='text-sm md:text-base text-gray-600 text-center mb-8 max-w-2xl mx-auto'>Start by filling out the job details form to create a new job posting. This information will be used to match and rank resumes of potential candidates based on their skills, experience, and qualifications.</h2>
         
          </div>
        </div >
      </div>
      <CreateOptions />
    </div>
  )
}

export default DashboardPage
