import React from 'react'
import CreatePdf from './create_pdf';
export const metadata = {
    title: "Create PDF online",
    description: "Create PDFs of any jpg png images with PDFtoolify  fast, private, and user-friendly.",
    alternates: {
    canonical: "/create_pdf",
  },
  };

function page() {
  return (
    <div>
      <CreatePdf />
    </div>
  )
}

export default page