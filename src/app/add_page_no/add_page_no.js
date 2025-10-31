"use client"
import { useState,useRef,useEffect,useCallback } from "react";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";
import { BadgeCheck, CircleCheck, Gift, InfinityIcon, MousePointerClick, ShieldCheck, SplitIcon, Zap } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import PDFPageComponent from "@/components/PDFPageComponent";
import { PDFDocument,rgb,StandardFonts } from "pdf-lib";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function PageNO() {
  
    const [page_no_position, setPage_no_position] = useState("bottom-right");
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

  async function addPageNumber () {
    try {
      if(!files) throw new Error("no file selected")
      const arrayBuffer = await files.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer)  
      const pages = pdfDoc.getPages();
    const totalPages = pages.length;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12; // Normal default size
    const { r, g, b } = hexToRgb("#000000"); // Black

    pages.forEach((page, index) => {
      const { width, height } = page.getSize();
      const text = `${index + 1}`;
      let x = 0;
      let y = 0;

      switch (page_no_position) {
        case "bottom-left":
          x = 30;
          y = 20;
          break;
        case "bottom-center":
          x = width / 2 - (fontSize * text.length) / 4;
          y = 20;
          break;
        case "bottom-right":
          x = width - (fontSize * text.length);
          y = 20;
          break;
        case "top-left":
          x = 30;
          y = height - fontSize - 10;
          break;
        case "top-center":
          x = width / 2 - (fontSize * text.length) / 4;
          y = height - fontSize - 10;
          break;
        case "top-right":
          x = width - (fontSize * text.length);
          y = height - fontSize - 10;
          break;
        default:
          x = width - (fontSize * text.length);
          y = 20;
      }

      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(r, g, b),
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
      console.log(error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    addPageNumber()
    // const formData = new FormData();
    // formData.append("pdf_file", files);
    // formData.append("page_no_position", page_no_position);
    
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/add_page_no",formData);
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px] ">
      {!completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Add Page Numbers To PDF
          </h1>
          <p className="text-center text-gray-500 md:text-md">
            Add Page Number To PDF File
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
            <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept= {{ "application/pdf": [] }} />
            <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Add page numbers to PDF
            </h1>
            {/* points section */}
            <div className="flex justify-center max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">

              <div className="flex flex-col gap-2 w-xl text-sm">
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>Our free page number tool works perfectly on any device</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>Easily add page numbers to your PDF with PDFtoolify</span>
                </div>
              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>PDFtoolify is secure, fast, and simple for all PDF operations</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>No signup required — add page numbers instantly</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                  <span>Add page numbers to PDFs in seconds — free, reliable, and easy to use</span>
                </div>
              </div>

            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - Add Page numbers to PDF
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={MousePointerClick} 
                heading={"Easy to Use"} 
                paragraph={"Adding page numbers to your PDFs is super simple. Just upload your file, choose the style and position, and apply the numbering in one click."}
              />

              <FeaturesCard 
                Icon={Gift} 
                heading={"Free & No Sign Up"} 
                paragraph={"Add page numbers to unlimited PDFs online for free. No account or registration is required — fast and hassle-free."}
              />

              <FeaturesCard 
                Icon={InfinityIcon} 
                heading={"Customize as You Want"} 
                paragraph={"Choose numbering style, start number, position, and alignment. Fully flexible options to match your document’s needs."}
              />

              <FeaturesCard 
                Icon={BadgeCheck} 
                heading={"Accurate Page Numbering"} 
                paragraph={"Our tool ensures clean, precise placement of page numbers on every page, without affecting the original layout or content."}
              />

              <FeaturesCard 
                Icon={ShieldCheck} 
                heading={"Secure Online Processing"} 
                paragraph={"Your files are deleted automatically after processing. PDFtoolify keeps your documents private and secure at all times."}
              />

              <FeaturesCard 
                Icon={Zap} 
                heading={"Fast & Powerful"} 
                paragraph={"Add page numbers to your PDFs within seconds. Quick processing with high-quality output — reliable and professional."}
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
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to add page number in pdf online?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select file or drag and drop file in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Select a page number position where you want to add</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Add page numbers to pdf by pressing add page numbers button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">4.     Download the page number added PDF by pressing Download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Add page numbers FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col p-3 mt-12 items-start gap-6">

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is PDFtoolify Really Free?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, PDFtoolify is completely free. You can add page numbers to your PDF files without any signup or hidden charges.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">How can I add page numbers to my PDF?</p>
                <p className="text-sm font-medium text-gray-800">
                  Upload your PDF, choose the page number position, style, and starting number, then click “Add Page Numbers.” Your updated PDF will be ready instantly.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Will adding page numbers change my PDF quality?</p>
                <p className="text-sm font-medium text-gray-800">
                  No, adding page numbers does not affect your PDF content or quality. Only clean and accurate numbering is added.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is it safe to upload my PDFs?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, your files are processed securely. PDFtoolify automatically deletes your PDFs from the server after processing to ensure privacy.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Can I customize the page numbers?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes! You can customize numbering style, position, font size, alignment, and starting number to match your document’s requirements.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Does adding page numbers cost anything?</p>
                <p className="text-sm font-medium text-gray-800">
                  No, adding page numbers using PDFtoolify is completely free and unlimited.
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

            <div className="flex flex-wrap items-center justify-center gap-4 w-fit mx-auto mt-6">
              <label
                htmlFor="Page-position"
                className="text-gray-700 font-medium"
              >
                Select Position for Page Number:
              </label>

              <select
                id="Page-position"
                name="page_no_position"
                value={page_no_position}
                onChange={(e) => setPage_no_position(e.target.value)}
                className="border border-gray-400 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="top-right">Top Right</option>
                <option value="top-center">Top Center</option>
                <option value="top-left">Top Left</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-left">Bottom Left</option>
              </select>
            </div>

            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                       bg-blue-500  active:bg-blue-400`}
              >
                Add Page Numbers
              </button>
            </div>
          </div>
        )}

        {progress > 0 && progress < 100 && <ProgressBar progress={progress}/>}
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
            Download Page Number Added PDF
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

export default PageNO;

