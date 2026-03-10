import React from 'react'
import CreatePdf from './create_pdf';
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
export const metadata = {
  title: "Create PDF Online - Free Image to PDF Creator",
  description: "Create high-quality PDFs from your JPG, PNG, and other images with PDFtoolify - fast, private, and user-friendly.",
  openGraph: {
    title: "Create PDF Online - PDFtoolify",
    description: "Turn your photos and images into professional PDF documents for free.",
  },
  alternates: {
    canonical: "/create_pdf",
  },
};

function page() {
  return (
    <div>
      <CreatePdf />
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Create PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about creating and managing PDF documents
          </p>
        </div>
        <Posts toolName={"CREATE_PDF"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page