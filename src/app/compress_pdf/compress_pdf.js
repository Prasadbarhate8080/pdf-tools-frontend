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
  CircleCheck,
  CircleDashed,
  Sparkles,
  SplitIcon,
} from "lucide-react";
import FeatureCardSection from "@/components/FeatureCardSection";
import FaqSection from '@/components/FaqSection';
import HowToSection from '@/components/HowToSection';
import Image from "next/image";
import PDFPageConponent from "@/components/PDFPageComponent";
import ToolList from "@/components/ToolList";
import FadeIn from "@/components/FadeIn";
import ToolHeader from "@/components/ToolHeader";
import BenefitsSection from "@/components/BenefitsSection";
import { compressPdfBenefits } from "@/data/benefits";
import { compressPdfFeatures } from "@/data/features";
import { compressPdfFaqs } from "@/data/faqs";
import { compressPdfHowToSteps } from "@/data/howTo";
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

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
        <ToolHeader sparklesText={"Free Online PDF Compressor"} headings={["Compress","PDF Files","Fast"]} text={"Reduce PDF size without sacrificing quality — quick, secure, and free"} />
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

            <BenefitsSection
              heading={"Compress PDF files online for free"}
              benefits={compressPdfBenefits}
            />

            <FeatureCardSection
              tool={"Compress PDF"}
              text="Powerful, safe, and fast tools to reduce your PDF size"
              features={compressPdfFeatures}
            />

            <HowToSection
              heading={"How to compress a PDF file online?"}
              text={"Follow these simple steps to reduce your PDF file size."}
              steps={compressPdfHowToSteps}
            />

            <FaqSection
              heading={"Compress PDF FAQs"}
              text={"Answers to common questions about reducing PDF file size"}
              faqs={compressPdfFaqs}
            />

            <ToolList />
          </div>
        )}

        {isDroped && !isUploading && !isProcessing && !completionStatus && (
          <div className="max-w-7xl mx-auto bg-gray-100 p-10 mt-24">
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
        <div className="max-w-5xl text-center mx-auto  mt-24">
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
