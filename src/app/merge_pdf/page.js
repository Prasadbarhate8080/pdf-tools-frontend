import React from 'react'
import Merge from './merge_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
export const metadata = {
  title: "Merge PDF Files Online - Combine Multiple PDFs into One",
  description: "Combine multiple PDF files into one single document effortlessly. Fast, secure, and free online PDF merger tool by PDFtoolify.",
  openGraph: {
    title: "Merge PDF Files Online - PDFtoolify",
    description: "Combine PDFs into a single file easily. No registration required, 100% secure.",
  },
  alternates: {
    canonical: "/merge_pdf",
  },
};
function page() {
  return (
    <div>
      <Merge />
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Merge PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about merging PDFs efficiently
          </p>
        </div>
        <Posts toolName={"MERGE_PDF"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
