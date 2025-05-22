import { Calendar, Clock, MessageCircleQuestionIcon } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className='p-5 bg-white rounded-lg mt-3'>
      <h2 className=''>{interviewDetail?.jobTitle}</h2>
      <div className='mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-4 sm:gap-8 lg:pr-52'>
        <div>
          <h2 className='text-sm text-gray-500'>Duration</h2>
          <h2 className='flex text-md text-center gap-2 font-bold'><Clock className='h-4 w-4 mt-1' /> {interviewDetail?.timeDuration}</h2>
        </div>
        <div>
          <h2 className='text-sm text-gray-500'>Created On</h2>
          <h2 className='flex text-md text-center gap-2 font-bold'><Calendar className='h-4 w-4 mt-1' /> {moment(interviewDetail?.created_at).format('DD MMM yyy')}</h2>
        </div>
        {interviewDetail?.employmentType && <div>
          <h2 className='text-sm text-gray-500'>Type</h2>
          {/* <h2 className='flex text-md text-center gap-2 font-bold'><Clock className='h-4 w-4 mt-1'/> {JSON.parse(interviewDetail?.type)[0]}</h2> */}
          <h2 className='flex text-md text-center gap-2 font-bold'><Clock className='h-4 w-4 mt-1' /> {interviewDetail?.employmentType}</h2>
        </div>}
      </div>
      <div className='mt-5'>
        <h2 className='font-bold'>Job Description</h2>
        <p className='text-sm leading-6'>{interviewDetail?.jobDescription}</p>
      </div>
      <div className='mt-5'>
        <h2 className='font-bold'>Interview Questions</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          {interviewDetail?.questionList?.map((item, index) => (
            <h2 key={index} className='text-sm flex'> {index + 1}.{item.question}</h2>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InterviewDetailContainer