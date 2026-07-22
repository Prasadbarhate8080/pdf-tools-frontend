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
import FaqSection from '@/components/FaqSection';
import HowToSection from '@/components/HowToSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BadgeCheck,
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
import PDFPageComponent from "@/components/PDFPageComponent";
import ToolList from "@/components/ToolList";
import FadeIn from "@/components/FadeIn";
import ToolHeader from "@/components/ToolHeader";
import BenefitsSection from "@/components/BenefitsSection";
import FeatureCardSection from "@/components/FeatureCardSection";
import { unlockPdfBenefits } from "@/data/benefits";
import { unlockPdfFeatures } from "@/data/features";
import { unlockPdfFaqs } from "@/data/faqs";
import { unlockPdfHowToSteps } from "@/data/howTo";
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

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
        <ToolHeader sparklesText={"Free Online PDF Unlocker"} headings={["Unlock","PDF Files","Instantly"]} text={"Remove password protection safely and download your PDF in seconds"}/>
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
              heading={"Unlock PDF files online for free"}
              benefits={unlockPdfBenefits}
            />
            <FeatureCardSection
              tool={"Unlock PDF"}
              text="Everything you need to unlock PDFs with confidence"
              features={unlockPdfFeatures}
            />
            <HowToSection
              heading={"How to unlock PDFs online?"}
              text={"Remove password protection in three simple steps"}
              steps={unlockPdfHowToSteps}
            />
            <FaqSection
              heading={"Unlock PDF FAQs"}
              text={"Common questions about our PDF unlocker"}
              faqs={unlockPdfFaqs}
            />
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
