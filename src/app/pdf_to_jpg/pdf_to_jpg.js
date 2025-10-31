"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import { BadgeCheck, CircleCheck, Gift, InfinityIcon, MousePointerClick, ShieldCheck, Zap } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import PDFPageComponent from "@/components/PDFPageComponent";
import JSZip from "jszip";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function PDFToJPG() {
  const [numPages, setnumPages] = useState(0)
  const [loading, setLoading] = useState(false)
   let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi,setdownloadFileURL,setCompletionStatus
      } = useFileUpload()
    
  function onDocumentLoadSuccess ({numPages}) {
    setnumPages(numPages)
  }

  async function convertToJpg () {
    try {
      if(!numPages) return
      setLoading(true)
      const zip = new JSZip();
      
      const canvases = document.querySelectorAll(".react-pdf__Page canvas");
      canvases.forEach((canvas, i) => {
      const imageData = canvas.toDataURL("image/jpeg", 1.0);
      const base64Data = imageData.split(",")[1];
      zip.file(`page_${i + 1}.jpg`, base64Data, { base64: true });
    });
      const zipBlob = await zip.generateAsync({type:"blob"})
      let url = URL.createObjectURL(zipBlob)
      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    convertToJpg();
    // const formData = new FormData();
    // formData.append("f1", files);
    
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/pdf_to_jpg", formData);
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            PDF to JPG
          </h1>
          <p className="text-center text-gray-500 md:text-md">
          Convert PDF into JPG images
          </p>
        </div>
      )}
      {isDroped && files &&  <Document
      className={""}
      file={files} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages),(el,index) => (
          <div key={index} className="hidden">
            <Page
              key={index}
              pageNumber={index + 1}
            ></Page>
          </div>
        ))}
      </Document>}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        encType="multipart/form-data"
      >
        {!isDroped && (
          <div>
            <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept={{"application/pdf":[]}}/>
            <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Convert PDF into jpg images
            </h1>
            {/* points section */}
            <div className="flex justify-center  max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">
              <div className="flex flex-col gap-2 w-xl text-sm">
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>Our free PDF Splitter can be work on any device </span>
                </div>
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>Using PDFtoolify split tool you can easily split PDF files</span>
                </div>
              </div>
              <div className="w-xl flex flex-col gap-2 text-sm">
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>PDFtoolify is secure and easy to use tool for PDF related operations</span>
                </div>  
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>No SignUp require to split PDF online</span>
                </div>
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>split PDFs in seconds with PDFtoolify — free, fast, and secure.</span>
                </div>
              </div>
            </div>
            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - PDF to jpg
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">
              <FeaturesCard Icon={MousePointerClick } heading={"Easy to Use"} 
                  paragraph={"Design to be simple and intutive to be everyone anyone can be easily use this tool and make his work simple"}
              />
              <FeaturesCard 
                Icon={Gift} 
                heading={"Free & No Sign Up"} 
                paragraph={"Extract unlimited pages from PDFs online for free without creating an account. No hidden costs, no registration—just fast and easy page extraction."}
              />
              <FeaturesCard 
                Icon={InfinityIcon} 
                heading={"Extract Without Limits"} 
                paragraph={"Choose and extract as many pages as you want. Whether it's a single page or multiple sections, our tool handles it smoothly and efficiently."}
              />
              <FeaturesCard 
                Icon={BadgeCheck} 
                heading={"Accurate Page Extraction"} 
                paragraph={"Our PDF extractor ensures accurate results every time. Get the exact pages you need without affecting the rest of your document."}
              />
              <FeaturesCard 
                Icon={ShieldCheck} 
                heading={"Secure Online Extraction"} 
                paragraph={"Your privacy is our priority. All uploaded files are automatically deleted after processing, ensuring safe and secure PDF extraction online."}
              />
              <FeaturesCard 
                Icon={Zap} 
                heading={"Fast & Powerful"} 
                paragraph={"Built with advanced technology, our extractor processes files quickly. Get your selected pages in just seconds—fast, reliable, and professional."}
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
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to merge PDFs online for free?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select files or drag and drop files in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Merge PDF files by pressing merge PDF button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Download the Merged PDFs by pressing Download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">PDF to jpg converter FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col mt-12 items-start gap-6">
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
                Convert To JPG
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
            Download JPG Images 
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download="converted_images.zip"
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Zip File
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default PDFToJPG;
