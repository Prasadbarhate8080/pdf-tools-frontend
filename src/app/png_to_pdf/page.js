import React from 'react'
import PNGToPDF from './png_to_pdf';
export const metadata = {
    title: "png to  pdf convert online",
    description: "Easily convert the png images into pdf file",
    alternates: {
    canonical: "/png_to_pdf",
  },
  };
function page() {
  return (
    <div>
      <PNGToPDF />
    </div>
  )
}

export default page
