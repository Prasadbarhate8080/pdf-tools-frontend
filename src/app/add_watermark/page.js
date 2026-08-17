import AddWaterMarkPage from './add_watermark'
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
import HideContent from '@/components/HideContent'
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is PDFtoolify Really Free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PDFtoolify is completely free. You can add text watermarks to your PDF files without signing up.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I add a watermark to my PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Upload your PDF, customize the watermark text and placement, and click “Add Watermark.” Your updated PDF will be ready instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will adding a watermark affect PDF quality?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, the PDF quality remains the same. Only the watermark is added — your content stays untouched.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to upload my PDFs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Files are processed securely and deleted automatically after completion.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I customize the watermark?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. You can customize text, opacity, rotation, and position for your watermark.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does adding a watermark cost anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, adding a watermark with PDFtoolify is 100% free and unlimited.',
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
