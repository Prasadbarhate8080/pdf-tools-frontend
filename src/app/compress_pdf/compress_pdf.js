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
import { BadgeCheck, CircleCheck, CircleDashed, Gift, InfinityIcon, MousePointerClick, ShieldCheck, SplitIcon, Zap } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import Image from "next/image";
import PDFPageConponent from "@/components/PDFPageComponent";
import ToolList from "@/components/ToolList";
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
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Compress PDF File
          </h1>
          <p className="text-center text-gray-500 md:text-md">
            Minimize the size of the pdf
          </p>
        </div>
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        encType="multipart/form-data"
      >
        {!isDroped && (
          <div>
            <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept= {{ "application/pdf": [] }}/>
            <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Compress PDF or minimize the size of the pdf
            </h1>
            {/* points section */}
            <div className="flex justify-center max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">

              <div className="flex flex-col gap-2 w-xl text-sm">
                
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Our free PDF Compressor works smoothly on all devices</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Easily reduce PDF file size without losing important quality</span>
                </div>

              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>PDFtoolify uses secure and efficient compression technology</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>No signup needed — compress PDF files instantly online</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Compress PDFs in seconds — fast, free, and reliable with PDFtoolify</span>
                </div>

              </div>

            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - Compress PDF
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={MousePointerClick} 
                heading="Simple & Easy to Use" 
                paragraph="Compressing your PDF is extremely simple. Upload your file, choose the compression level, and download a smaller, optimized PDF instantly."
              />

              <FeaturesCard 
                Icon={Gift} 
                heading="Free & No Sign Up Needed" 
                paragraph="Compress unlimited PDF files for free without creating an account. No hidden charges—just fast and effective PDF compression."
              />

              <FeaturesCard 
                Icon={CircleDashed} 
                heading="Powerful Compression Levels" 
                paragraph="Choose between standard, strong, or maximum compression to reduce file size the way you need—ideal for sharing, emailing, or uploading."
              />

              <FeaturesCard 
                Icon={BadgeCheck} 
                heading="Quality Preserved" 
                paragraph="PDFtoolify ensures your PDF retains readable text and clear images even after compression. Get smaller files without losing clarity."
              />

              <FeaturesCard 
                Icon={ShieldCheck} 
                heading="Secure Online Compression" 
                paragraph="Your privacy is protected. All uploaded PDFs are automatically deleted after processing, ensuring safe and secure compression."
              />

              <FeaturesCard 
                Icon={Zap} 
                heading="Fast & Efficient" 
                paragraph="Compress PDF files in seconds. Our optimized compression engine delivers fast, smooth, and reliable performance every time."
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
                      <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to compress pdf file onliine?</span>
                    </div>
                    <p className="whitespace-pre text-sm tracking-tighter">1.     Select file or drag and drop file in the select container</p>
                    <p className="whitespace-pre text-sm tracking-tighter">2.     Compress PDF files by pressing compress PDF button</p>
                    <p className="whitespace-pre text-sm tracking-tighter">3.     Download the compress PDF by pressing Download button</p>
                  </div>
                </div>
              </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Compress PDF FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col p-3 mt-12 items-start gap-6">

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Is PDFtoolify’s PDF Compressor free to use?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, PDFtoolify’s Compress PDF tool is completely free. You can reduce the size of unlimited PDF files without creating an account.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  How can I compress a PDF with PDFtoolify?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Just upload your PDF file, choose your preferred compression level, and click “Compress.” PDFtoolify will reduce your file size instantly.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Will the quality of my PDF reduce after compression?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  No. PDFtoolify maintains text clarity and readable quality while reducing file size. You can also choose stronger compression if needed.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Is it safe to compress PDFs online using PDFtoolify?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. Your files are processed securely, and PDFtoolify automatically deletes all uploaded PDFs after compression to ensure your privacy.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Can I compress large PDF files?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Absolutely. PDFtoolify can compress large PDFs and significantly reduce their file size without affecting essential content.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Do I need software to compress PDFs?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  No installation needed. PDFtoolify works completely online, allowing you to compress PDFs directly from your browser.
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
