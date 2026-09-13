import CreatePdf from './create_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
import { createPdfFaqs } from '@/data/faqs'
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
      '@type': 'FAQPage',
      mainEntity: createPdfFaqs.map((faq) => {
      return {
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          'text': faq.answer,
        },
      }
    }),
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
