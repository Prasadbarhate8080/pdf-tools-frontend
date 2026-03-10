import React from 'react'
import PDFToJPG from './pdf_to_jpg'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
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
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            PDF to JPG Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about converting PDFs to JPG images
          </p>
        </div>
        <Posts toolName={"PDF_TO_JPG"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
