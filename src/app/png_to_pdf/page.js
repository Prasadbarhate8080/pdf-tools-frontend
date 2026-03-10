import React from 'react'
import PNGToPDF from './png_to_pdf';
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
export const metadata = {
  title: "PNG to PDF Converter Online - Free and Fast",
  description: "Easily convert PNG images into a high-quality PDF document online. Free to use, secure, and no sign-up required.",
  openGraph: {
    title: "PNG to PDF Converter Online - PDFtoolify",
    description: "Convert multiple PNG images into a single PDF file for free.",
  },
  alternates: {
    canonical: "/png_to_pdf",
  },
};
function page() {
  return (
    <div>
      <PNGToPDF />
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            PNG to PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about converting PNG images to PDF
          </p>
        </div>
        <Posts toolName={"PNG_TO_PDF"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
