import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { GoogleAnalytics } from '@next/third-parties/google'

import { ToastContainer } from "react-toastify";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(`https://www.pdftoolify.com`),
  title: {
    default: "PDFtoolify | Free Online PDF Tools - Merge, Split, Compress & More",
    template: "%s | PDFtoolify"
  },
  description: "PDFtoolify offers a comprehensive suite of free online PDF tools to merge, split, compress, convert, and manage your PDF documents securely and easily.",
  keywords: ["PDF tools", "merge PDF", "split PDF", "compress PDF", "convert PDF to JPG", "PDF to Word", "online PDF editor"],
  authors: [{ name: "PDFtoolify Team" }],
  creator: "PDFtoolify",
  publisher: "PDFtoolify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "PDFtoolify | Free Online PDF Tools",
    description: "Manage your PDF files with ease. Merge, split, compress, and convert PDFs online for free.",
    url: "https://www.pdftoolify.com",
    siteName: "PDFtoolify",
    images: [
      {
        url: "/pdftoolify_logo.png",
        width: 800,
        height: 600,
        alt: "PDFtoolify Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFtoolify | Free Online PDF Tools",
    description: "The ultimate suite for all your PDF needs. Fast, secure, and free online tools.",
    images: ["/pdftoolify_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDFtoolify",
    "url": "https://www.pdftoolify.com",
    "description": "Free online PDF tools including merge, split, compress, and more.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Merge PDF",
      "Split PDF",
      "Compress PDF",
      "Convert PDF to JPG",
      "Word to PDF",
      "Unlock PDF",
      "Remove PDF pages"
    ]
  };

  return (
    
      <html lang="en" className="">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased  min-h-screen flex flex-col justify-between`}
        >
          <StoreProvider> 
            <Header />
            {children}
            <Footer />  
          </StoreProvider>
          <ToastContainer />
        </body>
        <GoogleAnalytics gaId="G-3X5G3GQHTZ" />
      </html>
  );
}
