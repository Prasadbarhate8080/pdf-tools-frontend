import React from 'react'
import Protect from './protect_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'

export const metadata = {
  title: 'Protect PDF Online - Password Protect Your PDF',
  description:
    'Secure your PDF documents with a strong password online for free. Protect sensitive data with PDFtoolify.',
  openGraph: {
    title: 'Protect PDF Online - PDFtoolify',
    description: 'Add a password to your PDF files to keep them secure.',
  },
  alternates: {
    canonical: '/protect_pdf',
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
          name: 'Is PDFtoolify really free for protecting PDFs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. PDFtoolify is completely free to use. You can lock your PDF files with a password without any signup or charges.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I protect my PDF using PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simply upload your PDF, enter a password, and click “Protect PDF.” Your file will instantly be encrypted with strong security.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will protecting a PDF reduce its quality?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Protecting your PDF only adds encryption. Your content, layout, text, and images remain unchanged.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to protect my PDF online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. PDFtoolify uses secure processing, and your files are automatically deleted after encryption to ensure complete privacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I protect PDF files offline with PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can download PDFtoolify for Windows and protect your files offline without needing internet access.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does protecting a PDF cost anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Adding a password to your PDF using PDFtoolify is completely free.',
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
      <Protect />
      <div className="container py-20 mx-auto">
        <HideContent>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Protect PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about securing and protecting your PDF files
            </p>
          </div>
          <Posts toolName={'PROTECT_PDF'} />
          <ToolBlog />
        </HideContent>
      </div>
    </div>
  )
}

export default page
