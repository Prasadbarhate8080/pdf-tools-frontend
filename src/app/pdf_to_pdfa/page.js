import React from 'react'
import Pdfa from './pdf_to_pdfa'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
export const metadata = {
  title: 'Convert PDF to PDF/A for Long-Term Archiving',
  description:
    'Easily convert your PDF files into PDF/A format for reliable, long-term archiving. Fast, secure, and compliant with ISO standards.',
  openGraph: {
    title: 'PDF to PDF/A Converter - PDFtoolify',
    description: 'Make your PDF documents archive-ready online.',
  },
  alternates: {
    canonical: '/pdf_to_pdfa',
  },
}
function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'PDF to PDF/A Converter',
      url: 'https://www.pdftoolify.com/pdf_to_pdfa',
      description:
        'Convert regular PDF files to PDF/A format online for free with PDFtoolify for long-term document archiving.',
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
            text: 'Yes, PDFtoolify is completely free. You can convert your regular PDF files to PDF/A format without any signup.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I convert a PDF to PDF/A using PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Upload your PDF file and click “Convert to PDF/A.” PDFtoolify will automatically generate a fully compliant PDF/A document for long-term archiving.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will PDF/A conversion change my file quality?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, the conversion preserves your documents fonts, layout, and formatting while ensuring PDF/A compliance for future readability.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to convert my PDF to PDF/A online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. PDFtoolify processes your files securely, and all uploaded documents are automatically deleted after conversion to protect your privacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I convert to PDF/A offline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can download the Windows version of PDFtoolify to convert PDF files to PDF/A even without an internet connection.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does converting to PDF/A cost anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, converting PDFs to PDF/A using PDFtoolify is completely free and unlimited.',
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
      <Pdfa />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              PDF to PDF/A Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about PDF/A archiving standards
            </p>
          </div>
          <Posts toolName={'PDF_TO_PDFA'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
