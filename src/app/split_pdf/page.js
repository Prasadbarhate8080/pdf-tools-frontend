import React from 'react'
import Split from './split_pdf'
export const metadata = {
    title: "Split PDF Files Online ",
    description: "Quickly split large PDF files into smaller parts using PDFtoolify  easy, secure and fast.",
    alternates:{
      canonical: "/split_pdf"
    },
  };

function page() {
  return (
    <div>
      <Split />
    </div>
  )
}

export default page
