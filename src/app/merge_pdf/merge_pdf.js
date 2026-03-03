'use client'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import ProgressBar from '@/components/ProgressBar'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  ArrowRight,
  CheckCircle,
  Download,
  Gift,
  GitMerge,
  Infinity as InfinityIcon,
  Lock,
  Shield,
  Sparkles,
  Upload,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import { PDFDocument } from 'pdf-lib'
import PDFPageComponent from '@/components/PDFPageComponent'
import ToolList from '@/components/ToolList'
import PostCard from '@/components/PostCard'
import FeatureCard from '@/components/FeaturesCard'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}
const articles = [
  {
    image: 'https://www.pdftoolify.com/how_to_merge.png',
    title: 'How to Merge PDF Online',
    description:
      'Select the PDF files, arrange them as needed, click Merge PDF, and download the result once the task is completed.',
  },
  {
    image: 'https://www.pdftoolify.com/safe_to_merge.png',
    title: 'Is it Safe to Merge PDFs Online?',
    description:
      "Yes, it's safe to merge PDFs online. Merging PDFs online saves your time and resources with secure processing.",
  },
  {
    image: 'https://www.pdftoolify.com/onine_pdf_merger.jpg',
    title: 'Best Free Online PDF Merger',
    description:
      'Quickly combine multiple PDFs into a single document with our free online PDF merger. No signup, no hidden charges.',
  },
]
const faqs = [
  {
    question: 'Is PDFtoolify Really Free?',
    answer:
      'Yes, PDFtoolify is completely free to use. You can easily use PDFtoolify for your work without any signup or hidden charges.',
  },
  {
    question: 'How can I merge PDF files with PDFtoolify?',
    answer:
      'You just need to upload your PDF files, arrange them in order, and click on "Merge." PDFtoolify will instantly combine them into a single file.',
  },
  {
    question: 'Will the quality of my PDFs change after merging?',
    answer: 'No, the merged PDF keeps the same quality and formatting as your original files.',
  },
  {
    question: 'Is it safe to merge my PDFs online?',
    answer:
      'Yes. PDFtoolify uses secure processing, and your files are deleted automatically after completion to ensure privacy.',
  },
  {
    question: 'Can I merge PDFs offline with PDFtoolify?',
    answer:
      'Yes. You can download PDFtoolify for Windows and merge files offline without internet access.',
  },
  {
    question: 'Does merging PDFs cost anything?',
    answer:
      'No, merging PDFs with PDFtoolify is completely free. No subscriptions, no trial limits.',
  },
]
const steps = [
  {
    icon: Upload,
    step: '1',
    title: 'Select PDF Files',
    description: 'Select files or drag and drop your PDF files into the upload area.',
  },
  {
    icon: GitMerge,
    step: '2',
    title: 'Merge PDF Files',
    description: 'Arrange them in order and click the "Merge PDF" button to combine.',
  },
  {
    icon: Download,
    step: '3',
    title: 'Download Merged PDF',
    description: 'Download your merged PDF file instantly — fast and free.',
  },
]
const benefits = [
  'Our free PDF merger can work on any device',
  'Using PDFtoolify Merge tool you can easily combine PDF files',
  'PDFtoolify is secure and easy to use tool for PDF related operations',
  'No SignUp required to merge PDF online',
  'Combine PDFs in seconds with PDFtoolify — free, fast, and secure.',
]
const features = [
  {
    icon: Sparkles,
    heading: 'Easy to Use',
    paragraph:
      'Designed to be simple and intuitive. Anyone can merge PDFs effortlessly with just a few clicks.',
  },
  {
    icon: Gift,
    heading: 'Free & No Sign Up',
    paragraph:
      'Merge unlimited PDFs for free. No hidden charges, no registration — just quick, hassle-free merging.',
  },
  {
    icon: InfinityIcon,
    heading: 'PDF Merger With No Limit',
    paragraph:
      'Combine as many PDF files as you want without restrictions. Our tool handles it all with ease and speed.',
  },
  {
    icon: Shield,
    heading: 'Reliable PDF Merging',
    paragraph:
      'Our online PDF merger ensures accurate and consistent results every time with secure processing.',
  },
  {
    icon: Lock,
    heading: 'Secure Online PDF Merging',
    paragraph:
      'Your privacy is our priority. All uploaded files are automatically deleted after processing.',
  },
  {
    icon: Zap,
    heading: 'Powerful PDF Merger',
    paragraph:
      'Built with advanced technology, our PDF merger processes files quickly and efficiently.',
  },
]

function Merge() {
  const [loading, setLoading] = useState(false)
  let {
    files,
    isDroped,
    isProcessing,
    completionStatus,
    isUploading,
    downloadFileURL,
    serverPreparing,
    progress,
    setCompletionStatus,
    setisDroped,
    setFiles,
    callApi,
    setdownloadFileURL,
  } = useFileUpload()

  let mergePdf = async () => {
    try {
      setLoading(true)
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
      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 10000)
    } catch (error) {
      toast.error(error)
      setisDroped(false)
      setFiles([])
    } finally {
      setLoading(false)
      setFiles([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    mergePdf()
    // const formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //   formData.append("pdf_files", files[i]);
    // }
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/merge",formData);
  }

  return (
    <div className="min-h-screen bg-background ">
      {!completionStatus && (
        <section className="relative pt-16 pb-6 " style={{ background: 'var(--gradient-hero)' }}>
          <div
            className="absolute top-0 left-0 right-0 -bottom-96 pointer-events-none"
            style={{ background: 'var(--gradient-glow)' }}
          />
          <div className="container pt-16  text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Free Online PDF Merger
            </div>

            <h1 className="section-heading text-center">
              Merge <span className="gradient-text">PDF Files</span> Instantly
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Combine multiple PDF documents into one — free, fast, and without quality loss
            </p>
          </div>
        </section>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {!isDroped && !completionStatus && (
          <div>
            <FileInput
              files={files}
              setFiles={setFiles}
              setisDroped={setisDroped}
              multiple={true}
              accept={{ 'application/pdf': [] }}
            />
            {/* Benefits Section */}
            <section className="container py-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
                Merge PDF files online for free
              </h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl hover:bg-card border border-transparent hover:border-border/50 transition-all duration-200 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${400 + i * 80}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
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
            <section className="container py-20">
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  How to merge PDFs online for free?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Combine your PDF documents in three simple steps
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {steps.map((item, i) => (
                  <div
                    key={i}
                    className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${200 + i * 150}ms` }}
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
                  </div>
                ))}
              </div>
            </section>
            {/* Faq section */}
            <section className="container py-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Merge PDF FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Common questions about our PDF merger tool
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
            <section className="container py-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Merge PDF Blog Articles
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Learn more about merging PDFs efficiently
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {articles.map((article, i) => (
                  <article
                    key={i}
                    className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${200 + i * 120}ms` }}
                  >
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {article.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <ToolList />
          </div>
        )}
        {isDroped && !completionStatus && !isProcessing && !isUploading && (
          <div className="max-w-7xl mx-auto bg-gray-100 p-10">
            <ul className="mt-6 flex flex-wrap justify-center  p-5 gap-6">
              {files.map((file, index) => (
                <PDFPageComponent file={file} key={index} />
              ))}
            </ul>
            <div className="flex items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                disabled={files.length < 2}
                className={`px-6 py-3 rounded-md font-semibold text-xl text-white transition-all duration-300
                ${
                  files.length < 2
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-500 active:bg-blue-400'
                }`}
              >
                Merge PDF Files
              </button>

              {/* Add More Files Button */}
              <label
                htmlFor="addFile"
                className="w-11 h-11 flex items-center justify-center text-2xl font-bold 
               bg-blue-500 text-white rounded-full shadow-md
               active:bg-blue-400 transition-all duration-300"
                title="Add more PDFs"
              >
                +
              </label>

              {/* Hidden File Input */}
              <input
                type="file"
                id="addFile"
                accept=".pdf"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files)
                  const pdfFiles = newFiles.filter((file) => file.type === 'application/pdf')
                  setFiles((prev) => [...prev, ...pdfFiles])
                }}
              />
            </div>
            {/* Error Text */}
            {files.length < 2 && (
              <p className="text-red-500 text-sm text-center mt-2">
                Please select at least two PDF files.
              </p>
            )}
          </div>
        )}
        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}

        {serverPreparing && (
          <div className="flex flex-col items-center mt-8">
            <p className="text-gray-700 text-md mb-2">Preparing server ...please wait</p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {progress === 100 && isProcessing && <Processing />}
      </form>
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">Download Merged PDF</h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Merged PDF
            </a>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}
export default Merge
