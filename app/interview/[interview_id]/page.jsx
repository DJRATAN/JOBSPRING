"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { supabase } from '@/services/superbaseClient';
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

function Interview() {
    const {interview_id} = useParams();
    console.log(interview_id);
    const [interviewData,setInterviewData] = useState();
    const [userName,setUserName] = useState();
    const [userEmail,setUserEmail] = useState();
    const [loading,setLoading] = useState(false);
    const {interviewInfo,setInterviewInfo} = useContext(InterviewDataContext);
    const router = useRouter();

    useEffect(()=>{
        interview_id&&GetInterviewDetails();
    },[interview_id])
const GetInterviewDetails = async () => {
    setLoading(true);
    try {
        const { data: Interviews, error } = await supabase
            .from('Interview') // <-- ensure case-sensitive match
            .select("jobPosition,jobDescription,duration,type")
            .eq('interview_id', interview_id);

        console.log("Fetched data:", Interviews); 

        if (error) {
            toast("Failed to fetch interview details.");
            setLoading(false);
            return;
        }

        if (!Interviews || Interviews.length === 0) {
            toast("Incorrect interview link!");
            setLoading(false);
            return;
        }

        setInterviewData(Interviews[0]);
        setLoading(false);
    } catch (e) {
        console.error("Unexpected error:", e);
        toast("Unexpected error occurred while fetching interview.");
        setLoading(false);
    }
};


    const onJoinInterview = async () => {
        setLoading(true);
        let { data: Interviews, error } = await supabase
        .from('Interview')
        .select("*")
        .eq("interview_id",interview_id)
        console.log(Interviews[0]);
        setInterviewInfo({
            userName:userName,
            userEmail:userEmail,
            interviewData:Interviews[0]?.questionList,
            interviewDesc:Interviews[0]?.jobTitle,
        });
        router.push(`/interview/${interview_id}/start`)
        setLoading(false);
    }

  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'>
        <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-33 xl:px-52'>
            <Image src={'/logo.svg'} alt='logo' width={200} height={300} className='w-[100px]'/>
            <h2 className='mt-3'>AI-Powered Interview Platform</h2>
            <Image src={'/interview.svg'} alt='interview' width={500} height={500} className='w-[280px] -mt-7 -mb-7'/>
            <h2 className='font-bold text-lg'>{interviewData?.jobPosition}</h2>
            <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4'/>{interviewData?.duration}</h2>
            <div className='w-full'>
                <h2>Enter your full name</h2>
                <Input placeholder='e.g. Ratan Prajapati' className='mt-3' onChange={(event)=>setUserName(event.target.value)}/>
            </div>
            <div className='w-full mt-4'>
                <h2>Enter your Email</h2>
                <Input placeholder='e.g. ratanprajapati1242@gmail.com' className='mt-3' onChange={(event)=>setUserEmail(event.target.value)}/>
            </div>
            <div className='p-3 bg-blue-100 flex gap-4 rounded-xl mt-5'>
                <Info className='text-primary'/>
                <div>
                    <h2 className='font-bold'>Before you begin</h2>
                    <ul>
                        <li className='text-sm text-primary'>- Test your camera and microphone</li>
                        <li className='text-sm text-primary'>- Ensure you have stable internet connection</li>
                        <li className='text-sm text-primary'>- Find a quite place for interview</li>
                    </ul>
                </div>
            </div>
            <Button className='mt-5 font-bold w-full cursor-pointer' disabled={loading||!userName} onClick={()=>onJoinInterview()}>
                <Video/> {loading&&<Loader2Icon/>}Join Interview
            </Button>

        </div>
    </div>
  )
}

export default Interview