import React from 'react'
import Protect from './protect_pdf';
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'

export const metadata = {
  title: "Protect PDF Online - Password Protect Your PDF",
  description: "Secure your PDF documents with a strong password online for free. Protect sensitive data with PDFtoolify.",
  openGraph: {
    title: "Protect PDF Online - PDFtoolify",
    description: "Add a password to your PDF files to keep them secure.",
  },
  alternates: {
    canonical: "/protect_pdf",
  },
};
  
function page() {
  return (
    <div>
      <Protect />
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Protect PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about securing and protecting your PDF files
          </p>
        </div>
        <Posts toolName={"PROTECT_PDF"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
