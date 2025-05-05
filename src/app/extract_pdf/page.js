"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
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

export default function PDFDropZoneViewer() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [isDroped, setisDroped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const downloadRef = useRef();
  const dragRef = useRef();
  const [mergeStatus, setMerge] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [extractedFileURL, setExtractedFileURL] = useState(null);
  const [serverPreparing, setServerPreparing] = useState(false)

  let progress = useSelector((state) => state.fileProgress.progress);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setisDroped(true);
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setSelectedPages([]);
    }
  }, []);

 

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: false,
  });

  useEffect(() => {
    if (progress > 0) setServerPreparing(false);
  }, [progress]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const togglePageSelection = (pageNum) => {
    setSelectedPages((prevSelected) =>
      prevSelected.includes(pageNum)
        ? prevSelected.filter((n) => n !== pageNum)
        : [...prevSelected, pageNum]
    );
  };

  const handleExtract = async () => {
    if (!file || selectedPages.length === 0)
      return alert("Select at least one page.");
    setisUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pages", JSON.stringify(selectedPages));
    setServerPreparing(true)
    try {
      const response = await axios
        .post(
          "https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/extract_pdf",
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
        )
        .then(async (response) => {
          // console.log(" response is is came");

          setisUploading(false);
          setIsProcessing(false);
          setMerge(true);

          if (response) {
            const blob = response.data;
            const url = URL.createObjectURL(blob);

            // const text = await blob.text();
            // const data = JSON.parse(text);
            // console.log(data.message);

            setExtractedFileURL(url);
          } else {
            toast.error("Error extracting pdf PDFs");
          }
        })
        .catch(async (error) => {
          setisUploading(false);
          setIsProcessing(false);
          setFile({});
          setisDroped(false);
          setServerPreparing(false);
          setMerge(false)
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
        });
    } catch (error) {
      toast.error("something went wrong")
      setServerPreparing(false);
    }
  };

  return (
    <div className="p-1 mx-auto bg-[#F7F5FB] min-h-[658px]">
      {!mergeStatus && !isDroped && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Extract Pages From PDF
          </h1>
          <p className="text-center text-gray-500 text-md">
            select pages as you want to extract
          </p>
        </div>
      )}

      {!mergeStatus && isDroped && (
        <div>
          <p className="text-center text-gray-500 text-">
            Select The Pages which you want to extract
          </p>
        </div>
      )}

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

      {file && isDroped && !isUploading && !mergeStatus && (
        <>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <div className="flex flex-wrap max-w-7xl justify-center mx-auto gap-8 mt-6">
              {Array.from(new Array(numPages), (el, index) => {
                const pageNum = index + 1;
                const isSelected = selectedPages.includes(pageNum);

                return (
                  <div
                    key={pageNum}
                    className={`border-2 w-fit rounded-md cursor-pointer transition-transform duration-200 hover:scale-105 ${
                      isSelected ? "border-orange-500" : "border-gray-300"
                    }`}
                    onClick={() => togglePageSelection(pageNum)}
                  >
                    <Page pageNumber={pageNum} width={200} />
                    <p className="text-center p-1">
                      Page {pageNum} {isSelected ? "✓" : ""}
                    </p>
                  </div>
                );
              })}
            </div>
          </Document>

          {/* button for extracting pages */}
          <div className="mt-6 text-center">
            <button
              onClick={handleExtract}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
            >
              Extract Selected Pages
            </button>
          </div>
        </>
      )}

      {/* progress bar and proessing */}
      {progress > 0 && progress < 100 && <ProgressBar />}
      {serverPreparing && isDroped && (
          <div className="flex flex-col items-center mt-8">
            <p className="text-gray-700 text-md mb-2">
              Preparing Server... Please wait
            </p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      {progress === 100 && isProcessing && <Processing />}

      {/* after task complete button will show */}
      {extractedFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Extracted PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={extractedFileURL}
              download
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Extracted PDF
            </a>
          </div>
        </div>
      )}

      {/* tools show after task will complete */}
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
