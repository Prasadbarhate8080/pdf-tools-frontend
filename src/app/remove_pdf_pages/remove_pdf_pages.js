'use client'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import { Trash2 } from 'lucide-react'
import FeatureCardSection from '@/components/FeatureCardSection'
import { PDFDocument } from 'pdf-lib'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { removePdfPagesBenefits } from '@/data/benefits'
import { removePdfPagesFeatures } from '@/data/features'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import { removePdfPagesFaqs } from '@/data/faqs'
import { removePdfPagesHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import { useDispatch, useSelector } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
import PageImageContainer from '@/components/PDFPageComponents/PageImageContainer'
import PageData from '@/components/PDFPageComponents/PageData'
import PageContainer from '@/components/PDFPageComponents/PageContainer'
import HideMainContent from '@/components/HideMainContent'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import BottomBar from '@/components/BottomBar'
import OperationButton from '@/components/OperationButton'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

export default function RemovePDFPages() {
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  const [numPages, setNumPages] = useState(null)
  const [selectedPages, setSelectedPages] = useState([])
  let { files, setFiles, toolFunctionWrapper } = useFileUpload()
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  let dispatch = useDispatch()

  const togglePageSelection = (pageNum) => {
    setSelectedPages((prevSelected) =>
      prevSelected.includes(pageNum)
        ? prevSelected.filter((n) => n !== pageNum)
        : [...prevSelected, pageNum]
    )
  }

  async function removePages() {
    if (!files) throw new Error('no file selected')
    if (selectedPages.length == 0) throw new Error('please select at least one page')

    const arrayBuffer = await files.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)

    const totalPages = pdfDoc.getPageCount()
    // Step 3: Prepare remove set
    const removeSet = new Set(
      selectedPages
        .filter((p) => typeof p === 'number' && p > 0 && p <= totalPages)
        .map((p) => p - 1) // Convert to 0-based
    )

    if (removeSet.size == 0) throw new Error('remove set size is zero')

    const keepPages = []
    for (let i = 0; i < totalPages; i++) {
      if (!removeSet.has(i)) keepPages.push(i)
    }

    if (keepPages.length == 0) throw new Error('all pages selected to remove')
    const newPdfDoc = await PDFDocument.create()
    const copiedPages = await newPdfDoc.copyPages(pdfDoc, keepPages)
    copiedPages.forEach((p) => newPdfDoc.addPage(p))
    const newPdfBytes = await newPdfDoc.save()
    const blob = new Blob([newPdfBytes], { type: 'application/pdf' })
    let url = URL.createObjectURL(blob)
    dispatch(setDownloadFileUrl(url))
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 10000)
  }

  const handleRemove = async () => {
    if (!files || selectedPages.length === 0) return alert('Select at least one page.')
    toolFunctionWrapper(removePages)
  }

  return (
    <div className="min-h-screen bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PDF Page Remover'}
          headings={['Remove', 'PDF Pages', 'Easily']}
          text={'Delete unwanted pages quickly while keeping your PDF quality intact'}
        />
        <FileInput setFiles={setFiles} multiple={false} accept={{ 'application/pdf': [] }} />
        <BenefitsSection
          heading={'How remove PDF can help you'}
          benefits={removePdfPagesBenefits}
        />
        <FeatureCardSection
          tool={'Remove PDF Pages'}
          text="Everything you need to remove PDF pages with confidence"
          features={removePdfPagesFeatures}
        />
        <HowToSection
          heading={'How to remove PDF pages?'}
          text={'Delete pages in three simple steps'}
          steps={removePdfPagesHowToSteps}
        />
        <FaqSection
          heading={'Remove PDF Pages FAQs'}
          text={'Common questions about removing PDF pages'}
          faqs={removePdfPagesFaqs}
        />
      </HideMainContent>

      <OperationBox>
        <OperationMain>
          {files && <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
            <div className="flex flex-wrap justify-center gap-4 py-3">
              {Array.from(new Array(numPages), (el, index) => {
                const pageNum = index + 1
                const isSelected = selectedPages.includes(pageNum)
                return (
                  <PageContainer
                    key={pageNum}
                    isSelected={isSelected}
                    onClick={() => togglePageSelection(pageNum)}
                    pages
                  >
                    <PageImageContainer>
                      <Page pageNumber={pageNum} width={160} />
                    </PageImageContainer>
                    <PageData data={pageNum} />
                  </PageContainer>
                )
              })}
            </div>
          </Document>}
          {!files && (
            <div className="flex items-center justify-center">
              <AddMoreFilesComponent setFiles={setFiles} />
            </div>
          )}
        </OperationMain>
        <BottomBar>
          <div className="flex flex-1 justify-end px-3 items-center ">
            <div
              className="border h-12 w-12 flex items-center justify-center rounded-lg hover:bg-muted"
              onClick={() => {
                setFiles(null)
              }}
            >
              <Trash2 />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <OperationButton
              buttonText={`Remove ${selectedPages.length > 0 ? selectedPages.length : ''} Selected Pages`}
              onClick={handleRemove}
              disabled={!files}
            />
          </div>
          <div className="flex-1"></div>
        </BottomBar>
      </OperationBox>
      <LoadingStateComponent />
      <DownloadComponent
        headingText={'Download Pages Removed PDF'}
        buttonText={'Download created PDF'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />
    </div>
  )
}
