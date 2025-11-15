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


function PNGToPDF() {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([]);
    let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi,setCompletionStatus,setdownloadFileURL
      } = useFileUpload()
  


  async function pngToPdf() {
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
    pngToPdf();
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
                  <span>Convert PNG images to PDF instantly — simple, fast, and accurate</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Combine multiple PNG files into a single high-quality PDF</span>
                </div>
              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Works on all devices — mobile, tablet, laptop, and desktop</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>No signup or installation needed — convert PNG to PDF online for free</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Your uploaded images are auto-deleted after processing for maximum security</span>
                </div>

              </div>

            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - PNG to PDF
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={Images} 
                heading="Convert PNG Effortlessly" 
                paragraph="Upload one or multiple PNG images and convert them into a clean, high-quality PDF instantly—simple and fast."
              />

              <FeaturesCard 
                Icon={Gift} 
                heading="Free & No Login Needed" 
                paragraph="Convert PNG to PDF absolutely free. No signup, no subscription—just upload your PNG files and download the PDF instantly."
              />

              <FeaturesCard 
                Icon={Layers} 
                heading="Merge Multiple PNG Images" 
                paragraph="Combine unlimited PNG files into a single PDF document. Ideal for scanned pages, photo bundles, assignments, and documents."
              />

              <FeaturesCard 
                Icon={Scan} 
                heading="High-Quality PDF Output" 
                paragraph="Your PNG images are converted with maximum clarity and perfect alignment. Zero quality loss during the conversion process."
              />

              <FeaturesCard 
                Icon={ShieldCheck} 
                heading="Safe & Secure Conversion" 
                paragraph="All PNG images are processed securely, and files are automatically deleted after conversion—keeping your privacy protected."
              />

              <FeaturesCard 
                Icon={Zap} 
                heading="Fast & Powerful Converter" 
                paragraph="Enjoy lightning-fast PNG to PDF conversion. Optimized for speed and accuracy to deliver your final PDF within seconds."
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
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to convert png into pdf?</span>
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
                  Is PDFtoolify’s PNG to PDF converter free?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, PDFtoolify is completely free. You can convert PNG images to PDF without any signup or charges.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  How can I convert PNG to PDF using PDFtoolify?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Simply upload your PNG images, arrange them in order, and click “Convert.” Your high-quality PDF will be generated instantly.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Will the image quality change after converting PNG to PDF?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  No. Your PNG images retain their clarity and resolution. PDFtoolify ensures sharp and high-quality output every time.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Is it safe to convert PNG to PDF online?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. Your PNG images are processed securely, and all files are automatically deleted after conversion to protect your privacy.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Can I merge multiple PNG images into one PDF?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  Absolutely. You can add as many PNG images as you want and combine them into a single, well-organized PDF.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">
                  Do I need to install any software to convert PNG to PDF?
                </p>
                <p className="text-sm font-medium text-gray-800">
                  No installation needed. PDFtoolify works directly in your browser, allowing fast and smooth PNG to PDF conversion online.
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

export default PNGToPDF
