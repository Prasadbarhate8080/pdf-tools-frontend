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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProgress } from "@/store/progressBarSlice";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function page() {
  const dispatch = useDispatch();
  const [file, setFile] = useState({});
  const [isDroped, setisDroped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const downloadRef = useRef();
  const dragRef = useRef();
  const [mergeStatus, setMerge] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [compressedFileURL, setCompressedFileURL] = useState(null);

  let progress = useSelector((state) => state.fileProgress.progress);

  useEffect(() => {
    console.log(mergeStatus, isDroped);
  }, [isDroped, mergeStatus]);

  const onDrop = useCallback((acceptedFiles) => {
    // accepted file is an array
    setisDroped(true);
    setFile(acceptedFiles[0]);

    if (acceptedFiles[0].type != "application/pdf") {
      toast.error("please upload pdf file");
      setisDroped(false);
      setFile({});
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("inside handle submit");

    const formData = new FormData();
    formData.append("pdf_file", file);
    try {
      axios
        .post("http://localhost:8000/api/v1/pdf/compress_pdf", formData, {
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
          // console.log(" response is is came");
          console.log(response);

          setisUploading(false);
          setIsProcessing(false);
          setMerge(true);
          if (response) {
            const blob = response.data;
            const url = URL.createObjectURL(blob);

            // const text = await blob.text();
            // const data = JSON.parse(text);
            // console.log(data.message);

            setCompressedFileURL(url);
          } else {
            toast.error("Error compressing pdf PDFs");
          }
        })
        .catch(async (error) => {
          setisUploading(false);
          setIsProcessing(false);
          setFile({});
          setisDroped(false);
          // Server ne kuch response diya (error ke saath)
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
            // console.log(data.message);

            // const reader = new FileReader();

            // reader.onload = () => {
            //   const text = reader.result;
            //   console.log("❌ Server error response as text:", text);
            // };

            // reader.readAsText(error.response.data);
          }
          // Server ne kuch diya hi nahi (network fail etc.)
          else if (error.request) {
            console.log("❌ No response from server:", error.request);
          }
          // Axios setup me hi kuch dikkat thi
          else {
            console.log("❌ Axios error:", error.message);
          }
          ``;
        });
    } catch (error) {
      toast.error("there is the error  in compressing the pdf");
    }
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!mergeStatus && (
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
                Tap to Select PDF File
              </span>
            </div>
            <input
              {...getInputProps()}
              type="file"
              name="pdf_file"
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

        {isDroped && !isUploading && !isProcessing && !mergeStatus && (
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              <li
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
            </ul>

            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                       bg-[#F58A07] hover:bg-[#F79B2E] active:bg-[#F79B2E]`}
              >
                Compress pdf
              </button>
            </div>
          </div>
        )}

        
        {progress > 0 && progress < 100 && <ProgressBar />}

        {progress === 100 && isProcessing && <Processing />}
      </form>

      {compressedFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Compressed PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={compressedFileURL}
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

export default page;
