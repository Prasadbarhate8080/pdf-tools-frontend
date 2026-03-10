import React from 'react'
import Compress from './compress_pdf';
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'

export const metadata = {
  title: "Compress PDF Files Online - Reduce PDF Size Fast",
  description: "Reduce the file size of your PDFs online while maintaining quality. Fast, secure, and easy-to-use PDF compressor tool.",
  openGraph: {
    title: "Compress PDF Files Online - PDFtoolify",
    description: "Shrink PDF files without losing quality. No signup required.",
  },
  alternates: {
    canonical: "/compress_pdf",
  },
};


function page() {
  return (
    <div>
      <Compress />
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Compress PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about compressing PDFs efficiently
          </p>
        </div>
        <Posts toolName={"COMPRESS_PDF"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
