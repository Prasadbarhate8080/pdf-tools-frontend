"use client";
import React, { useState, useCallback,useEffect, useRef } from "react";
import { ToastContainer,toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import Image from "next/image";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProgress } from "@/store/progressBarSlice";
import FileInput from "@/components/FileInput"; 
import { useFileUpload } from "@/hooks/useFileUpload";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function Split() {
  const [startPage, setStartPage] = useState();
  const [endPage, setEndPage] = useState();

  let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("pdf_file", files);
    formData.append("startPage", startPage);
    formData.append("endingPage", endPage);
    callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/split",formData);
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px]">
      <ToastContainer />
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Split PDF Files
          </h1>
          <p className="text-center text-gray-500 text-md">
            Take a slice of a PDF
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">  
        {!isDroped && (
          <FileInput setisDroped={setisDroped} setFiles={setFiles} multiple={false} accept= {{ "application/pdf": [] }}/>
        )}
        {isDroped && !isUploading && !completionStatus && (
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              <li
                className="w-[220px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                    transition-all duration-300 overflow-hidden "
              >
                <Document file={files}>
                  <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                    <Page pageNumber={1} width={180} />
                  </div>
                </Document>
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <input
                  type="text"
                  onChange={(e) => {
                    setStartPage(e.target.value);
                  }}
                  placeholder="start page"
                  className="border-1 indent-1.5 bg-white border-gray-600 rounded-md h-10"
                />
                <br />
                <input
                  type="text"
                  onChange={(e) => {
                    setEndPage(e.target.value);
                  }}
                  placeholder="end page"
                  className="border-1 indent-1.5 bg-white border-gray-600 rounded-md h-10"
                />
                <br />
              </div>
              <button
                disabled={!startPage || !endPage}
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                ${
                  !startPage || !endPage
                    ? "bg-[#F9AB55] cursor-not-allowed"
                    : "bg-[#F58A07] hover:bg-[#F79B2E] active:bg-[#F79B2E]"
                }`}
              >
                Split PDFs
              </button>
            </div>
          </div>
        )}
        {progress > 0 && progress < 100 && (
          <ProgressBar progress={progress} />
        )}

          {serverPreparing &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          }

        {progress === 100 && isProcessing && (
          <Processing />
        )}
      </form>
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Split PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Split PDF
            </a>
          </div>
        </div>
      )}

     
    </div>
  );
}

export default Split;
