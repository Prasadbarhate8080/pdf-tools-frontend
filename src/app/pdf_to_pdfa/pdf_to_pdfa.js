'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Image from 'next/image'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import ProgressBar from '@/components/ProgressBar'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'

import FeatureCardSection from '@/components/FeatureCardSection'
import ToolList from '@/components/ToolList'
import PDFPageComponent from '@/components/PDFPageComponent'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { pdfToPdfaBenefits } from '@/data/benefits'
import { pdfToPdfaFeatures } from '@/data/features'
import { pdfToPdfaFaqs } from '@/data/faqs'
import { pdfToPdfaHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import OperationSidebar from '@/components/OperationSidebar'
import { Dot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MainOperationButton from '@/components/MainOperationButton'
import SidebarOperationButton from '@/components/SidebarOperationButton'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function Pdfa() {
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

    callApi('https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/pdf_to_pdfa', formData)
  }

  return (
    <div className="bg-background">
      {!completionStatus && !isDroped && (
        <ToolHeader
          sparklesText={'Free Online PDF to PDF/A Converter'}
          headings={['Convert', 'PDF to PDFA', '']}
          text={'Create archive-ready PDF/A files in seconds — fast, compliant, and free'}
        />
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
              heading={'Convert PDF to PDF/A online for free'}
              benefits={pdfToPdfaBenefits}
            />
            <FeatureCardSection
              tool={'PDF to PDF/A'}
              text="Everything you need for compliant PDF/A conversion"
              features={pdfToPdfaFeatures}
            />
            <HowToSection
              heading={'How to convert PDF to PDF/A?'}
              text={'Follow three simple steps to archive your PDF'}
              steps={pdfToPdfaHowToSteps}
            />
            <FaqSection
              heading={'PDF to PDF/A FAQs'}
              text={'Common questions about PDF/A conversion'}
              faqs={pdfToPdfaFaqs}
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
              <MainOperationButton buttonText={"Convert To PDFA"} disabled={files.length < 1}/>
            </OperationMain>
            <OperationSidebar>
              <div className="p-2 bg-blue-50 border-1">
                <h1 className="flex text-gray-600 text-sm items-center">
                  {' '}
                  <Dot /> Click on convert to PDFA button to convert pdf into pdfa.
                </h1>
              </div>
              <div className="mt-3 p-3">
                <SidebarOperationButton buttonText={"Convert To pdfa"} disabled={files.length < 1} />
              </div>
            </OperationSidebar>
          </OperationBox>
        )}
        
            {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
            {serverPreparing && isDroped && (
              <div className="flex flex-col items-center mt-24">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto mt-24">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">Download PDFA File</h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download PDFA File
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

export default Pdfa
