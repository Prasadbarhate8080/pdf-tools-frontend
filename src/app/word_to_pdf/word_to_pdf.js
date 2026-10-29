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
import { wordToPdfBenefits } from '@/data/benefits'
import { wordToPdfFeatures } from '@/data/features'
import { wordToPdfFaqs } from '@/data/faqs'
import { wordToPdfHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import { useDispatch, useSelector } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
import HideMainContent from '@/components/HideMainContent'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import OperationButton from '@/components/OperationButton'
import PageContainer from '@/components/PDFPageComponents/PageContainer'
import PageImageContainer from '@/components/PDFPageComponents/PageImageContainer'
import Image from 'next/image'
import BottomBar from '@/components/BottomBar'
import PageData from '@/components/PDFPageComponents/PageData'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import { setCompleted, setProcessing, setUploading } from '@/store/operationStateSlice'
import { setProgress } from '@/store/progressBarSlice'
import axios from 'axios'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function WordToPdf() {
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  let dispatch = useDispatch()
  let { files, setFiles } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!files) {
      return toast.error('Please select a Word file')
    }

    try {
      // 1. Request a presigned S3 upload URL
      const uploadResponse = await fetch('/api/upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: 'word-to-pdf',
          officeToPDF: true,
          fileName: files.name,
          contentType: files.type,
          size: files.size,
        }),
      })

      const uploadData = await uploadResponse.json()

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Failed to get upload URL')
      }

      const { jobId, uploadUrl } = uploadData

      // 2. Upload Word file directly to S3
      dispatch(setUploading())

      await axios.put(uploadUrl, files, {
        headers: {
          'Content-Type': files.type,
        },
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total)

            dispatch(setProgress(percent))

            if (percent === 100) {
              dispatch(setProcessing())
            }
          }
        },
      })

      toast.info('Word file uploaded. Conversion started...')

      // 3. Poll for conversion status
      const maxPollingTime = 2 * 60 * 1000
      const pollingInterval = 2000
      const startTime = Date.now()

      while (Date.now() - startTime < maxPollingTime) {
        const statusResponse = await fetch(`/api/status/${jobId}`, {
          cache: 'no-store',
        })

        const statusData = await statusResponse.json()

        if (!statusResponse.ok) {
          throw new Error(statusData.error || 'Failed to check conversion status')
        }

        if (statusData.status === 'DONE') {
          toast.success('Word file converted to PDF successfully')

          dispatch(setDownloadFileUrl(statusData.downloadUrl))
          dispatch(setCompleted())
          return
        }

        if (statusData.status === 'ERROR') {
          throw new Error(statusData.error || 'Word-to-PDF conversion failed')
        }

        await new Promise((resolve) => setTimeout(resolve, pollingInterval))
      }

      toast.error('Conversion is taking longer than expected. Please try again later.')
    } catch (error) {
      console.error('Word-to-PDF error:', error)
      toast.error(error.message || 'Something went wrong')
    }
  }

  return (
    <div className="bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online Word to PDF Converter'}
          headings={['Convert', 'Word to PDF', 'Instantly']}
          text={'Keep your formatting intact while converting DOC/DOCX to PDF — fast and free'}
        />

        <FileInput
          setFiles={setFiles}
          multiple={false}
          accept={{
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
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
      </HideMainContent>

      <OperationBox>
        <OperationMain>
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {files && (
              <PageContainer setFiles={setFiles} singleFile>
                <PageImageContainer>
                  <Image src={'/word_logo.jpg'} width={80} height={80} alt="word-to-pdf-logo" />
                </PageImageContainer>
                <PageData data={files.name}></PageData>
              </PageContainer>
            )}
            {!files && (
              <div className="flex items-center justify-center">
                <AddMoreFilesComponent setFiles={setFiles} accept={'.doc,.docx'} mode="wordFile"/>
              </div>
            )}
          </ul>
        </OperationMain>
        <BottomBar>
          <div className="flex justify-center items-center">
            <OperationButton
              buttonText={'Convert To PDF'}
              disabled={!files}
              onClick={handleSubmit}
            />
          </div>
        </BottomBar>
      </OperationBox>
      <LoadingStateComponent />
      <DownloadComponent
        headingText={'Download Converted PDF'}
        buttonText={'Download Converted PDF'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />
      <ToastContainer />
    </div>
  )
}

export default WordToPdf
