"use client";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import FileInput from "@/components/FileInput";
import { useFileUpload } from "@/hooks/useFileUpload";
import {
  BadgeCheck,
  CircleCheck,
  Gift,
  InfinityIcon,
  MousePointerClick,
  ShieldCheck,
  SplitIcon,
  Zap,
  CheckCircle2,
  CheckSquare,
  Check,
  Plus,
  FilePlus,
  Files,
  Layers,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import FeaturesCard from "@/components/FeatureCard";
import { error, PDFDocument } from "pdf-lib";
import { toast } from "react-toastify";
import ToolList from "@/components/ToolList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const benefits = [
  "Add any PDF inside another PDF at any page position",
  "Easily insert multiple pages or entire PDFs in one click",
  "Works on all devices — mobile, tablet, and PC",
  "No signup required — upload and insert PDFs instantly",
  "Fast and secure — files auto-delete after processing",
];

const features = [
  {
    icon: FilePlus,
    heading: "Insert PDFs Easily",
    paragraph:
      "Add one PDF inside another without complications. Simply choose the page where you want to insert and you're done.",
  },
  {
    icon: Gift,
    heading: "Free & No Sign Up Required",
    paragraph:
      "Insert PDFs into any page position completely free. No signup, no limits—just upload your files and merge instantly.",
  },
  {
    icon: Layers,
    heading: "Insert Multiple Pages",
    paragraph:
      "Add single pages or entire PDFs smoothly. Perfect for combining scanned pages, assignments, forms, and documents.",
  },
  {
    icon: Files,
    heading: "Precise Page Placement",
    paragraph:
      "Choose the exact page number where the new PDF should be inserted. Full control over your document structure.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure PDF Processing",
    paragraph:
      "Your PDFs are processed safely and automatically deleted after merging. 100% privacy—no files stored.",
  },
  {
    icon: Zap,
    heading: "Fast & Efficient",
    paragraph:
      "Experience lightning-fast PDF insertion with optimized performance and high-quality output.",
  },
];

const steps = [
  {
    step: "1",
    title: "Upload your main PDF",
    description:
      "Select the primary PDF where you want to insert additional pages.",
  },
  {
    step: "2",
    title: "Choose insert position",
    description:
      "Pick the page number where the new PDF should be inserted.",
  },
  {
    step: "3",
    title: "Select and insert PDF",
    description:
      "Upload the second PDF, insert it, and download your final merged document.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify’s Add PDF in PDF tool free?",
    answer:
      "Yes, PDFtoolify is completely free. You can insert one PDF into another without any signup or hidden charges.",
  },
  {
    question: "How can I add a PDF inside another PDF?",
    answer:
      "Upload your main PDF, choose the page number where you want to insert the new PDF, select the second file, and PDFtoolify will insert it instantly.",
  },
  {
    question: "Will adding a PDF affect the quality of my document?",
    answer:
      "No, the quality remains the same. PDFtoolify preserves original text, images, and formatting while adding pages.",
  },
  {
    question: "Is it safe to upload my PDFs online?",
    answer:
      "Yes, your files are processed securely. PDFtoolify automatically deletes your PDFs after completion to ensure privacy.",
  },
  {
    question: "Can I insert multiple pages or entire PDFs?",
    answer:
      "Absolutely. You can add a full PDF or selected pages, and place them exactly where you want in the main document.",
  },
  {
    question: "Is there any limit on how many PDFs I can add?",
    answer:
      "No limits. You can insert as many PDFs as you want—PDFtoolify is completely free and unlimited.",
  },
];

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
    <div className="min-h-screen bg-background">
      {!completionStatus && !isDroped && (
        <section
          className="relative pt-16 pb-6"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div
            className="absolute top-0 left-0 right-0 -bottom-96 pointer-events-none"
            style={{ background: "var(--gradient-glow)" }}
          />
          <div className="container pt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Free Online Add PDF in PDF
            </div>
            <h1 className="section-heading text-center">
              Insert <span className="gradient-text">PDF into PDF</span> Easily
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Add one PDF inside another at any page position — free, fast, and secure.
            </p>
          </div>
        </section>
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

          {/* Benefits Section */}
          <section className="container py-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
              Add a PDF inside another PDF online for free
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl hover:bg-card border border-transparent hover:border-border/50 transition-all duration-200 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${400 + i * 80}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* feature card section */}
          <section className="bg-muted/30">
            <div className="container py-20">
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Features of PDFtoolify - Add PDF in PDF
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Powerful tools to insert entire PDFs exactly where you need them
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {features.map((feature, i) => (
                  <FeaturesCard key={i} {...feature} delay={200 + i * 100} />
                ))}
              </div>
            </div>
          </section>

          {/* how to section */}
          <section className="container py-20">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                How to add a PDF inside another PDF?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Insert one PDF into another in three quick steps.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((item, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${200 + i * 150}ms` }}
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl feature-icon-gradient flex items-center justify-center mb-5 mt-2">
                    <Sparkles className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs Section */}
          <section className="container py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Add PDF in PDF FAQs
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Common questions about inserting a PDF into another PDF
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border border-border/50 rounded-xl px-6 bg-card/50 backdrop-blur-sm data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

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
