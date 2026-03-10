"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import FileInput from "@/components/FileInput";
import {
  BadgeCheck,
  CircleCheck,
  Gift,
  InfinityIcon,
  Lock,
  MousePointerClick,
  ShieldCheck,
  ShieldHalf,
  SplitIcon,
  Zap,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import FeaturesCard from "@/components/FeatureCard";
import Image from "next/image";
import PDFPageComponent from "@/components/PDFPageComponent";
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
  "Our free Protect PDF tool works on any device, including mobile and desktop",
  "Easily add a password to your PDF and secure your important documents",
  "PDFtoolify uses strong encryption to protect your PDF from unauthorized access",
  "No signup required — lock your PDF files instantly online",
  "Protect PDFs in seconds with PDFtoolify — fast, secure, and reliable",
];

const features = [
  {
    icon: Lock,
    heading: "Easy to Protect",
    paragraph:
      "Protecting your PDF is simple and intuitive. Upload your file, set a password, and secure your document instantly.",
  },
  {
    icon: Gift,
    heading: "Free & No Sign Up",
    paragraph:
      "Add password protection to unlimited PDF files for free. No registration, no hidden fees—just quick and secure PDF locking.",
  },
  {
    icon: ShieldHalf,
    heading: "Strong Encryption",
    paragraph:
      "Your PDF is encrypted using strong security standards, ensuring your private documents stay safe from unauthorized access.",
  },
  {
    icon: BadgeCheck,
    heading: "Accurate & Reliable Protection",
    paragraph:
      "PDFtoolify locks your PDF without altering its content. Your formatting and layout remain exactly the same after protection.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure Online Processing",
    paragraph:
      "All uploaded files are processed securely and deleted automatically after encryption to maintain your privacy.",
  },
  {
    icon: Zap,
    heading: "Fast & Powerful",
    paragraph:
      "Protect your PDF in just seconds. Our optimized engine encrypts files quickly while ensuring top-level security.",
  },
];

const steps = [
  {
    step: "1",
    title: "Upload your PDF file",
    description:
      "Select a PDF from your device or drag and drop it into the upload area.",
  },
  {
    step: "2",
    title: "Set a strong password",
    description:
      "Enter a secure password to lock your PDF and prevent unauthorized access.",
  },
  {
    step: "3",
    title: "Protect & download PDF",
    description:
      "Click on “Protect PDF” and download your newly encrypted, password-protected file.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify really free for protecting PDFs?",
    answer:
      "Yes. PDFtoolify is completely free to use. You can lock your PDF files with a password without any signup or charges.",
  },
  {
    question: "How can I protect my PDF using PDFtoolify?",
    answer:
      "Simply upload your PDF, enter a password, and click “Protect PDF.” Your file will instantly be encrypted with strong security.",
  },
  {
    question: "Will protecting a PDF reduce its quality?",
    answer:
      "No. Protecting your PDF only adds encryption. Your content, layout, text, and images remain unchanged.",
  },
  {
    question: "Is it safe to protect my PDF online?",
    answer:
      "Yes. PDFtoolify uses secure processing, and your files are automatically deleted after encryption to ensure complete privacy.",
  },
  {
    question: "Can I protect PDF files offline with PDFtoolify?",
    answer:
      "Yes. You can download PDFtoolify for Windows and protect your files offline without needing internet access.",
  },
  {
    question: "Does protecting a PDF cost anything?",
    answer:
      "No. Adding a password to your PDF using PDFtoolify is completely free.",
  },
];

function Protect() {
  const [password, setPassword] = useState(null);
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
  } = useFileUpload();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf_file", files);
    formData.append("password", password);
    callApi(
      "https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/protect_pdf",
      formData
    );
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
              Free Online PDF Protector
            </FadeIn>
            <h1 className="section-heading text-center">
              Protect <span className="gradient-text">PDF Files</span> with
              Password
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Add strong password protection to your PDF files — fast, secure, and completely free.
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
                Protect PDF files with a strong password
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
                    Features of PDFtoolify - Protect PDF
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Secure your important PDF documents with powerful, easy-to-use protection tools
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
                  How to protect a PDF online for free?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Lock your PDF with a password in three quick steps.
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
                  Protect PDF FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Common questions about locking your PDF files with a password
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
            <div className="text-center w-fit mx-auto mt-3">
                <label htmlFor="password" className="block w-full text-left">Enter Password</label>
                <input
                onChange={(e) => {setPassword(e.target.value)}}
                type="password" id="password" 
                className="bg-white text-gray indent-1 border-2 border-gray-500 h-8
                 hover:border-gray-700 rounded-md "
                 />
            </div>
            <div className="flex  items-center justify-center gap-4 mt-6">
              {/* Merge Button */}
              <button
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                       bg-blue-500  active:bg-blue-400`}
              >
                Protect The PDF File
              </button>
            </div>
          </div>
        )}

        {progress > 0 && progress < 100 && <ProgressBar progress={progress}/>}
        {serverPreparing &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          }
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Protected PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Protected PDF
            </a>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Protect;
