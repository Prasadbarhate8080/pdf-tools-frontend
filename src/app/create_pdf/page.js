import React from 'react'
import CreatePdf from './create_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
export const metadata = {
  title: 'Create PDF Online - Free Image to PDF Creator',
  description:
    'Create high-quality PDFs from your JPG, PNG, and other images with PDFtoolify - fast, private, and user-friendly.',
  openGraph: {
    title: 'Create PDF Online - PDFtoolify',
    description: 'Turn your photos and images into professional PDF documents for free.',
  },
  alternates: {
    canonical: '/create_pdf',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Create PDF',
      url: 'https://www.pdftoolify.com/create_pdf',
      description:
        'Create PDF files from images online for free with PDFtoolify. Combine multiple images into a single multi-page PDF.',
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
          name: 'Is PDFtoolify’s Create PDF tool free to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is completely free. You can create new PDFs from images without any signup or installation.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I create a PDF using PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simply upload your images, click on Create PDF, and download the generated PDF instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will the quality of my images change after converting to PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Your images are optimized for the PDF page but remain clear and readable, preserving quality as much as possible.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to create PDFs online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Your files are processed securely, and PDFtoolify deletes all uploaded documents automatically after processing.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I combine many images into one PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. You can add multiple images and convert them all into a single multi-page PDF.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need any software to create a PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No software required. PDFtoolify works directly in your browser, allowing you to create PDFs instantly online.',
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
      <CreatePdf />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Create PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about creating and managing PDF documents
            </p>
          </div>
          <Posts toolName={'CREATE_PDF'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
