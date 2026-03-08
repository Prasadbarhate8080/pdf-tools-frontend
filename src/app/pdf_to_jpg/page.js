import React from 'react'
import PDFToJPG from './pdf_to_jpg'
export const metadata = {
  title: "PDF to JPG Converter Online - Extract Images from PDF",
  description: "Convert your PDF pages into high-quality JPG images for free. Extract all images from your PDF easily with PDFtoolify.",
  openGraph: {
    title: "PDF to JPG Converter - PDFtoolify",
    description: "Convert PDF pages to JPG images online in seconds.",
  },
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
