import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import PageContainer from './PDFPageComponents/PageContainer'
import PageImageContainer from './PDFPageComponents/PageImageContainer'
import PageData from './PDFPageComponents/PageData'
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}
function PDFPageConponent({ file }) {
  return (
    <Document file={file}>
      <PageContainer>
        <PageImageContainer>
          <Page pageNumber={1} width={160} />
        </PageImageContainer>
        <PageData data={file.name}></PageData>
      </PageContainer>
    </Document>
  )
}

export default PDFPageConponent
