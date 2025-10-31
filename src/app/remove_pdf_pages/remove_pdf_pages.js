"use client";
import { useState, useRef, useCallback,useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";
import { BadgeCheck, Check, CircleCheck, Gift, InfinityIcon, MousePointerClick, ShieldCheck, SplitIcon, Zap } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import Image from "next/image";
import { toast } from "react-toastify";
import { PDFDocument } from "pdf-lib";
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
              Features of PDFtoolify - Remove PDF pages
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
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Remove PDF pages FAQs</h1>
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
