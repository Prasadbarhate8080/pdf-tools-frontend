import PageNO from './add_page_no'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
import { addPageNoFaq } from '@/data/faqs'

export const metadata = {
  title: 'Add Page Numbers to PDF Online - Free Page Numbering',
  description:
    'Easily add page numbers to your PDF documents online. Choose position, font, and style with PDFtoolify.',
  openGraph: {
    title: 'Add Page Numbers to PDF Online - PDFtoolify',
    description: 'Number your PDF pages easily for better organization.',
  },
  url: 'https://www.pdftoolify.com/add_page_no',
  siteName: 'PDFtoolify',
  type: 'website',
  alternates: {
    canonical: '/add_page_no',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: addPageNoFaq.map((faq) => {
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
      <PageNO />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Add Page Numbers to PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about PDF page Numbering and Managing
            </p>
          </div>
          <Posts toolName={'ADD_PAGE_NO'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
