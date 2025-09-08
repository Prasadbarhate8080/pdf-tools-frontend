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
          <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false}
          accept={{
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
            }}
          mode="wordFile"/>
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
                       bg-[#F58A07] hover:bg-[#F79B2E] active:bg-[#F79B2E]`}
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
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
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
