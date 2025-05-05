"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function Merge() {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [isDroped, setisDroped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const downloadRef = useRef();
  const dragRef = useRef();
  const [mergeStatus, setMerge] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [mergedFileURL, setMergedFileURL] = useState("")

  let progress = useSelector((state) => state.fileProgress.progress);

  const onDrop = useCallback((acceptedFiles) => {
    const pdfFiles = acceptedFiles.filter(
      (file) => file.type === "application/pdf"
    );

    setFiles((prev) => [...prev, ...pdfFiles]);
    setisDroped(true);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisUploading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("pdf_files", files[i]);
    }

    try {
      const response = await axios
        .post("http://localhost:8000/api/v1/pdf/merge", formData, {
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
        })
        .then(async (response) => {
          setisUploading(false);
          setIsProcessing(false);
          setMerge(true);
          if (response) {
            const blob = await response.data;
            const url = URL.createObjectURL(blob);
            setMergedFileURL(url)
            
          } else {
            alert("Error merging PDFs");
          }
        })
        .catch(async (error) => {
          setisUploading(false);
          setIsProcessing(false);
          setFiles([]);
          setisDroped(false);

          if (error.response && error.response.data instanceof Blob) {
            const blob = error.response.data;
            const text = await blob.text();
            const jsonData = JSON.parse(text);

            toast.error(jsonData.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          // Server ne kuch diya hi nahi (network fail etc.)
          else if (error.request) {
            toast.error("No response from server, please try again later");
          }
          // Axios setup me hi kuch dikkat thi
          else {
            toast.error("An unexpected error occurred: " + error.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!mergeStatus && (
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
          <div
            ref={dragRef}
            {...getRootProps()}
            className={`lg:border-2 lg:border-dashed lg:border-[#568DF8]
            flex flex-col  items-center justify-center gap-4
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
                Tap to Select PDF Files
              </span>
            </div>
            <input
              {...getInputProps()}
              multiple
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
        {isDroped && !isUploading && !mergeStatus && (
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

            <div className="flex  items-center justify-center gap-4 mt-6">
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

        {progress > 0 && progress < 100 && <ProgressBar />}

        {progress === 100 && isProcessing && <Processing />}
      </form>

      {mergedFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Merged PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={mergedFileURL}
              download
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Merged PDF
            </a>
          </div>
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
      <ToastContainer />
    </div>
  );
}

export default Merge;
