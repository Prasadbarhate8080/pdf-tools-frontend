
import React from 'react';
import DownloadPage from './download_page';

export async function generateMetadata({ params }) {
  const { softwarename } = await params;

  const softwareName = decodeURIComponent(softwarename)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  return {
    title: `Download PDFtoolify for ${softwareName} - Coming Soon | PDFtoolify`,
    description: `The PDFtoolify for ${softwareName} download page on PDFtoolify is coming soon. Stay tuned for updates and download availability.`,
    alternates: {
      canonical: `https://www.pdftoolify.com/download_page/${softwarename}`,
    },
    openGraph: {
      title: `Download ${softwareName} - Coming Soon`,
      description: `Download ${softwareName} from PDFtoolify. This page is coming soon.`,
      url: `https://www.pdftoolify.com/download_page/${softwarename}`,
      siteName: 'PDFtoolify',
      type: 'website',
    },
  };
}

export default function Page() {
  return <DownloadPage />;
}
