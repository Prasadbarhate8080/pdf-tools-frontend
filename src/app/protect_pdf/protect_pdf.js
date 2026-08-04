'use client'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import ProgressBar from '@/components/ProgressBar'
import { useFileUpload } from '@/hooks/useFileUpload'
import FileInput from '@/components/FileInput'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import { Dot, Sparkles } from 'lucide-react'
import FeatureCardSection from '@/components/FeatureCardSection'
import Image from 'next/image'
import PDFPageComponent from '@/components/PDFPageComponent'
import ToolList from '@/components/ToolList'
import FadeIn from '@/components/FadeIn'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { protectPdfBenefits } from '@/data/benefits'
import { protectPdfFeatures } from '@/data/features'
import { protectPdfFaqs } from '@/data/faqs'
import { protectPdfHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationSidebar from '@/components/OperationSidebar'
import { Button } from '@/components/ui/button'
import OperationMain from '@/components/OperationMain'
import SidebarOperationButton from '@/components/SidebarOperationButton'
import MainOperationButton from '@/components/MainOperationButton'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function Protect() {
  const [password, setPassword] = useState(null)
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
  } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('pdf_file', files)
    formData.append('password', password)
    callApi('https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/protect_pdf', formData)
  }

  return (
    <div className="min-h-screen bg-background">
      {!completionStatus && !isDroped && (
        <ToolHeader
          sparklesText={'Free Online PDF Protector'}
          headings={['Protect', 'PDF Files', 'with Password']}
          text={
            'Add strong password protection to your PDF files — fast, secure, and completely free.'
          }
        />
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e)
        }}
        encType="multipart/form-data"
      >
        {!isDroped && (
          <div>
            <FileInput
              setFiles={setFiles}
              setisDroped={setisDroped}
              multiple={false}
              accept={{ 'application/pdf': [] }}
            />

            <BenefitsSection
              heading={'Protect PDF files with a strong password'}
              benefits={protectPdfBenefits}
            />

            <FeatureCardSection
              tool={'Protect PDF'}
              text="Secure your important PDF documents with powerful, easy-to-use protection tools"
              features={protectPdfFeatures}
            />

            <HowToSection
              heading={'How to protect a PDF online for free?'}
              text={'Lock your PDF with a password in three quick steps.'}
              steps={protectPdfHowToSteps}
            />

            {/* FAQs Section */}
            <FaqSection
              heading={'Protect PDF FAQs'}
              text={'Common questions about locking your PDF files with a password'}
              faqs={protectPdfFaqs}
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
              <MainOperationButton buttonText={"Protect The PDF File"} disabled={files.length < 1}/>
            </OperationMain>
            <OperationSidebar>
              <div className="p-2 bg-blue-50 border-1">
                <h1 className="flex text-gray-600 text-sm items-center">
                  {' '}
                  <Dot /> Click on convert to PDFA button to convert pdf into pdfa.
                </h1>
              </div>
              <div className="text-center w-fit mx-auto mt-3">
                <label htmlFor="password" className="block w-full text-left">
                  Enter Password
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  type="password"
                  id="password"
                  className="bg-white text-gray indent-1 border-2 border-gray-500 h-8
                 hover:border-gray-700 rounded-md "
                />
              </div>
              <div className="mt-3 p-3">
                <SidebarOperationButton buttonText={"Protect The PDF File"} disabled={files.length < 1}/>
              </div>
            </OperationSidebar>
          </OperationBox>
        )}

        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
        {serverPreparing && (
          <div className="flex flex-col items-center mt-8">
            <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-24">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Protected PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Protected PDF
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

export default Protect
