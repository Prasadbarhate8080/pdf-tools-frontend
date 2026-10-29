'use client'
import { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import PDFPageComponent from '@/components/PDFPageComponent'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import BenefitsSection from '@/components/BenefitsSection'
import { addPageNoBenefits } from '@/data/benefits'
import FeatureCardSection from '@/components/FeatureCardSection'
import { addPageNoFeatures } from '@/data/features'
import HowToSection from '@/components/HowToSection'
import { addPageNumbersHowToSteps } from '@/data/howTo'
import FaqSection from '@/components/FaqSection'
import { addPageNoFaq } from '@/data/faqs'
import ToolHeader from '@/components/ToolHeader'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import OperationSidebar, {
  SidebarToolsButtons,
  SidebarToolsSection,
} from '@/components/OperationSidebar'
import { Dot } from 'lucide-react'
import DownloadComponent from '@/components/DownloadComponent'
import { useDispatch, useSelector } from 'react-redux'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import HideMainContent from '@/components/HideMainContent'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'
import OperationButton from '@/components/OperationButton'
import BottomBar from '@/components/BottomBar'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function PageNO() {
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  const [page_no_position, setPage_no_position] = useState('bottom-right')
  let { files, setFiles, toolFunctionWrapper } = useFileUpload()
  let dispatch = useDispatch()
  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '')
    const bigint = parseInt(hex, 16)
    return {
      r: ((bigint >> 16) & 255) / 255,
      g: ((bigint >> 8) & 255) / 255,
      b: (bigint & 255) / 255,
    }
  }
  useEffect(() => {
    console.log(files)
  }, [files])

  async function addPageNumber() {
    if (!files) throw new Error('no file selected')
    const arrayBuffer = await files.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const pages = pdfDoc.getPages()
    const totalPages = pages.length
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontSize = 12 // Normal default size
    const { r, g, b } = hexToRgb('#000000') // Black

    pages.forEach((page, index) => {
      const { width, height } = page.getSize()
      const text = `${index + 1}`
      let x = 0
      let y = 0

      switch (page_no_position) {
        case 'bottom-left':
          x = 30
          y = 20
          break
        case 'bottom-center':
          x = width / 2 - (fontSize * text.length) / 4
          y = 20
          break
        case 'bottom-right':
          x = width - fontSize * text.length
          y = 20
          break
        case 'top-left':
          x = 30
          y = height - fontSize - 10
          break
        case 'top-center':
          x = width / 2 - (fontSize * text.length) / 4
          y = height - fontSize - 10
          break
        case 'top-right':
          x = width - fontSize * text.length
          y = height - fontSize - 10
          break
        default:
          x = width - fontSize * text.length
          y = 20
      }

      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(r, g, b),
      })
    })

    const newPdfBytes = await pdfDoc.save()
    const blob = new Blob([newPdfBytes], { type: 'application/pdf' })
    let url = URL.createObjectURL(blob)
    dispatch(setDownloadFileUrl(url))
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 10000)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    toolFunctionWrapper(addPageNumber)
  }

  return (
    <div className="min-h-screen bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Online PDF Page Number Adder'}
          headings={['Add', 'Page Numbers', 'to PDF']}
          text={'PDFtoolify will help you to add the Clear page numbers on your PDF pages.'}
        />
        <FileInput setFiles={setFiles} multiple={false} accept={{ 'application/pdf': [] }} />
        <BenefitsSection heading={'How adding page numbers helps'} benefits={addPageNoBenefits} />
        <FeatureCardSection
          tool={'Add Page Numbers'}
          text="We are providing best quality features for adding page numbers on your PDFs."
          features={addPageNoFeatures}
        />
        <HowToSection
          heading={'How to add page numbers in a PDF online?'}
          text={'Add page numbers to your PDF in just a few simple steps.'}
          steps={addPageNumbersHowToSteps}
        />
        <FaqSection
          heading={'Add Page Numbers FAQs'}
          text={' Common questions about adding page numbers to your PDFs'}
          faqs={addPageNoFaq}
        />
      </HideMainContent>
      <OperationBox>
        <OperationMain>
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {files && <PDFPageComponent file={files} singleFile setFiles={setFiles} />}
            {!files && <AddMoreFilesComponent setFiles={setFiles} />}
          </ul>
          <BottomBar>
          <div>
            <OperationButton
              buttonText={'Add Page Numbers'}
              disabled={!files}
              onClick={handleSubmit}
            />
          </div>
        </BottomBar>
        </OperationMain>
        
        <OperationSidebar>
          <SidebarToolsButtons className="lg:hidden block"></SidebarToolsButtons>
          <SidebarToolsSection>
            <div className="p-2 bg-blue-50 border-1">
              <h1 className="flex text-gray-600 text-sm font-medium items-center">
                {' '}
                <Dot /> Select Position for Page Number and click on Add page numbers button
              </h1>
            </div>
            <div className="mt-3 ml-3">
              <label htmlFor="Page-position">Select page number Position :</label>
            </div>
            <div className="p-2 gap-4 mt-2 ml-10">
              <select
                id="Page-position"
                name="page_no_position"
                value={page_no_position}
                onChange={(e) => setPage_no_position(e.target.value)}
                className="border  border-gray-400 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="top-right">Top Right</option>
                <option value="top-center">Top Center</option>
                <option value="top-left">Top Left</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-left">Bottom Left</option>
              </select>
            </div>
          </SidebarToolsSection>
        </OperationSidebar>
      </OperationBox>
      <LoadingStateComponent />
      <DownloadComponent
        headingText={'Download Page Number Added PDF'}
        buttonText={'Download PDF'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />
      <ToastContainer />
    </div>
  )
}

export default PageNO
