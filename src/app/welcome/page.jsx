"use client"

import React from 'react'
import Navbar from '@/app/components/Navbar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function WelcomePage() {

    const { data: session } = useSession();
    console.log(session)

    if (!session) redirect("/login");

  return (
    <div>
      <Navbar session={session} />
      <div className='container mx-auto'>
        <h3 className='text-3xl my-3'>Welcome {session?.user?.name}</h3>
        <p>Email {session?.user?.email}</p>
        <hr className='my-3' />
        <p1>Today, I will present how to use Nextauth</p1>
      </div>
    </div>
  )
}

export default WelcomePage 
