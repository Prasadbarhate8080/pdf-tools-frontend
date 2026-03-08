import React from 'react'
import Unlock from './unlock_pdf';
export const metadata = {
  title: "Unlock Password-Protected PDFs Online",
  description: "Remove passwords and restrictions from your PDF files online. Quick, secure, and free PDF unlocking tool.",
  openGraph: {
    title: "Unlock PDF Online - PDFtoolify",
    description: "Unlock secured PDF files in seconds. No registration required.",
  },
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
