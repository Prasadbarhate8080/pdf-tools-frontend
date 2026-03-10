"use client";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";
import {
  BadgeCheck,
  CircleCheck,
  Gift,
  InfinityIcon,
  MousePointerClick,
  ShieldCheck,
  SplitIcon,
  Zap,
  CheckCircle2,
  CheckSquare,
  Check,
  Sparkles,
  CheckCircle,
  MousePointerClickIcon,
} from "lucide-react";
import Image from "next/image";
import { error, PDFDocument } from "pdf-lib";
import { toast } from "react-toastify";
import ToolList from "@/components/ToolList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FeatureCard from "@/components/FeatureCard";
import FadeIn from "@/components/FadeIn";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

export default function ExtractPdf() {
  const [loading, setLoading] = useState(false)
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const benefits = [
    "Our free PDF extractor works on any device seamlessly",
    "Easily extract specific pages from your PDF files with PDFtoolify",
    "PDFtoolify is secure and simple to use for all PDF operations",
    "No signup required — extract PDF pages instantly",
    "Extract PDF pages in seconds — free, fast, and reliable.",
  ]
  const steps = [
    {
      step: "1",
      title: "Upload your PDF file",
      description: "Select a PDF from your device or drag and drop it into the upload area.",
    },
    {
      step: "2",
      title: "Select pages to extract",
      description: "Click on the pages you want to extract. You can choose one or multiple pages.",
    },
    {
      step: "3",
      title: "Extract & download pages",
      description: "Click on “Extract pages” and instantly download your new PDF with selected pages.",
    },
  ]
  const faqs = [
    {
      question: "What is the Extract PDF tool?",
      answer:
        "Extract PDF allows you to select specific pages from your PDF and download them as a new PDF file.",
    },
    {
      question: "How do I extract pages from a PDF?",
      answer:
        "Upload your PDF, select the pages you need, and click on “Extract pages”. Your new PDF will be ready instantly.",
    },
    {
      question: "Is there any quality loss after extracting pages?",
      answer:
        "No. The extracted PDF maintains the exact same quality as the original pages.",
    },
    {
      question: "Is it safe to upload my PDF for extraction?",
      answer:
        "Yes. Your files are processed securely, and they are removed automatically after extraction is completed.",
    },
    {
      question: "Can I extract multiple pages at once?",
      answer:
        "Yes. You can select multiple pages at the same time and extract them together into a single PDF.",
    },
    {
      question: "Is the Extract PDF tool free?",
      answer:
        "Yes, PDFtoolify’s Extract PDF tool is completely free to use without signup.",
    },
  ]
  const features = [
    {
      icon: MousePointerClickIcon,
      heading: 'Easy to Use',
      paragraph:
        'Designed to be simple and intuitive so anyone can easily use this tool and make their work easier.',
    },
    {
      icon: Gift,
      heading: 'Free & No Sign Up',
      paragraph:
        'Extract unlimited pages from PDFs online for free without creating an account. No hidden costs, no registration—just fast and easy page extraction.',
    },
    {
      icon: InfinityIcon,
      heading: 'Extract Without Limits',
      paragraph:
        "Choose and extract as many pages as you want. Whether it's a single page or multiple sections, our tool handles it smoothly and efficiently.",
    },
    {
      icon: BadgeCheck,
      heading: 'Accurate Page Extraction',
      paragraph:
        'Our PDF extractor ensures accurate results every time. Get the exact pages you need without affecting the rest of your document.',
    },
    {
      icon: ShieldCheck,
      heading: 'Secure Online Extraction',
      paragraph:
        'Your privacy is our priority. All uploaded files are automatically deleted after processing, ensuring safe and secure PDF extraction online.',
    },
    {
      icon: Zap,
      heading: 'Fast & Powerful',
      paragraph:
        'Built with advanced technology, our extractor processes files quickly. Get your selected pages in just seconds—fast, reliable, and professional.',
    },
  ]

  let { files, isDroped, isProcessing, completionStatus, isUploading,
    downloadFileURL, serverPreparing, progress, setisDroped, setFiles, callApi, setdownloadFileURL, setCompletionStatus
  } = useFileUpload()

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const togglePageSelection = (pageNum) => {
    setSelectedPages((prevSelected) =>
      prevSelected.includes(pageNum)
        ? prevSelected.filter((n) => n !== pageNum)
        : [...prevSelected, pageNum]
    );
  };

  async function extractPDF() {
    try {
      setLoading(true)
      if (!files) throw new Error("no file selected")
      let arrayBuffer = await files.arrayBuffer();
      let pdf = await PDFDocument.load(arrayBuffer)
      let totalPages = pdf.getPageCount();
      let extractedPDF = await PDFDocument.create();
      if (selectedPages.length == 0) throw new Error("please select at least one page")

      let isInvalidPages = selectedPages.some((page) => page < 0 || page > totalPages)
      if (isInvalidPages) throw new Error("invalid pages")

      let zeroBasedSelectedPages = selectedPages.map(page => page - 1)
      let pages = await extractedPDF.copyPages(pdf, zeroBasedSelectedPages);
      pages.forEach(page => extractedPDF.addPage(page));
      const extractedPdfBytes = await extractedPDF.save();
      const blob = new Blob([extractedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setdownloadFileURL(url);
      setCompletionStatus(true)
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 10000);
    } catch (error) {
      toast.error(error.message)
      setisDroped(false)
    }
    finally {
      setLoading(false)
    }
  }

  const handleExtract = async () => {
    if (!files || selectedPages.length === 0)
      return alert("Select at least one page.");
    extractPDF();
    // const formData = new FormData();
    // formData.append("file", files);
    // formData.append("pages", JSON.stringify(selectedPages));
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/extract_pdf",formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {!completionStatus && !isDroped && (
        <section className="relative pt-16 pb-6 " style={{ background: 'var(--gradient-hero)' }}>
          <div
            className="absolute top-0 left-0 right-0 -bottom-96 pointer-events-none"
            style={{ background: 'var(--gradient-glow)' }}
          />
          <div className="container pt-16 text-center">
            <FadeIn className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Free Online PDF Page Extractor
            </FadeIn>

            <h1 className="section-heading text-center">
              Extract <span className="gradient-text">PDF Pages</span> Instantly
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Combine multiple PDF documents into one — free, fast, and without quality loss
            </p>
          </div>
        </section>
      )}

      {!completionStatus && isDroped && (
        <div>
          <p className="text-center text-gray-500 text-">
            Select The Pages which you want to extract
          </p>
        </div>
      )}

      {!isDroped && (
        <div>
          <FileInput
            setFiles={setFiles}
            setisDroped={setisDroped}
            multiple={false}
            accept={{ 'application/pdf': [] }}
          />
          {/* Benefits Section */}
          <section className="container py-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
              Extract PDF pages online for free
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
                  Features of PDFtoolify - Extract PDF Pages
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Powerful tools to help you extract exactly the PDF pages you need
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
                How to extract PDF pages online?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Extract the pages you need from your PDF in just a few simple steps.
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
                      <Sparkles className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </FadeIn>
                ))}
              </div>
          </section>
          {/* FAQs Section */}
          <section className="container py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Extract PDF Pages FAQs
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Common questions about extracting pages from your PDFs
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
        </div>
      )}

      {files && isDroped && !isUploading && !completionStatus && (
        <>
          <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
            <div className="flex flex-wrap max-w-7xl justify-center mx-auto gap-8 mt-6">
              {Array.from(new Array(numPages), (el, index) => {
                const pageNum = index + 1
                const isSelected = selectedPages.includes(pageNum)
                return (
                  <div
                    key={pageNum}
                    className={`w-fit p-1 bg-white rounded-md border-gray-500 border relative  cursor-pointer transition-transform duration-200 hover:bg-gray-100`}
                    onClick={() => togglePageSelection(pageNum)}
                  >
                    <Page pageNumber={pageNum} width={200} />
                    <p className="text-center p-1">Page {pageNum}</p>
                    <div
                      className={`absolute top-0.5 right-0.5 h-6 w-6 border-1 border-gray-500 rounded-md
                    ${isSelected ? 'bg-blue-600' : 'bg-white'}`}
                    >
                      <Check color="white" className={`${isSelected ? 'block' : 'hidden'}`} />
                    </div>
                  </div>
                )
              })}
            </div>
          </Document>

          {/* button for extracting pages */}
          <div className="mt-6 text-center">
            <button
              onClick={handleExtract}
              className="bg-blue-500 text-white px-8 py-4 text-2xl rounded-md "
            >
              Extract {selectedPages.length > 0 && selectedPages.length} Selected Pages
            </button>
          </div>
        </>
      )}

      {/* progress bar and proessing */}
      {progress > 0 && progress < 100 && <ProgressBar />}
      {serverPreparing && isDroped && (
        <div className="flex flex-col items-center mt-8">
          <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
          <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {progress === 100 && isProcessing && <Processing />}

      {/* after task complete button will show */}
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Extracted PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500 active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Extracted PDF
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}
