import React from 'react'
import ExtractPdf from './extract_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
import { extractPdfFaqs } from '@/data/faqs'
export const metadata = {
  title: 'Extract Pages from PDF Online - Free PDF Extractor',
  description:
    'Select and extract specific pages from any PDF file with PDFtoolify - fast, private, and user-friendly.',
  openGraph: {
    title: 'Extract PDF Pages Online - PDFtoolify',
    description: 'Easily extract pages from your PDF documents for free.',
  },
  alternates: {
    canonical: '/extract_pdf',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: extractPdfFaqs.map((faq) => {
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
      <ExtractPdf />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Extract PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about extracting and managing PDF pages
            </p>
          </div>
          <Posts toolName={'EXTRACT_PDF'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
