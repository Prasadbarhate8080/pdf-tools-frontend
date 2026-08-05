'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import ProgressBar from '@/components/ProgressBar'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import { showContent } from '@/store/hideContentSlice'
import {
  FileOutput,
  Scissors,
  Settings,
  Smartphone,
  Sparkles,
  SplitIcon,
  LucideScissorsLineDashed,
  Trash2,
  SidebarClose,
  SidebarOpen,
  Download,
  Upload,
  CircleCheck,
  Dot,
} from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import JSZip from 'jszip'
import ToolList from '@/components/ToolList'
import FeatureCardSection from '@/components/FeatureCardSection'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { splitPdfBenefits } from '@/data/benefits'
import { splitPdfFeatures } from '@/data/features'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import { splitPdfFaqs } from '@/data/faqs'
import { splitPdfHowToSteps } from '@/data/howTo'
import FeatureCard from '@/components/FeatureCard'
import OperationMain from '@/components/OperationMain'
import OperationSidebar from '@/components/OperationSidebar'
import OperationBox from '@/components/OperationBox'
import { Button } from '@/components/ui/button'
import MainOperationButton from '@/components/MainOperationButton'
import SidebarOperationButton from '@/components/SidebarOperationButton'
import { useDispatch } from 'react-redux'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function Split() {
  const [loading, setLoading] = useState(false)
  const [isActiveSetting, setisActiveSetting] = useState(true)
  const [numPages, setNumPages] = useState('')
  const [splitRanges, setSplitRanges] = useState([])
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(numPages)
  let dispatch = useDispatch()
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setFrom(1)
    setTo(numPages)
    setSplitRanges([[1, numPages]])
  }

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
    setCompletionStatus,
    setdownloadFileURL,
  } = useFileUpload()

  let splitPdf = async () => {
    try {
      setLoading(true)
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
      setdownloadFileURL(url)
      setCompletionStatus(true)
    } catch (error) {
      console.log(error)
      dispatch(showContent())
    } finally {
      setLoading(false)
      setisDroped(false)
      setFiles([])
      dispatch(showContent())
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    splitPdf()
    // const formData = new FormData();
    // formData.append("pdf_file", files);
    // formData.append("startPage", startPage);
    // formData.append("endingPage", endPage);
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/split",formData);
  }

  return (
    <div className="min-h-screen bg-background ">
      <ToastContainer />
      {!completionStatus && !isDroped && (
        <ToolHeader
          sparklesText={'Free Online PDF Splitter'}
          headings={['Split', 'PDF File', 'Instantly']}
          text={'Free to split PDF Files into smaller PDFs online'}
        />
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {!isDroped && !completionStatus && (
          <div>
            <FileInput
              setisDroped={setisDroped}
              setFiles={setFiles}
              multiple={false}
              accept={{ 'application/pdf': [] }}
            />
            <BenefitsSection
              heading={'Split PDF files online for free'}
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
            <ToolList />
          </div>
        )}
        {isDroped && !isUploading && !completionStatus && !isProcessing && (
          <OperationBox>
            <OperationMain>
              <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
                <ul className="mt-6 p-5 flex flex-wrap justify-center gap-8">
                  {Array.from(new Array(0), (value, index) => {
                    let pageNumber = index + 1
                    return (
                      <div className="flex items-center gap-6 " key={index}>
                        <li
                          className="w-[220px] h-[300px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                          transition-all duration-300 overflow-hidden"
                          key={index}
                        >
                          <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                            <Page pageNumber={pageNumber} width={180} />
                          </div>
                          <div className=" px-3 text-center">
                            <p className="text-sm font-medium truncate">{index + 1}</p>
                          </div>
                        </li>
                        <div
                          className="h-full flex flex-col items-center justify-center"
                          onClick={(e) => {
                            setSplitIndexes((prev) => {
                              let array = [...prev]
                              if (array.includes(index + 1)) {
                                let elementIndex = array.indexOf(index + 1)
                                array.splice(elementIndex, 1)
                              } else {
                                array.push(index + 1)
                              }
                              return array
                            })
                            showSplitPDFs()
                          }}
                        >
                          <div
                            className={`border-1 border-dashed border-blue-500 w-0 h-30  ${splitIndexes.includes(index + 1) ? 'block' : 'hidden'}`}
                          ></div>
                          <div
                            className={`h-10 w-10 flex justify-center items-center hover:bg-blue-500 hover:cursor-pointer rounded-full ${splitIndexes.includes(index + 1) ? 'bg-blue-500' : 'bg-blue-400'}`}
                          >
                            <LucideScissorsLineDashed
                              color="white"
                              size={22}
                              className="rotate-270"
                            />
                          </div>
                          <div
                            className={` border-1 w-0 h-30  border-dashed border-blue-500 ${splitIndexes.includes(index + 1) ? 'block' : 'hidden'}`}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                  {splitRanges.length == 0 ? (
                    <div className="flex items-center relative border-dotted rounded-md gap-2 border p-2">
                      <li
                        className="w-[130px] h-[200px] lg:w-[180px]  lg:h-[250px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                          transition-all duration-300 overflow-hidden"
                      >
                        <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                          <Page pageNumber={1} width={110} height={180} />
                        </div>
                        <div className=" px-3 text-center">
                          <p className="text-sm font-medium truncate">{1}</p>
                        </div>
                      </li>
                      <div className="text-2xl  p-1">.......</div>
                      <li
                        className="w-[130px] h-[200px] lg:w-[180px]  lg:h-[250px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                          transition-all duration-300 overflow-hidden"
                      >
                        <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                          <Page pageNumber={numPages} width={110} height={180} />
                        </div>
                        <div className=" px-3 text-center">
                          <p className="text-sm font-medium truncate">{numPages}</p>
                        </div>
                      </li>
                      <div className="p-1.5 absolute top-[-16] lg:left-[200px] left-[150px]  rounded-full bg-red-700 text-white">
                        {' '}
                        <Trash2 size={22} />{' '}
                      </div>
                    </div>
                  ) : (
                    splitRanges.map((array, index) => (
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
                          className="p-1.5 absolute top-[-16] lg:left-[200px] left-[150px]   rounded-full bg-red-700 text-white"
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
                    ))
                  )}
                </ul>
              </Document>
              <MainOperationButton buttonText={'Split PDF'} disabled={splitRanges.length <= 0} />
            </OperationMain>
            <OperationSidebar>
              <div className="p-2 bg-blue-50 border-1">
                <h1 className="flex text-gray-600 text-sm items-center">
                  {' '}
                  <Dot /> Enter the starting and ending point where you want to split the pdf.
                </h1>
              </div>
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
                  <div className="w-90 min-h-14 bg-white rounded-md border">
                    {splitRanges.map((array) => {
                      return array[0] + '-' + array[1] + ','
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-3 p-3">
                <SidebarOperationButton
                  buttonText={'Split PDF'}
                  disabled={splitRanges.length <= 0}
                />
              </div>
            </OperationSidebar>
          </OperationBox>
        )}
        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}

        {serverPreparing && (
          <div className="flex flex-col items-center mt-8">
            <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {progress === 100 && isProcessing && <Processing />}
      </form>
      {downloadFileURL && (
        <>
          <div className="max-w-5xl text-center mx-auto  mt-24">
            <h1 className="text-center text-gray-700 text-3xl font-semibold">Download Split PDF</h1>
            <div className="mt-3 w-fit mx-auto">
              <a
                href={downloadFileURL}
                download
                className="bg-blue-500 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
              >
                Download Split PDF
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Split
