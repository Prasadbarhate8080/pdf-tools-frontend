"use client"
import { Star, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'

function Feedback() {
    const [rating, setRating] = useState(0)
  return (
    <div className='fixed inset-0 flex z-50 bg-gray-600/80 items-center justify-center'>
        <div className='rounded-2xl w-96 h-52 bg-white p-4 relative shadow-md'>
            <span className='absolute right-2 top-2'> <X /> </span>
            <h4 className='px-2'>Rate Us</h4>
                <ul className='flex justify-center items-center gap-6 mt-8 p-2'>
                    <li onClick={() => {setRating(1)}}> <Star size={35} fill={rating == 1 ? "orange" : "white"} className={` ${rating == 1 ? "text-white" : ""}`}/> </li>
                    <li onClick={() => {setRating(2)}}> <Star size={35} className='text-gray-600'/> </li>
                    <li onClick={() => {setRating(3)}}> <Star size={35} className='text-gray-600'/> </li>
                    <li onClick={() => {setRating(4)}}> <Star size={35} className='text-gray-600'/> </li>
                    <li onClick={() => {setRating(5)}}> <Star size={35} className='text-gray-600'/> </li>
                </ul>
                <div className='flex justify-end mt-6 px-4'>
                    <Button>Submit</Button>
                </div>
        </div>
    </div>
  )
}

export default Feedback
