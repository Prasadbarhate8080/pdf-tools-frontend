import React from 'react'
import Merge from './merge_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
export const metadata = {
  title: 'Merge PDF Files Online - Combine Multiple PDFs into One',
  description:
    'Combine multiple PDF files into one single document effortlessly. Fast, secure, and free online PDF merger tool by PDFtoolify.',
  openGraph: {
    title: 'Merge PDF Files Online - PDFtoolify',
    description: 'Combine PDFs into a single file easily. No registration required, 100% secure.',
  },
  alternates: {
    canonical: '/merge_pdf',
  },
}
function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Merge PDF',
      url: 'https://www.pdftoolify.com/merge_pdf',
      description: 'Merge multiple PDF files into one document online for free with PDFtoolify.',
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
          name: 'Is PDFtoolify Really Free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is completely free to use. You can easily use PDFtoolify for your work without any signup or hidden charges.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I merge PDF files with PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You just need to upload your PDF files, arrange them in order, and click on "Merge." PDFtoolify will instantly combine them into a single file.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will the quality of my PDFs change after merging?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, the merged PDF keeps the same quality and formatting as your original files.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to merge my PDFs online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. PDFtoolify uses secure processing, and your files are deleted automatically after completion to ensure privacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I merge PDFs offline with PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can download PDFtoolify for Windows and merge files offline without internet access.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many PDF files can I merge at once?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can merge up to 50 files at once.',
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
      <Merge />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Merge PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Learn more about merging PDFs</p>
          </div>
          <Posts toolName={'MERGE_PDF'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
