"use client";
import { useEffect, useRef, useState } from "react";
import {  ToastContainer } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";
import { BadgeCheck, CircleCheck, Gift, InfinityIcon, MousePointerClick, ShieldCheck, SplitIcon, Zap,CheckCircle2, CheckSquare, Check, Plus } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import Image from "next/image";
import { error, PDFDocument } from "pdf-lib";
import { toast } from "react-toastify";
import ToolList from "@/components/ToolList";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function AddPdfInPdf() {
  let pdfFile = useRef(null)
  const [numPages, setnumPages] = useState(0)
  const [isPopupActive, setIsPopupActive] = useState(false)
  const [pdfFilePageno, setPdfFilePageno] = useState(1)


  let {files,isDroped,isProcessing,completionStatus,isUploading,setCompletionStatus,setdownloadFileURL,
  downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
  } = useFileUpload()

  useEffect(() => {
      console.log(pdfFile)
      // console.log(numPages)
      // console.log(isPopupActive)
      // console.log(pdfFilePageno)
      // console.log("completion status",completionStatus)
      // console.log(downloadFileURL)
    }, [pdfFile,numPages,isPopupActive,pdfFilePageno,completionStatus,downloadFileURL])


async function addPdfIntoPdf() {
  try {
    if (!files) throw new Error("No main PDF selected");
    if (!pdfFile) throw new Error("No PDF selected to insert");

    // ✅ Load Main PDF
    const mainBytes = await files.arrayBuffer();
    const mainPdfDoc = await PDFDocument.load(mainBytes);

    // ✅ Load Insert PDF
    const insertBytes = await pdfFile.current.arrayBuffer();
    const insertPdfDoc = await PDFDocument.load(insertBytes);

    // ✅ Copy pages from insert PDF
    const insertPages = await mainPdfDoc.copyPages(
      insertPdfDoc,
      insertPdfDoc.getPageIndices()
    );

    // ✅ Insert before this page (0-based index)
    const insertAt = Number(pdfFilePageno) - 1;

    insertPages.forEach((page, index) => {
      mainPdfDoc.insertPage(insertAt + index, page);
    });

    // ✅ Save final PDF
    const newPdfBytes = await mainPdfDoc.save();

    const blob = new Blob([newPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    setdownloadFileURL(url)
    console.log("here")
    setCompletionStatus(true)

  } catch (error) {
    console.log("Error inserting PDF:", error);
  }
}

  function onDocumentLoadSuccess({numPages}){
  setnumPages(numPages)

}
  return (
    <div>
      {!isDroped && !completionStatus && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Add Pdf in Pdf
          </h1>
          <p className="text-center text-gray-500 md:text-md">
            Add pdf in between pdf pages
          </p>
        </div>
      )}
      {!isDroped && (
        <div>
          <FileInput files={files} setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept= {{ "application/pdf": [] }}/>
          <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
          Add PDF in between PDF
          </h1>
          {/* points section */}
          <div className="flex justify-center max-w-7xl mt-6 mx-auto gap-4">
            <div className="flex flex-col gap-2 w-xl text-sm">
              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} /> 
                <span>Our free PDF extractor works on any device seamlessly</span>
              </div>
              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} /> 
                <span>Easily extract specific pages from your PDF files with PDFtoolify</span>
              </div>
            </div>
            
            <div className="w-xl flex flex-col gap-2 text-sm">
              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} /> 
                <span>PDFtoolify is secure and simple to use for all PDF operations</span>
              </div>  
              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} /> 
                <span>No signup required — extract PDF pages instantly</span>
              </div>
              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} /> 
                <span>Extract PDF pages in seconds — free, fast, and reliable.</span>
              </div>
            </div>
          </div>
          {/* feature card section */}
          <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
            Features of PDFtoolify - Add PDF in PDF
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
          <div className="flex max-w-7xl mx-auto mt-24">
            <div className="flex basis-[50%] justify-center items-center">
              <Image
              width={560}
              height={ 360 }
              src={"/how_to_merge.png"}
              alt="how to merge pdf online"
              />
            </div>
            <div className="flex basis-[50%] justify-center items-center">
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 items-center">
                  <span className="w-5 h-5 rounded-md bg-black inline-block"></span> 
                  <span className="text-2xl text-gray-800 font-semibold">How to merge PDFs online for free?</span>
                </div>
                <p className="whitespace-pre">1.     Select files or drag and drop files in the select container</p>
                <p className="whitespace-pre">2.     Merge PDF files by pressing merge PDF button</p>
                <p className="whitespace-pre">3.     Download the Merged PDFs by pressing Download button</p>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Add PDF in PDF FAQs</h1>
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
          <ToolList />
        </div>
      )}
      {isDroped && !isUploading && !completionStatus && <div className=''>
        <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
          <ul className="flex flex-wrap justify-center  items-center gap-6">
            {
              Array.from({length: numPages},(_,index) =>
                <div className="flex gap-4 justify-center items-center " key={index}>
                  <div className="bg-blue-600 p-1 rounded-full"
                  onClick={() => {
                    setPdfFilePageno(index + 1)
                    setIsPopupActive(true)
                  }}
                  ><Plus color='white' /></div>
                  <div className="rounded-xl bg-gray-50 p-2 relative">
                    <Page pageNumber={index + 1} width={180} height={360} />
                    <div className="text-center bg-white">{index + 1}</div>
                  </div>
                </div>
              )
            }
            <div className="bg-blue-600 p-1 rounded-full"
            onClick={() => {
              setIsPopupActive(true)
              setPdfFilePageno(numPages + 1)
            }}><Plus color='white' /></div>
          </ul>
        </Document>
        <div className={`fixed z-50 inset-0 bg-[rgba(70,70,70,0.4)] ${isPopupActive ? "flex" : "hidden"}   rounded-xl  justify-center items-center`}
          onClick={(e) => {
              setIsPopupActive(false)
          }}
        >
          <div className="bg-white px-10 py-5 rounded-md ">
            <label htmlFor="pdfFile" className="cursor-pointer">Select pdf file</label>
            <input type="file" id="pdfFile" className="hidden" accept=".pdf"
             onChange={(e) => {
              if(e.target.files[0].type == "application/pdf") 
                pdfFile.current = e.target.files[0]
              else 
                return
              addPdfIntoPdf();
             }}/>
          </div>
        </div>
      </div>}
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download PDF Inserted PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Final PDF
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddPdfInPdf
