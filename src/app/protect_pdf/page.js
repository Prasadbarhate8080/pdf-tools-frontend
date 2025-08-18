import React from 'react'
import Protect from './protect_pdf';

export const metadata = {
    title: "Protect pdf Files",
    description: "Easily protect your pdf files using PDFtoolify fast and secure",
    alternates: {
    canonical: "/protect_pdf",
  },
  };
  
function page() {
  return (
    <div>
      <Protect />
    </div>
  )
}

export default page
