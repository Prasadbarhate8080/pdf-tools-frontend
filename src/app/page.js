import React from 'react'
import { HeroSection } from '@/components/HeroSection'
import { HomePageToolsSection } from '@/components/HomePageToolsSection'
import { PDFManageSection } from '@/components/PDFManageSection'
import { MostUsefullTools } from '@/components/MostUsefullTools'
import { PDFFeatures } from '@/components/PDFFeatures'
import { DownloadSoftware } from '@/components/DownloadSoftware'

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
    '@type': 'WebApplication',
    name: 'PDFtoolify',
    url: 'https://www.pdftoolify.com',
    description: 'Free online PDF tools including merge, split, compress, and more.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Merge PDF',
      'Split PDF',
      'Compress PDF',
      'Convert PDF to JPG',
      'Word to PDF',
      'Unlock PDF',
      'Remove PDF pages',
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
      </main>
    </>
  )
}

export default Home
