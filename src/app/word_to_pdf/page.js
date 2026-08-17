import React from 'react'
import WordToPdf from './word_to_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
export const metadata = {
  title: 'Word to PDF Converter Online - Fast and Free',
  description:
    'Convert Word documents (.docx, .doc) to PDF online easily. Maintain formatting with this high-quality Word-to-PDF tool.',
  openGraph: {
    title: 'Word to PDF Converter - PDFtoolify',
    description: 'High-quality Word to PDF conversion online for free.',
  },
  alternates: {
    canonical: '/word_to_pdf',
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
          name: 'Is PDFtoolify Really Free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is completely free. You can convert Word (DOC/DOCX) files to PDF without signing up.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I convert a Word file to PDF using PDFtoolify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Just upload your Word document and click “Convert.” PDFtoolify will instantly turn it into a high-quality PDF.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will the formatting change after converting to PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Your text, fonts, images, spacing, and layout remain exactly the same after conversion.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to convert Word files online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. PDFtoolify uses secure file processing, and all uploaded files are automatically deleted after conversion to protect your privacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I convert Word to PDF offline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can download the Windows version of PDFtoolify to convert Word files to PDF offline.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does converting Word to PDF cost anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Word to PDF conversion with PDFtoolify is completely free and unlimited.',
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
      <WordToPdf />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Word to PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about converting Word documents to PDF
            </p>
          </div>
          <Posts toolName={'WORD_TO_PDF'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
