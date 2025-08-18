import React from 'react'
import WordToPdf from './word_to_pdf'
export const metadata = {
    title: "Word to pdf convert online",
    description: "Easily convert word files into pdf using PDFtoolify- fast, secure, and easy.",
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
