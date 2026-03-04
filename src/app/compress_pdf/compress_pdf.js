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
  CircleCheck,
  CircleDashed,
  Gift,
  InfinityIcon,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  SplitIcon,
  Zap,
} from "lucide-react";
import FeaturesCard from "@/components/FeatureCard";
import Image from "next/image";
import PDFPageConponent from "@/components/PDFPageComponent";
import ToolList from "@/components/ToolList";
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const benefits = [
  "Compress PDF files quickly on any device",
  "Reduce file size while preserving document quality",
  "Secure processing with automatic file deletion",
  "No signup required — compress PDFs instantly",
  "Fast, reliable, and free PDF compression",
];

const features = [
  {
    icon: MousePointerClick,
    heading: "Easy to Use",
    paragraph:
      "Compress PDFs in just a few clicks with a clean, intuitive interface.",
  },
  {
    icon: Gift,
    heading: "Free & No Sign Up",
    paragraph:
      "Compress unlimited PDFs for free — no account, no hidden fees.",
  },
  {
    icon: InfinityIcon,
    heading: "Compress Without Limits",
    paragraph:
      "Reduce file size for single or multiple PDFs with consistent results.",
  },
  {
    icon: BadgeCheck,
    heading: "Quality Preserved",
    paragraph:
      "Maintain text clarity and layout while shrinking your PDF size.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure Compression",
    paragraph:
      "Files are processed securely and deleted automatically after completion.",
  },
  {
    icon: Zap,
    heading: "Fast & Efficient",
    paragraph:
      "Optimized compression for quick results and smooth downloads.",
  },
];

const steps = [
  {
    step: "1",
    title: "Upload PDF",
    description: "Select a PDF file or drag and drop it into the upload area.",
  },
  {
    step: "2",
    title: "Compress File",
    description: "Click the compress button to reduce file size instantly.",
  },
  {
    step: "3",
    title: "Download PDF",
    description: "Download the compressed PDF right away — fast and free.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify’s compressor free?",
    answer:
      "Yes, PDFtoolify is completely free to use. You can compress PDFs without signing up.",
  },
  {
    question: "Will compression affect PDF quality?",
    answer:
      "No, your PDF remains clear and readable. We optimize size while preserving quality.",
  },
  {
    question: "Is it safe to compress PDFs online?",
    answer:
      "Yes. Files are processed securely and deleted automatically after completion.",
  },
  {
    question: "Can I compress large PDF files?",
    answer:
      "Absolutely. PDFtoolify handles large files quickly and reliably.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. The compressor works in your browser with no downloads required.",
  },
  {
    question: "Does compression cost anything?",
    answer:
      "No, PDF compression with PDFtoolify is 100% free and unlimited.",
  },
];

function Compress() {
  let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf_file", files);
    callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/compress_pdf", formData);
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Free Online PDF Compressor
            </div>
            <h1 className="section-heading text-center">
              Compress <span className="gradient-text">PDF Files</span> Fast
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Reduce PDF size without sacrificing quality — quick, secure, and free
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

            {/* Benefits Section */}
            <section className="container py-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
                Compress PDF files online for free
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
                    Features of PDFtoolify - Compress PDF
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Powerful, safe, and fast tools to reduce your PDF size
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {features.map((feature, i) => (
                    <FeaturesCard key={i} {...feature} delay={200 + i * 100} />
                  ))}
                </div>
              </div>
            </section>

            {/* how to section */}
            <section className="container py-20">
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  How to compress a PDF file online?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Follow these simple steps to reduce your PDF file size.
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
                      <Sparkles className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs Section */}
            <section className="container py-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Compress PDF FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Answers to common questions about reducing PDF file size
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
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              <PDFPageConponent file={files}/>
            </ul>

            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                       bg-blue-500 active:bg-blue-400`}
              >
                Compress pdf
              </button>
            </div>
          </div>
        )}

        
        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
        {serverPreparing &&  isDroped && <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          }
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Compressed PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Compressed PDF
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Compress;
