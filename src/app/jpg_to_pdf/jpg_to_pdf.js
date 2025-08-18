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



if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const JpgToPdf = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [isDroped, setisDroped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const downloadRef = useRef();
  const dragRef = useRef();
  const [mergeStatus, setMerge] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [createdPDFURL, setCreatedPDFURL] = useState(false);
  const [serverPreparing, setServerPreparing] = useState(false)

  let progress = useSelector((state) => state.fileProgress.progress);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    setisDroped(true);

    const imagePreviews = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...imagePreviews]);
  }, []);

 useEffect(() => {
    if(progress > 0)
      setServerPreparing(false)    
  }, [progress])

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    onDrop,
    multiple: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      if(serverPreparing)
        toast.info("Please refresh the page and try again");
    },12000)
    setServerPreparing(true);
    setisUploading(true);

    if (files.length === 0) {
      alert("Please upload images");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const response = await axios.post(
        "https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/jpg_to_pdf",
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
      setisUploading(false);
      setMerge(true);
      console.log(response);

      if (response) {
        const blob = await response.data;
        const url = URL.createObjectURL(blob);
        setCreatedPDFURL(url)
      } else {
        alert("Error merging PDFs");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px]">
      {!mergeStatus && (
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
                Tap to Select Images
              </span>
            </div>

            <input {...getInputProps()} multiple type="file" name="pdf_files" />
            {isDragActive ? (
              <p className="text-[#568DF8] hidden lg:block  text-lg font-semibold">
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

        {progress > 0 && progress < 100 && <ProgressBar />}
        {serverPreparing &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          }
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {createdPDFURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Extracted PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={createdPDFURL}
              download
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Extracted PDF
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
    </div>
  );
};

export default JpgToPdf;
