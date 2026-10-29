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
import { ExcelToPDFBenefits, wordToPdfBenefits } from '@/data/benefits'
import { excelToPdfFaqs, wordToPdfFaqs } from '@/data/faqs'
import { excelToPdfFeatures, wordToPdfFeatures } from '@/data/features'
import { excelToPdfHowToSteps, wordToPdfHowToSteps } from '@/data/howTo'
import { useFileUpload } from '@/hooks/useFileUpload'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import { setCompleted, setProcessing, setUploading } from '@/store/operationStateSlice'
import { setProgress } from '@/store/progressBarSlice'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

function ExcelToPDF() {
  let dispatch = useDispatch()
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  let { files, setFiles } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!files) {
      return toast.error('Please select an Excel file')
    }

    try {
      const uploadResponse = await fetch('/api/upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: 'excel-to-pdf',
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

      toast.info('Excel file uploaded. Conversion started...')

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
          toast.success('Excel file converted to PDF successfully')
          dispatch(setDownloadFileUrl(statusData.downloadUrl))
          dispatch(setCompleted())
          return
        }

        if (statusData.status === 'ERROR') {
          throw new Error(statusData.error || 'Excel-to-PDF conversion failed')
        }

        await new Promise((resolve) => setTimeout(resolve, pollingInterval))
      }

      toast.error('Conversion is taking longer than expected')
    } catch (error) {
      console.error('Excel-to-PDF error:', error)
      toast.error(error.message || 'Something went wrong')
    }
  }

  return (
    <div className="bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online Excel to PDF Converter'}
          headings={['Convert', 'Excel to PDF', 'Instantly']}
          text={'Keep your formatting intact while converting Excel to PDF — fast and free'}
        />
        <FileInput
          setFiles={setFiles}
          multiple={false}
          mode="excelFile"
          accept={{
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
          }}
        />
        <BenefitsSection
          heading={'Convert Excel files to PDF online'}
          benefits={ExcelToPDFBenefits}
        />
        <FeatureCardSection
          tool={'Excel to PDF'}
          text="Everything you need for reliable Excel to PDF conversion"
          features={excelToPdfFeatures}
        />
        <HowToSection
          heading={'How to convert Excel to PDF?'}
          text={'Convert your Excel file in three quick steps'}
          steps={excelToPdfHowToSteps}
        />
        <FaqSection
          heading={'Word to PDF FAQs'}
          text={'Common questions about Excel to PDF conversion'}
          faqs={excelToPdfFaqs}
        />
      </HideMainContent>

      <OperationBox>
        <OperationMain>
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {files && (
              <PageContainer setFiles={setFiles} singleFile>
                <PageImageContainer>
                  <Image src={'/excel_logo.svg'} width={80} height={80} alt="Excel-to-pdf-logo" />
                </PageImageContainer>
                <PageData data={files.name}></PageData>
              </PageContainer>
            )}
            {!files && (
              <div className="flex items-center justify-center">
                <AddMoreFilesComponent setFiles={setFiles} accept=".xls,.xlsx" mode="excelFile" />
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

export default ExcelToPDF
