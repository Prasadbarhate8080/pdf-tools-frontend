import React from 'react'
import Split from './split_pdf'
export const metadata = {
  title: "Split PDF Files Online - Divide PDFs Fast and Securely",
  description: "Split your large PDF files into smaller, manageable parts online. Free, fast, and secure PDF splitter by PDFtoolify.",
  openGraph: {
    title: "Split PDF Files Online - PDFtoolify",
    description: "Extract pages from your PDF or divide it into multiple files. No quality loss.",
  },
  alternates: {
    canonical: "/split_pdf",
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
