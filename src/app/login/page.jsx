"use client"

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");

    const router = useRouter();

    const { data: session } = useSession();
    if (session) redirect("/welcome");

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {

        const res = await signIn("credentials", {
          email, password, redirect: false
        })

        if (res.error) {
          setError("Invalid credentials");
          return;
        }

        router.replace("welcome");

      } catch(error) {
          console.log(error)
      }
    }

  return (
    <div>
      <Navbar/>
      <div className='container mx-auto py-5'>
        <h3>Login Page</h3>
        <hr className='my-3'></hr>
        <form onSubmit={handleSubmit}>

          {error && (
              <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                {error}
              </div>
            )}

            <input onChange={(e) => setEmail(e.target.value)} className='block bg-gray-300 p-2 m-2 rounded-md' type="email" placeholder='Enter you email'/>
            <input onChange={(e) => setPassword(e.target.value)} className='block bg-gray-300 p-2 m-2 rounded-md' type="password" placeholder='Enter you password'/>
            <button type='submit' className='bg-gray-500 p-2 rounded-md text-white'>Sign In</button>
        </form>
        <hr className='my-3'></hr>
        <p>Already have an account? go to <Link className='text-blue-500 hover:underline' href="/register">Register</Link> Page</p>
      </div>
    </div>
  )
}

export default LoginPage
