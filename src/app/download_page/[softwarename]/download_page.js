"use client"
import { useParams } from 'next/navigation';
import React from 'react'

function DownloadPage() {
    const {softwarename} = useParams();
  return (
    <div>
       <div className="bg-gray-100 dark:bg-gray-800">
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-2xl w-full px-4">
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Coming Soon!</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">We are working hard to bring you the download page for <span class="font-semibold">{softwarename}</span>. Stay tuned for updates!
                    </p>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default DownloadPage
