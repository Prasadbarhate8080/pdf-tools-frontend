'use client'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'
import BenefitsSection from '@/components/BenefitsSection'
import BottomBar from '@/components/BottomBar'
import DownloadComponent from '@/components/DownloadComponent'
import FaqSection from '@/components/FaqSection'
import FeatureCardSection from '@/components/FeatureCardSection'
import FileInput from '@/components/FileInput'
import HideMainContent from '@/components/HideMainContent'
import HowToSection from '@/components/HowToSection'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import OperationBox from '@/components/OperationBox'
import OperationButton from '@/components/OperationButton'
import OperationMain from '@/components/OperationMain'
import PageContainer from '@/components/PDFPageComponents/PageContainer'
import PageData from '@/components/PDFPageComponents/PageData'
import PageImageContainer from '@/components/PDFPageComponents/PageImageContainer'
import ToolHeader from '@/components/ToolHeader'
import { PPTToPDFBenefits, wordToPdfBenefits } from '@/data/benefits'
import { pptToPdfFaqs, wordToPdfFaqs } from '@/data/faqs'
import { pptToPdfFeatures, wordToPdfFeatures } from '@/data/features'
import { pptToPdfHowToSteps, wordToPdfHowToSteps } from '@/data/howTo'
import { useFileUpload } from '@/hooks/useFileUpload'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import { setCompleted, setProcessing, setUploading } from '@/store/operationStateSlice'
import { setProgress } from '@/store/progressBarSlice'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

function PPTToPDF() {
  let dispatch = useDispatch()
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  let { files, setFiles } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!files) {
      return toast.error('Please select a PowerPoint file')
    }

    try {
      // 1. Get presigned upload URL
      const uploadResponse = await fetch('/api/upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: 'ppt-to-pdf',
          officeToPDF: true,
          fileName: files.name,
          contentType: files.type,
          size: files.size,
        }),
      })

      const uploadData = await uploadResponse.json()

      if (!uploadResponse.ok) {
        console.error('Upload URL error:', uploadData)
        throw new Error(uploadData.error || 'Failed to get upload URL')
      }

      const { jobId, uploadUrl } = uploadData

      // 2. Upload PowerPoint file directly to S3
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

      toast.info('PowerPoint file uploaded. Conversion started...')

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
          toast.success('PowerPoint converted to PDF successfully')

          dispatch(setDownloadFileUrl(statusData.downloadUrl))
          dispatch(setCompleted())
          return
        }

        if (statusData.status === 'ERROR') {
          throw new Error(statusData.error || 'PowerPoint-to-PDF conversion failed')
        }

        await new Promise((resolve) => setTimeout(resolve, pollingInterval))
      }

      toast.error('Conversion is taking longer than expected. Please try again later.')
    } catch (error) {
      console.error('PPT-to-PDF error:', error)
      toast.error(error.message || 'Something went wrong')
    }
  }

  return (
    <div className="bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PPT to PDF Converter'}
          headings={['Convert', 'PPT to PDF', 'Instantly']}
          text={'Keep your formatting intact while converting PPT to PDF — fast and free'}
        />
        <FileInput
          setFiles={setFiles}
          multiple={false}
          accept={{
            'application/vnd.ms-powerpoint': ['.ppt'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
            'application/vnd.oasis.opendocument.presentation': ['.odp'],
          }}
          mode="pptFile"
        />
        <BenefitsSection heading={'Convert PPT files to PDF online'} benefits={PPTToPDFBenefits} />
        <FeatureCardSection
          tool={'PPT to PDF'}
          text="Everything you need for reliable PPT to PDF conversion"
          features={pptToPdfFeatures}
        />
        <HowToSection
          heading={'How to convert PPT to PDF?'}
          text={'Convert your PPT file in three quick steps'}
          steps={pptToPdfHowToSteps}
        />
        <FaqSection
          heading={'PPT to PDF FAQs'}
          text={'Common questions about PPT to PDF conversion'}
          faqs={pptToPdfFaqs}
        />
      </HideMainContent>

      <OperationBox>
        <OperationMain>
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {files && (
              <PageContainer setFiles={setFiles} singleFile>
                <PageImageContainer>
                  <Image src={'/ppt_logo.jpg'} width={80} height={80} alt="ppt-to-pdf-logo" />
                </PageImageContainer>
                <PageData data={files.name}></PageData>
              </PageContainer>
            )}
            {!files && (
              <div className="flex items-center justify-center">
                <AddMoreFilesComponent
                  setFiles={setFiles}
                  multiple={false}
                  accept=".ppt,.pptx,.odp"
                  mode="pptFile"
                />
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

export default PPTToPDF
