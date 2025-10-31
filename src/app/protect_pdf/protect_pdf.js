"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import { BadgeCheck, CircleCheck, Gift, InfinityIcon, Lock, MousePointerClick, ShieldCheck, ShieldHalf, SplitIcon, Zap } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import Image from "next/image";
import PDFPageComponent from "@/components/PDFPageComponent";


if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function Protect() {
  const [password, setPassword] = useState(null);
  let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf_file", files);
    formData.append("password",password);
        callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/protect_pdf",formData)
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Protect PDF File
          </h1>
          <p className="text-center text-gray-500 md:text-md">
            Easily Protect the PDF File
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
            <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false}  accept= {{ "application/pdf": [] }}/>
            <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Protect PDF with strong password
            </h1>
            {/* points section */}
            <div className="flex justify-center max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">

              <div className="flex flex-col gap-2 w-xl text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Our free Protect PDF tool works on any device, including mobile and desktop</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Easily add a password to your PDF and secure your important documents</span>
                </div>

              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>PDFtoolify uses strong encryption to protect your PDF from unauthorized access</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>No signup required — lock your PDF files instantly online</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Protect PDFs in seconds with PDFtoolify — fast, secure, and reliable</span>
                </div>

              </div>

            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - Protect PDF
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={Lock} 
                heading="Easy to Protect" 
                paragraph="Protecting your PDF is simple and intuitive. Upload your file, set a password, and secure your document instantly."
              />

              <FeaturesCard 
                Icon={Gift} 
                heading="Free & No Sign Up" 
                paragraph="Add password protection to unlimited PDF files for free. No registration, no hidden fees—just quick and secure PDF locking."
              />

              <FeaturesCard 
                Icon={ShieldHalf} 
                heading="Strong Encryption" 
                paragraph="Your PDF is encrypted using strong security standards, ensuring your private documents stay safe from unauthorized access."
              />

              <FeaturesCard 
                Icon={BadgeCheck} 
                heading="Accurate & Reliable Protection" 
                paragraph="PDFtoolify locks your PDF without altering its content. Your formatting and layout remain exactly the same after protection."
              />

              <FeaturesCard 
                Icon={ShieldCheck} 
                heading="Secure Online Processing" 
                paragraph="All uploaded files are processed securely and deleted automatically after encryption to maintain your privacy."
              />

              <FeaturesCard 
                Icon={Zap} 
                heading="Fast & Powerful" 
                paragraph="Protect your PDF in just seconds. Our optimized engine encrypts files quickly while ensuring top-level security."
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
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to protect pdf online for free?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select file or drag and drop file in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     protect PDF file by pressing protect PDF button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Download the protected PDF by pressing Download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Protect PDF FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col p-3 mt-12 items-start gap-6">

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is PDFtoolify really free for protecting PDFs?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. PDFtoolify is completely free to use. You can lock your PDF files with a password without any signup or charges.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">How can I protect my PDF using PDFtoolify?</p>
                <p className="text-sm font-medium text-gray-800">
                  Simply upload your PDF, enter a password, and click “Protect PDF.” Your file will instantly be encrypted with strong security.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Will protecting a PDF reduce its quality?</p>
                <p className="text-sm font-medium text-gray-800">
                  No. Protecting your PDF only adds encryption. Your content, layout, text, and images remain unchanged.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is it safe to protect my PDF online?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. PDFtoolify uses secure processing, and your files are automatically deleted after encryption to ensure complete privacy.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Can I protect PDF files offline with PDFtoolify?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. You can download PDFtoolify for Windows and protect your files offline without needing internet access.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Does protecting a PDF cost anything?</p>
                <p className="text-sm font-medium text-gray-800">
                  No. Adding a password to your PDF using PDFtoolify is completely free.
                </p>
                <hr className="text-gray-800" />
              </div>

            </div>

          </div>
        )}

        {isDroped && !isUploading && !isProcessing && !completionStatus && (
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              <PDFPageComponent file={files} />
            </ul>
            <div className="text-center w-fit mx-auto mt-3">
                <label htmlFor="password" className="block w-full text-left">Enter Password</label>
                <input
                onChange={(e) => {setPassword(e.target.value)}}
                type="password" id="password" 
                className="bg-white text-gray indent-1 border-2 border-gray-500 h-8
                 hover:border-gray-700 rounded-md "
                 />
            </div>
            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                       bg-blue-500  active:bg-blue-400`}
              >
                Protect The PDF File
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
            Download Protected PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Protected PDF
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Protect;
