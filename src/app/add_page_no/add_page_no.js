"use client"
import { useState } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
  Sparkles,
  CheckCircle,
} from "lucide-react";
import FeaturesCard from "@/components/FeatureCard";
import PDFPageComponent from "@/components/PDFPageComponent";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import ToolList from "@/components/ToolList";
import FadeIn from "@/components/FadeIn";
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
  "Our free page number tool works perfectly on any device",
  "Easily add page numbers to your PDF with PDFtoolify",
  "PDFtoolify is secure, fast, and simple for all PDF operations",
  "No signup required — add page numbers instantly",
  "Add page numbers to PDFs in seconds — free, reliable, and easy to use",
];

const features = [
  {
    icon: MousePointerClick,
    heading: "Easy to Use",
    paragraph:
      "Adding page numbers to your PDFs is super simple. Just upload your file and apply numbering in one click.",
  },
  {
    icon: Gift,
    heading: "Free & No Sign Up",
    paragraph:
      "Add page numbers to unlimited PDFs online for free. No account or registration required.",
  },
  {
    icon: InfinityIcon,
    heading: "Customize as You Want",
    paragraph:
      "Choose numbering position and alignment to match your document’s needs.",
  },
  {
    icon: BadgeCheck,
    heading: "Accurate Page Numbering",
    paragraph:
      "Clean, precise placement of page numbers on every page without affecting your original layout.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure Online Processing",
    paragraph:
      "Your files are deleted automatically after processing. PDFtoolify keeps your documents private and secure.",
  },
  {
    icon: Zap,
    heading: "Fast & Powerful",
    paragraph:
      "Add page numbers to your PDFs within seconds. Quick processing with high-quality output.",
  },
];

const steps = [
  {
    step: "1",
    title: "Upload your PDF",
    description:
      "Select a PDF from your device or drag and drop it into the upload area.",
  },
  {
    step: "2",
    title: "Choose page number position",
    description:
      "Select where you want the page numbers to appear (top or bottom, left, center, or right).",
  },
  {
    step: "3",
    title: "Apply and download",
    description:
      "Click on “Add Page Numbers” and download your updated PDF instantly.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify really free?",
    answer:
      "Yes, PDFtoolify is completely free. You can add page numbers to your PDF files without any signup or hidden charges.",
  },
  {
    question: "How can I add page numbers to my PDF?",
    answer:
      "Upload your PDF, choose the page number position, then click “Add Page Numbers.” Your updated PDF will be ready instantly.",
  },
  {
    question: "Will adding page numbers change my PDF quality?",
    answer:
      "No, adding page numbers does not affect your PDF content or quality. Only clean and accurate numbering is added.",
  },
  {
    question: "Is it safe to upload my PDFs?",
    answer:
      "Yes, your files are processed securely. PDFtoolify automatically deletes your PDFs from the server after processing to ensure privacy.",
  },
  {
    question: "Can I customize the page numbers?",
    answer:
      "Yes, you can choose the page number position and alignment to match your document’s requirements.",
  },
  {
    question: "Does adding page numbers cost anything?",
    answer:
      "No, adding page numbers using PDFtoolify is completely free and unlimited.",
  },
];

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
            <FadeIn className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Free Online Page Number Adder
            </FadeIn>
            <h1 className="section-heading text-center">
              Add <span className="gradient-text">Page Numbers</span> to PDF
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Quickly add clear, consistent page numbers to your PDF documents — free, fast, and secure.
            </p>
          </div>
        </section>
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        encType="multipart/form-data"
      >
        {!isDroped && (
          <div>
            <FileInput
              setFiles={setFiles}
              setisDroped={setisDroped}
              multiple={false}
              accept={{ "application/pdf": [] }}
            />

            {/* Benefits Section */}
            <section className="container py-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
                Add page numbers to your PDF online for free
              </h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {benefits.map((benefit, i) => (
                  <FadeIn
                    key={i}
                    delay={400 + i * 80}
                    className="flex items-start gap-3 p-4 rounded-xl hover:bg-card border border-transparent hover:border-border/50 transition-all duration-200"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </FadeIn>
                ))}
              </div>
            </section>

            {/* feature card section */}
            <section className="bg-muted/30">
              <div className="container py-20">
                <div className="text-center mb-14">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                    Features of PDFtoolify - Add Page Numbers
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Everything you need to add clean, professional page numbers to your PDFs
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
                  How to add page numbers in a PDF online?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Add page numbers to your PDF in just a few simple steps.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {steps.map((item, i) => (
                  <FadeIn
                    key={i}
                    delay={200 + i * 150}
                    className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
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
                  </FadeIn>
                ))}
              </div>
            </section>

            {/* FAQs Section */}
            <section className="container py-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Add Page Numbers FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Common questions about adding page numbers to your PDFs
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

        {isDroped && !isUploading && !isProcessing && !completionStatus && (
          <div className="max-w-7xl mx-auto bg-gray-100 p-10 mt-24">
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
        <div className="max-w-5xl text-center mx-auto  mt-24">
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

