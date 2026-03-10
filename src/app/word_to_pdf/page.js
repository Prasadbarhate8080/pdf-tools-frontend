import React from 'react'
import WordToPdf from './word_to_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
export const metadata = {
  title: "Word to PDF Converter Online - Fast and Free",
  description: "Convert Word documents (.docx, .doc) to PDF online easily. Maintain formatting with this high-quality Word-to-PDF tool.",
  openGraph: {
    title: "Word to PDF Converter - PDFtoolify",
    description: "High-quality Word to PDF conversion online for free.",
  },
  alternates: {
    canonical: "/word_to_pdf",
  },
};
function page() {
  return (
    <div>
      <WordToPdf />
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Word to PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about converting Word documents to PDF
          </p>
        </div>
        <Posts toolName={"WORD_TO_PDF"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
