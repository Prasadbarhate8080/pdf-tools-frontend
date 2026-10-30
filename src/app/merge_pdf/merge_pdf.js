'use client'
import { ToastContainer } from 'react-toastify'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import { PDFDocument } from 'pdf-lib'
import PDFPageComponent from '@/components/PDFPageComponent'
import ToolHeader from '@/components/ToolHeader'
import { mergePDFBenefits } from '@/data/benefits'
import BenefitsSection from '@/components/BenefitsSection'
import FeatureCardSection from '@/components/FeatureCardSection'
import { mergePDFFeatures } from '@/data/features'
import HowToSection from '@/components/HowToSection'
import { mergePDFHowTosteps } from '@/data/howTo'
import FaqSection from '@/components/FaqSection'
import { mergePDFFaqs } from '@/data/faqs'
import DownloadComponent from '@/components/DownloadComponent'
import OperationBox from '@/components/OperationBox'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'
import OperationMain from '@/components/OperationMain'
import { FileText, Bug } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import { useSelector } from 'react-redux'
import { setCompleted } from '@/store/operationStateSlice'
import HideMainContent from '@/components/HideMainContent'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import { useEffect, useRef, useState } from 'react'
import OperationButton from '@/components/OperationButton'
import BottomBar from '@/components/BottomBar'
import OperationGuard from '@/components/OperationGuard'
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function Merge() {
  const dispatch = useDispatch()
  let draggingIndex = useRef(null)
  let draggingOverIndex = useRef(null)
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  let [error, setError] = useState()

  let { files, setFiles, toolFunctionWrapper } = useFileUpload()
  useEffect(() => {
    if (!files) setError('please select atleast two pdf files')
    else if(files.length <= 1) setError('please select atleast two pdf files')
    else setError('')
  }, [files])

  let mergePdf = async () => {
    const mergedPdf = await PDFDocument.create()
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      pages.forEach((page) => {
        mergedPdf.addPage(page)
      })
    }
    let mergedPdfBytes = await mergedPdf.save()
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    dispatch(setDownloadFileUrl(url))
    dispatch(setCompleted())
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 10000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    toolFunctionWrapper(mergePdf)
  }

  return (
    <div className="bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PDF Merger'}
          headings={['Merge', 'PDF Files', 'Instantly']}
          text={
            'Combine your PDF files easily using our this free tool. It will combine your PDFs in three easy steps.'
          }
        />
        <FileInput
          files={files}
          setFiles={setFiles}
          multiple={true}
          accept={{ 'application/pdf': [] }}
        />
        <BenefitsSection heading={'Benefits of merging PDFs'} benefits={mergePDFBenefits} />
        <FeatureCardSection features={mergePDFFeatures} tool={'Merge PDF'} text="" />
        <HowToSection
          heading={'How to merge PDFs online for free?'}
          text={'Combine your PDF documents in three simple steps'}
          steps={mergePDFHowTosteps}
        />
        <FaqSection
          heading={'Merge PDF FAQs'}
          text={'Common questions about our PDF merger tool'}
          faqs={mergePDFFaqs}
        />
      </HideMainContent>
      <OperationBox>
        <OperationMain>
          <ul className="flex flex-wrap justify-center p-5 gap-6">
            {files &&
              files.map((file, index) => (
                <div
                  className="transition-all duration-200 p-1 rounded-md"
                  key={index}
                  draggable
                  onDragStart={(e) => {
                    draggingIndex.current = index
                    e.currentTarget.classList.add('opacity-50')
                  }}
                  onDragOver={(e) => {
                    e.currentTarget.classList.add('bg-gray-100')
                    draggingOverIndex.current = index
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove('bg-gray-100')
                  }}
                  onDragEnd={(e) => {
                    e.currentTarget.classList.remove('opacity-50')
                    setFiles((prev) => {
                      let arr = [...prev]
                      let onDropfile = arr[draggingOverIndex.current]
                      let draggedFile = arr[draggingIndex.current]
                      arr.splice(draggingOverIndex.current, 1, draggedFile)
                      arr.splice(draggingIndex.current, 1, onDropfile)
                      return arr
                    })
                  }}
                >
                  <PDFPageComponent
                    file={file}
                    key={index}
                    setFiles={setFiles}
                    fileIndex={index}
                    multipleFiles
                  />
                </div>
              ))}
            <AddMoreFilesComponent setFiles={setFiles} multiple />
          </ul>
        </OperationMain>
        {error && (
          <div className="text-red-400 p-3 border absolute bottom-4 w-80 lg:w-[340px] flex items-center gap-2">
            <Bug size={18} />
            <span className="">{error}</span>
          </div>
        )}
        <BottomBar>
          <div className="flex flex-1 justify-end px-3 items-center ">
            <div className="border h-12 w-12 flex items-center justify-center rounded-lg">
              <div className="relative w-fit  border-gray-300">
                <FileText />
                <span className="absolute -top-3 -right-2">{files ? files.length: 0}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <OperationButton
              buttonText={'Merge PDF Files'}
              disabled={files ? files.length <= 1 : true}
              onClick={handleSubmit}
            />
          </div>
          <div className="flex-1"></div>
        </BottomBar>
      </OperationBox>
      <LoadingStateComponent />
      <DownloadComponent
        headingText={'Download Merged PDF'}
        buttonText={'Download Merged PDF'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />
      <ToastContainer />
    </div>
  )
}
export default Merge
