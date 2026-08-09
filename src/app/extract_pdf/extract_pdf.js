'use client'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import ProgressBar from '@/components/ProgressBar'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import { Check, Dot } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { toast } from 'react-toastify'
import ToolList from '@/components/ToolList'
import { showContent } from '@/store/hideContentSlice'
import FeatureCardSection from '@/components/FeatureCardSection'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { extractPdfBenefits } from '@/data/benefits'
import { extractPdfFeatures } from '@/data/features'
import { extractPdfFaqs } from '@/data/faqs'
import { extractPdfHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import OperationSidebar from '@/components/OperationSidebar'
import SidebarOperationButton from '@/components/SidebarOperationButton'
import MainOperationButton from '@/components/MainOperationButton'
import { useDispatch } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
import PageContainer from '@/components/PDFPageComponents/PageContainer'
import PageData from '@/components/PDFPageComponents/PageData'
import PageImageContainer from '@/components/PDFPageComponents/PageImageContainer'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

export default function ExtractPdf() {
  const [loading, setLoading] = useState(false)
  const [numPages, setNumPages] = useState(null)
  const [selectedPages, setSelectedPages] = useState([])
  let dispatch = useDispatch()
  let {
    files,
    isDroped,
    isProcessing,
    completionStatus,
    isUploading,
    downloadFileURL,
    serverPreparing,
    progress,
    setisDroped,
    setFiles,
    setdownloadFileURL,
    setCompletionStatus,
  } = useFileUpload()

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
    try {
      setLoading(true)
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
      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 10000)
    } catch (error) {
      toast.error(error.message)
      setisDroped(false)
      dispatch(showContent())
    } finally {
      setLoading(false)
      dispatch(showContent())
    }
  }

  const handleExtract = async () => {
    if (!files || selectedPages.length === 0) return alert('Select at least one page.')
    extractPDF()
    // const formData = new FormData();
    // formData.append("file", files);
    // formData.append("pages", JSON.stringify(selectedPages));
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/extract_pdf",formData);
  }

  return (
    <div className="bg-background">
      {!completionStatus && !isDroped && (
        <ToolHeader
          sparklesText={'Free Online PDF Page Extractor'}
          headings={['Extract', 'PDF Pages', 'Instantly']}
          text={'Extract the specific pages from the pdf easily, and make your work more simple'}
        />
      )}

      {!isDroped && (
        <div>
          <FileInput
            setFiles={setFiles}
            setisDroped={setisDroped}
            multiple={false}
            accept={{ 'application/pdf': [] }}
          />
          <BenefitsSection
            heading={'Extract PDF pages online for free'}
            benefits={extractPdfBenefits}
          />
          <FeatureCardSection
            tool={'Extract PDF Pages'}
            text="Powerful tools to help you extract exactly the PDF pages you need"
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
          <ToolList />
        </div>
      )}

      {files && isDroped && !isUploading && !completionStatus && (
        <OperationBox>
          <OperationMain>
            <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
              <div className="flex flex-wrap items-center gap-4 justify-center py-3">
                {Array.from(new Array(numPages), (el, index) => {
                  const pageNum = index + 1
                  const isSelected = selectedPages.includes(pageNum)
                  return (
                      <PageContainer isSelected={isSelected} onClick={() => togglePageSelection(pageNum)}>
                        <PageImageContainer>
                          <Page pageNumber={pageNum} width={160} />
                        </PageImageContainer>
                        <PageData data={pageNum}/>
                      </PageContainer>
                  )
                })}
              </div>
            </Document>
            <MainOperationButton
              buttonText={`Extract ${selectedPages.length > 0 ? selectedPages.length : ''} Selected Pages`}
              onClick={handleExtract}
              disabled={files.length < 1}
            />
          </OperationMain>
          <OperationSidebar>
            <div className="p-2 bg-blue-50 border-1">
              <h1 className="flex text-gray-600 text-sm items-center">
                {' '}
                <Dot /> Select The Pages which you want to extract.
              </h1>
            </div>
            <div className="mt-3 p-3">
              <SidebarOperationButton
                buttonText={`Extract ${selectedPages.length > 0 ? selectedPages.length : ''} Selected Pages`}
                onClick={handleExtract}
                disabled={files.length < 1}
              />
            </div>
          </OperationSidebar>
        </OperationBox>
      )}

      {/* progress bar and proessing */}
      {progress > 0 && progress < 100 && <ProgressBar />}
      {serverPreparing && isDroped && (
        <div className="flex flex-col items-center mt-8">
          <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
          <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {progress === 100 && isProcessing && <Processing />}

      {/* after task complete button will show */}
      {downloadFileURL && completionStatus && (
        <div className="pt-10">
          <DownloadComponent
            headingText={'Download Extracted PDF'}
            buttonText={'Download Extracted PDF'}
            downloadFileURL={downloadFileURL}
            setCompletionStatus={setCompletionStatus}
            setisDroped={setisDroped}
            setFiles={setFiles}
            setdownloadFileURL={setdownloadFileURL}
          />
        </div>
      )}

      <ToastContainer />
    </div>
  )
}
