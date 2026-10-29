'use client'
import { ToastContainer } from 'react-toastify'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import { showContent } from '@/store/hideContentSlice'
import FeatureCardSection from '@/components/FeatureCardSection'
import PDFPageComponent from '@/components/PDFPageComponent'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { pdfToPdfaBenefits } from '@/data/benefits'
import { pdfToPdfaFeatures } from '@/data/features'
import { pdfToPdfaFaqs } from '@/data/faqs'
import { pdfToPdfaHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
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

function Pdfa() {
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  let dispatch = useDispatch()
  let { files, setFiles,callApi } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('pdf_file', files)
    await callApi('https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/pdf_to_pdfa', formData)
    dispatch(showContent())
  }

  return (
    <div className="bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PDF to PDF/A Converter'}
          headings={['Convert', 'PDF to PDFA', '']}
          text={'Create archive-ready PDF/A files in seconds — fast, compliant, and free'}
        />

        <FileInput setFiles={setFiles} multiple={false} accept={{ 'application/pdf': [] }} />
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
      </HideMainContent>

      <OperationBox>
        <OperationMain>
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {files && <PDFPageComponent file={files} singleFile setFiles={setFiles} />}
            {!files && (
              <div className="flex items-center justify-center">
                <AddMoreFilesComponent setFiles={setFiles} />
              </div>
            )}
          </ul>
        </OperationMain>
        <BottomBar>
          <OperationButton buttonText={'Convert To pdfa'} disabled={!files} onClick={handleSubmit}/>
        </BottomBar>
      </OperationBox>
      <LoadingStateComponent />
      <DownloadComponent
        headingText={'Download PDFA File'}
        buttonText={'Download Zip File'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />
      <ToastContainer />
    </div>
  )
}

export default Pdfa
