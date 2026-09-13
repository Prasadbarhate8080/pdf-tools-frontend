import Unlock from './unlock_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
import { unlockPdfFaqs } from '@/data/faqs'
export const metadata = {
  title: 'Unlock Password-Protected PDFs Online',
  description:
    'Remove passwords and restrictions from your PDF files online. Quick, secure, and free PDF unlocking tool.',
  openGraph: {
    title: 'Unlock PDF Online - PDFtoolify',
    description: 'Unlock secured PDF files in seconds. No registration required.',
  },
  alternates: {
    canonical: '/unlock_pdf',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: unlockPdfFaqs.map((faq) => {
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
      <Unlock />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Unlock PDF Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about unlocking and securing PDFs
            </p>
          </div>
          <Posts toolName={'UNLOCK_PDF'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
