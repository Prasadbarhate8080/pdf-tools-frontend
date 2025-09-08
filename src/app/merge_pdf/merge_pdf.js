"use client";
import React, { useCallback, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
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

function Merge() {
  let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("pdf_files", files[i]);
    }
    callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/merge",formData);
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Merge PDF Files
          </h1>
          <p className="text-center text-gray-500 md:text-md">
            Combine Multiple PDFs into one
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {!isDroped && (
          <FileInput files={files} setFiles={setFiles} setisDroped={setisDroped} multiple={true} accept= {{ "application/pdf": [] }}/>
        )}
        {isDroped && !isUploading && !completionStatus && (
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="w-[220px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                   transition-all duration-300 overflow-hidden"
                >
                  <Document file={file}>
                    <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                      <Page pageNumber={1} width={180} />
                    </div>
                  </Document>

                  {/* File name */}
                  <div className=" py-2 px-3 text-center">
                    <p
                      className="text-sm font-medium  truncate"
                      title={file.name}
                    >
                      {file.name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                disabled={files.length < 2}
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                ${
                  files.length < 2
                    ? "bg-[#F9AB55] cursor-not-allowed"
                    : "bg-[#F58A07] hover:bg-[#F79B2E] active:bg-[#F79B2E]"
                }`}
              >
                Merge PDFs
              </button>

              {/* Add More Files Button */}
              <label
                htmlFor="addFile"
                className="w-11 h-11 flex items-center justify-center text-2xl font-bold 
               bg-[#F58A07] text-white rounded-full shadow-md cursor-pointer 
               hover:bg-[#F79B2E] active:bg-[#F79B2E] transition-all duration-300"
                title="Add more PDFs"
              >
                +
              </label>

              {/* Hidden File Input */}
              <input
                type="file"
                id="addFile"
                accept=".pdf"
                multiple
                style={{ display: "none" }}
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files);
                  const pdfFiles = newFiles.filter(
                    (file) => file.type === "application/pdf"
                  );
                  setFiles((prev) => [...prev, ...pdfFiles]);
                }}
              />
            </div>
            {/* Error Text */}
            {files.length < 2 && (
              <p className="text-red-500 text-sm text-center mt-2">
                Please select at least two PDF files.
              </p>
            )}
          </div>
        )}
        {progress > 0 && progress < 100 && <ProgressBar progress={progress}/>}

        {serverPreparing &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing server ...please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          }
        {progress === 100 && isProcessing && <Processing />}
      </form>
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Merged PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Merged PDF
            </a>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
export default Merge;
