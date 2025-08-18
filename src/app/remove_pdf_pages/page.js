import React from 'react'
import RemovePDFPages from './remove_pdf_pages'

export const metadata = {
    title: "Remove pdf pages online",
    description: "Easily remove PDF pages online using PDFtoolify  - fast and secure",
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
