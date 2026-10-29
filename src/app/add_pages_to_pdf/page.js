import AddPagesInPdf from './add_pages_to_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import { addPagesFaqs } from '@/data/faqs'
import HideDefaultContent from '@/components/HideDefaultContent'
import ToolList from '@/components/ToolList'

export const metadata = {
  title: 'Add Pages to PDF Online - Free PDF Page Inserter',
  description:
    'Easily add or insert new pages into your existing PDF document online. Fast and secure PDF page adder with PDFtoolify.',
  openGraph: {
    title: 'Add Pages to PDF Online - PDFtoolify',
    description: 'Insert blank or existing pages into your PDF documents for free.',
  },
  alternates: {
    canonical: '/add_pages_to_pdf',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: addPagesFaqs.map((faq) => {
        return {
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
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
      <AddPagesInPdf />
      <HideDefaultContent>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Add Pages to PDF Blog Articles
          </h2>
          <p className="text-muted-foreground">
            Learn more about inserting and adding pages to PDFs
          </p>
        </div>
        <Posts toolName={'ADD_PAGES_TO_PDF'} />
        <ToolBlog />
        <ToolList />
      </HideDefaultContent>
    </div>
  )
}

export default page
