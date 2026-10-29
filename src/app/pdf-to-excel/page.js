import { Posts } from '../blogs/posts'
import { PDFToExcelFaqs, wordToPdfFaqs } from '@/data/faqs'
import HideDefaultContent from '@/components/HideDefaultContent'
import ToolList from '@/components/ToolList'
import PDFToExcel from './pdf_to_excel'
import ToolBlog from './ToolBlog'

export const metadata = {
  title: 'PDF to Excel Converter Online - Fast and Free',
  description:
    'Convert PDF files to Excel spreadsheets online easily. Extract tables and data into editable Excel files with PDFtoolify.',
  openGraph: {
    title: 'PDF to Excel Converter - PDFtoolify',
    description:
      'Convert PDF documents to Excel spreadsheets online for free with PDFtoolify.',
  },
  alternates: {
    canonical: '/pdf-to-excel',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: PDFToExcelFaqs.map((faq) => {
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
      <PDFToExcel />
      <HideDefaultContent>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            PDF to Word Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about converting PDF files to Word
          </p>
        </div>
        <Posts toolName={'PDF_TO_WORD'} />
        <ToolBlog />
        <ToolList />
      </HideDefaultContent>
    </div>
  )
}

export default page
