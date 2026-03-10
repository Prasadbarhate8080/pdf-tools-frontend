import React from 'react'
import Pdfa from './pdf_to_pdfa';
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
export const metadata = {
  title: "Convert PDF to PDF/A for Long-Term Archiving",
  description: "Easily convert your PDF files into PDF/A format for reliable, long-term archiving. Fast, secure, and compliant with ISO standards.",
  openGraph: {
    title: "PDF to PDF/A Converter - PDFtoolify",
    description: "Make your PDF documents archive-ready online.",
  },
  alternates: {
    canonical: "/pdf_to_pdfa",
  },
};
function page() {
  return (
    <div>
      <Pdfa />
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            PDF to PDF/A Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about PDF/A archiving standards
          </p>
        </div>
        <Posts toolName={"PDF_TO_PDFA"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
