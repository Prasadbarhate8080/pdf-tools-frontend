"use client"; // if you're using Next.js
import React, { useState } from "react";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import FaqSection from '@/components/FaqSection';
import HowToSection from '@/components/HowToSection';
import {
  Trash2,
  Sparkles,
} from "lucide-react";
import FeatureCardSection from "@/components/FeatureCardSection";
import { PDFDocument } from "pdf-lib";
import { toast } from "react-toastify";
import ToolList from "@/components/ToolList";
import FadeIn from "@/components/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ToolHeader from "@/components/ToolHeader";
import BenefitsSection from "@/components/BenefitsSection";
import { jpgToPdfBenefits } from "@/data/benefits";
import { jpgToPdfFeatures } from "@/data/features";
import { jpgToPdfFaqs } from "@/data/faqs";
import { jpgToPdfHowToSteps } from "@/data/howTo";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const JpgToPdf = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
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
  } = useFileUpload();

  async function jpgToPdf() {
    try {
      setLoading(true);
      let pdfDoc = await PDFDocument.create();
      const PAGE_WIDTH = 595.28;
      const PAGE_HEIGHT = 841.89;

      for (let img of files) {
        let ext = img.name.split(".").pop().toLowerCase();
        let imageBytes = await img.arrayBuffer();
        let image;
        if (ext == "jpg" || ext == "jpeg")
          image = await pdfDoc.embedJpg(imageBytes);
        else if (ext == "png")
          image = await pdfDoc.embedPng(imageBytes);

        if (!image) {
          toast.error("unsupported file");
          setFiles([]);
          return;
        }

        const { width: imgWidth, height: imgHeight } = image.scale(1);
        const scale = Math.min(
          PAGE_WIDTH / imgWidth,
          PAGE_HEIGHT / imgHeight,
          1
        );
        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;

        const x = (PAGE_WIDTH - drawWidth) / 2;
        const y = (PAGE_HEIGHT - drawHeight) / 2;

        const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        page.drawImage(image, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        });
      }
      const extractedPDF = await pdfDoc.save();
      const blob = new Blob([extractedPDF], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setdownloadFileURL(url);
      setCompletionStatus(true);
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 10000);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  } 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please upload images");
      return;
    }
    jpgToPdf();
    // const formData = new FormData();
    // files.forEach((file) => formData.append("images", file));
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/jpg_to_pdf",formData)
  };

  return (
    <div className="min-h-screen bg-background">
      {!completionStatus && (
        <ToolHeader sparklesText={"Free Online JPG to PDF Converter"} headings={["Create","PDF from Images"," "]} text={"Convert JPG, PNG, and JPEG images into a single high-quality PDF — free, fast, and secure."} />
      )}

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        encType="multipart/form-data"
      >
        {!isDroped && (
          <div>
            <FileInput
              setFiles={setFiles}
              setisDroped={setisDroped}
              multiple={true}
              setImages={setImages}
              mode="images"
              accept={{
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
                "image/webp": [".webp"],
              }}
            />

            <BenefitsSection
              heading={"Create PDF from JPG & PNG images online for free"}
              benefits={jpgToPdfBenefits}
            />

            <FeatureCardSection
              tool={"Create PDF"}
              text="Everything you need to turn your images into professional PDFs"
              features={jpgToPdfFeatures}
            />

            <HowToSection
              heading={"How to convert JPG to PDF online?"}
              text={"Follow these simple steps to create a PDF from your images."}
              steps={jpgToPdfHowToSteps}
            />

            <FaqSection
              heading={"Create PDF FAQs"}
              text={"Common questions about creating PDFs from images"}
              faqs={jpgToPdfFaqs}
            />
            <ToolList />
          </div>
        )}
        {isDroped && !isUploading && !completionStatus && (
          <div className="max-w-7xl mx-auto bg-gray-100 p-10 mt-24">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              {images.map((imgObj, index) => (
                <li
                  key={index}
                  className="w-[220px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                   transition-all duration-300 overflow-hidden relative"
                >
                  <div>
                    <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                      <div className="w-[200px] h-[250px] flex justify-center items-center">
                        <img
                        className="object-contain object-center"
                        src={imgObj.preview} alt={`uploaded-${index}`} />
                      </div>
                    </div>
                  </div>

                  {/* File name */}
                  <div className=" py-2 px-3 text-center">
                    <p
                      className="text-sm font-medium  truncate"
                      title={`/${imgObj.file.name}`}
                    >
                      {imgObj.file.name}
                    </p>
                  </div>
                  <div className="p-1.5 absolute top-1 right-1 bg-red-500 cursor-pointer rounded-full "
                    onClick={(e) => {
                      setImages((prev) => {
                        let array = [...prev];
                        URL.revokeObjectURL(array[index].preview);
                        array.splice(index,1);
                        return array;
                      })
                    }}
                  > <Trash2 size={22} color="white"/></div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                disabled={files.length < 1}
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                ${
                  files.length < 1
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500  active:bg-blue-400"
                }`}
              >
                Create PDF
              </button>
            </div>
          </div>
        )}

        {/* {progress > 0 && progress < 100 && <ProgressBar progress={progress}/>}
        {serverPreparing &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          } */}
        {loading && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-24">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download created PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500 active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download created PDF
            </a>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default JpgToPdf;
