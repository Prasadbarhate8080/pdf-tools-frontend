'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import ProgressBar from '@/components/ProgressBar'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import { showContent } from '@/store/hideContentSlice'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Check, Dot, Download, Scissors, Sparkles, Upload } from 'lucide-react'
import FeatureCardSection from '@/components/FeatureCardSection'
import { PDFDocument } from 'pdf-lib'
import ToolList from '@/components/ToolList'
import FadeIn from '@/components/FadeIn'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { removePdfPagesBenefits } from '@/data/benefits'
import { removePdfPagesFeatures } from '@/data/features'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import { removePdfPagesFaqs } from '@/data/faqs'
import { removePdfPagesHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import OperationSidebar from '@/components/OperationSidebar'
import { Button } from '@/components/ui/button'
import SidebarOperationButton from '@/components/SidebarOperationButton'
import MainOperationButton from '@/components/MainOperationButton'
import { useDispatch } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

export default function RemovePDFPages() {
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
    callApi,
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

  async function removePages() {
    try {
      if (!files) throw new Error('no file selected')
      if (selectedPages.length == 0) throw new Error('please select at least one page')

      const arrayBuffer = await files.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      const totalPages = pdfDoc.getPageCount()
      // Step 3: Prepare remove set
      const removeSet = new Set(
        selectedPages
          .filter((p) => typeof p === 'number' && p > 0 && p <= totalPages)
          .map((p) => p - 1) // Convert to 0-based
      )

      if (removeSet.size == 0) throw new Error('remove set size is zero')

      const keepPages = []
      for (let i = 0; i < totalPages; i++) {
        if (!removeSet.has(i)) keepPages.push(i)
      }

      if (keepPages.length == 0) throw new Error('all pages selected to remove')
      const newPdfDoc = await PDFDocument.create()
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, keepPages)
      copiedPages.forEach((p) => newPdfDoc.addPage(p))
      const newPdfBytes = await newPdfDoc.save()
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' })
      let url = URL.createObjectURL(blob)
      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 10000)
    } catch (error) {
      dispatch(showContent())
      // toast.error(error.message)
      console.log(error)
    }finally{
      dispatch(showContent())
    }
  }

  const handleRemove = async () => {
    if (!files || selectedPages.length === 0) return alert('Select at least one page.')
    removePages()
    // const formData = new FormData();
    // formData.append("pdf_file", files);
    // formData.append("pages", JSON.stringify(selectedPages));
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/remove_pdf_pages",formData);
  }

  return (
    <div className="min-h-screen bg-background">
      {!completionStatus && !isDroped && (
        <ToolHeader
          sparklesText={'Free Online PDF Page Remover'}
          headings={['Remove', 'PDF Pages', 'Easily']}
          text={'Delete unwanted pages quickly while keeping your PDF quality intact'}
        />
      )}
      {!isDroped && !completionStatus && (
        <div>
          <FileInput
            setFiles={setFiles}
            setisDroped={setisDroped}
            multiple={false}
            accept={{ 'application/pdf': [] }}
          />
          <BenefitsSection
            heading={'Remove PDF pages online for free'}
            benefits={removePdfPagesBenefits}
          />
          <FeatureCardSection
            tool={'Remove PDF Pages'}
            text="Everything you need to remove PDF pages with confidence"
            features={removePdfPagesFeatures}
          />
          <HowToSection
            heading={'How to remove PDF pages?'}
            text={'Delete pages in three simple steps'}
            steps={removePdfPagesHowToSteps}
          />
          <FaqSection
            heading={'Remove PDF Pages FAQs'}
            text={'Common questions about removing PDF pages'}
            faqs={removePdfPagesFaqs}
          />
          <ToolList />
        </div>
      )}

      {files && isDroped && !isUploading && !completionStatus && (
        <OperationBox>
          <OperationMain>
            <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
              <div className="flex flex-wrap max-w-7xl justify-center mx-auto gap-8 mt-6">
                {Array.from(new Array(numPages), (el, index) => {
                  const pageNum = index + 1
                  const isSelected = selectedPages.includes(pageNum)
                  return (
                    <div
                      key={pageNum}
                      className={`w-fit p-1 bg-white rounded-md border-gray-500 border relative  cursor-pointer transition-transform duration-200 hover:bg-gray-100`}
                      onClick={() => togglePageSelection(pageNum)}
                    >
                      <Page pageNumber={pageNum} width={200} />
                      <p className="text-center p-1">Page {pageNum}</p>
                      <div
                        className={`absolute top-0.5 right-0.5 h-6 w-6 border-1 border-gray-500 rounded-sm
                    ${isSelected ? 'bg-blue-600' : 'bg-white'}`}
                      >
                        <Check color="white" className={`${isSelected ? 'block' : 'hidden'}`} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Document>
              <MainOperationButton buttonText={`Remove ${selectedPages.length > 0 ? selectedPages.length : ""} Selected Pages`} onClick={handleRemove} disabled={files.length < 1} />

          </OperationMain>
          <OperationSidebar>
            <div className="p-2 bg-blue-50 border-1">
              <h1 className="flex text-gray-600 text-sm items-center">
                {' '}
                <Dot /> Select the pages which you want to remove.
              </h1>
            </div>
            <div  className="mt-3 p-3">
              <SidebarOperationButton buttonText={`Remove ${selectedPages.length > 0 ? selectedPages.length : ""} Selected Pages`} onClick={handleRemove} disabled={files.length < 1} />
            </div>
          </OperationSidebar>
        </OperationBox>
      )}

      {/* progress bar and proessing */}
      {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
      {serverPreparing && (
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
            headingText={'Download Pages Removed PDF'}
            buttonText={'Download created PDF'}
            downloadFileURL={downloadFileURL}
            setCompletionStatus={setCompletionStatus}
            setisDroped={setisDroped}
            setFiles={setFiles}
            setdownloadFileURL={setdownloadFileURL}
          />
        </div>
      )}
    </div>
  )
}
