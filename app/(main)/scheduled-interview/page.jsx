'use client'
import { useUser } from '@/app/provider';
import { supabase } from '@/services/superbaseClient';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';
import { Plus, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ScheduleInterview() {
  const { user } = useUser();
  const [interviewList,setInterviewList] = useState();

  useEffect(() => {
    user && GetIntreviewList();
  }, [user])

  const GetIntreviewList = async () => {
    const result = await supabase.from('Interview')
      .select('jobTitle,timeDuration,interview_id,interview-feedback(userEmail)')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false })

    console.log(result);
    setInterviewList(result?.data);




  }

  return (
    <div className='mt-3'>
      <h2 className='font-bold text-2xl mb-3'>Interview List with Candidates Feedback</h2>
      {interviewList?.length == 0 &&
        <div className='p-5 flex flex-col gap-3 items-center'>
          <Video className='h-10 w-10 text-primary' />
          <h2>You don't have any interview created</h2>
          <Button className='cursor-pointer'><Plus /> Create New Interview</Button>
        </div>
      }
      {interviewList &&
        <div className='grid  grid-cols-1 sm:grid-cols-2  gap-5'>
          {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} viewDetail={true} />
          ))}
        </div>

      }
    </div>
  )
}

export default ScheduleInterview