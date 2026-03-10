"use client"; // if you're using Next.js
import React, { useState } from "react";
import Image from "next/image";
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
  "Convert PNG images to PDF instantly — simple, fast, and accurate",
  "Combine multiple PNG files into a single high-quality PDF",
  "Works on all devices — mobile, tablet, laptop, and desktop",
  "No signup or installation needed — convert PNG to PDF online for free",
  "Your uploaded images are auto-deleted after processing for maximum security",
];

const features = [
  {
    icon: Images,
    heading: "Convert PNG Effortlessly",
    paragraph:
      "Upload one or multiple PNG images and convert them into a clean, high-quality PDF instantly—simple and fast.",
  },
  {
    icon: Gift,
    heading: "Free & No Login Needed",
    paragraph:
      "Convert PNG to PDF absolutely free. No signup, no subscription—just upload your PNG files and download the PDF instantly.",
  },
  {
    icon: Layers,
    heading: "Merge Multiple PNG Images",
    paragraph:
      "Combine unlimited PNG files into a single PDF document. Ideal for scanned pages, photo bundles, assignments, and documents.",
  },
  {
    icon: Scan,
    heading: "High-Quality PDF Output",
    paragraph:
      "Your PNG images are converted with maximum clarity and perfect alignment. Zero quality loss during the conversion process.",
  },
  {
    icon: ShieldCheck,
    heading: "Safe & Secure Conversion",
    paragraph:
      "All PNG images are processed securely, and files are automatically deleted after conversion—keeping your privacy protected.",
  },
  {
    icon: Zap,
    heading: "Fast & Powerful Converter",
    paragraph:
      "Enjoy lightning-fast PNG to PDF conversion. Optimized for speed and accuracy to deliver your final PDF within seconds.",
  },
];

const steps = [
  {
    step: "1",
    title: "Upload your PNG images",
    description:
      "Select PNG images from your device or drag and drop them into the upload area.",
  },
  {
    step: "2",
    title: "Convert to PDF",
    description:
      "Click on the Create PDF button to convert your PNG images into a single PDF file.",
  },
  {
    step: "3",
    title: "Download your PDF",
    description:
      "Download the created PDF instantly and use it for sharing, printing, or storing.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify’s PNG to PDF converter free?",
    answer:
      "Yes, PDFtoolify is completely free. You can convert PNG images to PDF without any signup or charges.",
  },
  {
    question: "How can I convert PNG to PDF using PDFtoolify?",
    answer:
      "Simply upload your PNG images, arrange them in order, and click “Convert.” Your high-quality PDF will be generated instantly.",
  },
  {
    question: "Will the image quality change after converting PNG to PDF?",
    answer:
      "No. Your PNG images retain their clarity and resolution. PDFtoolify ensures sharp and high-quality output every time.",
  },
  {
    question: "Is it safe to convert PNG to PDF online?",
    answer:
      "Yes. Your PNG images are processed securely, and all files are automatically deleted after conversion to protect your privacy.",
  },
  {
    question: "Can I merge multiple PNG images into one PDF?",
    answer:
      "Absolutely. You can add as many PNG images as you want and combine them into a single, well-organized PDF.",
  },
  {
    question: "Do I need to install any software to convert PNG to PDF?",
    answer:
      "No installation needed. PDFtoolify works directly in your browser, allowing fast and smooth PNG to PDF conversion online.",
  },
];

function PNGToPDF() {
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

  async function pngToPdf() {
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
    pngToPdf();
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
              Free Online PNG to PDF Converter
            </FadeIn>
            <h1 className="section-heading text-center">
              Convert <span className="gradient-text">PNG to PDF</span>{" "}
              Instantly
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Turn your PNG images into a single high-quality PDF — fast, secure, and completely free.
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
                Create PDF from PNG images online for free
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
                    Features of PDFtoolify - PNG to PDF
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Powerful tools to turn your PNG images into professional PDFs
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
                  How to convert PNG to PDF online?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Follow these quick steps to convert your PNG images into a PDF.
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
                  PNG to PDF FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Answers to common questions about converting PNG images to PDF
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

export default PNGToPDF
