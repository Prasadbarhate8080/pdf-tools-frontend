import React from 'react'
import PDFToJPG from './pdf_to_jpg'
export const metadata = {
    title: "pdf to jpg convert online",
    description: "Easily convert the pdf file into jpg images",
    alternates: {
    canonical: "/pdf_to_jpg",
  },
  };
  
function page() {
  return (
    <div>
      <PDFToJPG />
    </div>
  )
}

export default page
