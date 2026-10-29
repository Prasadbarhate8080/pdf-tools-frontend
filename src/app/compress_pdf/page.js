import Compress from './compress_pdf'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideDefaultContent'
import { compressPdfFaqs } from '@/data/faqs'
import HideDefaultContent from '@/components/HideDefaultContent'
import ToolList from '@/components/ToolList'

export const metadata = {
  title: 'Compress PDF Files Online - Reduce PDF Size Fast',
  description:
    'Reduce the file size of your PDFs online while maintaining quality. Fast, secure, and easy-to-use PDF compressor tool.',
  openGraph: {
    title: 'Compress PDF Files Online - PDFtoolify',
    description: 'Shrink PDF files without losing quality. No signup required.',
  },
  alternates: {
    canonical: '/compress_pdf',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: compressPdfFaqs.map((faq) => {
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
      <Compress />
      <HideDefaultContent>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Compress PDF Blog Articles
          </h2>
          <p className="text-muted-foreground">
            Learn more about compressing PDFs efficiently
          </p>
        </div>
        <Posts toolName={'COMPRESS_PDF'} />
        <ToolBlog />
        <ToolList />
      </HideDefaultContent>
    </div>
  )
}

export default page
