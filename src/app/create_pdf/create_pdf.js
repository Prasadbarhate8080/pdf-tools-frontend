"use client"; // if you're using Next.js
import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import {
  CircleCheck,
  Gift,
  ShieldCheck,
  Trash2,
  Zap,
  Layers,
  Plus,
  FileType,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import FeaturesCard from "@/components/FeatureCard";
import { PDFDocument } from "pdf-lib";
import { toast } from "react-toastify";
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
  "Create a new PDF instantly from your images",
  "Maintain perfect quality while building a multi-page PDF",
  "Works on any device — mobile, tablet, Windows, Mac",
  "No signup needed — create a PDF instantly with one click",
  "Secure and private — your PDFs are deleted automatically after creation",
];

const features = [
  {
    icon: Plus,
    heading: "Create PDF Easily",
    paragraph:
      "Add your images and generate a clean, professional PDF in just a few clicks.",
  },
  {
    icon: Gift,
    heading: "Free & No Login Needed",
    paragraph:
      "Create new PDFs completely free — no account needed. Just upload images and download instantly.",
  },
  {
    icon: Layers,
    heading: "Multi-page PDF Support",
    paragraph:
      "Combine multiple images into a single PDF document, perfectly ordered and aligned.",
  },
  {
    icon: FileType,
    heading: "High-Quality Output",
    paragraph:
      "Your images are converted with optimized sizing and alignment to keep the PDF looking sharp.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure PDF Creation",
    paragraph:
      "Your files are processed safely, and all uploaded documents are deleted automatically after creating your PDF.",
  },
  {
    icon: Zap,
    heading: "Fast & Efficient",
    paragraph:
      "Convert images to PDF in seconds — designed for speed, accuracy, and smooth workflow.",
  },
];

const steps = [
  {
    step: "1",
    title: "Upload your images",
    description:
      "Select JPG, PNG, or WEBP images from your device or drag and drop them into the upload area.",
  },
  {
    step: "2",
    title: "Create your PDF",
    description:
      "Click on “Create PDF” to convert your selected images into a single PDF file.",
  },
  {
    step: "3",
    title: "Download created PDF",
    description:
      "Download your new PDF instantly and use it for sharing, printing, or archiving.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify’s Create PDF tool free to use?",
    answer:
      "Yes, PDFtoolify is completely free. You can create new PDFs from images without any signup or installation.",
  },
  {
    question: "How can I create a PDF using PDFtoolify?",
    answer:
      "Simply upload your images, click on “Create PDF,” and download the generated PDF instantly.",
  },
  {
    question: "Will the quality of my images change after converting to PDF?",
    answer:
      "No. Your images are optimized for the PDF page but remain clear and readable, preserving quality as much as possible.",
  },
  {
    question: "Is it safe to create PDFs online?",
    answer:
      "Yes. Your files are processed securely, and PDFtoolify deletes all uploaded documents automatically after processing.",
  },
  {
    question: "Can I combine many images into one PDF?",
    answer:
      "Absolutely. You can add multiple images and convert them all into a single multi-page PDF.",
  },
  {
    question: "Do I need any software to create a PDF?",
    answer:
      "No software required. PDFtoolify works directly in your browser, allowing you to create PDFs instantly online.",
  },
];

function CreatePdf() {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([]);
    let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi,setCompletionStatus,setdownloadFileURL
      } = useFileUpload()
  


  async function createPdf() {
    try {
      setLoading(true)
      let pdfDoc = await PDFDocument.create();
      const PAGE_WIDTH = 595.28;
      const PAGE_HEIGHT = 841.89;

      for (let img of files){
        let ext = img.name.split(".").pop().toLowerCase();
        let imageBytes = await img.arrayBuffer();
        let image;
        if(ext == "jpg" || ext == "jpeg")
          image = await pdfDoc.embedJpg(imageBytes);
        else if(ext == "png")
          image = await pdfDoc.embedPng(imageBytes);
        
        if(!image){
          toast.error("unsupported file")
          setFiles([])
          return
        }
      
      const { width: imgWidth, height: imgHeight } = image.scale(1);
      const scale = Math.min(PAGE_WIDTH / imgWidth, PAGE_HEIGHT / imgHeight, 1);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;

      // Center the image
      const x = (PAGE_WIDTH - drawWidth) / 2;
      const y = (PAGE_HEIGHT - drawHeight) / 2;

      const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      page.drawImage(image, {
        x,
        y,
        width: drawWidth,
        height: drawHeight,
      });
    }
      const extractedPDF = await pdfDoc.save(); 
      const blob = new Blob([extractedPDF], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      setdownloadFileURL(url);
      setCompletionStatus(true)
      setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 10000);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }

  } 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please upload images");
      return;
    }
    createPdf();
    // const formData = new FormData();
    // files.forEach((file) => formData.append("images", file));
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/jpg_to_pdf",formData)
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
              Free Online Image to PDF Creator
            </FadeIn>
            <h1 className="section-heading text-center">
              Create <span className="gradient-text">PDF from Images</span>
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Turn your images into a polished PDF document — free, fast, and secure.
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
              multiple={true}
              setImages={setImages}
              mode="images"
              accept={{
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
                "image/webp": [".webp"],
              }}
            />

            {/* Benefits Section */}
            <section className="container py-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
                Create PDF from JPG, PNG & WEBP images online
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
                    Features of PDFtoolify - Create PDF
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Everything you need to turn your images into professional PDFs
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
                  How to create a PDF from images?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Follow these steps to convert your images into a PDF document.
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
                  Create PDF FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Common questions about creating PDFs from images
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
        {isDroped && !isUploading && !completionStatus && (
          <div className="max-w-7xl mx-auto bg-gray-100 p-10 mt-24">
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              {images.map((imgObj, index) => (
                <li
                  key={index}
                  className="w-[220px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                   transition-all duration-300 overflow-hidden relative"
                >
                  <div>
                    <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                      <div className="w-[200px] h-[250px] flex justify-center items-center">
                        <img
                        className="object-contain object-center"
                        src={imgObj.preview} alt={`uploaded-${index}`} />
                      </div>
                    </div>
                  </div>

                  {/* File name */}
                  <div className=" py-2 px-3 text-center">
                    <p
                      className="text-sm font-medium  truncate"
                      title={`/${imgObj.file.name}`}
                    >
                      {imgObj.file.name}
                    </p>
                  </div>
                  <div className="p-1.5 absolute top-1 right-1 bg-red-500 cursor-pointer rounded-full "
                    onClick={(e) => {
                      setImages((prev) => {
                        let array = [...prev];
                        URL.revokeObjectURL(array[index].preview);
                        array.splice(index,1);
                        return array;
                      })
                    }}
                  > <Trash2 size={22} color="white"/></div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                disabled={files.length < 1}
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                ${
                  files.length < 1
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500  active:bg-blue-400"
                }`}
              >
                Create PDF
              </button>
            </div>
          </div>
        )}

        {/* {progress > 0 && progress < 100 && <ProgressBar progress={progress}/>}
        {serverPreparing &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          } */}
        {loading && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-24">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download created PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500 active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download created PDF
            </a>
          </div>
        </div>
      )}

     
    </div>
  );
}

export default CreatePdf
