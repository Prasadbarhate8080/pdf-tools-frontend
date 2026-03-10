'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Document, Page, pdfjs } from 'react-pdf'
import Image from 'next/image'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import ProgressBar from '@/components/ProgressBar'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  CircleCheck,
  FileOutput,
  Scissors,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  SplitIcon,
  LucideScissorsLineDashed,
  Trash2,
  SidebarClose,
  SidebarOpen,
  CheckCircle,
  Download,
  Upload,
} from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import JSZip from 'jszip'
import ToolList from '@/components/ToolList'
import FeatureCard from '@/components/FeatureCard'
import FadeIn from '@/components/FadeIn'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

const faqs = [
  {
    question: 'Is the Split PDF tool on PDFtoolify free?',
    answer:
      'Yes, the Split PDF tool on PDFtoolify is completely free. You can split or extract PDF pages without any signup or hidden charges.',
  },
  {
    question: 'How can I split a PDF using PDFtoolify?',
    answer:
      "Simply upload your PDF file, select the pages or page ranges you want to extract, and click on Split PDF. The tool will instantly generate separate PDF files for download.",
  },
  {
    question: 'Can I extract specific pages from a PDF?',
    answer:
      'Yes, PDFtoolify allows you to select specific pages or page ranges. You can extract only the pages you need and download them as a new PDF file.',
  },
  {
    question: 'Will splitting a PDF reduce its quality?',
    answer:
      'No, splitting a PDF does not affect the quality. The extracted pages keep the same formatting and resolution as the original file.',
  },
  {
    question: 'Is it safe to split my PDFs online?',
    answer:
      'Yes. Your files are processed securely, and all uploaded PDFs are automatically deleted from our servers after processing to protect your privacy.',
  },
  {
    question: 'Do I need to install any software to split PDFs?',
    answer:
      'No installation is required. You can split PDF files directly in your browser using PDFtoolify on any device.',
  },
]
const steps = [
  {
    step: 1,
    title: 'Upload your PDF',
    description: 'Select or drag and drop the PDF file you want to split.',
    icon: Upload,
  },
  {
    step: 2,
    title: 'Choose pages to split',
    description: 'Select specific pages or page ranges that you want to extract.',
    icon: Scissors,
  },
  {
    step: 3,
    title: 'Download split files',
    description: 'Download the extracted pages or separated PDF files instantly.',
    icon: Download,
  },
]

const features = [
  {
    icon: Scissors,
    heading: 'Split PDFs Instantly',
    paragraph:
      'Easily divide large PDF files into smaller parts in just seconds. Perfect for managing documents efficiently.',
  },
  {
    icon: Settings,
    heading: 'Custom Page Selection',
    paragraph:
      'Choose exactly which pages you want to split and create a new PDF tailored to your needs.',
  },
  {
    icon: FileOutput,
    heading: 'Multiple Splitting Options',
    paragraph:
      'Split PDFs by page range, specific pages, or extract every page into a separate file.',
  },
  {
    icon: ShieldCheck,
    heading: 'Safe and Secure Splitting',
    paragraph:
      'All your files are processed securely, and automatically deleted after splitting for complete privacy.',
  },
  {
    icon: Sparkles,
    heading: 'Secure Online PDF splitting',
    paragraph:
      'Split PDFs securely without any risk of data leaks.',
  },
  {
    icon: Smartphone,
    heading: 'High Quality Results',
    paragraph:
      'Your split documents maintain the same quality and formatting as the original file—no loss.',
  },
]

const benefits = [
  'split PDFs in seconds with PDFtoolify — free, fast, and secure.',
  'No SignUp require to split PDF onlines',
  'PDFtoolify is secure and easy to use tool for PDF related operations',
  'Using PDFtoolify split tool you can easily split PDF files',
  'Our free PDF Splitter can be work on any device',
]

function Split() {
  const [loading, setLoading] = useState(false)
  const [isActiveSetting, setisActiveSetting] = useState(true)
  const [numPages, setNumPages] = useState('')
  const [splitRanges, setSplitRanges] = useState([])
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(numPages)
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
    } finally {
      setLoading(false)
      setisDroped(false)
      setFiles([])
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
          <section className="relative pt-16 pb-6 " style={{ background: 'var(--gradient-hero)' }}>
            <div
              className="absolute top-0 left-0 right-0 -bottom-96 pointer-events-none"
              style={{ background: 'var(--gradient-glow)' }}
            />
            <div className="container pt-16 text-center">
              <FadeIn className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                Free Online PDF Splitter
              </FadeIn>

            <h1 className="section-heading text-center">
              Split <span className="gradient-text">PDF File</span> Instantly
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Free to split PDF Files into smaller PDFs online
            </p>
          </div>
        </section>
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
            {/* Benefits Section */}
            <section className="container py-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
                split PDF files online for free
              </h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {benefits.map((benefit, i) => (
                  <FadeIn
                    key={i}
                    delay={400 + i * 80}
                    className="flex items-start gap-3 p-4 rounded-xl hover:bg-card border border-transparent hover:border-border/50 transition-all duration-200"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </FadeIn>
                ))}
              </div>
            </section>
            {/* feature card section */}
            <section className="bg-muted/30">
              <div className="container py-20">
                <div className="text-center mb-14">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                    Features of PDFtoolify
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Everything you need to manage your PDF files with confidence
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {features.map((feature, i) => (
                    <FeatureCard key={i} {...feature} delay={200 + i * 100} />
                  ))}
                </div>
              </div>
            </section>
            {/* how to section */}
            {/* how to section */}
            <section className="container py-20">
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  How to split PDFs online for free?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Spilt your PDF documents in three simple steps
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {steps.map((item, i) => (
                  <FadeIn
                    key={i}
                    delay={200 + i * 150}
                    className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
                      {item.step}
                    </div>
                    <div className="w-16 h-16 rounded-2xl feature-icon-gradient flex items-center justify-center mb-5 mt-2">
                      <item.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </section>
            <section className="container py-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Split PDF FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Common questions about our PDF splitter tool
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="border border-border/50 rounded-xl px-6 bg-card/50 backdrop-blur-sm data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
            <ToolList />
            {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Split PDF Blog Articles </h1> */}
            {/* PostCard section */}
            {/* <div className="max-w-6xl p-4 bg-[#fcf8f8] mx-auto mt-20 flex flex-wrap justify-evenly">
             <PostCard
                src={"https://www.google.com/imgres?q=split%20pdf%20images&imgurl=https%3A%2F%2Fwww.jotform.com%2Fblog%2Fwp-content%2Fuploads%2F2018%2F12%2FHow-to-split-PDF-files-00cec9.png&imgrefurl=https%3A%2F%2Fwww.jotform.com%2Fblog%2Fhow-to-split-pdf%2F&docid=77fWbPAi3IAUeM&tbnid=9VL9vFjHKFZ5fM&vet=12ahUKEwih7eHvlfmPAxWId2wGHXKcHZkQM3oECBgQAA..i&w=825&h=500&hcb=2&ved=2ahUKEwih7eHvlfmPAxWId2wGHXKcHZkQM3oECBgQAA  "}
                date={"15-9-2025"}
                heading={"How to Split PDF Files Online for Free in Seconds"}
                description={"Learn the easiest way to split PDF files online without downloading any software. Step-by-step guide to separate pages quickly and securely."}
              />
              <PostCard
                src={"/safe_to_merge.png"}
                date={"11-8-2025"}
                heading={"Best Free Online Tool to Split PDF Pages Instantly"}
                description={"Discover the fastest and most reliable tool to split PDF pages online. No sign-up, no hidden charges — just upload, split, and download."}
              />
              <PostCard
                src={"/onine_pdf_merger.jpg"}
                date={"23-8-2025"}
                heading={"Split Large PDF Files into Smaller Parts Easily"}
                description={"Need to manage big PDFs? Use our free Split PDF tool to break large documents into smaller, manageable files without losing quality."}
              />
            </div> */}
          </div>
        )}
        {isDroped && !isUploading && !completionStatus && !isProcessing && (
          <div className="max-w-7xl mx-auto bg-gray-100 p-10 mt-24">
            <div className="flex justify-center  gap-20">
              <div className="w-5xl">
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
                            {/* page number */}
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
                <button
                  disabled={splitRanges.length <= 0}
                  className={`px-6 py-3 rounded-md fixed top-[600px] right-5 z-10  font-semibold text-white transition-all duration-300 mx-auto block 
                  ${
                    splitRanges.length <= 0
                      ? 'bg-[#90CAF9] cursor-not-allowed'
                      : 'bg-blue-500  active:bg-[#90CAF9]'
                  }`}
                >
                  Split PDF
                </button>
              </div>
              <div
                onClick={() => {
                  setisActiveSetting((prev) => !prev)
                }}
                className={`w-fit absolute lg:hidden ${isActiveSetting ? 'hidden' : 'block'} right-1 top-20`}
              >
                <SidebarOpen size={30} />
              </div>
              <div
                className={`${isActiveSetting ? 'right-0' : 'right-[-380px]'} transition-all duration-300 ease-in w-[380px] lg:relative fixed  lg:right-0  bg-gray-200 p-2 flex flex-col gap-4 h-[658px]`}
              >
                <div
                  className="lg:hidden block"
                  onClick={() => {
                    setisActiveSetting((prev) => !prev)
                  }}
                >
                  <SidebarClose size={30} />
                </div>
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
                <button
                  className="bg-blue-600 rounded-md font-semibold w-80 h-9 mx-auto text-white px-2 py-1"
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
                </button>
                <div className="">
                  <span className="font-semibold text-gray-800">Ranges:</span>
                  <div className="w-90 min-h-14 bg-white rounded-md border">
                    {splitRanges.map((array) => {
                      return array[0] + '-' + array[1] + ','
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Split PDF files online for free
          </h1>
          {/* points section */}
          <div className="flex justify-center max-w-7xl mt-6 mx-auto gap-4">
            <div className="flex flex-col gap-2 w-xl text-sm">
              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} />
                <span>Our free PDF Splitter can be work on any device </span>
              </div>
              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} />
                <span>Using PDFtoolify split tool you can easily split PDF files</span>
              </div>
            </div>
            <div className="w-xl flex flex-col gap-2 text-sm">
              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} />
                <span>PDFtoolify is secure and easy to use tool for PDF related operations</span>
              </div>
              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} />
                <span>No SignUp require to split PDF online</span>
              </div>
              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} />
                <span>split PDFs in seconds with PDFtoolify — free, fast, and secure.</span>
              </div>
            </div>
          </div>
          {/* feature card section */}
          <section className="bg-muted/30">
            <div className="container py-20">
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Features of PDFtoolify
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Everything you need to manage your PDF files with confidence
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {features.map((feature, i) => (
                  <FeatureCard key={i} {...feature} delay={200 + i * 100} />
                ))}
              </div>
            </div>
          </section>
          {/* how to section */}
          <div className="flex max-w-7xl mx-auto mt-24">
            <div className="flex basis-[50%] justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="560"
                height="360"
                viewBox="0 0 560 360"
                fill="none"
              >
                <rect width="560" height="360" rx="20" fill="#E6F0FF" />
                <rect
                  x="100"
                  y="100"
                  width="80"
                  height="100"
                  rx="8"
                  fill="white"
                  stroke="#1E40AF"
                  strokeWidth="2"
                />
                <text
                  x="140"
                  y="160"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#1E40AF"
                  fontFamily="Arial"
                >
                  PDF
                </text>
                <rect
                  x="380"
                  y="100"
                  width="80"
                  height="100"
                  rx="8"
                  fill="white"
                  stroke="#1E40AF"
                  strokeWidth="2"
                />
                <text
                  x="420"
                  y="160"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#1E40AF"
                  fontFamily="Arial"
                >
                  PDF
                </text>
                <path
                  d="M220 150 H340"
                  stroke="#1E3A8A"
                  strokeWidth="4"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#1E3A8A" />
                  </marker>
                </defs>
                <rect
                  x="240"
                  y="220"
                  width="80"
                  height="100"
                  rx="8"
                  fill="white"
                  stroke="#059669"
                  strokeWidth="2"
                />
                <text
                  x="280"
                  y="280"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#059669"
                  fontFamily="Arial"
                >
                  PDF
                </text>
              </svg>
            </div>
            <div className="flex basis-[50%] justify-center items-center">
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 items-center">
                  <span className="w-5 h-5 rounded-md bg-black inline-block"></span>
                  <span className="text-2xl text-gray-800 font-semibold">
                    How to split PDFs online for free?
                  </span>
                </div>
                <p className="whitespace-pre">
                  1. Select files or drag and drop files in the select container
                </p>
                <p className="whitespace-pre">
                  2. Enter start and end page to split PDF and press split pdf button
                </p>
                <p className="whitespace-pre">
                  3. Download the split PDFs by pressing Download button
                </p>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Split PDF FAQs</h1>
          {/* FAQs Section */}
          <div className="max-w-4xl mx-auto flex flex-col mt-12 items-start gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800 ">
                Is PDFtoolify really free to split PDFs?
              </p>
              <p className="text-sm font-medium text-gray-800">
                Yes, splitting PDFs with PDFtoolify is 100% free. You can separate pages without any
                sign-up or hidden charges.
              </p>
              <hr className="text-gray-300" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800 ">
                How can I split PDF files online?
              </p>
              <p className="text-sm font-medium text-gray-800">
                Simply upload your PDF, select the pages you want to extract or split, and click on
                “Split PDF.” Your file will be ready to download instantly.
              </p>
              <hr className="text-gray-300" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800 ">
                Will my PDF quality change after splitting?
              </p>
              <p className="text-sm font-medium text-gray-800">
                No. PDFtoolify keeps the original formatting and quality of your PDF files after
                splitting.
              </p>
              <hr className="text-gray-300" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800 ">
                Is it safe to split PDFs online?
              </p>
              <p className="text-sm font-medium text-gray-800">
                Yes. Your files are processed securely, and they are automatically deleted after the
                task is completed.
              </p>
              <hr className="text-gray-300" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800 ">
                Can I split large PDFs with many pages?
              </p>
              <p className="text-sm font-medium text-gray-800">
                Absolutely. PDFtoolify supports splitting large PDF files quickly and efficiently
                without any page limit.
              </p>
              <hr className="text-gray-300" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800 ">
                Does splitting PDFs cost anything?
              </p>
              <p className="text-sm font-medium text-gray-800">
                No, splitting PDFs is completely free on PDFtoolify. There are no hidden fees.
              </p>
              <hr className="text-gray-300" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Split
