import React from 'react'
import ExtractPdf from './extract_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Extract PDF tool?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Extract PDF allows you to select specific pages from your PDF and download them as a new PDF file.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I extract pages from a PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Upload your PDF, select the pages you need, and click on “Extract pages”. Your new PDF will be ready instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there any quality loss after extracting pages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The extracted PDF maintains the exact same quality as the original pages.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to upload my PDF for extraction?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Your files are processed securely, and they are removed automatically after extraction is completed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I extract multiple pages at once?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can select multiple pages at the same time and extract them together into a single PDF.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the Extract PDF tool free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify’s Extract PDF tool is completely free to use without signup.',
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
