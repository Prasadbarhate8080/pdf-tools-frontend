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

function PageNO() {
  const dispatch = useDispatch();
  const [file, setFile] = useState({});
  const [isDroped, setisDroped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const downloadRef = useRef();
  const dragRef = useRef();
  const [mergeStatus, setMerge] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [compressedFileURL, setCompressedFileURL] = useState(null);
  const [pageNumberAddedFileURL, setPageNumberAddedFileURL] = useState(null);
  const [page_no_position, setPage_no_position] = useState("bottom-right");
  const [serverPreparing, setServerPreparing] = useState(false)

  let progress = useSelector((state) => state.fileProgress.progress);

  useEffect(() => {
    console.log(page_no_position);
  }, [page_no_position]);

  useEffect(() => {
    if(progress > 0)
      setServerPreparing(false)    
  }, [progress])
  

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
    setTimeout(() => {
      if(serverPreparing)
        toast.info("Please refresh the page and try again");
    },12000)
    setServerPreparing(true);

    const formData = new FormData();
    formData.append("pdf_file", file);
    formData.append("page_no_position", page_no_position);

    try {
      axios
        .post("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/add_page_no", formData, {
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

            setPageNumberAddedFileURL(url);
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
            let jsonData;
            try {
              const blob = error.response.data;
              const text = await blob.text();
              jsonData = JSON.parse(text);

              toast.error(jsonData.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } catch (error) {
              toast.error("something went wrong");
            }

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
            Add Page Number To PDF
          </h1>
          <p className="text-center text-gray-500 md:text-md">
            Add Page Number To PDF File
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

            <div className="flex flex-wrap items-center justify-center gap-4 w-fit mx-auto mt-6">
              <label
                htmlFor="Page-position"
                className="text-gray-700 font-medium"
              >
                Select Position for Page Number:
              </label>

              <select
                id="Page-position"
                name="page_no_position"
                value={page_no_position}
                onChange={(e) => setPage_no_position(e.target.value)}
                className="border border-gray-400 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="top-right">Top Right</option>
                <option value="top-center">Top Center</option>
                <option value="top-left">Top Left</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-left">Bottom Left</option>
              </select>
            </div>

            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                       bg-[#F58A07] hover:bg-[#F79B2E] active:bg-[#F79B2E]`}
              >
                Add Page Numbers
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

      {pageNumberAddedFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Page Number Added PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={pageNumberAddedFileURL}
              download
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download PDF
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default PageNO;
