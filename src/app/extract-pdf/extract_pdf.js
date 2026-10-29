'use client'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import { Trash2 } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import FeatureCardSection from '@/components/FeatureCardSection'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { extractPdfBenefits } from '@/data/benefits'
import { extractPdfFeatures } from '@/data/features'
import { extractPdfFaqs } from '@/data/faqs'
import { extractPdfHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import { useDispatch, useSelector } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
import PageContainer from '@/components/PDFPageComponents/PageContainer'
import PageData from '@/components/PDFPageComponents/PageData'
import PageImageContainer from '@/components/PDFPageComponents/PageImageContainer'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import HideMainContent from '@/components/HideMainContent'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import OperationButton from '@/components/OperationButton'
import BottomBar from '@/components/BottomBar'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

export default function ExtractPdf() {
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  const [numPages, setNumPages] = useState(null)
  const [selectedPages, setSelectedPages] = useState([])
  let dispatch = useDispatch()
  let { files, setFiles, toolFunctionWrapper } = useFileUpload()

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const togglePageSelection = (pageNum) => {
    setSelectedPages((prevSelected) =>
      prevSelected.includes(pageNum)
        ? prevSelected.filter((n) => n !== pageNum)
        : [...prevSelected, pageNum]
    )
  }

  async function extractPDF() {
    if (!files) throw new Error('no file selected')
    let arrayBuffer = await files.arrayBuffer()
    let pdf = await PDFDocument.load(arrayBuffer)
    let totalPages = pdf.getPageCount()
    let extractedPDF = await PDFDocument.create()
    if (selectedPages.length == 0) throw new Error('please select at least one page')

    let isInvalidPages = selectedPages.some((page) => page < 0 || page > totalPages)
    if (isInvalidPages) throw new Error('invalid pages')

    let zeroBasedSelectedPages = selectedPages.map((page) => page - 1)
    let pages = await extractedPDF.copyPages(pdf, zeroBasedSelectedPages)
    pages.forEach((page) => extractedPDF.addPage(page))
    const extractedPdfBytes = await extractedPDF.save()
    const blob = new Blob([extractedPdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    dispatch(setDownloadFileUrl(url))
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 10000)
  }

  const handleExtract = async () => {
    if (!files || selectedPages.length === 0) return alert('Select at least one page.')
    toolFunctionWrapper(extractPDF)
  }

  return (
    <div className="bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PDF Page Extractor'}
          headings={['Extract', 'PDF Pages', 'Instantly']}
          text={'Extract the specific pages from the pdf easily, and make your work more simple.'}
        />

        <FileInput setFiles={setFiles} multiple={false} accept={{ 'application/pdf': [] }} />
        <BenefitsSection
          heading={'What can PDF pages extracting help you.'}
          benefits={extractPdfBenefits}
        />
        <FeatureCardSection
          tool={'Extract PDF Pages'}
          text="Powerful tools to help you extract exactly the PDF pages you need. Using this tool you can make pdf form extracting the pages of existing PDF."
          features={extractPdfFeatures}
        />
        <HowToSection
          heading={'How to extract PDF pages online?'}
          text={'Extract the pages you need from your PDF in just a few simple steps.'}
          steps={extractPdfHowToSteps}
        />
        <FaqSection
          heading={'Extract PDF Pages FAQs'}
          text={'Common questions about extracting pages from your PDFs'}
          faqs={extractPdfFaqs}
        />
      </HideMainContent>

      <OperationBox>
        <OperationMain>
          {files && <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
            <div className="flex flex-wrap items-center gap-4 justify-center py-3">
              {Array.from(new Array(numPages), (el, index) => {
                const pageNum = index + 1
                const isSelected = selectedPages.includes(pageNum)
                return (
                  <PageContainer
                    key={pageNum}
                    isSelected={isSelected}
                    onClick={() => togglePageSelection(pageNum)}
                    pages
                  >
                    <PageImageContainer>
                      <Page pageNumber={pageNum} width={160} />
                    </PageImageContainer>
                    <PageData data={pageNum} />
                  </PageContainer>
                )
              })}
            </div>
          </Document>}
          {!files && <div className='flex items-center justify-center'><AddMoreFilesComponent setFiles={setFiles}/></div>  }
        </OperationMain>
        <BottomBar>
          <div className="flex flex-1 justify-end px-3 items-center ">
            <div className="border h-12 w-12 flex items-center justify-center rounded-lg hover:bg-muted"
            onClick={() => {setFiles(null)}}
            >
                <Trash2 />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <OperationButton
              buttonText={`Extract ${selectedPages.length > 0 ? selectedPages.length : ''} Selected Pages`}
              onClick={handleExtract}
              disabled={!files}
            />
          </div>
          <div className="flex-1"></div>
        </BottomBar>
      </OperationBox>
      <LoadingStateComponent />

      <DownloadComponent
        headingText={'Download Extracted PDF'}
        buttonText={'Download Extracted PDF'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />

      <ToastContainer />
    </div>
  )
}
