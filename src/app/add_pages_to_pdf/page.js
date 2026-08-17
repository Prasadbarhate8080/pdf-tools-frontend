import React from 'react'
import AddPagesInPdf from './add_pages_to_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'

export const metadata = {
  title: 'Add Pages to PDF Online - Free PDF Page Inserter',
  description:
    'Easily add or insert new pages into your existing PDF document online. Fast and secure PDF page adder with PDFtoolify.',
  openGraph: {
    title: 'Add Pages to PDF Online - PDFtoolify',
    description: 'Insert blank or existing pages into your PDF documents for free.',
  },
  alternates: {
    canonical: '/add_pages_to_pdf',
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
          name: 'Is PDFtoolify really free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is completely free. You can add pages to your PDF files without creating an account.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I add pages to a PDF using PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simply upload your PDF, insert blank or image pages where you want them, and click Export PDF. PDFtoolify will instantly generate your updated document.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will the quality of my PDF change after adding pages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, the original quality and formatting of your PDF remain unchanged. New pages are inserted without distortion.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to add pages to my PDF online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. PDFtoolify uses secure processing, and all uploaded files are automatically deleted after completion to protect your privacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I add pages offline using PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Download the Windows version of PDFtoolify to add pages to your PDF even without internet access.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does adding pages to a PDF cost anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, adding pages with PDFtoolify is 100% free with no hidden fees.',
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
      <AddPagesInPdf />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Add Pages to PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about inserting and adding pages to PDFs
            </p>
          </div>
          <Posts toolName={'ADD_PAGES_TO_PDF'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
