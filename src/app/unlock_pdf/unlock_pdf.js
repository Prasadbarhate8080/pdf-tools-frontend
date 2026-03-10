"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BadgeCheck,
  CheckCircle,
  Download,
  Gift,
  InfinityIcon,
  KeyRound,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import FeaturesCard from "@/components/FeatureCard";
import PDFPageComponent from "@/components/PDFPageComponent";
import ToolList from "@/components/ToolList";
import FadeIn from "@/components/FadeIn";
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const benefits = [
  "Unlock PDF files instantly on any device with PDFtoolify",
  "Remove password protection easily — no technical skills required",
  "Secure processing with automatic file deletion",
  "No signup required — unlock PDFs for free",
  "Fast, reliable, and user-friendly unlocking",
];

const steps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload Locked PDF",
    description: "Select the password-protected PDF or drag and drop it here.",
  },
  {
    icon: KeyRound,
    step: "2",
    title: "Unlock the File",
    description: "Click unlock to remove password protection instantly.",
  },
  {
    icon: Download,
    step: "3",
    title: "Download PDF",
    description: "Get your unlocked PDF file right away — fast and free.",
  },
];

const features = [
  {
    icon: MousePointerClick,
    heading: "Simple & User-Friendly",
    paragraph:
      "Unlocking a PDF is extremely simple with PDFtoolify — upload your locked file, enter the password, and instantly access the unlocked version.",
  },
  {
    icon: Gift,
    heading: "Free & No Signup Required",
    paragraph:
      "Unlock secured PDF files online for free without creating an account. No hidden fees — just fast and easy PDF unlocking.",
  },
  {
    icon: KeyRound,
    heading: "Unlock Any PDF",
    paragraph:
      "Remove password protection from any PDF — whether it's for reading, copying, or printing — quickly and reliably.",
  },
  {
    icon: BadgeCheck,
    heading: "High Accuracy Decryption",
    paragraph:
      "PDFtoolify ensures accurate unlocking as long as you provide the correct password. Your PDF structure stays unchanged.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure & Private",
    paragraph:
      "We prioritize your privacy. All uploaded documents are automatically deleted after processing to ensure complete security.",
  },
  {
    icon: Zap,
    heading: "Fast Unlocking",
    paragraph:
      "Built with optimized technology, PDFtoolify unlocks secured PDF files within seconds — fast, seamless, and reliable.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify Really Free?",
    answer:
      "Yes, PDFtoolify is 100% free. You can unlock secured PDFs without signing up or paying anything.",
  },
  {
    question: "How can I unlock a PDF with PDFtoolify?",
    answer:
      "Upload your locked PDF file, enter the correct password, and click “Unlock.” PDFtoolify will instantly remove the password protection.",
  },
  {
    question: "Will unlocking my PDF affect its quality?",
    answer:
      "No, unlocking a PDF does not change its quality or formatting. Your file remains exactly the same—just without the password.",
  },
  {
    question: "Is it safe to unlock PDFs online?",
    answer:
      "Yes. PDFtoolify uses secure processing, and all uploaded files are automatically deleted after completion for maximum privacy.",
  },
  {
    question: "Can I unlock PDFs offline with PDFtoolify?",
    answer:
      "Yes. You can download the Windows app and unlock PDFs even without an internet connection.",
  },
  {
    question: "Does unlocking PDFs cost anything?",
    answer:
      "No, unlocking PDF files with PDFtoolify is completely free and unlimited.",
  },
];

function Unlock() {

    let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf_file", files);

   
    callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/unlock_pdf", formData);
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
                Free Online PDF Unlocker
              </FadeIn>
            <h1 className="section-heading text-center">
              Unlock <span className="gradient-text">PDF Files</span> Instantly
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Remove password protection safely and download your PDF in seconds
            </p>
          </div>
        </section>
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        encType="multipart/form-data"
      >
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
                Unlock PDF files online for free
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
                    Everything you need to unlock PDFs with confidence
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
                  How to unlock PDFs online?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Remove password protection in three simple steps
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
                  Unlock PDF FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Common questions about our PDF unlocker
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

        {isDroped && !isUploading && !isProcessing && !completionStatus && (
          <div className="max-w-7xl mx-auto bg-gray-100 p-10 mt-24">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              <PDFPageComponent file={files} />
            </ul>

            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                       bg-blue-500  active:bg-blue-400`}
              >
                Unlock The PDF File
              </button>
            </div>
          </div>
        )}

        
        {progress > 0 && progress < 100 && <ProgressBar progress={progress}/>}
        {serverPreparing &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          }
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-24">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Unlocked PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
            Download Unlocked PDF
            </a>
          </div>    
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Unlock;
