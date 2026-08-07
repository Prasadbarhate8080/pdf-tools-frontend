'use client'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import ProgressBar from '@/components/ProgressBar'
import { useFileUpload } from '@/hooks/useFileUpload'
import FileInput from '@/components/FileInput'
import PDFPageComponent from '@/components/PDFPageComponent'
import { Dot } from 'lucide-react'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import ToolList from '@/components/ToolList'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import FeatureCardSection from '@/components/FeatureCardSection'
import { wordToPdfBenefits } from '@/data/benefits'
import { wordToPdfFeatures } from '@/data/features'
import { wordToPdfFaqs } from '@/data/faqs'
import { wordToPdfHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import { showContent } from '@/store/hideContentSlice'
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

function WordToPdf() {
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
  } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('pdf_file', files)
    await callApi('https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/word_to_pdf', formData)
    dispatch(showContent())
  }

  return (
    <div className="bg-background">
      {!completionStatus && !isDroped && (
        <ToolHeader
          sparklesText={'Free Online Word to PDF Converter'}
          headings={['Convert', 'Word to PDF', 'Instantly']}
          text={'Keep your formatting intact while converting DOC/DOCX to PDF — fast and free'}
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
              accept={{
                'application/msword': ['.doc'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
                  '.docx',
                ],
              }}
              mode="wordFile"
            />
            <BenefitsSection
              heading={'Convert Word files to PDF online'}
              benefits={wordToPdfBenefits}
            />
            <FeatureCardSection
              tool={'Word to PDF'}
              text="Everything you need for reliable Word to PDF conversion"
              features={wordToPdfFeatures}
            />
            <HowToSection
              heading={'How to convert Word to PDF?'}
              text={'Convert your DOC/DOCX file in three quick steps'}
              steps={wordToPdfHowToSteps}
            />
            <FaqSection
              heading={'Word to PDF FAQs'}
              text={'Common questions about Word to PDF conversion'}
              faqs={wordToPdfFaqs}
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
              <MainOperationButton buttonText={"Convert To PDF"} disabled={files.length < 1}/>
            </OperationMain>
            <OperationSidebar>
              <div className="p-2 bg-blue-50 border-1">
                <h1 className="flex text-gray-600 text-sm items-center">
                  {' '}
                  <Dot /> Click on convert to pdf button to convert the word file into the pdf.
                </h1>
              </div>
              <div className="mt-3 p-3">
                <SidebarOperationButton buttonText={"Convert To PDF"} disabled={files.length < 1}/>
              </div>
            </OperationSidebar>
          </OperationBox>
        )}

        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
        {serverPreparing && (
          <div className="flex flex-col items-center mt-24">
            <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && completionStatus && (
        <div className="pt-10">
          <DownloadComponent
            headingText={'Download Converted PDF'}
            buttonText={'Download Converted PDF'}
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

export default WordToPdf
