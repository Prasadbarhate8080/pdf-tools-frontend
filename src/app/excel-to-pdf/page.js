import { Posts } from '../blogs/posts'
import { excelToPdfFaqs, wordToPdfFaqs } from '@/data/faqs'
import HideDefaultContent from '@/components/HideDefaultContent'
import ToolList from '@/components/ToolList'
import ExcelToPDF from './excel_to_pdf'
import ToolBlog from './ToolBlog'

export const metadata = {
  title: 'Excel to PDF Converter Online - Fast and Free',
  description:
    'Convert Excel spreadsheets (.xlsx, .xls, .ods, .csv) to PDF online easily. Preserve tables, formatting, and layout with PDFtoolify.',
  openGraph: {
    title: 'Excel to PDF Converter - PDFtoolify',
    description:
      'Convert Excel spreadsheets to PDF online for free with PDFtoolify.',
  },
  alternates: {
    canonical: '/excel-to-pdf',
  },
}

function page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: excelToPdfFaqs.map((faq) => {
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
      <ExcelToPDF />
      <HideDefaultContent>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Excel to PDF Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about converting Excel documents to PDF
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
