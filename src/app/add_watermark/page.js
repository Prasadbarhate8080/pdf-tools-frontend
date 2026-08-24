import AddWaterMarkPage from './add_watermark'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
import { addWatermarkFaqs } from '@/data/faqs'
export const metadata = {
  title: 'Add Watermark to PDF Online - Protect Your Documents',
  description:
    'Add custom text or image watermarks to your PDF files online. Secure your documents and prevent unauthorized use.',
  openGraph: {
    title: 'Add Watermark to PDF - PDFtoolify',
    description: 'Protect your PDFs with custom watermarks in seconds.',
  },
  alternates: {
    canonical: '/add_watermark',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: addWatermarkFaqs.map((faq) => {
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
      <AddWaterMarkPage />
      <HideContent>
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Add Watermark Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about watermarking and protecting PDFs
            </p>
          </div>
          <Posts toolName={'ADD_WATERMARK'} />
          <ToolBlog />
        </div>
      </HideContent>
    </div>
  )
}

export default page
