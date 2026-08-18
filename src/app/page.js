import React from 'react'
import { HeroSection } from '@/components/HeroSection'
import { HomePageToolsSection } from '@/components/HomePageToolsSection'
import { PDFManageSection } from '@/components/PDFManageSection'
import { MostUsefullTools } from '@/components/MostUsefullTools'
import { PDFFeatures } from '@/components/PDFFeatures'
import { DownloadSoftware } from '@/components/DownloadSoftware'
import FaqSection from '@/components/FaqSection'
import { homeFaqs } from '@/data/faqs'

export const metadata = {
  title: 'Free Online PDF Tools - PDFtoolify',
  description:
    'Merge, split, compress, and convert PDF files online for free. PDFtoolify offers a complete set of PDF tools for all your document needs.',
  openGraph: {
    title: 'PDFtoolify | Free Online PDF Tools',
    description: 'Your all-in-one PDF solution. Fast, secure, and free online PDF tools.',
  },
  alternates: {
    canonical: '/',
  },
}

function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is PDFtoolify free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, PDFtoolify is completely free. All our PDF tools, including merge, split, compress, and convert, can be used without any signup or hidden charges.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account to use PDFtoolify?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, you do not need to sign up or log in. Just visit the tool you need, upload your file, and get your result instantly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe to upload my PDF files to PDFtoolify?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, your files are processed securely over an encrypted connection. PDFtoolify automatically deletes uploaded files from the server after processing, so your documents are never stored long-term.',
        },
      },
      {
        '@type': 'Question',
        name: 'What PDF tools does PDFtoolify offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PDFtoolify offers a full suite of tools including merge, split, compress, extract, JPG to PDF, PDF to JPG, Word to PDF, protect, unlock, add watermark, add page numbers, add pages, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use PDFtoolify on my phone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, PDFtoolify works directly in your mobile browser on any device, so you can merge, convert, or edit PDFs from your phone or tablet without installing an app.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will using PDFtoolify reduce the quality of my documents?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, our tools are designed to preserve the original quality of your documents. Only the specific change you request, such as merging or compressing, is applied.',
        },
      },
    ],
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="">
        <div className="">
          <HeroSection />
          <div className={''}>
            <div className="">
              <HomePageToolsSection />
            </div>
          </div>
        </div>
        <PDFManageSection />
        <MostUsefullTools />
        <PDFFeatures />
        <DownloadSoftware />
        <div className='max-w-6xl mx-auto'>
        <h1 className='text-center text-5xl'>Frequently Asked Questions/FAQs</h1>
        <FaqSection faqs={homeFaqs} />
        </div>
      </main>
    </>
  )
}

export default Home
