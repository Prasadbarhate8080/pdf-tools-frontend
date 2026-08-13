import React from 'react'
import RemovePDFPages from './remove_pdf_pages'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'

export const metadata = {
  title: 'Remove Pages from PDF Online - Delete Unwanted PDF Pages',
  description:
    'Easily delete specific pages from your PDF file online. Fast, secure, and free tool to remove PDF pages.',
  openGraph: {
    title: 'Remove PDF Pages - PDFtoolify',
    description: 'Remove unwanted pages from your PDF documents in seconds.',
  },
  alternates: {
    canonical: '/remove_pdf_pages',
  },
}
function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Remove Pages from PDF',
      url: 'https://www.pdftoolify.com/remove_pdf_pages',
      description: 'Remove unwanted pages from PDF files online for free with PDFtoolify.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is PDFtoolify Free to Remove PDF Pages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, removing pages from your PDF is completely free on PDFtoolify. No signup or subscription required.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I remove pages from a PDF using PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Upload your PDF, select the pages you want to delete, and click “Remove Pages.” PDFtoolify will instantly generate a new cleaned PDF.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will removing pages change my PDF quality?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Only the selected pages are deleted—your remaining pages stay in the same original quality and format.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to remove PDF pages online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All files are processed securely, and your PDF is automatically deleted from our servers after completion.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I remove PDF pages offline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can download PDFtoolify for Windows and remove pages offline without internet access.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does removing PDF pages cost anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. PDFtoolify’s page removal tool is 100% free and has no hidden charges.',
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
      <RemovePDFPages />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Remove PDF Pages Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about managing and removing PDF pages
            </p>
          </div>
          <Posts toolName={'REMOVE_PDF_PAGES'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
