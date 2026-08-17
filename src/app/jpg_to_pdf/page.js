import React from 'react'
import JpgToPdf from './jpg_to_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'

export const metadata = {
  title: 'JPG to PDF Converter Online - Free Image to PDF',
  description:
    'Easily convert JPG images into a single PDF document using PDFtoolify - no sign-up, no watermark.',
  openGraph: {
    title: 'JPG to PDF Converter Online - PDFtoolify',
    description: 'Convert multiple JPG images into a single PDF file instantly.',
  },
  alternates: {
    canonical: '/jpg_to_pdf',
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
          name: 'Is PDFtoolify’s JPG to PDF converter free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is completely free. You can convert JPG or PNG images to PDF without creating an account.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I convert JPG to PDF using PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Upload your images, arrange them in the order you want, and click Convert. PDFtoolify will create a high-quality PDF instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will the image quality change after converting to PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Your images remain sharp and high-quality after conversion. PDFtoolify ensures excellent clarity in the final PDF.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to convert JPG to PDF online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All uploaded images are processed securely, and PDFtoolify automatically deletes your files after conversion.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I merge multiple images into one PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. You can add multiple JPG or PNG images and combine them into a single PDF file easily.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to install any software to convert JPG to PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No installation required. PDFtoolify works directly in your browser, allowing you to convert images to PDF instantly online.',
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
      <JpgToPdf />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              JPG to PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about converting images to PDF
            </p>
          </div>
          <Posts toolName={'JPG_TO_PDF'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
