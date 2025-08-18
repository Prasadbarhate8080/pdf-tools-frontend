import React from 'react'
import JpgToPdf from './jpg_to_pdf'

export const metadata = {
    title: "JPG to PDF convert online ",
    description: "Easily convert JPG images into a single PDF document using PDFtoolify  no sign-up, no watermark.",
    alternates: {
    canonical: "/jpg_to_pdf",
  },
  };

function page() {
  return (
    <div>
      <JpgToPdf />
    </div>
  )
}

export default page
