import PageNO from './add_page_no'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'

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
      '@type': 'WebApplication',
      name: 'Add Page Numbers to PDF',
      url: 'https://www.pdftoolify.com/add_page_no',
      description:
        'Add page numbers to PDF files online for free. Choose the position, font, size, and style.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is PDFtoolify really free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is completely free. You can add page numbers to your PDF files without any signup or hidden charges.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I add page numbers to my PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Upload your PDF, choose the page number position, then click “Add Page Numbers.” Your updated PDF will be ready instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will adding page numbers change my PDF quality?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, adding page numbers does not affect your PDF content or quality. Only clean and accurate numbering is added.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to upload my PDFs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, your files are processed securely. PDFtoolify automatically deletes your PDFs from the server after processing to ensure privacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I customize the page numbers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, you can choose the page number position and alignment to match your document’s requirements.',
          },
        },
      ],
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
              Add Page Numbers Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about organizing and numbering PDF pages
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
