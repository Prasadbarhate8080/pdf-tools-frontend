import React from 'react'
import AddPdfInPdf from './add_pdf_in_pdf';
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
export const metadata = {
  title: "Insert PDF into PDF Online - Merge PDFs Anywhere",
  description: "Insert a PDF file into another PDF document at any position. Fast, secure, and free online tool with PDFtoolify.",
  openGraph: {
    title: "Insert PDF into PDF Online - PDFtoolify",
    description: "Insert documents into your existing PDFs easily and for free.",
  },
  alternates: {
    canonical: "/add_pdf_in_pdf",
  },
};

function page() {
  return (
    <div>
      <AddPdfInPdf />
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Insert PDF into PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about merging and inserting PDFs
          </p>
        </div>
        <Posts toolName={"ADD_PDF_IN_PDF"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
