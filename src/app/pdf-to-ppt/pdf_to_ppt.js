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
import { PDFToPPTBenefits, wordToPdfBenefits } from '@/data/benefits'
import { pdfToPptFeatures, wordToPdfFeatures } from '@/data/features'
import { pdfToPptFaqs, wordToPdfFaqs } from '@/data/faqs'
import { pdfToPptHowToSteps, wordToPdfHowToSteps } from '@/data/howTo'
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
import { setCompleted, setProcessing, setUploading } from '@/store/operationStateSlice'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import { setProgress } from '@/store/progressBarSlice'
import axios from 'axios'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function PDFToPPT() {
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  let { files, setFiles, callApi } = useFileUpload()
  let dispatch = useDispatch()

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
          operation: 'pdf-to-ppt',
          size: files.size,
        }),
      })

      const uploadData = await uploadResponse.json()

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Failed to prepare upload')
      }

      const { jobId, uploadUrl } = uploadData

      // 2. Upload PDF directly to S3
      dispatch(setUploading())

      await axios.put(uploadUrl, files, {
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

      // 3. Poll status for up to 2 minutes
      const maxPollingTime = 2 * 60 * 1000
      const pollingInterval = 2000
      const startTime = Date.now()

      while (Date.now() - startTime < maxPollingTime) {
        const statusResponse = await fetch(`/api/status/${jobId}`, { cache: 'no-store' })

        const statusData = await statusResponse.json()

        if (!statusResponse.ok) {
          throw new Error(statusData.error || 'Failed to check processing status')
        }

        console.log('Processing status:', statusData.status)

        if (statusData.status === 'DONE') {
          toast.success('PDF converted to PPT successfully')

          dispatch(setDownloadFileUrl(statusData.downloadUrl))
          dispatch(setCompleted())
          return
        }

        if (statusData.status === 'ERROR') {
          throw new Error(statusData.error || 'PDF to PPT conversion failed')
        }

        await new Promise((resolve) => setTimeout(resolve, pollingInterval))
      }

      toast.error('Processing is taking longer than expected. Please try again later.')
    } catch (error) {
      console.error('PDF to PPT conversion error:', error)

      toast.error(error.response?.data?.error || error.message || 'Something went wrong')
    }
  }

  return (
    <div className="bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PDF to PPT Converter'}
          headings={['Convert', 'PDF to PPT', 'Instantly']}
          text={'Keep your formatting intact while converting PDF to PPT — fast and free'}
        />
        <FileInput
          setFiles={setFiles}
          multiple={false}
          mode="pdf"
          accept={{
            'application/pdf': ['.pdf'],
          }}
        />
        <BenefitsSection heading={'Convert PDF files to PPT online'} benefits={PDFToPPTBenefits} />
        <FeatureCardSection
          tool={'PDF to PPT'}
          text="Everything you need for reliable PDF to PPT conversion"
          features={pdfToPptFeatures}
        />
        <HowToSection
          heading={'How to convert PDF to PPT?'}
          text={'Convert your PDFs files to PPT in  three quick steps'}
          steps={pdfToPptHowToSteps}
        />
        <FaqSection
          heading={'PDF to PPT FAQs'}
          text={'Common questions about PDF to PPT conversion'}
          faqs={pdfToPptFaqs}
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
              buttonText={'Convert To PPT'}
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
export default PDFToPPT
