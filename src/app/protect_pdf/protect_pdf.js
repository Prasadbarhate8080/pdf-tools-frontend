'use client'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useFileUpload } from '@/hooks/useFileUpload'
import FileInput from '@/components/FileInput'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import FeatureCardSection from '@/components/FeatureCardSection'
import PDFPageComponent from '@/components/PDFPageComponent'
import { showContent } from '@/store/hideContentSlice'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { protectPdfBenefits } from '@/data/benefits'
import { protectPdfFeatures } from '@/data/features'
import { protectPdfFaqs } from '@/data/faqs'
import { protectPdfHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationSidebar, {
  SidebarToolsButtons,
  SidebarToolsSection,
} from '@/components/OperationSidebar'
import OperationMain from '@/components/OperationMain'
import { useDispatch, useSelector } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
import HideMainContent from '@/components/HideMainContent'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import OperationButton from '@/components/OperationButton'
import BottomBar from '@/components/BottomBar'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function Protect() {
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  const [password, setPassword] = useState(null)
  let dispatch = useDispatch()
  let { files, setFiles, callApi } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('pdf_file', files)
    formData.append('password', password)
    await callApi('https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/protect_pdf', formData)
  }

  return (
    <div className="min-h-screen bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PDF Protector'}
          headings={['Protect', 'PDF Files', 'with Password']}
          text={'Add strong password protection to your PDF files with this our online tool.'}
        />

        <FileInput setFiles={setFiles} multiple={false} accept={{ 'application/pdf': [] }} />

        <BenefitsSection
          heading={'How password protection can help you'}
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
      </HideMainContent>

      <OperationBox>
        <OperationMain>
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {files && <PDFPageComponent file={files} setFiles={setFiles} singleFile />}
            {!files && (
              <div className="flex items-center justify-center">
                <AddMoreFilesComponent setFiles={setFiles} />
              </div>
            )}
          </ul>
          <BottomBar>
            <OperationButton
              buttonText={'Protect The PDF File'}
              disabled={!files}
              onClick={handleSubmit}
            />
          </BottomBar>
        </OperationMain>
        <OperationSidebar>
          <SidebarToolsButtons className="lg:hidden block"></SidebarToolsButtons>
          <SidebarToolsSection>
            <div className="ml-3 mt-6">
              <label htmlFor="password" className="block w-full text-lg tracking-wide text-left">
                Enter Password :
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                type="password"
                id="password"
                className="bg-white text-gray indent-1 border-2  h-10 w-60 lg:w-80
                  rounded-md mt-2 ml-4"
                disabled={!files}
              />
            </div>
          </SidebarToolsSection>
        </OperationSidebar>
      </OperationBox>
      <LoadingStateComponent />

      <DownloadComponent
        headingText={'Download Protected PDF'}
        buttonText={'Download Protected PDF'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />

      <ToastContainer />
    </div>
  )
}

export default Protect
