"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import { BadgeCheck, CircleCheck, Gift, InfinityIcon, KeyRound, MousePointerClick, ShieldCheck, SplitIcon, Zap } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import PDFPageComponent from "@/components/PDFPageComponent";
import ToolList from "@/components/ToolList";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function Unlock() {

    let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf_file", files);

   
    callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/unlock_pdf", formData);
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Unlock PDF File
          </h1>
          <p className="text-center text-gray-500 md:text-md">
            Easily unlock the PDF File
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
            <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept={{"application/pdf": []}} />
            <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Unlock PDF from a password
            </h1>
            {/* points section */}
            <div className="flex justify-center max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">

              <div className="flex flex-col gap-2 w-xl text-sm">
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>Unlock PDF files instantly on any device with PDFtoolify</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>Remove PDF password protection easily — no technical skills required</span>
                </div>
              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>PDFtoolify is secure and private — your files are deleted automatically</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>No signup required — unlock your PDF online for free</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>Unlock PDFs in seconds — fast, reliable, and user-friendly</span>
                </div>

              </div>

            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - unlock PDF
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={MousePointerClick} 
                heading={"Simple & User-Friendly"} 
                paragraph={"Unlocking a PDF is extremely simple with PDFtoolify — upload your locked file, enter the password, and instantly access the unlocked version."}
              />

              <FeaturesCard 
                Icon={Gift} 
                heading={"Free & No Signup Required"} 
                paragraph={"Unlock secured PDF files online for free without creating an account. No hidden fees — just fast and easy PDF unlocking."}
              />

              <FeaturesCard 
                Icon={KeyRound} 
                heading={"Unlock Any PDF"} 
                paragraph={"Remove password protection from any PDF — whether it's for reading, copying, or printing — quickly and reliably."}
              />

              <FeaturesCard 
                Icon={BadgeCheck} 
                heading={"High Accuracy Decryption"} 
                paragraph={"PDFtoolify ensures accurate unlocking as long as you provide the correct password. Your PDF structure stays unchanged."}
              />

              <FeaturesCard 
                Icon={ShieldCheck} 
                heading={"Secure & Private"} 
                paragraph={"We prioritize your privacy. All uploaded documents are automatically deleted after processing to ensure complete security."}
              />

              <FeaturesCard 
                Icon={Zap} 
                heading={"Fast Unlocking"} 
                paragraph={"Built with optimized technology, PDFtoolify unlocks secured PDF files within seconds — fast, seamless, and reliable."}
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
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to unlock pdf online for free?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select file or drag and drop file in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Unlock PDF file by pressing unlock PDF button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Download the unlocked PDF by pressing Download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Unlock PDF FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col p-3 mt-12 items-start gap-6">

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is PDFtoolify Really Free?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, PDFtoolify is 100% free. You can unlock secured PDFs without signing up or paying anything.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">How can I unlock a PDF with PDFtoolify?</p>
                <p className="text-sm font-medium text-gray-800">
                  Upload your locked PDF file, enter the correct password, and click “Unlock.” PDFtoolify will instantly remove the password protection.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Will unlocking my PDF affect its quality?</p>
                <p className="text-sm font-medium text-gray-800">
                  No, unlocking a PDF does not change its quality or formatting. Your file remains exactly the same—just without the password.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is it safe to unlock PDFs online?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. PDFtoolify uses secure processing, and all uploaded files are automatically deleted after completion for maximum privacy.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Can I unlock PDFs offline with PDFtoolify?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. You can download the Windows app and unlock PDFs even without an internet connection.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Does unlocking PDFs cost anything?</p>
                <p className="text-sm font-medium text-gray-800">
                  No, unlocking PDF files with PDFtoolify is completely free and unlimited.
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
              <PDFPageComponent file={files} />
            </ul>

            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                       bg-blue-500  active:bg-blue-400`}
              >
                Unlock The PDF File
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
            Download Unlocked PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
            Download Unlocked PDF
            </a>
          </div>    
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Unlock;
