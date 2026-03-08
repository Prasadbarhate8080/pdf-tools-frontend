import React from 'react'
import WordToPdf from './word_to_pdf'
export const metadata = {
  title: "Word to PDF Converter Online - Fast and Free",
  description: "Convert Word documents (.docx, .doc) to PDF online easily. Maintain formatting with this high-quality Word-to-PDF tool.",
  openGraph: {
    title: "Word to PDF Converter - PDFtoolify",
    description: "High-quality Word to PDF conversion online for free.",
  },
  alternates: {
    canonical: "/word_to_pdf",
  },
};
function page() {
  return (
    <div>
      <WordToPdf />
    </div>
  )
}

export default page
