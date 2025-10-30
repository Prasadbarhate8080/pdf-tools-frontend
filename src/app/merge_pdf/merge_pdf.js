"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";
import { BadgeCheck, CircleCheck, Gift, InfinityIcon, MergeIcon, MousePointerClick, ShieldCheck, Zap } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import Image from "next/image";
import { PDFDocument } from "pdf-lib";
import PDFPageComponent from "@/components/PDFPageComponent";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function Merge() {
  const [loading,setLoading] = useState(false)
  let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setCompletionStatus,setisDroped,setFiles,callApi,setdownloadFileURL
      } = useFileUpload()
    
    // let mergePdf = useCallback(
    // async () => {
    //   try {
    //   setLoading(true)
    //   const mergedPdf = await PDFDocument.create();
    //   for(const file of files)
    //   {
    //     const arrayBuffer = await file.arrayBuffer();
    //     const pdf = await PDFDocument.load(arrayBuffer)
    //     const pages = await mergedPdf.copyPages(pdf,pdf.getPageIndices())
    //     pages.forEach((page) => {mergedPdf.addPage(page)})
    //   }
    //   let mergedPdfBytes = await mergedPdf.save();
    //   const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    //   const url = URL.createObjectURL(blob);
    //   setdownloadFileURL(url);
    //   setCompletionStatus(true)

    // } catch (error) { 
    //   // toast.error(error)
    //   console.log(error);
    // }
    // finally{
    //   setLoading(false)
    //   setisDroped(false)
    //   setFiles([]);
    // }
    // },[])
      
    let mergePdf = async () => {
      try {
        setLoading(true)
        const mergedPdf = await PDFDocument.create();
        for(const file of files)
        {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer)
          const pages = await mergedPdf.copyPages(pdf,pdf.getPageIndices())
          pages.forEach((page) => {mergedPdf.addPage(page)})
        }
        let mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setdownloadFileURL(url);
        setCompletionStatus(true)
        setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 10000);
      }
      catch (error) { 
        toast.error(error)
        setisDroped(false)
        setFiles([]);
      }
      finally{
        setLoading(false)
        setFiles([]);
      }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    mergePdf();
    // const formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //   formData.append("pdf_files", files[i]);
    // }
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/merge",formData);
  };

  return (
    <div className="mx-auto p-1  min-h-[658px] ">
      {!completionStatus && (
        <div>
          <h1 className="mt-12 text-3xl flex justify-center items-center gap-4 md:text-4xl font-bold text-gray-800">
            <MergeIcon color="gray" size={35} strokeWidth={2} /> Merge PDFs
          </h1>
          <p className="text-center text-gray-500 mt-2 md:text-md">
            Free to combine multiple PDF documents into one without quality loss
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {!isDroped && !completionStatus &&(
          <div>
            <FileInput files={files} setFiles={setFiles} setisDroped={setisDroped} multiple={true} accept= {{ "application/pdf": [] }}/>
            <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">Merge PDF files online for free</h1>
            {/* points section */}
            <div className="flex justify-center  max-w-7xl mt-6 mx-auto flex-wrap gap-4">
              <div className="flex flex-col gap-2 w-xl text-sm">
                <div className="flex  gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>Our free PDF merger can be work on any device </span>
                </div>
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>Using PDFtoolify Merge tool you can easily combine PDF files</span>
                </div>
              </div>
              <div className="w-xl flex flex-col gap-2 text-sm">
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>PDFtoolify is secure and easy to use tool for PDF related operations</span>
                </div>  
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>No SignUp require to merge PDF online</span>
                </div>
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>Combine PDFs in seconds with PDFtoolify — free, fast, and secure.</span>
                </div>
              </div>
            </div>
            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Features of PDFtoolify</h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">
              <FeaturesCard Icon={MousePointerClick } heading={"Easy to Use"} 
                paragraph={"Design to be simple and intutive to be everyone anyone can be easily use this tool and make his work simple"}
              />
              <FeaturesCard Icon={Gift } heading={"Free & No Sign Up"}
                paragraph={"Merge unlimited PDF files online for free without creating an account. No hidden charges, no registration—just a quick and hassle-free PDF merging experience."}
              />
              <FeaturesCard Icon={InfinityIcon } heading={"PDF Merger With No Limit"}
                paragraph={"Combine as many PDF files as you want without restrictions. Whether its dozens of times, our tool handles it all with ease and speed"}
              />
              <FeaturesCard Icon={BadgeCheck} heading={"Reliable PDF Merging"}
                paragraph={"Our online PDF merger ensures accurate and consistent results every time. Your files are processed securely, giving you a reliable solution for combining documents."}
              />
              <FeaturesCard Icon={ShieldCheck} heading={"Secure Online PDf Merging"}
                paragraph={"Your privacy is our priority. All uploaded files are  automatically deleted after processing, ensuring safe and secure PDF merging online."}
              />
              <FeaturesCard Icon={Zap} heading={"Powerful PDF Merger"}
                paragraph={"Built with advanced technology, our PDF merger processes files quickly and efficiently. Get professional-quality results in seconds."}
              />
            </div>
            {/* how to section */}
            <div className="flex max-w-7xl justify-center md:gap-20 gap-4 items-center flex-wrap mx-auto mt-24">
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
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to merge PDFs online for free?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select files or drag and drop files in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Merge PDF files by pressing merge PDF button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Download the Merged PDFs by pressing Download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Merge PDF FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col mt-12 p-2 items-start gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">Is PDFtoolify Really Free?</p>
                <p className=" text-sm font-medium text-gray-800">Yes,PDFtoolify is free to use you can easily use PDFtoolify for your work without signup</p>
                <hr className="text-gray-800"/>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">How can I merge PDF files with PDFtoolify?</p>
                <p className=" text-sm font-medium text-gray-800">You just need to upload your PDF files, arrange them in order, and click on “Merge.” PDFtoolify will instantly combine them into a single file.</p>
                <hr className="text-gray-800"/>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">Will the quality of my PDFs change after merging?</p>
                <p className=" text-sm font-medium text-gray-800">No, the merged PDF keeps the same quality and formatting as your original files.</p>
                <hr className="text-gray-800"/>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">Is it safe to merge my PDFs online?</p>
                <p className=" text-sm font-medium text-gray-800">Yes. PDFtoolify uses secure processing, and your files are deleted automatically after completion to ensure privacy.</p>
                <hr className="text-gray-800"/>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">Can I merge PDFs offline with PDFtoolify?</p>
                <p className=" text-sm font-medium text-gray-800">Yes. You can download PDFtoolify for Windows and merge files offline without internet access.</p>
                <hr className="text-gray-800"/>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">Does merging PDFs cost anything?</p>
                <p className=" text-sm font-medium text-gray-800">No, merging PDFs with PDFtoolify is completely free.</p>
                <hr className="text-gray-800"/>
              </div>
            </div>
            {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Merge PDF Blog Articles </h1> */}
            {/* PostCard section */}
            {/* <div className="max-w-6xl p-4 bg-[#fcf8f8] mx-auto mt-20 flex flex-wrap justify-evenly">
             <PostCard
                src={"/how_to_merge.png"}
                date={"15-9-2025"}
                heading={"How to Merge PDF Online"}
                description={"Select The PDF files and and arrange according to you and click to merge PDF button and download the PDFs after task completed"}
              />
              <PostCard
                src={"/safe_to_merge.png"}
                date={"11-8-2025"}
                heading={"Is it Safe to merge PDFs Online"}
                description={"Yes,Its safe to merge PDFs online Merging PDFs onlin is the good thing to save your time and resources"}
              />
              <PostCard
                src={"/onine_pdf_merger.jpg"}
                date={"23-8-2025"}
                heading={"Best Free Online PDF Merger Combine Multiple Files in Seconds"}
                description={"Quickly combine multiple PDFs into a single document with our free online PDF merger. No signup, no hidden charges—just fast, secure, and reliable PDF merging anytime, anywhere."}
              />
            </div> */}
          </div>
        )}
        {isDroped  && !completionStatus && !isProcessing && !isUploading && (
          <div className="max-w-7xl mx-auto bg-gray-100 p-10">
            <ul className="mt-6 flex flex-wrap justify-center  p-5 gap-6">
              {files.map((file, index) => (
                <PDFPageComponent file={file} key={index}/>
              ))}
            </ul>
            <div className="flex items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                disabled={files.length < 2}
                className={`px-6 py-3 rounded-md font-semibold text-xl text-white transition-all duration-300
                ${
                  files.length < 2
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 active:bg-blue-400"
                }`}
              >
                Merge PDF Files
              </button>

              {/* Add More Files Button */}
              <label
                htmlFor="addFile"
                className="w-11 h-11 flex items-center justify-center text-2xl font-bold 
               bg-blue-500 text-white rounded-full shadow-md
               active:bg-blue-400 transition-all duration-300"
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
        {progress > 0 && progress < 100 && <ProgressBar progress={progress}/>}

        {serverPreparing &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing server ...please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
        }
        {progress === 100 && isProcessing && <Processing />}
      </form>
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Merged PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Merged PDF
            </a>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
export default Merge;
