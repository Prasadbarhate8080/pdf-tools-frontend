"use client";
import { useState, useRef, useCallback,useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";


if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

export default function RemovePDFPages() {
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);

  let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()

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

  const handleRemove = async () => {
    setTimeout(() => {
      if(serverPreparing)
        toast.info("Please refresh the page and try again");
    },12000)
    if (!files || selectedPages.length === 0)
      return alert("Select at least one page.");
    const formData = new FormData();
    formData.append("pdf_file", files);
    formData.append("pages", JSON.stringify(selectedPages));

    callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/remove_pdf_pages",formData);
  };

  return (
    <div className="p-1 mx-auto bg-[#F7F5FB] min-h-[658px]">
      {!completionStatus && !isDroped && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Remove Pages From PDF
          </h1>
          <p className="text-center text-gray-500 text-md">
            select pages as you want to remove
          </p>
        </div>
      )}

      {!completionStatus && isDroped && (
        <div>
          <p className="text-center text-gray-500 text-">
            Select The Pages which you want to remove
          </p>
        </div>
      )}

      {!isDroped && (
        <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept= {{ "application/pdf": [] }}/>
      )}

      {files && isDroped && !isUploading && !completionStatus && (
        <>
          <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
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

          {/* button for removing pages */}
          <div className="mt-6 text-center">
            <button
              onClick={handleRemove}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
            >
              Remove Selected Pages
            </button>
          </div>
        </>
      )}

      {/* progress bar and proessing */}
      {progress > 0 && progress < 100 && <ProgressBar progress={progress}/>}
      {serverPreparing &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          }
      {progress === 100 && isProcessing && <Processing />}

      {/* after task complete button will show */}
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Pages Removed PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Removed PDF
            </a>
          </div>
        </div>
      )}
      
    </div>
  );
}
