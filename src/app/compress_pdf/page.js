import React from 'react'
import Compress from './compress_pdf';

export const metadata = {
  title: "Compress PDF Files Online - Reduce PDF Size Fast",
  description: "Reduce the file size of your PDFs online while maintaining quality. Fast, secure, and easy-to-use PDF compressor tool.",
  openGraph: {
    title: "Compress PDF Files Online - PDFtoolify",
    description: "Shrink PDF files without losing quality. No signup required.",
  },
  alternates: {
    canonical: "/compress_pdf",
  },
};


function page() {
  return (
    <div>
      <Compress />
    </div>
  )
}

export default page
