import { Posts } from '../blogs/posts'
import { pptToPdfFaqs, wordToPdfFaqs } from '@/data/faqs'
import HideDefaultContent from '@/components/HideDefaultContent'
import ToolList from '@/components/ToolList'
import PPTToPDF from './ppt_to_pdf'
import ToolBlog from './ToolBlog'

export const metadata = {
  title: 'PPT to PDF Converter Online - Fast and Free',
  description:
    'Convert PowerPoint presentations (.ppt, .pptx, .odp) to PDF online easily. Preserve slide layouts, text, and images with PDFtoolify.',
  openGraph: {
    title: 'PPT to PDF Converter - PDFtoolify',
    description:
      'Convert PowerPoint presentations to PDF online for free with PDFtoolify.',
  },
  alternates: {
    canonical: '/ppt-to-pdf',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: pptToPdfFaqs.map((faq) => {
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
      <PPTToPDF />
      <HideDefaultContent>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            PPT to PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about converting Word documents to PDF
          </p>
        </div>
        <Posts toolName={'PPT_TO_PDF'} />
        <ToolBlog />
        <ToolList />
      </HideDefaultContent>
    </div>
  )
}

export default page
