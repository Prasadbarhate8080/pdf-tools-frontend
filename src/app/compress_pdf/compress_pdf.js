'use client'
import { toast, ToastContainer } from 'react-toastify'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useFileUpload } from '@/hooks/useFileUpload'
import FileInput from '@/components/FileInput'
import { Dot } from 'lucide-react'
import FeatureCardSection from '@/components/FeatureCardSection'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import PDFPageConponent from '@/components/PDFPageComponent'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { compressPdfBenefits } from '@/data/benefits'
import { compressPdfFeatures } from '@/data/features'
import { compressPdfFaqs } from '@/data/faqs'
import { compressPdfHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import OperationSidebar, {
  SidebarToolsButtons,
  SidebarToolsSection,
} from '@/components/OperationSidebar'
import { useDispatch, useSelector } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
import HideMainContent from '@/components/HideMainContent'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import { useState } from 'react'
import OperationButton from '@/components/OperationButton'
import BottomBar from '@/components/BottomBar'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'
import { setCompleted, setProcessing, setUploading } from '@/store/operationStateSlice'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import { setProgress } from '@/store/progressBarSlice'
import axios from 'axios'
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function Compress() {
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  let dispatch = useDispatch()
  let { files, setFiles, callApi } = useFileUpload()
  let [compressionLevel, setCompressionLevel] = useState(null)
  const compressionLevels = [
    { value: 'screen', label: 'Screen', description: 'Smallest file size' },
    { value: 'ebook', label: 'eBook', description: 'Good quality & smaller size' },
    { value: 'printer', label: 'Printer', description: 'High quality' },
  ]
    const handleSubmit = async (e) => {
      e.preventDefault()

      if (!files) {
        return toast.error('Please select a PDF file')
      }

      if (!compressionLevel) {
        return toast.error('Please select compression level')
      }

      try {
        // 1. Get presigned upload URL
        const uploadResponse = await fetch('/api/upload-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operation: 'compress-pdf',
            size: files.size,
            compressionLevel,
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
            toast.success('PDF compressed successfully')

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
        console.error('Compression error:', error)

        toast.error(error.message || 'Something went wrong')
      } finally {
      }
    }

  return (
    <div className="bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PDF Compressor'}
          headings={['Compress', 'PDF Files', 'Fast']}
          text={'Reduce PDF size without loosing quality quick, secure, and free'}
        />
        <FileInput setFiles={setFiles} multiple={false} accept={{ 'application/pdf': [] }} />
        <BenefitsSection
          heading={'How compressed PDFs are helpful'}
          benefits={compressPdfBenefits}
        />
        <FeatureCardSection
          tool={'Compress PDF'}
          text="Powerful, safe, and fast tools to reduce your PDF size"
          features={compressPdfFeatures}
        />
        <HowToSection
          heading={'How to compress a PDF file online?'}
          text={'Follow these simple steps to reduce your PDF file size.'}
          steps={compressPdfHowToSteps}
        />
        <FaqSection
          heading={'Compress PDF FAQs'}
          text={'Answers to common questions about reducing PDF file size'}
          faqs={compressPdfFaqs}
        />
      </HideMainContent>
      <OperationBox>
        <OperationMain>
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {files && <PDFPageConponent file={files} singleFile setFiles={setFiles} />}
            {!files && (
              <div className="flex items-center justify-center">
                <AddMoreFilesComponent setFiles={setFiles} />
              </div>
            )}
          </ul>
          <BottomBar>
            <OperationButton buttonText={'Compress PDF'} disabled={!files} onClick={handleSubmit} />
          </BottomBar>
        </OperationMain>
        <OperationSidebar>
          <SidebarToolsButtons className={'lg:hidden block'}></SidebarToolsButtons>
          <SidebarToolsSection>
            <div className="p-2 bg-blue-50 border-1">
              <h1 className="flex text-gray-600 text-sm items-center justify-center">
                {' '}
                <Dot /> Compress PDFs.
              </h1>
            </div>
            <div className="px-4 mt-4 ">
              <label htmlFor="compression-level" className="font-semibold text-muted-foreground">
                Select Compression Level:{' '}
              </label>
              <div className="px-2 flex flex-col gap-3 mt-3">
                {compressionLevels.map((level) => {
                  const isSelected = compressionLevel === level.value

                  return (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setCompressionLevel(level.value)}
                      className={`
                      w-60 p-3.5 rounded-md border text-left
                      transition-all duration-200
                        ${
                          isSelected
                            ? 'border-primary bg-primary/10 ring-2 ring-primary'
                            : 'border-border bg-accent hover:bg-accent/80'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium capitalize">{level.label}</span>

                        {isSelected && <span className="text-primary font-bold">✓</span>}
                      </div>

                      <p className="text-sm  mt-1">{level.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </SidebarToolsSection>
        </OperationSidebar>
      </OperationBox>
      <LoadingStateComponent />
      <DownloadComponent
        headingText={'Download Compressed PDF'}
        buttonText={'Download Compressed PDF'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />

      <ToastContainer />
    </div>
  )
}

export default Compress
