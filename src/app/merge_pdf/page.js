import React from 'react'
import Merge from './merge_pdf'
export const metadata = {
    title: "Merge PDF Files Online",
    description: "Easily merge multiple PDF files into a single document using PDFtoolify - fast and secure.",
    alternates: {
    canonical: "/merge_pdf",
  },
  };
function page() {
  return (
    <div>
      <Merge />
    </div>
  )
}

export default page
