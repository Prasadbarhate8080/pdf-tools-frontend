"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import { BadgeCheck, CircleCheck, FileType2, Gift, InfinityIcon, MousePointerClick, ShieldCheck, SplitIcon, Zap } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";


if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function WordToPdf() {


  let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf_file", files);
    callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/word_to_pdf", formData);
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Convert Word File into PDF
          </h1>
          <p className="text-center text-gray-500 md:text-md">
            Convert the Docx into PDF
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
            <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false}
            accept={{
              "application/msword": [".doc"],
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
            }}
            mode="wordFile"/>
            <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Convert Word file into PDF
            </h1>
            {/* points section */}
            <div className="flex justify-center max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">

              <div className="flex flex-col gap-2 w-xl text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Convert Word documents to PDF instantly on any device</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>PDFtoolify maintains formatting, fonts, and layout during conversion</span>
                </div>

              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Secure online conversion — your files are auto-deleted after processing</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>No signup required — convert Word files to PDF in seconds</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Fast, reliable, and free Word to PDF conversion for everyone</span>
                </div>

              </div>

            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - Word to PDF converter
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={MousePointerClick}
                heading={"Simple & Easy to Use"}
                paragraph={"Convert Word documents to PDF in just one click. PDFtoolify is built to be simple, intuitive, and beginner-friendly."}
              />

              <FeaturesCard 
                Icon={Gift}
                heading={"Free & No Sign Up"}
                paragraph={"Convert Word files to PDF online for free—no registration, no hidden costs, and no limitations."}
              />

              <FeaturesCard 
                Icon={FileType2}
                heading={"Perfect Formatting"}
                paragraph={"PDFtoolify preserves fonts, layout, images, spacing, and formatting from your original Word document without any distortion."}
              />

              <FeaturesCard 
                Icon={BadgeCheck}
                heading={"Accurate Conversion"}
                paragraph={"Enjoy high-quality and accurate document conversion with reliable results every time."}
              />

              <FeaturesCard 
                Icon={ShieldCheck}
                heading={"Secure & Private"}
                paragraph={"Your files are processed securely and automatically deleted after conversion, ensuring complete data privacy."}
              />

              <FeaturesCard 
                Icon={Zap}
                heading={"Fast & Powerful"}
                paragraph={"Convert Word to PDF in seconds with PDFtoolify’s optimized and fast processing engine."}
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
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to convert word doc into pdf?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select file or drag and drop file in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Convert to pdf by pressing convert to pdf button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Download the converted PDF by pressing Download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Word to PDF converter FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex p-3 flex-col mt-12 items-start gap-6">

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is PDFtoolify Really Free?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, PDFtoolify is completely free. You can convert Word (DOC/DOCX) files to PDF without signing up.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">How can I convert a Word file to PDF using PDFtoolify?</p>
                <p className="text-sm font-medium text-gray-800">
                  Just upload your Word document and click “Convert.” PDFtoolify will instantly turn it into a high-quality PDF.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Will the formatting change after converting to PDF?</p>
                <p className="text-sm font-medium text-gray-800">
                  No. Your text, fonts, images, spacing, and layout remain exactly the same after conversion.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is it safe to convert Word files online?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. PDFtoolify uses secure file processing, and all uploaded files are automatically deleted after conversion to protect your privacy.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Can I convert Word to PDF offline?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. You can download the Windows version of PDFtoolify to convert Word files to PDF offline.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Does converting Word to PDF cost anything?</p>
                <p className="text-sm font-medium text-gray-800">
                  No. Word to PDF conversion with PDFtoolify is completely free and unlimited.
                </p>
                <hr className="text-gray-800" />
              </div>

            </div>

          </div>
        )}

        {isDroped && !isUploading && !isProcessing && !completionStatus && (
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              <li
                className="w-[220px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                         transition-all duration-300 overflow-hidden"
              >
                <div>
                  <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                    <div className="w-[180px] h-[250px] flex flex-col items-center justify-center">
                    <Image
                      className="object-contain"
                      src="/word_logo.jpg"
                      width={130}
                      height={130}
                      alt="Picture of the author"
                    />
                    </div>
                  </div>
                </div>

                {/* File name */}
                <div className=" py-2 px-3 text-center">
                  <p
                    className="text-sm font-medium  truncate"
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
                Convert To PDF
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
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Converted PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Converted PDF
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default WordToPdf;
