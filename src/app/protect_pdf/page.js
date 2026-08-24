import React from 'react'
import Protect from './protect_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
import { protectPdfFaqs } from '@/data/faqs'

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
      mainEntity: protectPdfFaqs.map((faq) => {
      return {
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          'text': faq.answer,
        },
      }
    }),
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
