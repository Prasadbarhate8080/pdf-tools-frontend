'use client'
import { toast, ToastContainer } from 'react-toastify'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useFileUpload } from '@/hooks/useFileUpload'
import FileInput from '@/components/FileInput'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import FeatureCardSection from '@/components/FeatureCardSection'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import { useDispatch, useSelector } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
import HideMainContent from '@/components/HideMainContent'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import OperationButton from '@/components/OperationButton'
import BottomBar from '@/components/BottomBar'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'
import PDFPageConponent from '@/components/PDFPageComponent'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import { setCompleted, setProcessing, setUploading } from '@/store/operationStateSlice'
import { setProgress } from '@/store/progressBarSlice'
import axios from 'axios'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function PDFToWord() {
  let dispatch = useDispatch()
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  let { files, setFiles } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!files) {
      return toast.error('Please select a PDF file')
    }

    try {
      // 1. Get presigned upload URL
      const uploadResponse = await fetch('/api/upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: 'pdf-to-word',
          size: files.size,
        }),
      })

      const uploadData = await uploadResponse.json()
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Failed to prepare upload')
      }

      const { jobId, uploadUrl } = uploadData

      // 2. Upload directly to S3
      dispatch(setUploading())
      const s3Response = await axios.put(uploadUrl, files, {
        headers: {
          'Content-Type': 'application/pdf',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            dispatch(setProgress(percent))
            if (percent === 100) {
              dispatch(setProcessing())
            }
          }
        },
      })

      toast.info('PDF uploaded. Processing started...')

      // 3. Poll for maximum 2 minutes
      const maxPollingTime = 2 * 60 * 1000 // 2 minutes
      const pollingInterval = 2000 // 2 seconds

      const startTime = Date.now()

      while (Date.now() - startTime < maxPollingTime) {
        const statusResponse = await fetch(`/api/status/${jobId}`, {
          cache: 'no-store',
        })

        const statusData = await statusResponse.json()

        if (!statusResponse.ok) {
          throw new Error(statusData.error || 'Failed to check processing status')
        }

        console.log('Processing status:', statusData.status)

        // Processing completed
        if (statusData.status === 'DONE') {
          toast.success('PDF converted to word successfully')

          // Download
          dispatch(setDownloadFileUrl(statusData.downloadUrl))
          dispatch(setCompleted())
          return
        }

        // Processing failed
        if (statusData.status === 'ERROR') {
          throw new Error('PDF processing failed')
        }

        // Wait 2 seconds before next check
        await new Promise((resolve) => setTimeout(resolve, pollingInterval))
      }

      // 4. 2 minutes completed
      toast.error('Processing is taking longer than expected. Please try again later.')
    } catch (error) {
      console.error('Conversion error:', error)
      toast.error(error.message || 'Something went wrong')
    } finally {
      
    }
  }

  return (
    <div className="bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PDF to word Converter'}
          headings={['Convert', 'PDF to Word', 'Instantly']}
          text={'Keep your formatting intact while converting PDF to DOC/DOCX — fast and free'}
        />
        <FileInput setFiles={setFiles} multiple={false} accept={{ 'application/pdf': [] }} />
        <BenefitsSection
          heading={'Convert PDF files to Word online'}
          benefits={PDFToWordBenefits}
        />
        <FeatureCardSection
          tool={'PDF to Word'}
          text="Everything you need for reliable PDF to Word conversion"
          features={PDFToWordFeatures}
        />
        <HowToSection
          heading={'How to convert PDF to Word?'}
          text={'Convert your PDFs files to word in  three quick steps'}
          steps={PDFToWordHowToSteps}
        />
        <FaqSection
          heading={'PDF to word FAQs'}
          text={'Common questions about PDF to Word conversion'}
          faqs={PDFToWordFaqs}
        />
      </HideMainContent>
      <OperationBox>
        <OperationMain>
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {files && <PDFPageConponent setFiles={setFiles} singleFile file={files} />}
            {!files && (
              <div className="flex items-center justify-center">
                <AddMoreFilesComponent setFiles={setFiles} accept={'.pdf'} />
              </div>
            )}
          </ul>
        </OperationMain>
        <BottomBar>
          <div className="flex justify-center items-center">
            <OperationButton
              buttonText={'Convert To Word'}
              disabled={!files}
              onClick={handleSubmit}
            />
          </div>
        </BottomBar>
      </OperationBox>
      <LoadingStateComponent />
      <DownloadComponent
        headingText={'Download Converted File'}
        buttonText={'Download Converted File'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />
      <ToastContainer />
    </div>
  )
}
export default PDFToWord
