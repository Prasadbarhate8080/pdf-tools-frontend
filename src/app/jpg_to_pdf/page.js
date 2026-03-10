import React from 'react'
import JpgToPdf from './jpg_to_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'

export const metadata = {
  title: "JPG to PDF Converter Online - Free Image to PDF",
  description: "Easily convert JPG images into a single PDF document using PDFtoolify - no sign-up, no watermark.",
  openGraph: {
    title: "JPG to PDF Converter Online - PDFtoolify",
    description: "Convert multiple JPG images into a single PDF file instantly.",
  },
  alternates: {
    canonical: "/jpg_to_pdf",
  },
};

function page() {
  return (
    <div>
      <JpgToPdf />
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            JPG to PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about converting images to PDF
          </p>
        </div>
        <Posts toolName={"JPG_TO_PDF"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
