import React from 'react'
import Pdfa from './pdf_to_pdfa';
export const metadata = {
    title: "Pdf to Pdfa convert",
    description: "Easily convert  PDF files into a pdfa - fast and secure,",
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
