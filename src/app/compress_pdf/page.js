import React from 'react'
import Compress from './compress_pdf';

export const metadata = {
    title: "Compress Pdf files online",
    description: "Compress pdf files online, easily compress pdf files online",
    alternates: {
    canonical: "/compress_pdf",
  },
  };


function page() {
  return (
    <div>
      <Compress />
    </div>
  )
}

export default page
