import React from 'react'
import Pdfa from './pdf_to_pdfa';
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
    </div>
  )
}

export default page
