import React from 'react'
import Merge from './merge_pdf'
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
    </div>
  )
}

export default page
