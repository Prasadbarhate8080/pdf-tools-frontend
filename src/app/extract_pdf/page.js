import React from 'react'
import ExtractPdf from './extract_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
export const metadata = {
  title: "Extract Pages from PDF Online - Free PDF Extractor",
  description: "Select and extract specific pages from any PDF file with PDFtoolify - fast, private, and user-friendly.",
  openGraph: {
    title: "Extract PDF Pages Online - PDFtoolify",
    description: "Easily extract pages from your PDF documents for free.",
  },
  alternates: {
    canonical: "/extract_pdf",
  },
};

function page() {
  return (
    <div>
      <ExtractPdf />
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Extract PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about extracting and managing PDF pages
          </p>
        </div>
        <Posts toolName={"EXTRACT_PDF"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
