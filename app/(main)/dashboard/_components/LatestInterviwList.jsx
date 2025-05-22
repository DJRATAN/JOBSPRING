'use client'
import { Button } from '@/components/ui/button';
import { ArrowRight, Video } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const LatestInterviwList = () => {
    const [interviwList, setInterviewList] = useState([]);
    return (
        <div className='my-5'>
            {interviwList?.length == 0 &&
                < div className='p-5 flex flex-col gap-3 items-center bg-white mt-5'>
                    <Link href={'/dashboard/create-interview'}>
                        <Button>Create New Job <ArrowRight /></Button>
                    </Link>
                </div>
            }
        </div >
    )
}

export default LatestInterviwList
