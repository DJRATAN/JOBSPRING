import Image from 'next/image'
import React from 'react'

const InterviewHeader = () => {
  return (
    <div className='p-4 shadow-md bg-white'>
      <Image src={'/logo.svg'} alt='logo' width={200} height={300} />
    </div>
  )
}

export default InterviewHeader
