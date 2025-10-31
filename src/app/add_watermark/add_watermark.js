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
            <div className="flex justify-center max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">

              <div className="flex flex-col gap-2 w-xl text-sm">
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Our free watermark tool works smoothly on any device</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Easily add text or image watermarks to your PDF files with PDFtoolify</span>
                </div>
              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>PDFtoolify is secure, fast, and simple for watermarking documents</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>No signup required — add watermarks instantly for free</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Add watermarks in seconds — professional, free, and reliable</span>
                </div>
              </div>

            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - Add Watermark
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={MousePointerClick}
                heading={"Easy to Use"}
                paragraph={"Designed to be simple and intuitive — anyone can easily add watermarks to their PDFs in just a few clicks."}
              />

              <FeaturesCard 
                Icon={Gift}
                heading={"Free & No Sign Up"}
                paragraph={"Add unlimited text or image watermarks to your PDFs for free. No account needed — fast, easy, and hassle-free."}
              />

              <FeaturesCard 
                Icon={InfinityIcon}
                heading={"Add Watermarks Without Limits"}
                paragraph={"Insert watermarks on any number of pages — from a single page to an entire PDF. Flexible and powerful watermarking."}
              />

              <FeaturesCard 
                Icon={BadgeCheck}
                heading={"Customizable Watermarks"}
                paragraph={"Choose your own text, font size, color, opacity, rotation, and placement. Create professional watermarks effortlessly."}
              />

              <FeaturesCard 
                Icon={ShieldCheck}
                heading={"Secure Online Processing"}
                paragraph={"Your documents stay safe. All files are automatically deleted after processing to ensure maximum privacy."}
              />

              <FeaturesCard 
                Icon={Zap}
                heading={"Fast & Powerful"}
                paragraph={"Powered by advanced technology, PDFtoolify applies watermarks in seconds — smooth, reliable, and lightning fast."}
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
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to add watermark into pdf online?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select file or drag and drop file in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Add water mark text and select watermark position</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Add watermark by pressing add watermark button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">4.     Download the watermark added  PDF by pressing Download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Add Watermark FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col p-3 mt-12 items-start gap-6">

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is PDFtoolify Really Free?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, PDFtoolify is completely free. You can add text or image watermarks to your PDF files without signing up.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">How can I add a watermark to my PDF?</p>
                <p className="text-sm font-medium text-gray-800">
                  Just upload your PDF, choose between text or image watermark, customize the style, and click “Apply Watermark.” Your updated PDF will be ready instantly.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Will adding a watermark affect the PDF quality?</p>
                <p className="text-sm font-medium text-gray-800">
                  No, the PDF quality remains the same. Only the watermark is added—your pages, text, and images stay untouched.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is it safe to upload my PDFs?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, your files are processed securely. PDFtoolify deletes all uploaded and processed files automatically after completion.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Can I customize the watermark?</p>
                <p className="text-sm font-medium text-gray-800">
                  Absolutely. You can customize text, color, opacity, size, rotation, and position. Image watermarks are also supported.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Does adding a watermark cost anything?</p>
                <p className="text-sm font-medium text-gray-800">
                  No, adding a watermark with PDFtoolify is 100% free and unlimited.
                </p>
                <hr className="text-gray-800" />
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