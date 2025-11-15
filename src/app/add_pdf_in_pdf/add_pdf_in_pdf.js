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
import { BadgeCheck, CircleCheck, Gift, InfinityIcon, MousePointerClick, ShieldCheck, SplitIcon, Zap,CheckCircle2, CheckSquare, Check, Plus, FilePlus, Files, Layers } from "lucide-react";
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
    setCompletionStatus(true)

  } catch (error) {
    toast.error("error in inserting pdf")
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
                <span>Add any PDF inside another PDF at any page position</span>
              </div>

              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} /> 
                <span>Easily insert multiple pages or entire PDFs in one click</span>
              </div>
            </div>

            <div className="w-xl flex flex-col gap-2 text-sm">

              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} /> 
                <span>Works on all devices — mobile, tablet, and PC</span>
              </div>

              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} /> 
                <span>No signup required — upload and insert PDFs instantly</span>
              </div>

              <div className="flex gap-2">
                <CircleCheck color="green" strokeWidth={1.5} /> 
                <span>Fast and secure — files auto-delete after processing</span>
              </div>

            </div>

          </div>

          {/* feature card section */}
          <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
            Features of PDFtoolify - Add PDF in PDF
          </h1>
          <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

            <FeaturesCard 
              Icon={FilePlus} 
              heading="Insert PDFs Easily" 
              paragraph="Add one PDF inside another without complications. Simply choose the page where you want to insert and you're done."
            />

            <FeaturesCard 
              Icon={Gift} 
              heading="Free & No Sign Up Required" 
              paragraph="Insert PDFs into any page position completely free. No signup, no limits—just upload your files and merge instantly."
            />

            <FeaturesCard 
              Icon={Layers} 
              heading="Insert Multiple Pages" 
              paragraph="Add single pages or entire PDFs smoothly. Perfect for combining scanned pages, assignments, forms, and documents."
            />

            <FeaturesCard 
              Icon={Files} 
              heading="Precise Page Placement" 
              paragraph="Choose the exact page number where the new PDF should be inserted. Full control over your document structure."
            />

            <FeaturesCard 
              Icon={ShieldCheck} 
              heading="Secure PDF Processing" 
              paragraph="Your PDFs are processed safely and automatically deleted after merging. 100% privacy—no files stored."
            />

            <FeaturesCard 
              Icon={Zap} 
              heading="Fast & Efficient" 
              paragraph="Experience lightning-fast PDF insertion with optimized performance and high-quality output."
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
            <div className="flex justify-center items-center">
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 items-center">
                  <span className="md:w-5 md:h-5 w-4 h-4 rounded-md bg-black inline-block"></span> 
                  <span className="md:text-2xl text-xl text-gray-800 font-semibold">How to add pdf inside a pdf?</span>
                </div>
                <p className="whitespace-pre text-sm tracking-tighter">1.     Select file or drag and drop file in the select container</p>
                <p className="whitespace-pre text-sm tracking-tighter">2.     Select a position where you want to add pdf</p>
                <p className="whitespace-pre text-sm tracking-tighter">3.     Select another pdf file then download final pdf</p>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Add PDF in PDF FAQs</h1>
          {/* FAQs Section */}
          <div className="max-w-4xl mx-auto flex flex-col mt-12 items-start gap-6">

            {/* FAQ 1 */}
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">Is PDFtoolify’s Add PDF in PDF tool free?</p>
              <p className="text-sm font-medium text-gray-800">
                Yes, PDFtoolify is completely free. You can insert one PDF into another without any signup or hidden charges.
              </p>
              <hr className="text-gray-800" />
            </div>

            {/* FAQ 2 */}
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">How can I add a PDF inside another PDF?</p>
              <p className="text-sm font-medium text-gray-800">
                Simply upload your main PDF, choose the page number where you want to insert the new PDF, select the second file, and PDFtoolify will insert it instantly.
              </p>
              <hr className="text-gray-800" />
            </div>

            {/* FAQ 3 */}
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">Will adding a PDF affect the quality of my document?</p>
              <p className="text-sm font-medium text-gray-800">
                No, the quality remains the same. PDFtoolify preserves original text, images, and formatting while adding pages.
              </p>
              <hr className="text-gray-800" />
            </div>

            {/* FAQ 4 */}
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">Is it safe to upload my PDFs online?</p>
              <p className="text-sm font-medium text-gray-800">
                Yes, your files are processed securely. PDFtoolify automatically deletes your PDFs after completion to ensure privacy.
              </p>
              <hr className="text-gray-800" />
            </div>

            {/* FAQ 5 */}
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">Can I insert multiple pages or entire PDFs?</p>
              <p className="text-sm font-medium text-gray-800">
                Absolutely. You can add a full PDF or selected pages, and place them exactly where you want in the main document.
              </p>
              <hr className="text-gray-800" />
            </div>

            {/* FAQ 6 */}
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-800">Is there any limit on how many PDFs I can add?</p>
              <p className="text-sm font-medium text-gray-800">
                No limits. You can insert as many PDFs as you want—PDFtoolify is completely free and unlimited.
              </p>
              <hr className="text-gray-800" />
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
