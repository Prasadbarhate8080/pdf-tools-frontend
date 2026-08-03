'use client'
import { useState } from 'react'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import ProgressBar from '@/components/ProgressBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import PDFPageComponent from '@/components/PDFPageComponent'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import ToolList from '@/components/ToolList'
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
import OperationSidebar from '@/components/OperationSidebar'
import { Button } from '@/components/ui/button'
import { Dot } from 'lucide-react'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function PageNO() {
  const [page_no_position, setPage_no_position] = useState('bottom-right')
  let {
    files,
    isDroped,
    isProcessing,
    completionStatus,
    isUploading,
    downloadFileURL,
    serverPreparing,
    progress,
    setisDroped,
    setFiles,
    callApi,
    setdownloadFileURL,
    setCompletionStatus,
  } = useFileUpload()

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '')
    const bigint = parseInt(hex, 16)
    return {
      r: ((bigint >> 16) & 255) / 255,
      g: ((bigint >> 8) & 255) / 255,
      b: (bigint & 255) / 255,
    }
  }

  async function addPageNumber() {
    try {
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
      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 10000)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    addPageNumber()
    // const formData = new FormData();
    // formData.append("pdf_file", files);
    // formData.append("page_no_position", page_no_position);

    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/add_page_no",formData);
  }

  return (
    <div className="min-h-screen bg-background">
      {!completionStatus && !isDroped && (
        <ToolHeader
          sparklesText={'Free Online Page Number Adder'}
          headings={['Add', 'Page Numbers', 'to PDF']}
          text={
            'Quickly add clear, consistent page numbers to your PDF documents — free, fast, and secure.'
          }
        />
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e)
        }}
        encType="multipart/form-data"
      >
        {!isDroped && (
          <div>
            <FileInput
              setFiles={setFiles}
              setisDroped={setisDroped}
              multiple={false}
              accept={{ 'application/pdf': [] }}
            />
            {/* Benefits Section */}
            <BenefitsSection
              heading={'Add page numbers to your PDF online for free'}
              benefits={addPageNoBenefits}
            />
            {/* feature card section */}
            <FeatureCardSection
              tool={'Add Page Numbers'}
              text="Everything you need to add clean, professional page numbers to your PDFs"
              features={addPageNoFeatures}
            />
            {/* how to section */}
            <HowToSection
              heading={'How to add page numbers in a PDF online?'}
              text={'Add page numbers to your PDF in just a few simple steps.'}
              steps={addPageNumbersHowToSteps}
            />
            {/* FAQs Section */}
            <FaqSection
              heading={'Add Page Numbers FAQs'}
              text={' Common questions about adding page numbers to your PDFs'}
              faqs={addPageNoFaq}
            />
            <ToolList />
          </div>
        )}

        {isDroped && !isUploading && !isProcessing && !completionStatus && (
          <OperationBox>
            <OperationMain>
              <ul className="mt-6 flex flex-wrap justify-center gap-6">
                <PDFPageComponent file={files} />
              </ul>
              <Button className="absolute bottom-10 lg:hidden z-30 right-10" size="xl">
                {' '}
                Add Page Numbers{' '}
              </Button>
            </OperationMain>
            <OperationSidebar>
              <div className="p-2 bg-blue-50 border-1">
                <h1 className="flex text-gray-600 text-sm items-center">
                  {' '}
                  <Dot /> Select Position for Page Number:
                </h1>
              </div>
              <div className="p-2 gap-4 mt-2">
                <select
                  id="Page-position"
                  name="page_no_position"
                  value={page_no_position}
                  onChange={(e) => setPage_no_position(e.target.value)}
                  className="border border-gray-400 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  <option value="top-right">Top Right</option>
                  <option value="top-center">Top Center</option>
                  <option value="top-left">Top Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-center">Bottom Center</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
              </div>
              <Button size="xl" className="mx-auto w-fit  mt-2 hidden  lg:block">
                {' '}
                Add Page Numbers{' '}
              </Button>
            </OperationSidebar>
          </OperationBox>
        )}

        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
        {serverPreparing && isDroped && (
          <div className="flex flex-col items-center mt-8">
            <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-24">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Page Number Added PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download PDF
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

export default PageNO
