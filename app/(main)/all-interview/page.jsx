'use client'
import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { Camera, Plus, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import InterviewCard from '../dashboard/_components/InterviewCard'
import { supabase } from '@/services/superbaseClient'

function AllInterview() {
    const [interviewList, setInterviewList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
        let { data: Interviews, error } = await supabase
            .from('Interview')
            .select('*')
            .eq('userEmail', user?.email)
            .order('id', { ascending: false })

        console.log(Interviews);
        setInterviewList(Interviews);

    }

    return (
        <div className='my-5'>
            <h2 className='font-bold text-2xl'>All Previously Created Interviews</h2>
            <div className='bg-white border border-gray-200 rounded-lg p-5 shadow-md mt-3'>
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
                            <InterviewCard interview={interview} key={index} />
                        ))}
                    </div>

                }
            </div>
        </div>
    )
}

export default AllInterview