import RemovePDFPages from './remove_pdf_pages'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
import { removePdfPagesFaqs } from '@/data/faqs'

export const metadata = {
  title: 'Remove Pages from PDF Online - Delete Unwanted PDF Pages',
  description:
    'Easily delete specific pages from your PDF file online. Fast, secure, and free tool to remove PDF pages.',
  openGraph: {
    title: 'Remove PDF Pages - PDFtoolify',
    description: 'Remove unwanted pages from your PDF documents in seconds.',
  },
  alternates: {
    canonical: '/remove_pdf_pages',
  },
}
function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: removePdfPagesFaqs.map((faq) => {
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
      <RemovePDFPages />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Remove PDF Pages Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about managing and removing PDF pages
            </p>
          </div>
          <Posts toolName={'REMOVE_PDF_PAGES'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
