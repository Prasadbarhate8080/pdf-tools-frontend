"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import { BadgeCheck, CircleCheck, Gift, InfinityIcon, MousePointerClick, ShieldCheck, SplitIcon, Zap } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import PDFPageComponent from "@/components/PDFPageComponent";
import { PDFDocument, StandardFonts,rgb } from "pdf-lib";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function AddWaterMarkPage() {
  const [water_mark_position, setPage_no_position] = useState("center");
  const [water_mark_text, setWater_mark_text] = useState("PdfToolify");

  let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi,setdownloadFileURL,setCompletionStatus
      } = useFileUpload()

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    return {
      r: ((bigint >> 16) & 255) / 255,
      g: ((bigint >> 8) & 255) / 255,
      b: (bigint & 255) / 255
    };
  }
  async function addWatermark () {
    try {
      if(!files) throw new Error("no file selected")
      const arrayBuffer = await files.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 36;
      const { r, g, b } = hexToRgb("#cccccc");
      pages.forEach((page) => {
      const { width, height } = page.getSize();
      let x = 0;
      let y = 0;

      switch (water_mark_position) {
        case "top-left":
          x = 50;
          y = height - 50;
          break;
        case "top-right":
          x = width - (fontSize * water_mark_text.length * 0.6);
          y = height - 50;
          break;
        case "bottom-left":
          x = 50;
          y = 50;
          break;
        case "bottom-right":
          x = width - (fontSize * water_mark_text.length * 0.6);
          y = 50;
          break;
        case "center":
        default:
          x = width / 2 - (fontSize * water_mark_text.length) / 4;
          y = height / 2;
      }

      page.drawText(water_mark_text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(r, g, b),
        rotate: { type: "degrees", angle: 45 }, // Angled watermark
        opacity: 0.4,
      });
    });

    const newPdfBytes = await pdfDoc.save();
    const blob = new Blob([newPdfBytes], { type: "application/pdf" });
    let url = URL.createObjectURL(blob)
    setdownloadFileURL(url)
    setCompletionStatus(true)
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 10000);
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    addWatermark()
    // const formData = new FormData();
    // formData.append("pdf_file", files);
    // formData.append("water_mark_position", water_mark_position);
    // formData.append("water_mark_text", water_mark_text);
    // setTimeout(() => {
    //   if (serverPreparing) toast.info("Please refresh the page and try again");
    // }, 12000);
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/add_water_mark",formData);

  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Add Watermark ON PDF Pages
          </h1>
          <p className="text-center text-gray-500 md:text-md">
            Add Watermark As your choice
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
            Add watermark to PDF
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
              Features of PDFtoolify - Add Watermark
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
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Add Watermark FAQs</h1>
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
              <PDFPageComponent file={files}/>
            </ul>

            <div className="w-fit mx-auto p-2">
              <div className="mt-3 flex flex-col justify-center items-center">
                <div>
                  <label
                    htmlFor="watermark-text"
                    className="text-gray-700 block"
                  >
                    Watermark Text:
                  </label>
                  <input
                    type="text"
                    id="watermark-text"
                    value={water_mark_text}
                    onChange={(e) => {
                      setWater_mark_text(e.target.value);
                    }}
                    className="w-60 h-10 focus-within::border-blue-500 indent-2  border-2 border-gray-600 rounded-md"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center w-fit mx-auto mt-4">
                <div className="ml-4 md:flex md:justify-center md:items-center md:gap-3 md:flex-wrap">
                  <label
                    htmlFor="AddWaterMarkToPage-position"
                    className="text-gray-700 font-medium "
                  >
                    Select watermark Position:
                  </label>

                  <select
                    id="AddWaterMarkToPage-position"
                    name="water_mark_position"
                    value={water_mark_position}
                    onChange={(e) => setPage_no_position(e.target.value)}
                    className="border sm:block sm:mt-4  md:mt-0 border-gray-400 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  >
                    <option value="center">Center</option>
                    <option value="top-right">Top Right</option>
                    <option value="top-center">Top Center</option>
                    <option value="top-left">Top Left</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-center">Bottom Center</option>
                    <option value="bottom-left">Bottom Left</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                       bg-blue-500  active:bg-blue-400`}
              >
                Add Watermark
              </button>
            </div>
          </div>
        )}

        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
        {serverPreparing && isDroped && (
          <div className="flex flex-col items-center mt-8">
            <p className="text-gray-700 text-md mb-2">
              Preparing Server... Please wait
            </p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download watermark Added PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
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

export default AddWaterMarkPage;