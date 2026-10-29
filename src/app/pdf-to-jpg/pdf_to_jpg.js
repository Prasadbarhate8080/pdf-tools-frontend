'use client'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useFileUpload } from '@/hooks/useFileUpload'
import FileInput from '@/components/FileInput'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import FeatureCardSection from '@/components/FeatureCardSection'
import PDFPageComponent from '@/components/PDFPageComponent'
import JSZip from 'jszip'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { pdfToJpgBenefits } from '@/data/benefits'
import { pdfToJpgFeatures } from '@/data/features'
import { pdfToJpgFaqs } from '@/data/faqs'
import { pdfToJpgHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import { useDispatch, useSelector } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import HideMainContent from '@/components/HideMainContent'
import PageContainer from '@/components/PDFPageComponents/PageContainer'
import PageImageContainer from '@/components/PDFPageComponents/PageImageContainer'
import PageData from '@/components/PDFPageComponents/PageData'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import OperationButton from '@/components/OperationButton'
import BottomBar from '@/components/BottomBar'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function PDFToJPG() {
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  let dispatch = useDispatch()
  let { files, setFiles, toolFunctionWrapper } = useFileUpload()
  const [numPages, setNumPages] = useState(null)

  async function convertToJpg() {
    const zip = new JSZip()
    const canvases = document.querySelectorAll('.rendered-pdf .react-pdf__Page canvas')
    console.log(canvases)
    canvases.forEach((canvas, i) => {
      const imageData = canvas.toDataURL('image/jpeg', 1.0)
      const base64Data = imageData.split(',')[1]
      zip.file(`page_${i + 1}.jpg`, base64Data, { base64: true })
    })
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    let url = URL.createObjectURL(zipBlob)
    dispatch(setDownloadFileUrl(url))
    setTimeout(() => URL.revokeObjectURL(url), 10000)
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    toolFunctionWrapper(convertToJpg)
  }

  return (
    <div className="min-h-screen bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={' Free Online PDF to JPG Converter'}
          headings={['Convert', 'PDF to JPG', 'Instantly']}
          text={' Turn every PDF page into high-quality JPG images — fast, secure, and free'}
        />
        <FileInput setFiles={setFiles} multiple={false} accept={{ 'application/pdf': [] }} />
        <BenefitsSection heading={'Convert PDF pages to JPG online'} benefits={pdfToJpgBenefits} />
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
          <div className="rendered-pdf hidden">
            <Document file={files} onLoadSuccess={onDocumentLoadSuccess} className={''}>
              <div className="flex flex-wrap items-center gap-4 justify-center py-3">
                {Array.from(new Array(numPages), (el, index) => {
                  const pageNum = index + 1
                  return (
                    <PageContainer key={pageNum} width={'auto'} height={'auto'}>
                      <PageImageContainer>
                        <Page pageNumber={pageNum} />
                      </PageImageContainer>
                      <PageData data={pageNum} />
                    </PageContainer>
                  )
                })}
              </div>
            </Document>
          </div>
        </OperationMain>
        <BottomBar>
          <OperationButton
            buttonText={'Convert To JPG'}
            disabled={!files}
            onClick={handleSubmit}
          />
        </BottomBar>
      </OperationBox>
      <LoadingStateComponent />
      <DownloadComponent
        headingText={'Download JPG Images'}
        buttonText={'Download Zip File'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />

      <ToastContainer />
    </div>
  )
}

export default PDFToJPG
