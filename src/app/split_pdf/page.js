import Split from './split_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideDefaultContent'
import { splitPdfFaqs } from '@/data/faqs'
import HideDefaultContent from '@/components/HideDefaultContent'
import ToolList from '@/components/ToolList'
export const metadata = {
  title: 'Split PDF Files Online - Divide PDFs Fast and Securely',
  description:
    'Split your large PDF files into smaller, manageable parts online. Free, fast, and secure PDF splitter by PDFtoolify.',
  openGraph: {
    title: 'Split PDF Files Online - PDFtoolify',
    description: 'Extract pages from your PDF or divide it into multiple files. No quality loss.',
  },
  alternates: {
    canonical: '/split_pdf',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: splitPdfFaqs.map((faq) => {
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
      <Split />
      <HideDefaultContent>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Split PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about splitting PDFs efficiently
          </p>
        </div>
        <Posts toolName={'SPLIT_PDF'} />
        <ToolBlog />
        <ToolList />
      </HideDefaultContent>
    </div>
  )
}

export default page
