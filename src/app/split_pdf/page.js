"use client";
import React, { useState, useCallback,useEffect, useRef } from "react";
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

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function Split() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [isUploading, setisUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [startPage, setStartPage] = useState();
  const [endPage, setEndPage] = useState();
  const [mergeStatus, setMerge] = useState(false);
  const dragRef = useRef();


  let progress = useSelector((state) => state.fileProgress.progress);

  const [isDroped, setisDroped] = useState(false);
  const downloadRef = useRef();

  const onDrop = useCallback((acceptedFile) => {
    const pdfFiles = acceptedFile.filter(
      (file) => file.type === "application/pdf"
    );
    setisDroped(true);
    if (pdfFiles.length > 0) {
      setFile(pdfFiles[0]);
    }
  }, []);

  //useEffects

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisUploading(true);
    const formData = new FormData();
    formData.append("pdf_file", file);
    formData.append("startPage", startPage);
    formData.append("endingPage", endPage);

    try {
      const response = await axios.post(
        "https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/split",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            dispatch(setProgress(percent));
            if (percent === 100) {
              setIsProcessing(true);
            }
          },
        }
      );
      setIsProcessing(false);
      setMerge(true);
      if (response) {
        const blob = await response.data;
        const url = URL.createObjectURL(blob);
        
        setTimeout(() => {
          if (downloadRef.current) {
            downloadRef.current.innerHTML = `
              <a href="${url}" download class="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2">
                Download Split PDF
              </a>
            `;
          }
        }, 0);
      } else {
        alert("Error merging PDFs");
      }
    }  catch (error) {
      console.error("Upload Error:", error);
    
      // 🔍 Check if server sent blob (like error JSON)
      if (error.response && error.response.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const json = JSON.parse(reader.result);
            alert(json.error || "Server error occurred.");
          } catch (e) {
            console.error("Blob parse error:", e);
            alert("Unexpected error format.");
          }
        };
        reader.readAsText(error.response.data); // ✅ This reads blob as string
      } else {
        // 🛑 Fallback for other types of errors
        alert(error.message || "Something went wrong");
      }
      setIsProcessing(false); // Ensure it's always reset
      setisDroped(false)
      setisUploading(false);
    }
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px]">
      {!mergeStatus && (
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
          <div
            ref={dragRef}
            {...getRootProps()}
            className={`lg:border-2 lg:border-dashed lg:border-[#568DF8]
                    flex flex-col justify-center  items-center gap-4
                    lg:rounded-xl p-4 max-w-fit lg:h-60 cursor-pointer text-center lg:max-w-6xl mx-auto mt-10
                    ${isDragActive ? "bg-blue-100" : "bg-[#F8FAFF]"}`}
          >
            <div className="lg:block hidden">
              <Image
                src={"/file_upload.png"}
                height={40}
                width={50}
                alt="file upload"
              ></Image>
            </div>
            <div className="lg:hidden">
              <span
                className="px-6 py-4 text-white  bg-orange-500 
                      font-bold text-2xl rounded-md"
              >
                Tap to Select PDF File
              </span>
            </div>
            <input
              {...getInputProps()}
              type="file"
              name="pdf_files"
              accept="application/pdf"
            />
            {isDragActive ? (
              <p className="text-[#568DF8]  lg:block hidden text-lg font-semibold">
                Drop the files here ...
              </p>
            ) : (
              <p className="text-[#568DF8] hidden lg:block text-lg font-semibold">
                Drag n drop some files here, or click to select files
              </p>
            )}
          </div>
        )}
        {isDroped && !isUploading && (
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              <li
                className="w-[220px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                    transition-all duration-300 overflow-hidden "
              >
                <Document file={file}>
                  <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                    <Page pageNumber={1} width={180} />
                  </div>
                </Document>
                <div className=" py-2 px-3 text-center">
                  <p
                    className="text-sm font-medium  truncate"
                    title={file.name}
                  >
                    {file.name}
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
          <ProgressBar />
        )}
        {progress === 100 && isProcessing && (
          <Processing />
        )}
      </form>
      {mergeStatus && (
        <div className="max-w-5xl mx-auto mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download split PDF
          </h1>
          <div className="mt-3 w-fit mx-auto" ref={downloadRef}></div>
        </div>
      )}

      {mergeStatus && (
        <div className="bg-[#F8ECE7] mt-30">
          <div className="p-6 flex max-w-7xl justify-center gap-8 flex-wrap mx-auto mt-10 ">
            <Link href={"/merge_pdf"}>
              <div
                className=" w-[300px] h-[130px] p-5
           bg-[#FFF]  rounded-xl hover:bg-[#F7F5FB] hover:cursor-pointer"
              >
                <div className="flex items-center">
                  <div>
                    <Image
                      src={"/merge.png"}
                      width={33}
                      height={10}
                      alt="merge pdf"
                    ></Image>
                  </div>
                  <span className="font-semibold ml-2 text-sm text-gray-600">
                    Merge PDF
                  </span>
                </div>
                <p
                  className="text-[14px] leading-[16px] 
            text-[#777] mt-3 "
                >
                  Combine multiple pages and PDFs into one
                </p>
              </div>
            </Link>

            <Link href={"/split_pdf"}>
              <div
                className=" w-[300px] h-[130px] p-5
           bg-[#FFF]  rounded-xl hover:bg-[#F7F5FB] hover:cursor-pointer"
              >
                <div className="flex items-center">
                  <div>
                    <Image
                      src={"/split.png"}
                      width={27}
                      height={10}
                      alt="merge pdf"
                    ></Image>
                  </div>
                  <span className="font-semibold ml-2 text-sm text-gray-600">
                    Split PDF
                  </span>
                </div>
                <p
                  className="text-[14px] leading-[16px] 
            text-[#777] mt-3"
                >
                  Split the PDF into two parts
                </p>
              </div>
            </Link>

            <Link href={"/extract_pdf"}>
              <div
                className=" w-[300px] h-[130px] p-5
           bg-[#FFF]  rounded-xl hover:bg-[#F7F5FB] hover:cursor-pointer"
              >
                <div className="flex items-center">
                  <div>
                    <Image
                      src={"/extract.png"}
                      width={25}
                      height={10}
                      alt="merge pdf"
                    ></Image>
                  </div>
                  <span className="font-semibold ml-2 text-sm text-gray-600">
                    Extract PDF Pages
                  </span>
                </div>
                <p
                  className="text-[14px] leading-[16px] 
            text-[#777] mt-3"
                >
                  Extract the pages from the pdf do you want
                </p>
              </div>
            </Link>

            <Link href={"/jpg_to_pdf"}>
              <div
                className=" w-[300px] h-[130px] p-5
           bg-[#FFF]  rounded-xl hover:bg-[#F7F5FB] hover:cursor-pointer"
              >
                <div className="flex items-center">
                  <div>
                    <Image
                      src={"/convert.png"}
                      width={25}
                      height={10}
                      alt="merge pdf"
                    ></Image>
                  </div>
                  <span className="font-semibold ml-2 text-sm text-gray-600">
                    JPG to PDF
                  </span>
                </div>
                <p
                  className="text-[14px] leading-[16px] 
            text-[#777] mt-3"
                >
                  Convert the pdf from JPG to PDF
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Split;
