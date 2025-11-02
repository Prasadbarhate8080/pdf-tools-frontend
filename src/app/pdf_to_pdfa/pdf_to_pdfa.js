"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";
import { BadgeCheck, CircleCheck, FileCheck2, Gift, InfinityIcon, MousePointerClick, ShieldCheck, SplitIcon, Zap } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import ToolList from "@/components/ToolList";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function Pdfa() {
    let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()
 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
        const formData = new FormData();
        formData.append("pdf_file", files);

    callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/pdf_to_pdfa", formData);
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Convert PDF To PDFA
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
          <div>
            <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept= {{ "application/pdf": [] }}/>
            <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Covert the PDF into PDFA
            </h1>
            {/* points section */}
            <div className="flex justify-center max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">

              <div className="flex flex-col gap-2 w-xl text-sm">
                
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Convert your PDF files to archival-safe PDF/A format on any device</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>PDFtoolify ensures long-term preservation by creating ISO-standard PDF/A files</span>
                </div>

              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Secure and reliable — your files are deleted automatically after conversion</span>
                </div>  

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>No signup required — convert PDF to PDF/A instantly online</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Fast, accurate, and compliant PDF/A conversion with PDFtoolify</span>
                </div>

              </div>

            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - PDF to PDFA
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={MousePointerClick}
                heading={"Simple & Easy to Use"}
                paragraph={
                  "Designed to be intuitive and beginner-friendly — anyone can convert their PDF files to PDF/A format in just a few clicks."
                }
              />

              <FeaturesCard 
                Icon={Gift}
                heading={"Free & No Signup"}
                paragraph={
                  "Convert unlimited PDF files to PDF/A online for free. No account creation, no hidden charges — fast and effortless conversion."
                }
              />

              <FeaturesCard 
                Icon={FileCheck2}
                heading={"PDF/A Compliant Output"}
                paragraph={
                  "Ensure long-term archiving with accurate PDF/A conversion. Your files remain readable, structured, and standardized for future use."
                }
              />

              <FeaturesCard 
                Icon={BadgeCheck}
                heading={"Preserves Original Quality"}
                paragraph={
                  "PDFtoolify maintains layouts, fonts, colors, and formatting while generating a fully PDF/A compliant file."
                }
              />

              <FeaturesCard 
                Icon={ShieldCheck}
                heading={"Secure Conversion"}
                paragraph={
                  "Your files are processed securely, and all documents are automatically deleted after conversion for maximum privacy."
                }
              />

              <FeaturesCard 
                Icon={Zap}
                heading={"Fast & Efficient"}
                paragraph={
                  "Powered by advanced technology, the converter processes your files quickly — get your PDF/A output within seconds."
                }
              />

            </div>

            {/* how to section */}
            <div className="flex max-w-7xl justify-center md:gap-20 gap-4 items-center flex-wrap mx-auto mt-24 text-gray-800">
              <div className="flex relative w-[370px] h-[300px] md:w-[560px] md:h-[360px] justify-center items-center">
                <Image
                fill
                src={"/how_to_merge.png"}
                alt="how to merge pdf online"
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 items-center">
                    <span className="md:w-5 md:h-5 w-4 h-4 rounded-md bg-black inline-block"></span> 
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to convert PDF to PDFA?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select file or drag and drop file in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Convert to PDFA by pressing convert to PDFA button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Download the Merged PDFs by pressing Download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center p-3 text-gray-800 mt-24">PDF to PDFA converter FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col mt-12 items-start gap-6">

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is PDFtoolify Really Free?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, PDFtoolify is completely free. You can convert your regular PDF files to PDF/A format without any signup.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">How can I convert a PDF to PDF/A using PDFtoolify?</p>
                <p className="text-sm font-medium text-gray-800">
                  Upload your PDF file and click “Convert to PDF/A.” PDFtoolify will automatically generate a fully compliant PDF/A document for long-term archiving.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Will PDF/A conversion change my file quality?</p>
                <p className="text-sm font-medium text-gray-800">
                  No, the conversion preserves your document's fonts, layout, and formatting while ensuring PDF/A compliance for future readability.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is it safe to convert my PDF to PDF/A online?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. PDFtoolify processes your files securely, and all uploaded documents are automatically deleted after conversion to protect your privacy.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Can I convert to PDF/A offline?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. You can download the Windows version of PDFtoolify to convert PDF files to PDF/A even without an internet connection.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Does converting to PDF/A cost anything?</p>
                <p className="text-sm font-medium text-gray-800">
                  No, converting PDFs to PDF/A using PDFtoolify is completely free and unlimited.
                </p>
                <hr className="text-gray-800" />
              </div>

            </div>
            <ToolList />
          </div>
        )}

        {isDroped && !isUploading && !isProcessing && !completionStatus && (
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              <li
                className="w-[220px] h-[300px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                  transition-all duration-300 overflow-hidden"
              >
                <div className="px-4 pt-4 pb-1 w-full h-full flex flex-col items-center justify-center">
                  <Image
                    src={"/pdf_logo.png"}
                    width={190}
                    height={100}
                    alt="PDFtoolify"
                  />
                </div>
                {/* File name */}
                <div className=" py-2 px-3 text-center">
                  <p
                    className="text-sm font-medium truncate"
                    title={files.name}
                  >
                    {files.name}
                  </p>
                </div>
              </li>
            </ul>

            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                       bg-blue-500  active:bg-blue-400`}
              >
                Convert To PDFA
              </button>
            </div>
          </div>
        )}

        
        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
        {serverPreparing && isDroped &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          }
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download PDFA File
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
            Download PDFA File
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Pdfa;
