"use client";
import { useState, useRef, useCallback,useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";
import { BadgeCheck, Check, CircleCheck, Gift, InfinityIcon, MousePointerClick, Scissors, ShieldCheck, SplitIcon, Zap } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import Image from "next/image";
import { toast } from "react-toastify";
import { PDFDocument } from "pdf-lib";
import ToolList from "@/components/ToolList";
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

export default function RemovePDFPages() {
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);

  let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi,setdownloadFileURL,setCompletionStatus
      } = useFileUpload()

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const togglePageSelection = (pageNum) => {
    setSelectedPages((prevSelected) =>
      prevSelected.includes(pageNum)
        ? prevSelected.filter((n) => n !== pageNum)
        : [...prevSelected, pageNum]
    );
  };

  async function removePages(){
    try {
      if(!files) throw new Error("no file selected")
      if(selectedPages.length == 0) throw new Error("please select at least one page")

      const arrayBuffer = await files.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      const totalPages = pdfDoc.getPageCount();
      // Step 3: Prepare remove set
      const removeSet = new Set(
        selectedPages
          .filter(p => typeof p === "number" && p > 0 && p <= totalPages)
          .map(p => p - 1) // Convert to 0-based
      );

      if(removeSet.size == 0) throw new Error("remove set size is zero")
      
      const keepPages = [];
      for(let i = 0; i < totalPages ; i++)
      {
        if(!removeSet.has(i))
          keepPages.push(i);
      }

      if(keepPages.length == 0) throw new Error("all pages selected to remove")
      const newPdfDoc = await PDFDocument.create();
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, keepPages);
      copiedPages.forEach(p => newPdfDoc.addPage(p));
      const newPdfBytes = await newPdfDoc.save();
      const blob = new Blob([newPdfBytes], { type: "application/pdf" });
      let url = URL.createObjectURL(blob)
      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 10000);
    } catch (error) {
      // toast.error(error.message)
      console.log(error)
    }
  }

  const handleRemove = async () => {
    if (!files || selectedPages.length === 0)
      return alert("Select at least one page.");
    removePages();
    // const formData = new FormData();
    // formData.append("pdf_file", files);
    // formData.append("pages", JSON.stringify(selectedPages));
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/remove_pdf_pages",formData);
  };

  return (
    <div className="p-1 mx-auto bg-[#F7F5FB] min-h-[658px]">
      {!completionStatus && !isDroped && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Remove Pages From PDF
          </h1>
          <p className="text-center text-gray-500 text-md">
            select pages as you want to remove
          </p>
        </div>
      )}

      {!completionStatus && isDroped && (
        <div>
          <p className="text-center text-gray-500 text-">
            Select The Pages which you want to remove
          </p>
        </div>
      )}

      {!isDroped && (
        <div>
          <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept= {{ "application/pdf": [] }}/>
          <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Remove Pages From the PDF
            </h1>
            {/* points section */}
            <div className="flex justify-center max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">
              <div className="flex flex-col gap-2 w-xl text-sm">
                
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Our Remove PDF Pages tool works smoothly on all devices — mobile, tablet, and desktop.</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Easily delete unwanted pages from any PDF file using PDFtoolify.</span>
                </div>

              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">
                
                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>PDFtoolify keeps your files secure — all uploads are automatically deleted after processing.</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>No signup required — remove pages from your PDF instantly.</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} />
                  <span>Remove pages in seconds — fast, accurate, and completely free with PDFtoolify.</span>
                </div>

              </div>
            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - Remove PDF pages
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={Scissors} 
                heading={"Remove Pages Easily"} 
                paragraph={"Delete unwanted pages from your PDF in just a few clicks. Simple, clean, and designed for everyone to use without complications."}
              />

              <FeaturesCard 
                Icon={Gift} 
                heading={"Free & No Sign Up"} 
                paragraph={"Remove unlimited PDF pages online for free without creating an account. No hidden costs, no registration—just fast and easy PDF cleaning."}
              />

              <FeaturesCard 
                Icon={InfinityIcon} 
                heading={"Remove Without Limits"} 
                paragraph={"Delete any number of pages—from one page to multiple sections. Our tool handles everything smoothly and efficiently."}
              />

              <FeaturesCard 
                Icon={BadgeCheck} 
                heading={"Accurate Page Removal"} 
                paragraph={"Our PDF remover ensures precise results every time. Delete only the pages you want while keeping the rest of the document untouched."}
              />

              <FeaturesCard 
                Icon={ShieldCheck} 
                heading={"Secure Online Processing"} 
                paragraph={"Your files stay private. All uploaded PDFs are auto-deleted after processing, ensuring safe and secure page removal."}
              />

              <FeaturesCard 
                Icon={Zap} 
                heading={"Fast & Powerful"} 
                paragraph={"Powered by optimized processing, our tool removes pages within seconds. Fast, reliable, and professional for everyday use."}
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
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to remove pdf pages online?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select file or drag and drop file in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Select the pages which you want remove</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Remove the pdf pages by pressing remove pdf pages button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">4.     Download the pages removed  PDF by pressing download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Remove PDF pages FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex p-3 flex-col mt-12 items-start gap-6">

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is PDFtoolify Free to Remove PDF Pages?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, removing pages from your PDF is completely free on PDFtoolify. No signup or subscription required.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">How do I remove pages from a PDF using PDFtoolify?</p>
                <p className="text-sm font-medium text-gray-800">
                  Upload your PDF, select the pages you want to delete, and click “Remove Pages.” PDFtoolify will instantly generate a new cleaned PDF.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Will removing pages change my PDF quality?</p>
                <p className="text-sm font-medium text-gray-800">
                  No. Only the selected pages are deleted—your remaining pages stay in the same original quality and format.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is it safe to remove PDF pages online?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. All files are processed securely, and your PDF is automatically deleted from our servers after completion.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Can I remove PDF pages offline?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. You can download PDFtoolify for Windows and remove pages offline without internet access.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Does removing PDF pages cost anything?</p>
                <p className="text-sm font-medium text-gray-800">
                  No. PDFtoolify’s page removal tool is 100% free and has no hidden charges.
                </p>
                <hr className="text-gray-800" />
              </div>

            </div>
            <ToolList />
        </div>
      )}

      {files && isDroped && !isUploading && !completionStatus && (
        <>
          <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
            <div className="flex flex-wrap max-w-7xl justify-center mx-auto gap-8 mt-6">
              {Array.from(new Array(numPages), (el, index) => {
                const pageNum = index + 1;
                const isSelected = selectedPages.includes(pageNum);
                return (
                  <div
                    key={pageNum}
                    className={`w-fit p-1 bg-white rounded-md border-gray-500 border relative  cursor-pointer transition-transform duration-200 hover:bg-gray-100`}
                    onClick={() => togglePageSelection(pageNum)}
                  >
                    <Page pageNumber={pageNum} width={200}  />
                    <p className="text-center p-1">
                      Page {pageNum} 
                    </p>
                    <div className={`absolute top-0.5 right-0.5 h-6 w-6 border-1 border-gray-500 rounded-md
                    ${isSelected ? "bg-blue-600" : "bg-white"}`}
                    > 
                      <Check color="white" className={`${isSelected ? "block" : "hidden"}`}/> 
                    </div>
                  </div>
                );
              })}
            </div>
          </Document>

          {/* button for removing pages */}
          <div className="mt-6 text-center">
            <button
              onClick={handleRemove}
              className="bg-blue-500 text-white px-8 py-4 text-2xl rounded-md "
            >
              Remove {selectedPages.length > 0 && selectedPages.length} Selected Pages
            </button>
          </div>
        </>
      )}

      {/* progress bar and proessing */}
      {progress > 0 && progress < 100 && <ProgressBar progress={progress}/>}
      {serverPreparing &&  <div className="flex flex-col items-center mt-8">
        <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
        <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
          }
      {progress === 100 && isProcessing && <Processing />}

      {/* after task complete button will show */}
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Pages Removed PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500 active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Removed PDF
            </a>
          </div>
        </div>
      )}
      
    </div>
  );
}
