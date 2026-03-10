import React from 'react'
import AddPagesInPdf from './add_pages_to_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'

export const metadata = {
  title: "Add Pages to PDF Online - Free PDF Page Inserter",
  description: "Easily add or insert new pages into your existing PDF document online. Fast and secure PDF page adder with PDFtoolify.",
  openGraph: {
    title: "Add Pages to PDF Online - PDFtoolify",
    description: "Insert blank or existing pages into your PDF documents for free.",
  },
  alternates: {
    canonical: "/add_pages_to_pdf",
  },
};

function page() {
  return (
    <div>
      <AddPagesInPdf />
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Add Pages to PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about inserting and adding pages to PDFs
          </p>
        </div>
        <Posts toolName={"ADD_PAGES_TO_PDF"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
