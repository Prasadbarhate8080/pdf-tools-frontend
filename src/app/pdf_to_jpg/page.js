import React from 'react'
import PDFToJPG from './pdf_to_jpg'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
export const metadata = {
  title: 'PDF to JPG Converter Online - Extract Images from PDF',
  description:
    'Convert your PDF pages into high-quality JPG images for free. Extract all images from your PDF easily with PDFtoolify.',
  openGraph: {
    title: 'PDF to JPG Converter - PDFtoolify',
    description: 'Convert PDF pages to JPG images online in seconds.',
  },
  alternates: {
    canonical: '/pdf_to_jpg',
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
          name: 'Is PDFtoolify’s PDF to JPG converter free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is completely free to use. You can convert any PDF page into a JPG image without creating an account.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I convert a PDF to JPG using PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Just upload your PDF file and click “Convert to JPG.” PDFtoolify will instantly turn each PDF page into a high-quality JPG image.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will the image quality change after conversion?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The JPG images maintain excellent clarity and resolution. PDFtoolify ensures your output remains sharp and accurate.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to convert PDF files to JPG online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Your files are processed securely, and PDFtoolify automatically deletes all PDFs and images after the conversion is completed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I convert all pages of a PDF to JPG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. You can convert a single page or all pages of a PDF—PDFtoolify handles multi-page conversion with ease.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does converting PDF to JPG cost anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, PDF to JPG conversion on PDFtoolify is completely free—no hidden fees or subscription required.',
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
      <PDFToJPG />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              PDF to JPG Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about converting PDFs to JPG images
            </p>
          </div>
          <Posts toolName={'PDF_TO_JPG'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
