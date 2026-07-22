"use client";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";
import {
  MousePointerClick,
  Zap,
  Plus,
  FilePlus,
} from "lucide-react";
import FeatureCardSection from "@/components/FeatureCardSection";
import { PDFDocument } from "pdf-lib";
import { toast } from "react-toastify";
import ToolList from "@/components/ToolList";
import ToolHeader from "@/components/ToolHeader";
import BenefitsSection from "@/components/BenefitsSection";
import FaqSection from "@/components/FaqSection";
import HowToSection from "@/components/HowToSection";
import { addPdfInPdfBenefits } from "@/data/benefits";
import { addPdfInPdfFeatures } from "@/data/features";
import { addPdfInPdfFaqs } from "@/data/faqs";
import { addPdfInPdfHowToSteps } from "@/data/howTo";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function AddPdfInPdf() {
  let pdfFile = useRef(null)
  const [numPages, setnumPages] = useState(0)
  const [isPopupActive, setIsPopupActive] = useState(false)
  const [pdfFilePageno, setPdfFilePageno] = useState(1)


  let {
    files,
    isDroped,
    completionStatus,
    isUploading,
    downloadFileURL,
    setisDroped,
    setFiles,
    setCompletionStatus,
    setdownloadFileURL,
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
    <div className="min-h-screen bg-background">
      {!completionStatus && !isDroped && (
                <ToolHeader sparklesText={"Free Online PDF Inserter"} headings={["Insert","PDF into PDF","Easily"]} text={"Add one PDF inside another at any page position — free, fast, and secure."} />

      )}
      {!isDroped && (
        <div>
          <FileInput
            files={files}
            setFiles={setFiles}
            setisDroped={setisDroped}
            multiple={false}
            accept={{ "application/pdf": [] }}
          />

          <BenefitsSection
            heading={"Add a PDF inside another PDF online for free"}
            benefits={addPdfInPdfBenefits}
          />
          <FeatureCardSection
            tool={"Add PDF in PDF"}
            text="Powerful tools to insert entire PDFs exactly where you need them"
            features={addPdfInPdfFeatures}
          />

          <HowToSection
            heading={"How to add a PDF inside another PDF?"}
            text={"Insert one PDF into another in three quick steps."}
            steps={addPdfInPdfHowToSteps}
          />

          <FaqSection
            heading={"Add PDF in PDF FAQs"}
            text={"Common questions about inserting a PDF into another PDF"}
            faqs={addPdfInPdfFaqs}
          />
          <ToolList />
        </div>
      )}
      {isDroped && !isUploading && !completionStatus && (
        <div className="max-w-7xl mx-auto bg-gray-100 p-10 mt-24">
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
      </div>
      )}
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-24">
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
      <ToastContainer />
    </div>
  )
}

export default AddPdfInPdf
