"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import { BadgeCheck, CircleCheck, Gift,  ShieldCheck, Zap,SplitSquareHorizontal,GalleryHorizontalEnd   } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import PDFPageComponent from "@/components/PDFPageComponent";
import JSZip from "jszip";
import ToolList from "@/components/ToolList";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function PDFToJPG() {
  const [numPages, setnumPages] = useState(0)
  const [loading, setLoading] = useState(false)
   let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi,setdownloadFileURL,setCompletionStatus
      } = useFileUpload()
    
  function onDocumentLoadSuccess ({numPages}) {
    setnumPages(numPages)
  }

  async function convertToJpg () {
    try {
      if(!numPages) return
      setLoading(true)
      const zip = new JSZip();
      
      const canvases = document.querySelectorAll(".react-pdf__Page canvas");
      canvases.forEach((canvas, i) => {
      const imageData = canvas.toDataURL("image/jpeg", 1.0);
      const base64Data = imageData.split(",")[1];
      zip.file(`page_${i + 1}.jpg`, base64Data, { base64: true });
    });
      const zipBlob = await zip.generateAsync({type:"blob"})
      let url = URL.createObjectURL(zipBlob)
      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    convertToJpg();
    // const formData = new FormData();
    // formData.append("f1", files);
    
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/pdf_to_jpg", formData);
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            PDF to JPG
          </h1>
          <p className="text-center text-gray-500 md:text-md">
          Convert PDF into JPG images
          </p>
        </div>
      )}
      {isDroped && files &&  <Document
      className={""}
      file={files} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages),(el,index) => (
          <div key={index} className="hidden">
            <Page
              key={index}
              pageNumber={index + 1}
            ></Page>
          </div>
        ))}
      </Document>}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        encType="multipart/form-data"
      >
        {!isDroped && (
          <div>
            <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept={{"application/pdf":[]}}/>
            <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Convert PDF into jpg images
            </h1>
            {/* points section */}
            <div className="flex justify-center max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">
  
              <div className="flex flex-col gap-2 w-xl text-sm">
                
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Our free PDF to JPG converter works smoothly on any device</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Easily convert any PDF page into a high-quality JPG image</span>
                </div>

              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>PDFtoolify ensures safe and secure PDF to image conversion</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>No signup required — convert PDF pages to JPG instantly</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Convert PDFs to JPG images in seconds — fast, free, and reliable</span>
                </div>

              </div>

            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - PDF to jpg
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={SplitSquareHorizontal} 
                heading="Easy Page-to-Image Conversion" 
                paragraph="Convert your PDF pages into high-quality JPG images instantly. The tool is simple, intuitive, and perfect for everyone."
              />

              <FeaturesCard 
                Icon={Gift} 
                heading="Free & No Sign Up Needed" 
                paragraph="Convert PDFs to JPG images absolutely free. No hidden charges, no login—just upload your PDF and download your JPGs instantly."
              />

              <FeaturesCard 
                Icon={GalleryHorizontalEnd} 
                heading="Convert Unlimited Pages" 
                paragraph="Whether you want to convert a single page or an entire PDF, our tool handles multiple page conversions quickly and smoothly."
              />

              <FeaturesCard 
                Icon={BadgeCheck} 
                heading="High-Quality JPG Output" 
                paragraph="Every JPG image is generated with sharp clarity and accurate rendering. No quality loss during PDF-to-image conversion."
              />

              <FeaturesCard 
                Icon={ShieldCheck} 
                heading="Safe & Private Conversion" 
                paragraph="Your files remain secure and are deleted automatically after processing. Enjoy worry-free and private PDF to JPG conversion."
              />

              <FeaturesCard 
                Icon={Zap} 
                heading="Fast & Efficient Processing" 
                paragraph="Our optimized engine converts PDF pages to JPGs within seconds—fast, reliable, and perfect for professional use."
              />

            </div>

            {/* how to section */}
            <div className="flex max-w-7xl justify-center md:gap-20 gap-4 items-center flex-wrap mx-auto mt-24 text-gray-800">
              <div className="flex relative w-[370px] h-[300px] md:w-[560px] md:h-[360px] justify-center items-center">
                <Image
                fill
                src={"/how_to_merge.png"}
                alt="how to merge pdf online"
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 items-center">
                    <span className="md:w-5 md:h-5 w-4 h-4 rounded-md bg-black inline-block"></span> 
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to convert pdf into jpg images?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select files or drag and drop files in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Merge PDF files by pressing merge PDF button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Download the Merged PDFs by pressing Download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">PDF to jpg converter FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col p-3 mt-12 items-start gap-6">

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Is PDFtoolify’s PDF to JPG converter free?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, PDFtoolify is completely free to use. You can convert any PDF page into a JPG image without creating an account.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  How can I convert a PDF to JPG using PDFtoolify?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Just upload your PDF file, and click “Convert to JPG.” PDFtoolify will instantly turn each PDF page into a high-quality JPG image.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Will the image quality change after conversion?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  No. The JPG images maintain excellent clarity and resolution. PDFtoolify ensures your output remains sharp and accurate.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Is it safe to convert PDF files to JPG online?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. Your files are processed securely, and PDFtoolify automatically deletes all PDFs and images after the conversion is completed.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Can I convert all pages of a PDF to JPG?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Absolutely. You can convert a single page or all pages of a PDF—PDFtoolify handles multi-page conversion with ease.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Does converting PDF to JPG cost anything?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  No, PDF to JPG conversion on PDFtoolify is completely free—no hidden fees or subscription required.
                </p>
                <hr className="text-gray-800" />
              </div>

            </div>
            <ToolList />
          </div>
        )}

        {isDroped && !isUploading && !isProcessing && !completionStatus && (
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              <PDFPageComponent file={files} />
            </ul>

            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                 bg-blue-500  active:bg-blue-400`}
              >
                Convert To JPG
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
            Download JPG Images 
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download="converted_images.zip"
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Zip File
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default PDFToJPG;
