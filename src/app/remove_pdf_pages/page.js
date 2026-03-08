import React from 'react'
import RemovePDFPages from './remove_pdf_pages'

export const metadata = {
  title: "Remove Pages from PDF Online - Delete Unwanted PDF Pages",
  description: "Easily delete specific pages from your PDF file online. Fast, secure, and free tool to remove PDF pages.",
  openGraph: {
    title: "Remove PDF Pages - PDFtoolify",
    description: "Remove unwanted pages from your PDF documents in seconds.",
  },
  alternates: {
    canonical: "/remove_pdf_pages",
  },
};
function page() {
  return (
    <div>
      <RemovePDFPages />
    </div>
  )
}

export default page
