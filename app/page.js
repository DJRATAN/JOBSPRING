import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Image src={'/logo.svg'}
        height={100}
        width={400}
        alt='LOGO' />
      <Button>
        <Link href={'/dashboard'}>Go to Dashboard</Link>
      </Button>
    </div>
  )
}

export default HomePage
