import React from 'react'
import Unlock from './unlock_pdf';
export const metadata = {
    title: "Unlock pdf Files Online",
    description: "Easily unlock pdf files using PDFtoolify - fast, secure, and easy.",
    alternates: {
    canonical: "/unlock_pdf",
  },
  };
  
function page() {
  return (
    <div>
      <Unlock />
    </div>
  )
}

export default page
