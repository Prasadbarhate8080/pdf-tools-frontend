import React from 'react'
import Compress from './compress_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'

export const metadata = {
  title: 'Compress PDF Files Online - Reduce PDF Size Fast',
  description:
    'Reduce the file size of your PDFs online while maintaining quality. Fast, secure, and easy-to-use PDF compressor tool.',
  openGraph: {
    title: 'Compress PDF Files Online - PDFtoolify',
    description: 'Shrink PDF files without losing quality. No signup required.',
  },
  alternates: {
    canonical: '/compress_pdf',
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
          name: 'Is PDFtoolify’s compressor free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is completely free to use. You can compress PDFs without signing up.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will compression affect PDF quality?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, your PDF remains clear and readable. We optimize size while preserving quality.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to compress PDFs online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Files are processed securely and deleted automatically after completion.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I compress large PDF files?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. PDFtoolify handles large files quickly and reliably.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to install anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The compressor works in your browser with no downloads required.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does compression cost anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, PDF compression with PDFtoolify is 100% free and unlimited.',
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
      <Compress />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Compress PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about compressing PDFs efficiently
            </p>
          </div>
          <Posts toolName={'COMPRESS_PDF'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
