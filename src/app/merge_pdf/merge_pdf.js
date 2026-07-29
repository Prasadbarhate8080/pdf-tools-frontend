'use client'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import ProgressBar from '@/components/ProgressBar'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import { PDFDocument } from 'pdf-lib'
import PDFPageComponent from '@/components/PDFPageComponent'
import ToolList from '@/components/ToolList'
import ToolHeader from '@/components/ToolHeader'
import { mergePDFBenefits } from '@/data/benefits'
import BenefitsSection from '@/components/BenefitsSection'
import FeatureCardSection from '@/components/FeatureCardSection'
import { mergePDFFeatures } from '@/data/features'
import HowToSection from '@/components/HowToSection'
import { mergePDFHowTosteps } from '@/data/howTo'
import FaqSection from '@/components/FaqSection'
import { mergePDFFaqs } from '@/data/faqs'
import ServerPreparingLoader from '@/components/ServerPreparingLoader'
import DownloadComponent from '@/components/DownloadComponent'
import { Button } from '@/components/ui/button'
import OperationBox from '@/components/OperationBox'
import OperationSidebar from '@/components/OperationSidebar'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'
import OperationMain from '@/components/OperationMain'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}
function Merge() {
  const [loading, setLoading] = useState(false)
  const addFiles = (e) => {
    const newFiles = Array.from(e.target.files)
    const pdfFiles = newFiles.filter((file) => file.type === 'application/pdf')
    setFiles((prev) => [...prev, ...pdfFiles])
  }
  let {
    files,
    isDroped,
    isProcessing,
    completionStatus,
    isUploading,
    downloadFileURL,
    serverPreparing,
    progress,
    setCompletionStatus,
    setisDroped,
    setFiles,
    setdownloadFileURL,
  } = useFileUpload()

  let mergePdf = async () => {
    try {
      setLoading(true)
      const mergedPdf = await PDFDocument.create()
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach((page) => {
          mergedPdf.addPage(page)
        })
      }
      let mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 10000)
    } catch (error) {
      toast.error(error)
      setisDroped(false)
      setFiles([])
    } finally {
      setLoading(false)
      setFiles([])
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    mergePdf()
  }
  return (
    <div className="bg-background">
      {!completionStatus && !isDroped && (
        <ToolHeader
          sparklesText={'Free Online PDF Merger'}
          headings={['Merge', 'PDF Files', 'Instantly']}
        />
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {!isDroped && !completionStatus && (
          <div>
            <FileInput
              files={files}
              setFiles={setFiles}
              setisDroped={setisDroped}
              multiple={true}
              accept={{ 'application/pdf': [] }}
            />
            <BenefitsSection
              heading={' Merge PDF files online for free'}
              benefits={mergePDFBenefits}
            />
            <FeatureCardSection features={mergePDFFeatures} tool={'Merge PDF'} text="" />
            <HowToSection
              heading={'How to merge PDFs online for free?'}
              text={'Combine your PDF documents in three simple steps'}
              steps={mergePDFHowTosteps}
            />
            <FaqSection
              heading={'Merge PDF FAQs'}
              text={'Common questions about our PDF merger tool'}
              faqs={mergePDFFaqs}
            />
            <ToolList />
          </div>
        )}
        {isDroped && !completionStatus && !isProcessing && !isUploading && (
          <OperationBox>
              <OperationMain>
                <ul className="flex flex-wrap justify-center p-5 gap-6">
                  {files.map((file, index) => (
                    <PDFPageComponent file={file} key={index} />
                  ))}
                  <AddMoreFilesComponent addFiles={addFiles} />
                </ul>
              </OperationMain>
              <OperationSidebar>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-3">
                  {/* Merge Button */}
                  <Button size="xl" disabled={files.length < 2}>
                    {' '}
                    Merge PDF Files{' '}
                  </Button>
                  {/* Error Text */}
                  {files.length < 2 && (
                    <p className="text-red-500 text-sm text-center mt-2">
                      Please select at least two PDF files.
                    </p>
                  )}
                </div>
              </OperationSidebar>
          </OperationBox>
        )}
        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
        {serverPreparing && <ServerPreparingLoader />}
        {progress === 100 && isProcessing && <Processing />}
      </form>
      {downloadFileURL && (
        <DownloadComponent
          headingText={'Download Merged PDF'}
          buttonText={'Download Merged PDF'}
          downloadFileURL={downloadFileURL}
        />
      )}
      <ToastContainer />
    </div>
  )
}
export default Merge
