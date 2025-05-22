"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/superbaseClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


function Login() {
  const router = useRouter();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push("https://localhost:3000/dashboard")
      }
    }
    )
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const singInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) {
      console.log('Error:', error.message)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-blue-100'>
      <div className='flex flex-col items-center border rounded-2xl'>
        <Image src={'/logo.svg'}
          alt='LOGO'
          height={100}
          width={400}
          className='w-[180px] mt-8' />
        <div className='flex items-center flex-col'>
          <Image src={'/login.jpg'}
            alt='LOGO'
            height={400}
            width={600}
            className='w-[400px] h-[250px]' />
          <h2 className='text-2xl font-bold text-center mt-5'>Welcome to JobSpring</h2>
          <p className='text-gray-500 text-center'>Sign In With Google Authentication</p>
          <Button
            className='mt-7 w-full'
            onClick={singInWithGoogle}
          >Login with Google</Button>
        </div>
      </div>
    </div>
  )
}

export default Login
