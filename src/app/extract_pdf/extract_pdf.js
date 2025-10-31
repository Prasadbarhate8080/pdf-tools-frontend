"use client";
import { useState } from "react";
import {  ToastContainer } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";
import { BadgeCheck, CircleCheck, Gift, InfinityIcon, MousePointerClick, ShieldCheck, SplitIcon, Zap,CheckCircle2, CheckSquare, Check } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import Image from "next/image";
import { error, PDFDocument } from "pdf-lib";
import { toast } from "react-toastify";
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

export default function ExtractPdf() {
  const [loading,setLoading] = useState(false)
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

  async function extractPDF () {
    try {
      setLoading(true)
      if(!files) throw new Error("no file selected")
      let arrayBuffer = await  files.arrayBuffer();
      let pdf = await PDFDocument.load(arrayBuffer)
      let totalPages = pdf.getPageCount();
      let extractedPDF = await PDFDocument.create();
      if(selectedPages.length == 0) throw new Error("please select at least one page")

      let isInvalidPages = selectedPages.some((page) => page < 0 || page > totalPages)
      if(isInvalidPages) throw new Error("invalid pages")

      let zeroBasedSelectedPages = selectedPages.map(page => page - 1)
      let pages = await extractedPDF.copyPages(pdf,zeroBasedSelectedPages);
      pages.forEach(page => extractedPDF.addPage(page));
      const extractedPdfBytes = await extractedPDF.save();
      const blob = new Blob([extractedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setdownloadFileURL(url);
      setCompletionStatus(true)
      setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 10000);
    } catch (error) {
      toast.error(error.message)
      setisDroped(false)
    }
    finally{
      setLoading(false)
    }
  }

  const handleExtract = async () => {
    if (!files || selectedPages.length === 0)
      return alert("Select at least one page.");
    extractPDF();
    // const formData = new FormData();
    // formData.append("file", files);
    // formData.append("pages", JSON.stringify(selectedPages));
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/extract_pdf",formData);
  };

  return (
    <div className="p-1 mx-auto bg-[#F7F5FB] min-h-[658px]">
      {!completionStatus && !isDroped && (
        <div>
          <h1 className="mt-12 text-2xl flex justify-center items-center gap-4 md:text-4xl font-bold text-gray-800">
            <SplitIcon color="gray" size={35} strokeWidth={2} /> Extract Pages From PDF
          </h1>
          <p className="text-center text-gray-500 mt-2 md:text-md">
            select pages as you want to extract
          </p>
        </div>
      )}

      {!completionStatus && isDroped && (
        <div>
          <p className="text-center text-gray-500 text-">
            Select The Pages which you want to extract
          </p>
        </div>
      )}

      {!isDroped && (
        <div>
          <FileInput setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept= {{ "application/pdf": [] }}/>
          <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Extract PDF Pages Online for Free
          </h1>
          {/* points section */}
          <div className="flex justify-center  max-w-7xl mt-6 mx-auto flex-wrap gap-4 text-gray-800">
            <div className="flex flex-col gap-2 w-xl text-sm">
              <div className="flex gap-2">
                <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                <span>Our free PDF extractor works on any device seamlessly</span>
              </div>
              <div className="flex gap-2">
                <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                <span>Easily extract specific pages from your PDF files with PDFtoolify</span>
              </div>
            </div>
            
            <div className="w-xl flex flex-col gap-2 text-sm">
              <div className="flex gap-2">
                <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                <span>PDFtoolify is secure and simple to use for all PDF operations</span>
              </div>  
              <div className="flex gap-2">
                <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                <span>No signup required — extract PDF pages instantly</span>
              </div>
              <div className="flex gap-2">
                <CircleCheck color="green" className="min-w-6" strokeWidth={1.5} /> 
                <span>Extract PDF pages in seconds — free, fast, and reliable.</span>
              </div>
            </div>
          </div>
          {/* feature card section */}
          <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
            Features of PDFtoolify - Extract PDF Pages
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
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to extract pdf pages online?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select file or drag and drop file in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Select Pages which you wnat to extract from the pdf</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Extract pages by pressing extract pages button</p>
                  <p className="whitespace-pre text-sm tracking-tighter">4.     Download extracted pages pdf by pressing download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Extract PDF Pages FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col p-3 mt-12 items-start gap-6">
  
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">
                What is the Extract PDF tool?
              </p>
              <p className="text-sm font-medium text-gray-800">
                Extract PDF allows you to select specific pages from your PDF and download them as a new PDF file.
              </p>
              <hr className="text-gray-800" />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">
                How do I extract pages from a PDF?
              </p>
              <p className="text-sm font-medium text-gray-800">
                Upload your PDF, choose page numbers or ranges like “1-3, 5”, and click on “Extract”. Your new PDF will be ready instantly.
              </p>
              <hr className="text-gray-800" />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">
                Is there any quality loss after extracting pages?
              </p>
              <p className="text-sm font-medium text-gray-800">
                No. The extracted PDF maintains the exact same quality as the original pages.
              </p>
              <hr className="text-gray-800" />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">
                Is it safe to upload my PDF for extraction?
              </p>
              <p className="text-sm font-medium text-gray-800">
                Yes. Your files are processed securely, and they are removed automatically after extraction is completed.
              </p>
              <hr className="text-gray-800" />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">
                Can I extract multiple page ranges at once?
              </p>
              <p className="text-sm font-medium text-gray-800">
                Yes. You can extract pages like “1-3, 5-7, 10” in a single operation and download them together.
              </p>
              <hr className="text-gray-800" />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">
                Is the Extract PDF tool free?
              </p>
              <p className="text-sm font-medium text-gray-800">
                Yes, PDFtoolify’s Extract PDF tool is completely free to use without signup.
              </p>
              <hr className="text-gray-800" />
            </div>
          </div>
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

          {/* button for extracting pages */}
          <div className="mt-6 text-center">
            <button
              onClick={handleExtract}
              className="bg-blue-500 text-white px-8 py-4 text-2xl rounded-md "
            >
              Extract {selectedPages.length > 0 && selectedPages.length} Selected Pages
            </button>
          </div>
        </>
      )}

      {/* progress bar and proessing */}
      {progress > 0 && progress < 100 && <ProgressBar />}
      {serverPreparing && isDroped && (
          <div className="flex flex-col items-center mt-8">
            <p className="text-gray-700 text-md mb-2">
              Preparing Server... Please wait
            </p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      {progress === 100 && isProcessing && <Processing />}

      {/* after task complete button will show */}
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Extracted PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500 active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Extracted PDF
            </a>
          </div>
        </div>
      )}
     
      <ToastContainer />
    </div>

  );
}
