'use client'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import ProgressBar from '@/components/ProgressBar'
import { useFileUpload } from '@/hooks/useFileUpload'
import FileInput from '@/components/FileInput'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Dot, Download, Sparkles, SplitSquareHorizontal, Upload } from 'lucide-react'
import FeatureCardSection from '@/components/FeatureCardSection'
import PDFPageComponent from '@/components/PDFPageComponent'
import JSZip from 'jszip'
import ToolList from '@/components/ToolList'
import FadeIn from '@/components/FadeIn'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { pdfToJpgBenefits } from '@/data/benefits'
import { pdfToJpgFeatures } from '@/data/features'
import { pdfToJpgFaqs } from '@/data/faqs'
import { pdfToJpgHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import OperationSidebar from '@/components/OperationSidebar'
import { Button } from '@/components/ui/button'
import MainOperationButton from '@/components/MainOperationButton'
import SidebarOperationButton from '@/components/SidebarOperationButton'
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function PDFToJPG() {
  const [numPages, setnumPages] = useState(0)
  const [loading, setLoading] = useState(false)
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

  function onDocumentLoadSuccess({ numPages }) {
    setnumPages(numPages)
  }

  async function convertToJpg() {
    try {
      if (!numPages) return
      setLoading(true)
      const zip = new JSZip()

      const canvases = document.querySelectorAll('.react-pdf__Page canvas')
      canvases.forEach((canvas, i) => {
        const imageData = canvas.toDataURL('image/jpeg', 1.0)
        const base64Data = imageData.split(',')[1]
        zip.file(`page_${i + 1}.jpg`, base64Data, { base64: true })
      })
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      let url = URL.createObjectURL(zipBlob)
      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => URL.revokeObjectURL(url), 10000)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    convertToJpg()
    // const formData = new FormData();
    // formData.append("f1", files);

    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/pdf_to_jpg", formData);
  }

  return (
    <div className="min-h-screen bg-background">
      {!completionStatus && !isDroped && (
        <ToolHeader
          sparklesText={' Free Online PDF to JPG Converter'}
          headings={['Convert', 'PDF to JPG', 'Instantly']}
          text={' Turn every PDF page into high-quality JPG images — fast, secure, and free'}
        />
      )}
      {isDroped && files && (
        <Document className={''} file={files} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div key={index} className="hidden">
              <Page key={index} pageNumber={index + 1}></Page>
            </div>
          ))}
        </Document>
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e)
        }}
        encType="multipart/form-data"
      >
        {!isDroped && !completionStatus && (
          <div>
            <FileInput
              setFiles={setFiles}
              setisDroped={setisDroped}
              multiple={false}
              accept={{ 'application/pdf': [] }}
            />
            <BenefitsSection
              heading={'Convert PDF pages to JPG online'}
              benefits={pdfToJpgBenefits}
            />
            <FeatureCardSection
              tool={'PDF to JPG'}
              text="Everything you need to convert PDFs into images"
              features={pdfToJpgFeatures}
            />
            <HowToSection
              heading={'How to convert PDF to JPG?'}
              text={'Convert your PDF in three quick steps'}
              steps={pdfToJpgHowToSteps}
            />
            <FaqSection
              heading={'PDF to JPG FAQs'}
              text={'Common questions about PDF to JPG conversion'}
              faqs={pdfToJpgFaqs}
            />
            <ToolList />
          </div>
        )}

        {isDroped && !isUploading && !isProcessing && !completionStatus && (
          <OperationBox>
            <OperationMain>
              <ul className="mt-6 flex flex-wrap justify-center gap-6">
                <PDFPageComponent file={files} />
              </ul>
              <MainOperationButton buttonText={"Convert To JPG"} disabled={files.length < 1}/>
            </OperationMain>
            <OperationSidebar>
              <div className="p-2 bg-blue-50 border-1">
                <h1 className="flex text-gray-600 text-sm items-center">
                  {' '}
                  <Dot /> Click on convert to jpg button to convert pdf into jpg images.
                </h1>
              </div>
              <div className="mt-3 p-3">
                <SidebarOperationButton buttonText={"Convert To JPG"} disabled={files.length < 1}/>
              </div>
            </OperationSidebar>
          </OperationBox>
        )}

        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
        {serverPreparing && isDroped && (
          <div className="flex flex-col items-center mt-8">
            <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-24">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">Download JPG Images</h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download="converted_images.zip"
              className="bg-blue-500 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Zip File
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

export default PDFToJPG
