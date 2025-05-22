'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const InterviewComplete = () => {
    const router = useRouter();
  return (
    <div className="bg-white text-primary font-sans antialiased flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center space-y-8 py-16">
        <div className="rounded-full bg-green-500 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-center">Interview Complete!</h1>
        <p className="text-lg text-gray-600 text-center">
          Thank you for participating in the AI-driven interview with AI-Interview
        </p>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src={'/happyusers.svg'}
            width={100}
            height={100}
            alt="Interview Illustration"
            className="w-full h-auto object-cover max-w-4xl"
            style={{
              backgroundImage: 'url(https://i.imgur.com/g5B0C9N.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '800px',
              height: '400px',
            }}
          />
        </div>

        <div className="bg-gray-100 rounded-xl p-8 shadow-md w-full max-w-xl space-y-4">
          <div className="flex items-center justify-center rounded-full bg-gray-200 w-12 h-12 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-center">What's Next?</h2>
          <p className="text-gray-600 text-center">
            The recruiter will review your interview responses and will contact you soon regarding the next steps.
          </p>
          <p className="text-gray-400 text-sm text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Response within 2-3 business days
          </p>
        </div>

        <div className="flex space-x-4">
          <Button className="bg-gray-200 text-gray-600 cursor-pointer" variant={'outline'} onClick={()=>router.push('/dashboard')}>
            <Home className="h-5 w-5" />
            <span>Return to Homepage</span>
          </Button>

          <Button className="bg-blue-500 text-white cursor-pointer" onClick={()=>router.push('/dashboard')}>
            <span>View Other Opportunities</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

      </div>

      <footer className="bg-gray-100 text-gray-400 text-center py-4">
        <p className='text-sm text-gray-500'>© 2025 Ai-Interview. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default InterviewComplete;
