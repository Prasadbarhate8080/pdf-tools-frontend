import React from 'react'
import Unlock from './unlock_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
export const metadata = {
  title: 'Unlock Password-Protected PDFs Online',
  description:
    'Remove passwords and restrictions from your PDF files online. Quick, secure, and free PDF unlocking tool.',
  openGraph: {
    title: 'Unlock PDF Online - PDFtoolify',
    description: 'Unlock secured PDF files in seconds. No registration required.',
  },
  alternates: {
    canonical: '/unlock_pdf',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is PDFtoolify Really Free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is 100% free. You can unlock secured PDFs without signing up or paying anything.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I unlock a PDF with PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Upload your locked PDF file, enter the correct password, and click “Unlock.” PDFtoolify will instantly remove the password protection.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will unlocking my PDF affect its quality?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, unlocking a PDF does not change its quality or formatting. Your file remains exactly the same—just without the password.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to unlock PDFs online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. PDFtoolify uses secure processing, and all uploaded files are automatically deleted after completion for maximum privacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I unlock PDFs offline with PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can download the Windows app and unlock PDFs even without an internet connection.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does unlocking PDFs cost anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, unlocking PDF files with PDFtoolify is completely free and unlimited.',
          },
        },
      ],
    },
  ]
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Unlock />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Unlock PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about unlocking and securing PDFs
            </p>
          </div>
          <Posts toolName={'UNLOCK_PDF'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
