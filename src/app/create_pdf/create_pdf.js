"use client"; // if you're using Next.js
import React, {  useState } from "react";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import {  CircleCheck, Gift, ShieldCheck, Trash2, Zap,
  Images, 
  Layers, 
  Scan, 
 } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import { PDFDocument } from "pdf-lib";
import { toast } from "react-toastify";
import ToolList from "@/components/ToolList";


if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function CreatePdf() {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([]);
    let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi,setCompletionStatus,setdownloadFileURL
      } = useFileUpload()
  


  async function createPdf() {
    try {
      setLoading(true)
      let pdfDoc = await PDFDocument.create();
      const PAGE_WIDTH = 595.28;
      const PAGE_HEIGHT = 841.89;

      for (let img of files){
        let ext = img.name.split(".").pop().toLowerCase();
        let imageBytes = await img.arrayBuffer();
        let image;
        if(ext == "jpg" || ext == "jpeg")
          image = await pdfDoc.embedJpg(imageBytes);
        else if(ext == "png")
          image = await pdfDoc.embedPng(imageBytes);
        
        if(!image){
          toast.error("unsupported file")
          setFiles([])
          return
        }
      
      const { width: imgWidth, height: imgHeight } = image.scale(1);
      const scale = Math.min(PAGE_WIDTH / imgWidth, PAGE_HEIGHT / imgHeight, 1);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;

      // Center the image
      const x = (PAGE_WIDTH - drawWidth) / 2;
      const y = (PAGE_HEIGHT - drawHeight) / 2;

      const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      page.drawImage(image, {
        x,
        y,
        width: drawWidth,
        height: drawHeight,
      });
    }
      const extractedPDF = await pdfDoc.save(); 
      const blob = new Blob([extractedPDF], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      setdownloadFileURL(url);
      setCompletionStatus(true)
      setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 10000);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }

  } 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please upload images");
      return;
    }
    createPdf();
    // const formData = new FormData();
    // files.forEach((file) => formData.append("images", file));
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/jpg_to_pdf",formData)
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px]">
      {!completionStatus && (
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
          <div>
            <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={true} setImages={setImages} mode="images"
              accept= {{
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
                "image/webp": [".webp"],
              }}
            />
            <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Create PDF from Jpg Png images
            </h1>
            {/* points section */}
            <div className="flex justify-center max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">

              <div className="flex flex-col gap-2 w-xl text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Create a new PDF instantly by adding blank pages or importing PDFs</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Maintain perfect quality while building a multi-page PDF</span>
                </div>

              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Works on any device — mobile, tablet, Windows, Mac</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>No signup needed — create a PDF instantly with one click</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Secure and private — your PDFs are deleted automatically after creation</span>
                </div>

              </div>

            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - create PDF
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={Plus}
                heading="Create PDF Easily"
                paragraph="Add new blank pages or import PDF pages to build a brand-new PDF in just a few clicks."
              />

              <FeaturesCard 
                Icon={Gift}
                heading="Free & No Login Needed"
                paragraph="Create new PDFs completely free — no account needed. Just add pages and download instantly."
              />

              <FeaturesCard 
                Icon={Layers}
                heading="Add Unlimited Pages"
                paragraph="Insert as many pages as you want — before, after, or between existing pages with full flexibility."
              />

              <FeaturesCard 
                Icon={FileType}
                heading="Perfect Page Alignment"
                paragraph="Every added page is properly aligned and optimized to maintain the quality and structure of your PDF."
              />

              <FeaturesCard 
                Icon={ShieldCheck}
                heading="Secure PDF Creation"
                paragraph="Your files are processed safely, and all uploaded documents are deleted automatically after creating your PDF."
              />

              <FeaturesCard 
                Icon={Zap}
                heading="Fast & Efficient"
                paragraph="Add pages and generate your final PDF in seconds — designed for speed, accuracy, and smooth workflow."
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
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to create pdf from images?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select images or drag and drop images in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Convert images into the pdf by pressing create pdf button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Download the created pdf by pressing download </p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Create PDF FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col p-3 mt-12 items-start gap-6">

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Is PDFtoolify’s Create PDF tool free to use?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, PDFtoolify is completely free. You can create new PDFs or add pages without any signup or installation.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  How can I create a PDF using PDFtoolify?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Simply upload a PDF or start with a blank document, add pages wherever you want, and download the final PDF instantly.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Can I insert pages anywhere inside the PDF?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. You can add pages before, after, or between existing pages with full control over the placement.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Is it safe to create PDFs online?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. Your files are processed securely, and PDFtoolify deletes all uploaded documents automatically after processing.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Can I combine pages from another PDF?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Absolutely. You can upload another PDF and insert its pages at any position inside your current PDF.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Do I need any software to create a PDF?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  No software required. PDFtoolify works directly in your browser, allowing you to create PDFs instantly online.
                </p>
                <hr className="text-gray-800" />
              </div>

            </div>

            <ToolList />
          </div>
        )}
        {isDroped && !isUploading && !completionStatus && (
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              {images.map((imgObj, index) => (
                <li
                  key={index}
                  className="w-[220px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                   transition-all duration-300 overflow-hidden relative"
                >
                  <div>
                    <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                      <div className="w-[200px] h-[250px] flex justify-center items-center">
                        <img
                        className="object-contain object-center"
                        src={imgObj.preview} alt={`uploaded-${index}`} />
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
                  <div className="p-1.5 absolute top-1 right-1 bg-red-500 cursor-pointer rounded-full "
                    onClick={(e) => {
                      setImages((prev) => {
                        let array = [...prev];
                        URL.revokeObjectURL(array[index].preview);
                        array.splice(index,1);
                        return array;
                      })
                    }}
                  > <Trash2 size={22} color="white"/></div>
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
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500  active:bg-blue-400"
                }`}
              >
                Create PDF
              </button>
            </div>
          </div>
        )}

        {/* {progress > 0 && progress < 100 && <ProgressBar progress={progress}/>}
        {serverPreparing &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          } */}
        {loading && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download created PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500 active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download created PDF
            </a>
          </div>
        </div>
      )}

     
    </div>
  );
}

export default CreatePdf
