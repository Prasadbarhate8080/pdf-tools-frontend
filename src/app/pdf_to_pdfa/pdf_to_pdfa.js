"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
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
  CheckCircle,
  Download,
  FileCheck2,
  Gift,
  InfinityIcon,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import FeaturesCard from "@/components/FeatureCard";
import ToolList from "@/components/ToolList";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const benefits = [
  "Convert your PDF files to archival-safe PDF/A format on any device",
  "ISO-compliant PDF/A output for long-term preservation",
  "Secure processing with automatic file deletion",
  "No signup required — convert PDF to PDF/A instantly",
  "Fast, accurate, and compliant conversions",
];

const steps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload PDF",
    description: "Select the PDF file you want to convert to PDF/A.",
  },
  {
    icon: FileCheck2,
    step: "2",
    title: "Convert to PDF/A",
    description: "Click convert to generate a compliant PDF/A document.",
  },
  {
    icon: Download,
    step: "3",
    title: "Download File",
    description: "Download your PDF/A file instantly — fast and free.",
  },
];

const features = [
  {
    icon: MousePointerClick,
    heading: "Simple & Easy to Use",
    paragraph:
      "Designed to be intuitive and beginner-friendly — anyone can convert their PDF files to PDF/A format in just a few clicks.",
  },
  {
    icon: Gift,
    heading: "Free & No Signup",
    paragraph:
      "Convert unlimited PDF files to PDF/A online for free. No account creation, no hidden charges — fast and effortless conversion.",
  },
  {
    icon: FileCheck2,
    heading: "PDF/A Compliant Output",
    paragraph:
      "Ensure long-term archiving with accurate PDF/A conversion. Your files remain readable, structured, and standardized for future use.",
  },
  {
    icon: BadgeCheck,
    heading: "Preserves Original Quality",
    paragraph:
      "PDFtoolify maintains layouts, fonts, colors, and formatting while generating a fully PDF/A compliant file.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure Conversion",
    paragraph:
      "Your files are processed securely, and all documents are automatically deleted after conversion for maximum privacy.",
  },
  {
    icon: Zap,
    heading: "Fast & Efficient",
    paragraph:
      "Powered by advanced technology, the converter processes your files quickly — get your PDF/A output within seconds.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify Really Free?",
    answer:
      "Yes, PDFtoolify is completely free. You can convert your regular PDF files to PDF/A format without any signup.",
  },
  {
    question: "How can I convert a PDF to PDF/A using PDFtoolify?",
    answer:
      "Upload your PDF file and click “Convert to PDF/A.” PDFtoolify will automatically generate a fully compliant PDF/A document for long-term archiving.",
  },
  {
    question: "Will PDF/A conversion change my file quality?",
    answer:
      "No, the conversion preserves your documents fonts, layout, and formatting while ensuring PDF/A compliance for future readability.",
  },
  {
    question: "Is it safe to convert my PDF to PDF/A online?",
    answer:
      "Yes. PDFtoolify processes your files securely, and all uploaded documents are automatically deleted after conversion to protect your privacy.",
  },
  {
    question: "Can I convert to PDF/A offline?",
    answer:
      "Yes. You can download the Windows version of PDFtoolify to convert PDF files to PDF/A even without an internet connection.",
  },
  {
    question: "Does converting to PDF/A cost anything?",
    answer:
      "No, converting PDFs to PDF/A using PDFtoolify is completely free and unlimited.",
  },
];

function Pdfa() {
    let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()
 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
        const formData = new FormData();
        formData.append("pdf_file", files);

    callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/pdf_to_pdfa", formData);
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
              Free Online PDF to PDF/A Converter
            </div>
            <h1 className="section-heading text-center">
              Convert <span className="gradient-text">PDF to PDF/A</span> Securely
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Create archive-ready PDF/A files in seconds — fast, compliant, and free
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
                Convert PDF to PDF/A online for free
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
            <section className="bg-muted/30">
              <div className="container py-20">
                <div className="text-center mb-14">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                    Features of PDFtoolify
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Everything you need for compliant PDF/A conversion
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
                  How to convert PDF to PDF/A?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Follow three simple steps to archive your PDF
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
            <section className="container py-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  PDF to PDF/A FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Common questions about PDF/A conversion
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
              <li
                className="w-[220px] h-[300px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                  transition-all duration-300 overflow-hidden"
              >
                <div className="px-4 pt-4 pb-1 w-full h-full flex flex-col items-center justify-center">
                  <Image
                    src={"/pdf_logo.png"}
                    width={190}
                    height={100}
                    alt="PDFtoolify"
                  />
                </div>
                {/* File name */}
                <div className=" py-2 px-3 text-center">
                  <p
                    className="text-sm font-medium truncate"
                    title={files.name}
                  >
                    {files.name}
                  </p>
                </div>
              </li>
            </ul>

            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                       bg-blue-500  active:bg-blue-400`}
              >
                Convert To PDFA
              </button>
            </div>
          </div>
        )}

        
        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
        {serverPreparing && isDroped &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          }
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download PDFA File
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
            Download PDFA File
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Pdfa;
