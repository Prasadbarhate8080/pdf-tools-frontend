'use client'
import { ToastContainer } from 'react-toastify'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useFileUpload } from '@/hooks/useFileUpload'
import FileInput from '@/components/FileInput'
import FaqSection from '@/components/FaqSection'
import { showContent } from '@/store/hideContentSlice'
import HowToSection from '@/components/HowToSection'
import PDFPageComponent from '@/components/PDFPageComponent'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import FeatureCardSection from '@/components/FeatureCardSection'
import { unlockPdfBenefits } from '@/data/benefits'
import { unlockPdfFeatures } from '@/data/features'
import { unlockPdfFaqs } from '@/data/faqs'
import { unlockPdfHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import { useDispatch, useSelector } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
import HideMainContent from '@/components/HideMainContent'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import BottomBar from '@/components/BottomBar'
import OperationButton from '@/components/OperationButton'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function Unlock() {
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  let progress = useSelector((state) => state.fileProgress.progress)
  let dispatch = useDispatch()
  let { files, setFiles,callApi } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('pdf_file', files)
    await callApi('https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/unlock_pdf', formData)
  }

  return (
    <div className="min-h-screen bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PDF Unlocker'}
          headings={['Unlock', 'PDF Files', 'Instantly']}
          text={'Remove password protection safely and download your PDF in seconds'}
        />

        <FileInput setFiles={setFiles} multiple={false} accept={{ 'application/pdf': [] }} />
        <BenefitsSection
          heading={'Unlock PDF files online for free'}
          benefits={unlockPdfBenefits}
        />
        <FeatureCardSection
          tool={'Unlock PDF'}
          text="Everything you need to unlock PDFs with confidence"
          features={unlockPdfFeatures}
        />
        <HowToSection
          heading={'How to unlock PDFs online?'}
          text={'Remove password protection in three simple steps'}
          steps={unlockPdfHowToSteps}
        />
        <FaqSection
          heading={'Unlock PDF FAQs'}
          text={'Common questions about our PDF unlocker'}
          faqs={unlockPdfFaqs}
        />
      </HideMainContent>

      <OperationBox>
        <OperationMain>
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {files && <PDFPageComponent file={files} setFiles={setFiles} singleFile/>}
            {!files && (
              <div className="flex items-center justify-center">
                <AddMoreFilesComponent setFiles={setFiles} />
              </div>
            )}
          </ul>
        </OperationMain>
        <BottomBar>
          <div className="flex flex-1 justify-end px-3 items-center ">
          </div>
          <div className="flex justify-center items-center">
            <OperationButton
              buttonText={'Unlock The PDF File'}
              disabled={!files}
              onClick={handleSubmit}
            />
          </div>
          <div className="flex-1"></div>
        </BottomBar>
      </OperationBox>
      <LoadingStateComponent />
      <DownloadComponent
        headingText={'Download Unlocked PDF'}
        buttonText={'Download Unlocked PDF'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />
      <ToastContainer />
    </div>
  )
}

export default Unlock
