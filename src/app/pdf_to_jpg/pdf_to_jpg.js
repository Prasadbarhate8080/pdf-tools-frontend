"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BadgeCheck,
  CheckCircle,
  Download,
  GalleryHorizontalEnd,
  Gift,
  ShieldCheck,
  Sparkles,
  SplitSquareHorizontal,
  Upload,
  Zap,
} from "lucide-react";
import FeaturesCard from "@/components/FeatureCard";
import PDFPageComponent from "@/components/PDFPageComponent";
import JSZip from "jszip";
import ToolList from "@/components/ToolList";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const benefits = [
  "Our free PDF to JPG converter works smoothly on any device",
  "Convert any PDF page into a high-quality JPG image",
  "Secure processing with automatic file deletion",
  "No signup required — convert PDFs instantly",
  "Fast, reliable JPG conversion in seconds",
];

const steps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload PDF",
    description: "Select a PDF file or drag and drop it into the upload area.",
  },
  {
    icon: SplitSquareHorizontal,
    step: "2",
    title: "Convert Pages",
    description: "Click convert to turn each PDF page into a JPG image.",
  },
  {
    icon: Download,
    step: "3",
    title: "Download JPGs",
    description: "Download a ZIP file containing all your JPG images.",
  },
];

const features = [
  {
    icon: SplitSquareHorizontal,
    heading: "Easy Page-to-Image Conversion",
    paragraph:
      "Convert your PDF pages into high-quality JPG images instantly. The tool is simple, intuitive, and perfect for everyone.",
  },
  {
    icon: Gift,
    heading: "Free & No Sign Up Needed",
    paragraph:
      "Convert PDFs to JPG images absolutely free. No hidden charges, no login—just upload your PDF and download your JPGs instantly.",
  },
  {
    icon: GalleryHorizontalEnd,
    heading: "Convert Unlimited Pages",
    paragraph:
      "Whether you want to convert a single page or an entire PDF, our tool handles multiple page conversions quickly and smoothly.",
  },
  {
    icon: BadgeCheck,
    heading: "High-Quality JPG Output",
    paragraph:
      "Every JPG image is generated with sharp clarity and accurate rendering. No quality loss during PDF-to-image conversion.",
  },
  {
    icon: ShieldCheck,
    heading: "Safe & Private Conversion",
    paragraph:
      "Your files remain secure and are deleted automatically after processing. Enjoy worry-free and private PDF to JPG conversion.",
  },
  {
    icon: Zap,
    heading: "Fast & Efficient Processing",
    paragraph:
      "Our optimized engine converts PDF pages to JPGs within seconds—fast, reliable, and perfect for professional use.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify’s PDF to JPG converter free?",
    answer:
      "Yes, PDFtoolify is completely free to use. You can convert any PDF page into a JPG image without creating an account.",
  },
  {
    question: "How can I convert a PDF to JPG using PDFtoolify?",
    answer:
      "Just upload your PDF file and click “Convert to JPG.” PDFtoolify will instantly turn each PDF page into a high-quality JPG image.",
  },
  {
    question: "Will the image quality change after conversion?",
    answer:
      "No. The JPG images maintain excellent clarity and resolution. PDFtoolify ensures your output remains sharp and accurate.",
  },
  {
    question: "Is it safe to convert PDF files to JPG online?",
    answer:
      "Yes. Your files are processed securely, and PDFtoolify automatically deletes all PDFs and images after the conversion is completed.",
  },
  {
    question: "Can I convert all pages of a PDF to JPG?",
    answer:
      "Absolutely. You can convert a single page or all pages of a PDF—PDFtoolify handles multi-page conversion with ease.",
  },
  {
    question: "Does converting PDF to JPG cost anything?",
    answer:
      "No, PDF to JPG conversion on PDFtoolify is completely free—no hidden fees or subscription required.",
  },
];

function PDFToJPG() {
  const [numPages, setnumPages] = useState(0)
  const [loading, setLoading] = useState(false)
   let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi,setdownloadFileURL,setCompletionStatus
      } = useFileUpload()
    
  function onDocumentLoadSuccess ({numPages}) {
    setnumPages(numPages)
  }

  async function convertToJpg () {
    try {
      if(!numPages) return
      setLoading(true)
      const zip = new JSZip();
      
      const canvases = document.querySelectorAll(".react-pdf__Page canvas");
      canvases.forEach((canvas, i) => {
      const imageData = canvas.toDataURL("image/jpeg", 1.0);
      const base64Data = imageData.split(",")[1];
      zip.file(`page_${i + 1}.jpg`, base64Data, { base64: true });
    });
      const zipBlob = await zip.generateAsync({type:"blob"})
      let url = URL.createObjectURL(zipBlob)
      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    convertToJpg();
    // const formData = new FormData();
    // formData.append("f1", files);
    
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/pdf_to_jpg", formData);
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Free Online PDF to JPG Converter
            </div>
            <h1 className="section-heading text-center">
              Convert <span className="gradient-text">PDF to JPG</span> Instantly
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Turn every PDF page into high-quality JPG images — fast, secure, and free
            </p>
          </div>
        </section>
      )}
      {isDroped && files &&  <Document
      className={""}
      file={files} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages),(el,index) => (
          <div key={index} className="hidden">
            <Page
              key={index}
              pageNumber={index + 1}
            ></Page>
          </div>
        ))}
      </Document>}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        encType="multipart/form-data"
      >
        {!isDroped && !completionStatus && (
          <div>
            <FileInput
              setFiles={setFiles}
              setisDroped={setisDroped}
              multiple={false}
              accept={{ "application/pdf": [] }}
            />
            <section className="container py-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
                Convert PDF pages to JPG online
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
            <section className="bg-muted/30">
              <div className="container py-20">
                <div className="text-center mb-14">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                    Features of PDFtoolify
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Everything you need to convert PDFs into images
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {features.map((feature, i) => (
                    <FeaturesCard key={i} {...feature} delay={200 + i * 100} />
                  ))}
                </div>
              </div>
            </section>
            <section className="container py-20">
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  How to convert PDF to JPG?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Convert your PDF in three quick steps
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
                      <item.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section className="container py-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  PDF to JPG FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Common questions about PDF to JPG conversion
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
          <div className="max-w-7xl mx-auto p-10">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              <PDFPageComponent file={files} />
            </ul>

            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                 bg-blue-500  active:bg-blue-400`}
              >
                Convert To JPG
              </button>
            </div>
          </div>
        )}

        
        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
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
            Download JPG Images 
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download="converted_images.zip"
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Zip File
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default PDFToJPG;
