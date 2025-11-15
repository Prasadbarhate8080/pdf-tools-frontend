"use client"
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Image from 'next/image';
import parse from 'html-react-parser';

function page() {
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)
    const params = useParams();
    const {slug} = params;
    let a = 1;
    useEffect( () => {
      const fetchPost = async () => {
        try {
        setLoading(true);
        const response = await axios.get(`/api/get_post_to_view/${slug}`);
        setPost(response.data.post);   
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false);
      }
      }
      fetchPost()
      
    }, [])

    
    
    
  return (
    <div className='w-6xl mx-auto p-4 mt-10'>
      <div className='flex items-center justify-center'>
        {  post &&  <Image 
          src={"/close.png"} 
          width={250}
          height={250}
          alt={"alt"}
          />
        }
      </div>
      <div className='w-fit mx-auto mt-10'>
        {
          parse(post.content ? post.content : "<h1>Loading...</h1>")
        }
      </div>
    </div>
  )
}

export default page
