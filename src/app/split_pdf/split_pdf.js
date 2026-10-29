'use client'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import { Trash2 } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import JSZip from 'jszip'
import FeatureCardSection from '@/components/FeatureCardSection'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { splitPdfBenefits } from '@/data/benefits'
import { splitPdfFeatures } from '@/data/features'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import { splitPdfFaqs } from '@/data/faqs'
import { splitPdfHowToSteps } from '@/data/howTo'
import OperationMain from '@/components/OperationMain'
import OperationSidebar, {
  SidebarToolsButtons,
  SidebarToolsSection,
} from '@/components/OperationSidebar'
import OperationBox from '@/components/OperationBox'
import { Button } from '@/components/ui/button'
import DownloadComponent from '@/components/DownloadComponent'
import HideMainContent from '@/components/HideMainContent'
import { useDispatch, useSelector } from 'react-redux'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import PDFPageConponent from '@/components/PDFPageComponent'
import OperationButton from '@/components/OperationButton'
import BottomBar from '@/components/BottomBar'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function Split() {
  let dispatch = useDispatch()
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  const [numPages, setNumPages] = useState('')
  const [splitRanges, setSplitRanges] = useState([])
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(numPages)
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setFrom(1)
    setTo(numPages)
  }

  let { files, setFiles, toolFunctionWrapper } = useFileUpload()

  let splitPdf = async () => {
    const arrayBuffer = await files.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    const zip = new JSZip()
    let index = 1
    for (let range of splitRanges) {
      let splitedPDF = await PDFDocument.create()
      const start = Number(range[0]) - 1
      const end = Number(range[1]) - 1
      const copiedPages = await splitedPDF.copyPages(
        pdf,
        Array.from({ length: end - start + 1 }, (_, i) => start + i)
      )
      copiedPages.forEach((page) => splitedPDF.addPage(page))
      const splitPDFBytes = await splitedPDF.save()
      zip.file(`split-part-${index}.pdf`, splitPDFBytes)
      index++
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    let url = URL.createObjectURL(zipBlob)
    dispatch(setDownloadFileUrl(url))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    toolFunctionWrapper(splitPdf)
  }

  return (
    <div className="min-h-screen bg-background ">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PDF Splitter'}
          headings={['Split', 'PDF File', 'Instantly']}
          text={'Free to split PDF Files into smaller PDFs online'}
        />

        <FileInput setFiles={setFiles} multiple={false} accept={{ 'application/pdf': [] }} />
        <BenefitsSection
          heading={'How splitting PDFs will make your work easy'}
          benefits={splitPdfBenefits}
        />
        <FeatureCardSection
          tool={'Split PDF'}
          text="Everything you need to manage your PDF files with confidence"
          features={splitPdfFeatures}
        />
        <HowToSection
          heading={'How to split PDFs online for free?'}
          text={'Spilt your PDF documents in three simple steps'}
          steps={splitPdfHowToSteps}
        />
        <FaqSection
          heading={'Split PDF FAQs'}
          text={'Common questions about our PDF splitter tool'}
          faqs={splitPdfFaqs}
        />
      </HideMainContent>

      <OperationBox>
        <OperationMain>
          <div className="flex p-10 gap-4 flex-wrap justify-center items-start">
            {files && (
              <div className=" border h-fit p-2 rounded-md">
                <PDFPageConponent file={files} setFiles={setFiles} singleFile />
                <div className="text-center ">{numPages}</div>
              </div>
            )}
            {!files && (
              <div className=" border h-fit p-2 rounded-md">
                <AddMoreFilesComponent setFiles={setFiles} />
              </div>
            )}
            <ul className="flex flex-wrap justify-center gap-8 border-1 min-h-86 rounded-md p-2 flex-1">
              <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
                {splitRanges.map((array, index) => (
                  <div
                    key={index}
                    className="flex items-center relative border-dotted rounded-md gap-2 border p-2"
                  >
                    <li
                      className="lg:w-[180px] lg:h-[250px] w-[130px] h-[200px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                          transition-all duration-300 overflow-hidden"
                    >
                      <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                        <Page pageNumber={array[0]} width={110} height={180} />
                      </div>
                      {/* PageNumber */}
                      <div className=" px-3 text-center">
                        <p className="text-sm font-medium truncate">{array[0]}</p>
                      </div>
                    </li>
                    <div className="text-2xl p-1">.....</div>
                    <li
                      className="w-[130px] h-[200px] lg:w-[180px]  lg:h-[250px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                          transition-all duration-300 overflow-hidden"
                    >
                      <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                        <Page pageNumber={array[1]} width={110} height={180} />
                      </div>
                      {/* PageNumber */}
                      <div className=" px-3 text-center">
                        <p className="text-sm font-medium truncate">{array[1]}</p>
                      </div>
                    </li>
                    <div
                      className="p-1.5 absolute top-[-16] lg:left-[200px] left-[150px]   rounded-full bg-gray-400 text-white"
                      onClick={(e) => {
                        setSplitRanges((prev) => {
                          let array = [...prev]
                          array.splice(index, 1)
                          return array
                        })
                      }}
                    >
                      {' '}
                      <Trash2 size={22} color="white" />{' '}
                    </div>
                  </div>
                ))}
              </Document>
            </ul>
          </div>

          <BottomBar>
            <OperationButton
              buttonText={'Split PDF'}
              disabled={splitRanges.length <= 0}
              onClick={handleSubmit}
            />
          </BottomBar>
        </OperationMain>
        <OperationSidebar>
          <SidebarToolsButtons className={'lg:hidden block'}></SidebarToolsButtons>
          <SidebarToolsSection>
            <div className={`p-2 flex flex-col gap-4`}>
              <h4 className="font-semibold  text-gray-800">Add Range:</h4>
              <div className="flex gap-4">
                <label htmlFor="from" className="w-10">
                  from:
                </label>
                <input
                  type="number"
                  id="from"
                  className="border rounded-md h-9"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.currentTarget.value)
                  }}
                />
              </div>
              <div className="flex gap-4">
                <label htmlFor="to" className="w-10">
                  To:
                </label>
                <input
                  type="number"
                  id="to"
                  className="border rounded-md h-9"
                  value={to}
                  onChange={(e) => {
                    setTo(e.currentTarget.value)
                  }}
                />
              </div>
              <Button
                size="xl"
                className="w-fit"
                onClick={(e) => {
                  e.preventDefault()
                  setSplitRanges((prev) => {
                    if (
                      prev.some((array) => {
                        if (array[0] == Number(from) && array[1] == Number(to)) return true
                        else return false
                      })
                    )
                      return prev
                    if (Number(to) > numPages) return prev
                    let array = [...prev]
                    array.push([Number(from), Number(to)])
                    return array
                  })
                }}
              >
                Add Range
              </Button>
              <div className="">
                <span className="font-semibold text-gray-800">Ranges:</span>
                <div className="w-90 min-h-20 bg-white rounded-md border p-4 flex gap-3 items-start flex-wrap">
                  {splitRanges.map((array,index) => {
                    return (
                      <span className="px-3 py-1 bg-blue-200 font-medium rounded-xl" key={index}>
                        {array[0] + ' - ' + array[1]}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </SidebarToolsSection>
        </OperationSidebar>
      </OperationBox>
      <LoadingStateComponent />

      <DownloadComponent
        headingText={'Download Split PDF'}
        buttonText={'Download Split PDF'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />
      <ToastContainer />
    </div>
  )
}

export default Split
