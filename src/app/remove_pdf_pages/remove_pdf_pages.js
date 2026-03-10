"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BadgeCheck,
  Check,
  CheckCircle,
  Download,
  Gift,
  InfinityIcon,
  Scissors,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import FeaturesCard from "@/components/FeatureCard";
import { PDFDocument } from "pdf-lib";
import ToolList from '@/components/ToolList'
import FadeIn from '@/components/FadeIn'
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const benefits = [
  "Remove unwanted pages from any PDF on any device",
  "Select exactly the pages you want to delete",
  "Secure processing with automatic file deletion",
  "No signup required — remove pages instantly",
  "Fast, accurate, and free page removal",
];

const steps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload PDF",
    description: "Select a PDF file or drag and drop it into the upload area.",
  },
  {
    icon: Scissors,
    step: "2",
    title: "Select Pages",
    description: "Click the pages you want to remove from the document.",
  },
  {
    icon: Download,
    step: "3",
    title: "Download PDF",
    description: "Get your cleaned PDF instantly — fast and free.",
  },
];

const features = [
  {
    icon: Scissors,
    heading: "Remove Pages Easily",
    paragraph:
      "Delete unwanted pages from your PDF in just a few clicks. Simple, clean, and designed for everyone to use without complications.",
  },
  {
    icon: Gift,
    heading: "Free & No Sign Up",
    paragraph:
      "Remove unlimited PDF pages online for free without creating an account. No hidden costs, no registration—just fast and easy PDF cleaning.",
  },
  {
    icon: InfinityIcon,
    heading: "Remove Without Limits",
    paragraph:
      "Delete any number of pages—from one page to multiple sections. Our tool handles everything smoothly and efficiently.",
  },
  {
    icon: BadgeCheck,
    heading: "Accurate Page Removal",
    paragraph:
      "Our PDF remover ensures precise results every time. Delete only the pages you want while keeping the rest of the document untouched.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure Online Processing",
    paragraph:
      "Your files stay private. All uploaded PDFs are auto-deleted after processing, ensuring safe and secure page removal.",
  },
  {
    icon: Zap,
    heading: "Fast & Powerful",
    paragraph:
      "Powered by optimized processing, our tool removes pages within seconds. Fast, reliable, and professional for everyday use.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify Free to Remove PDF Pages?",
    answer:
      "Yes, removing pages from your PDF is completely free on PDFtoolify. No signup or subscription required.",
  },
  {
    question: "How do I remove pages from a PDF using PDFtoolify?",
    answer:
      "Upload your PDF, select the pages you want to delete, and click “Remove Pages.” PDFtoolify will instantly generate a new cleaned PDF.",
  },
  {
    question: "Will removing pages change my PDF quality?",
    answer:
      "No. Only the selected pages are deleted—your remaining pages stay in the same original quality and format.",
  },
  {
    question: "Is it safe to remove PDF pages online?",
    answer:
      "Yes. All files are processed securely, and your PDF is automatically deleted from our servers after completion.",
  },
  {
    question: "Can I remove PDF pages offline?",
    answer:
      "Yes. You can download PDFtoolify for Windows and remove pages offline without internet access.",
  },
  {
    question: "Does removing PDF pages cost anything?",
    answer:
      "No. PDFtoolify’s page removal tool is 100% free and has no hidden charges.",
  },
];

export default function RemovePDFPages() {
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);

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

  async function removePages() {
    try {
      if (!files) throw new Error("no file selected")
      if (selectedPages.length == 0) throw new Error("please select at least one page")

      const arrayBuffer = await files.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      const totalPages = pdfDoc.getPageCount();
      // Step 3: Prepare remove set
      const removeSet = new Set(
        selectedPages
          .filter(p => typeof p === "number" && p > 0 && p <= totalPages)
          .map(p => p - 1) // Convert to 0-based
      );

      if (removeSet.size == 0) throw new Error("remove set size is zero")

      const keepPages = [];
      for (let i = 0; i < totalPages; i++) {
        if (!removeSet.has(i))
          keepPages.push(i);
      }

      if (keepPages.length == 0) throw new Error("all pages selected to remove")
      const newPdfDoc = await PDFDocument.create();
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, keepPages);
      copiedPages.forEach(p => newPdfDoc.addPage(p));
      const newPdfBytes = await newPdfDoc.save();
      const blob = new Blob([newPdfBytes], { type: "application/pdf" });
      let url = URL.createObjectURL(blob)
      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 10000);
    } catch (error) {
      // toast.error(error.message)
      console.log(error)
    }
  }

  const handleRemove = async () => {
    if (!files || selectedPages.length === 0)
      return alert("Select at least one page.");
    removePages();
    // const formData = new FormData();
    // formData.append("pdf_file", files);
    // formData.append("pages", JSON.stringify(selectedPages));
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/remove_pdf_pages",formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {!completionStatus && !isDroped && (
        <section
          className="relative pt-16 pb-6"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div
            className="absolute top-0 left-0 right-0 -bottom-96 pointer-events-none"
            style={{ background: "var(--gradient-glow)" }}
          />
          <div className="container pt-16 text-center">
            <FadeIn className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Free Online PDF Page Remover
            </FadeIn>
            <h1 className="section-heading text-center">
              Remove <span className="gradient-text">PDF Pages</span> Easily
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Delete unwanted pages quickly while keeping your PDF quality intact
            </p>
          </div>
        </section>
      )}

      {!completionStatus && isDroped && (
        <div>
          <p className="text-center text-gray-500 text-">
            Select The Pages which you want to remove
          </p>
        </div>
      )}

      {!isDroped && !completionStatus && (
        <div>
          <FileInput
            setFiles={setFiles}
            setisDroped={setisDroped}
            multiple={false}
            accept={{ "application/pdf": [] }}
          />
          <section className="container py-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
              Remove PDF pages online for free
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
          <section className="bg-muted/30">
            <div className="container py-20">
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Features of PDFtoolify
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Everything you need to remove PDF pages with confidence
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {features.map((feature, i) => (
                  <FeaturesCard key={i} {...feature} delay={200 + i * 100} />
                ))}
              </div>
            </div>
          </section>
          <section className="container py-20">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                How to remove PDF pages?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Delete pages in three simple steps
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
                Remove PDF Pages FAQs
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Common questions about removing PDF pages
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
                const pageNum = index + 1;
                const isSelected = selectedPages.includes(pageNum);
                return (
                  <div
                    key={pageNum}
                    className={`w-fit p-1 bg-white rounded-md border-gray-500 border relative  cursor-pointer transition-transform duration-200 hover:bg-gray-100`}
                    onClick={() => togglePageSelection(pageNum)}
                  >
                    <Page pageNumber={pageNum} width={200} />
                    <p className="text-center p-1">
                      Page {pageNum}
                    </p>
                    <div className={`absolute top-0.5 right-0.5 h-6 w-6 border-1 border-gray-500 rounded-md
                    ${isSelected ? "bg-blue-600" : "bg-white"}`}
                    >
                      <Check color="white" className={`${isSelected ? "block" : "hidden"}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Document>

          {/* button for removing pages */}
          <div className="mt-6 text-center">
            <button
              onClick={handleRemove}
              className="bg-blue-500 text-white px-8 py-4 text-2xl rounded-md "
            >
              Remove {selectedPages.length > 0 && selectedPages.length} Selected Pages
            </button>
          </div>
        </>
      )}

      {/* progress bar and proessing */}
      {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
      {serverPreparing && <div className="flex flex-col items-center mt-8">
        <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
        <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
      }
      {progress === 100 && isProcessing && <Processing />}

      {/* after task complete button will show */}
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Pages Removed PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500 active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Removed PDF
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
