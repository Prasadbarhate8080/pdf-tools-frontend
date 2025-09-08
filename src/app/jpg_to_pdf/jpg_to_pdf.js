"use client"; // if you're using Next.js

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProgress } from "@/store/progressBarSlice";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";



if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const JpgToPdf = () => {
  const [images, setImages] = useState([]);
    let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()
  
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

useEffect(() => {
  console.log(files);
  
}, [files])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please upload images");
      return;
    }
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/jpg_to_pdf",formData)
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px]">
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Make a PDF from images
          </h1>
          <p className="text-center text-gray-500 text-md">
            Make the PDF from any jpg, png images
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
          <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={true} setImages={setImages}
            accept= {{
              "image/jpeg": [".jpg", ".jpeg"],
              "image/png": [".png"],
              "image/webp": [".webp"],
            }}
          />
        )}
        {isDroped && !isUploading && !completionStatus && (
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              {images.map((imgObj, idx) => (
                <li
                  key={idx}
                  className="w-[220px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                   transition-all duration-300 overflow-hidden"
                >
                  <div>
                    <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                      <div className="w-[200px] h-[250px]">
                        <img
                        className="object-contain"
                        src={imgObj.preview} alt={`uploaded-${idx}`} />
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
                    ? "bg-[#F9AB55] cursor-not-allowed"
                    : "bg-[#F58A07] hover:bg-[#F79B2E] active:bg-[#F79B2E]"
                }`}
              >
                Create PDF
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
            Download created PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
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
