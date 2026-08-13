import React from 'react'
import AddPdfInPdf from './add_pdf_in_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
export const metadata = {
  title: 'Insert PDF into PDF Online - Merge PDFs Anywhere',
  description:
    'Insert a PDF file into another PDF document at any position. Fast, secure, and free online tool with PDFtoolify.',
  openGraph: {
    title: 'Insert PDF into PDF Online - PDFtoolify',
    description: 'Insert documents into your existing PDFs easily and for free.',
  },
  alternates: {
    canonical: '/add_pdf_in_pdf',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Add PDF in PDF',
      url: 'https://www.pdftoolify.com/add_pdf_in_pdf',
      description:
        'Insert one PDF into another PDF online for free with PDFtoolify. Add full PDFs or selected pages exactly where you want.',
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
          name: 'Is PDFtoolify’s Add PDF in PDF tool free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is completely free. You can insert one PDF into another without any signup or hidden charges.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I add a PDF inside another PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Upload your main PDF, choose the page number where you want to insert the new PDF, select the second file, and PDFtoolify will insert it instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will adding a PDF affect the quality of my document?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, the quality remains the same. PDFtoolify preserves original text, images, and formatting while adding pages.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to upload my PDFs online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, your files are processed securely. PDFtoolify automatically deletes your PDFs after completion to ensure privacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I insert multiple pages or entire PDFs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. You can add a full PDF or selected pages, and place them exactly where you want in the main document.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there any limit on how many PDFs I can add?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No limits. You can insert as many PDFs as you want—PDFtoolify is completely free and unlimited.',
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
      <AddPdfInPdf />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Insert PDF into PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about merging and inserting PDFs
            </p>
          </div>
          <Posts toolName={'ADD_PDF_IN_PDF'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
