"use client"; // if you're using Next.js
import React, { useState } from "react";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
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
  Images,
  Layers,
  Scan,
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
  "Convert JPG images to PDF in seconds — simple and fast",
  "Maintain high-quality output while merging multiple images into a single PDF",
  "PDFtoolify works on any device — mobile, PC, tablet",
  "No signup required — upload your images and get a PDF instantly",
  "Secure and reliable — your images are deleted automatically after processing",
];

const features = [
  {
    icon: Images,
    heading: "Convert Images Effortlessly",
    paragraph:
      "Upload one or multiple JPG, PNG, or JPEG images and convert them to a clean, high-quality PDF in just a few clicks.",
  },
  {
    icon: Gift,
    heading: "Free & No Login Required",
    paragraph:
      "Convert JPG to PDF completely free—no signup, no hidden fees. Just upload your photos and download the PDF instantly.",
  },
  {
    icon: Layers,
    heading: "Merge Multiple Images",
    paragraph:
      "Combine unlimited images into a single PDF document. Perfect for assignments, forms, scanned pages, and photo collections.",
  },
  {
    icon: Scan,
    heading: "High-Quality PDF Output",
    paragraph:
      "Your images are converted with maximum clarity and accurate page alignment—no loss in quality during the conversion.",
  },
  {
    icon: ShieldCheck,
    heading: "Safe & Secure Conversion",
    paragraph:
      "Your images are processed securely. All files are automatically removed after conversion to protect your privacy.",
  },
  {
    icon: Zap,
    heading: "Fast & Reliable Processing",
    paragraph:
      "Experience extremely fast JPG to PDF conversion. Get your final PDF in seconds—optimized for performance and accuracy.",
  },
];

const steps = [
  {
    step: "1",
    title: "Upload your images",
    description:
      "Select JPG, PNG, or JPEG images from your device or drag and drop them into the upload area.",
  },
  {
    step: "2",
    title: "Arrange & create PDF",
    description:
      "Review your images, then click on the Create PDF button to convert them into a single PDF file.",
  },
  {
    step: "3",
    title: "Download your PDF",
    description:
      "Download the generated PDF instantly and share or store it anywhere you like.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify’s JPG to PDF converter free?",
    answer:
      "Yes, PDFtoolify is completely free. You can convert JPG or PNG images to PDF without creating an account.",
  },
  {
    question: "How can I convert JPG to PDF using PDFtoolify?",
    answer:
      "Upload your images, arrange them in the order you want, and click Convert. PDFtoolify will create a high-quality PDF instantly.",
  },
  {
    question: "Will the image quality change after converting to PDF?",
    answer:
      "No. Your images remain sharp and high-quality after conversion. PDFtoolify ensures excellent clarity in the final PDF.",
  },
  {
    question: "Is it safe to convert JPG to PDF online?",
    answer:
      "Yes. All uploaded images are processed securely, and PDFtoolify automatically deletes your files after conversion.",
  },
  {
    question: "Can I merge multiple images into one PDF?",
    answer:
      "Absolutely. You can add multiple JPG or PNG images and combine them into a single PDF file easily.",
  },
  {
    question: "Do I need to install any software to convert JPG to PDF?",
    answer:
      "No installation required. PDFtoolify works directly in your browser, allowing you to convert images to PDF instantly online.",
  },
];

const JpgToPdf = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  let {
    files,
    isDroped,
    isProcessing,
    completionStatus,
    isUploading,
    downloadFileURL,
    serverPreparing,
    progress,
    setisDroped,
    setFiles,
    callApi,
    setCompletionStatus,
    setdownloadFileURL,
  } = useFileUpload();

  async function jpgToPdf() {
    try {
      setLoading(true);
      let pdfDoc = await PDFDocument.create();
      const PAGE_WIDTH = 595.28;
      const PAGE_HEIGHT = 841.89;

      for (let img of files) {
        let ext = img.name.split(".").pop().toLowerCase();
        let imageBytes = await img.arrayBuffer();
        let image;
        if (ext == "jpg" || ext == "jpeg")
          image = await pdfDoc.embedJpg(imageBytes);
        else if (ext == "png")
          image = await pdfDoc.embedPng(imageBytes);

        if (!image) {
          toast.error("unsupported file");
          setFiles([]);
          return;
        }

        const { width: imgWidth, height: imgHeight } = image.scale(1);
        const scale = Math.min(
          PAGE_WIDTH / imgWidth,
          PAGE_HEIGHT / imgHeight,
          1
        );
        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;

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
      setCompletionStatus(true);
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 10000);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  } 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please upload images");
      return;
    }
    jpgToPdf();
    // const formData = new FormData();
    // files.forEach((file) => formData.append("images", file));
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/jpg_to_pdf",formData)
  };

  return (
    <div className="min-h-screen bg-background">
      {!completionStatus && (
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
              Free Online JPG to PDF Converter
            </FadeIn>
            <h1 className="section-heading text-center">
              Create <span className="gradient-text">PDF from Images</span>{" "}
              Instantly
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Convert JPG, PNG, and JPEG images into a single high-quality PDF — free, fast, and secure.
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
                Create PDF from JPG & PNG images online for free
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
                  How to convert JPG to PDF online?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Follow these simple steps to create a PDF from your images.
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
};

export default JpgToPdf;
