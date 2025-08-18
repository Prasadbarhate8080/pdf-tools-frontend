import React from 'react'
import ExtractPdf from './extract_pdf'
export const metadata = {
    title: "Extract Pages from PDF ",
    description: "Select and extract specific pages from any PDF file with PDFtoolify  fast, private, and user-friendly.",
    alternates: {
    canonical: "/extract_pdf",
  },
  };

function page() {
  return (
    <div>
      <ExtractPdf />
    </div>
  )
}

export default page
