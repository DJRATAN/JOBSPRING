'use client'
import { useUser } from '@/app/provider';
 import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';
import { supabase } from '@/services/superbaseClient';

function InterviewDetails() {
    const {interview_id} = useParams();
    const {user} = useUser();
    const [interviewDetail,setInterviewDetail] = useState();

    useEffect(()=>{
        user&&GetIntreviewList();
    },[user])

    const GetIntreviewList = async () => {
        const result = await supabase
        .from('Interview')
        .select(`
          created_at,
          jobTitle,
          jobDescription,
          employmentType,
          questionList,
          timeDuration,
          interview_id,
          interview-feedback(
            userEmail,
            userName,
            feedback,
            created_at
          )
        `)
        .eq('userEmail', user?.email)
        .eq('interview_id', interview_id);
        
        console.log(result?.data[0]);
        setInterviewDetail(result?.data[0])
    }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
    <h2 className="font-bold text-xl sm:text-2xl mb-4">Interview Details</h2>
    <InterviewDetailContainer interviewDetail={interviewDetail} />
    <CandidateList candidateList={interviewDetail?.['interview-feedback']} />
</div>
  )
}

export default InterviewDetails