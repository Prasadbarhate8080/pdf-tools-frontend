import React from 'react'
import PNGToPDF from './png_to_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
export const metadata = {
  title: 'PNG to PDF Converter Online - Free and Fast',
  description:
    'Easily convert PNG images into a high-quality PDF document online. Free to use, secure, and no sign-up required.',
  openGraph: {
    title: 'PNG to PDF Converter Online - PDFtoolify',
    description: 'Convert multiple PNG images into a single PDF file for free.',
  },
  alternates: {
    canonical: '/png_to_pdf',
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
          name: 'Is PDFtoolify’s PNG to PDF converter free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is completely free. You can convert PNG images to PDF without any signup or charges.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I convert PNG to PDF using PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simply upload your PNG images, arrange them in order, and click “Convert.” Your high-quality PDF will be generated instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will the image quality change after converting PNG to PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Your PNG images retain their clarity and resolution. PDFtoolify ensures sharp and high-quality output every time.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to convert PNG to PDF online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Your PNG images are processed securely, and all files are automatically deleted after conversion to protect your privacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I merge multiple PNG images into one PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. You can add as many PNG images as you want and combine them into a single, well-organized PDF.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to install any software to convert PNG to PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No installation needed. PDFtoolify works directly in your browser, allowing fast and smooth PNG to PDF conversion online.',
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
      <PNGToPDF />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              PNG to PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about converting PNG images to PDF
            </p>
          </div>
          <Posts toolName={'PNG_TO_PDF'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
