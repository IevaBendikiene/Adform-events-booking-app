"use client"
import React from 'react'
import Link from 'next/link'
import {toast} from "react-hot-toast"
import { useRouter} from "next/navigation"
import { useState } from 'react'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState('nothing')

  const logout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        toast.success("Logout successful");
        router.push("/");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
  const getUserDetails = async () => {
    try {
      const response = await fetch('/api/users/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json(); 
        console.log(data);
        setData(data.data._id); 
      } else {
        throw new Error("Failed to fetch user details");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className='p-3 rounded bg-green-500'>{data === 'nothing' ? "Nothing" : <Link href={'/profile/${data}'}>{data}</Link>}</h2>
      <hr />
      <button 
      onClick={logout}
      className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Logout</button>
      <button 
      onClick={getUserDetails}
      className='bg-purple-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Get user details</button>
    </div>
  )
}