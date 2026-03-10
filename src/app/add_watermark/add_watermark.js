"use client";
import React, { useEffect, useState } from "react";
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
  Droplet,
  Gift,
  Infinity as InfinityIcon,
  Sparkles,
  Upload,
  ShieldCheck,
  SidebarClose,
  SidebarOpen,
  Zap,
  ArrowRight,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import ToolList from "@/components/ToolList";
import FadeIn from "@/components/FadeIn";
import BlogCard from "@/components/BlogCard";
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const benefits = [
  "Our watermark tool works smoothly on any device",
  "Add custom text watermarks to your PDF in seconds",
  "PDFtoolify is secure, fast, and simple for watermarking",
  "No signup required — watermark PDFs instantly for free",
  "Professional results with zero quality loss",
];

const steps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload PDF",
    description: "Select a PDF file or drag and drop it into the upload area.",
  },
  {
    icon: Droplet,
    step: "2",
    title: "Customize Watermark",
    description: "Set text, opacity, rotation, and position to fit your style.",
  },
  {
    icon: Download,
    step: "3",
    title: "Download PDF",
    description: "Get your watermark-added PDF instantly — fast and free.",
  },
];

const features = [
  {
    icon: Sparkles,
    heading: "Easy to Use",
    paragraph:
      "Designed to be simple and intuitive. Add watermarks to your PDFs in just a few clicks.",
  },
  {
    icon: Gift,
    heading: "Free & No Sign Up",
    paragraph:
      "Add unlimited text watermarks for free. No account needed — quick, easy, and hassle-free.",
  },
  {
    icon: InfinityIcon,
    heading: "Watermarks Without Limits",
    paragraph:
      "Apply watermarks to any number of pages — from a single page to a full document.",
  },
  {
    icon: BadgeCheck,
    heading: "Customizable Watermarks",
    paragraph:
      "Choose your text, size, opacity, rotation, and placement for a professional look.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure Online Processing",
    paragraph:
      "Your files stay safe. Documents are processed securely and deleted automatically.",
  },
  {
    icon: Zap,
    heading: "Fast & Powerful",
    paragraph:
      "PDFtoolify applies watermarks in seconds — reliable, smooth, and lightning fast.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify Really Free?",
    answer:
      "Yes, PDFtoolify is completely free. You can add text watermarks to your PDF files without signing up.",
  },
  {
    question: "How can I add a watermark to my PDF?",
    answer:
      "Upload your PDF, customize the watermark text and placement, and click “Add Watermark.” Your updated PDF will be ready instantly.",
  },
  {
    question: "Will adding a watermark affect PDF quality?",
    answer:
      "No, the PDF quality remains the same. Only the watermark is added — your content stays untouched.",
  },
  {
    question: "Is it safe to upload my PDFs?",
    answer:
      "Yes. Files are processed securely and deleted automatically after completion.",
  },
  {
    question: "Can I customize the watermark?",
    answer:
      "Absolutely. You can customize text, opacity, rotation, and position for your watermark.",
  },
  {
    question: "Does adding a watermark cost anything?",
    answer:
      "No, adding a watermark with PDFtoolify is 100% free and unlimited.",
  },
];

const articles = [
  {
    image: "https://www.pdftoolify.com/how_to_merge.png",
    title: "How to Add a Watermark to PDF",
    description:
      "Upload your PDF, customize watermark text and placement, then download the updated file instantly.",
  },
  {
    image: "https://www.pdftoolify.com/safe_to_merge.png",
    title: "Is It Safe to Watermark PDFs Online?",
    description:
      "PDFtoolify processes files securely and deletes them automatically after completion.",
  },
  {
    image: "https://www.pdftoolify.com/onine_pdf_merger.jpg",
    title: "Best Free PDF Watermark Tool",
    description:
      "Add professional watermarks without signup, limits, or hidden fees — fast and easy.",
  },
];

function AddWaterMarkPage() {
  const [water_mark_position, setWater_mark_position] = useState(5);
  const [water_mark_text, setWater_mark_text] = useState("PdfToolify");
  const [numPages, setnumPages] = useState(0);
  const [transparency, setTransparency] = useState(0);
  const [rotation, setRotation] = useState(45);
  const [isActiveSetting, setisActiveSetting] = useState(true);

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
    setdownloadFileURL,
    setCompletionStatus,
  } = useFileUpload();

  function onDocumentLoadSuccess({ numPages }) {
    setnumPages(numPages);
  }

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    return {
      r: ((bigint >> 16) & 255) / 255,
      g: ((bigint >> 8) & 255) / 255,
      b: (bigint & 255) / 255,
    };
  }
  async function addWatermark() {
    try {
      if (!files) throw new Error("no file selected");

      const arrayBuffer = await files.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 36;

      const { r, g, b } = hexToRgb("#cccccc");

      const transparencyValue = 1 - Number(transparency) / 100;
      const rotationValue = Number(rotation);

      pages.forEach((page) => {
        const { width, height } = page.getSize();

        const textWidth = font.widthOfTextAtSize(water_mark_text, fontSize);
        const textHeight = font.heightAtSize(fontSize);

        let x = 0;
        let y = 0;

        const padding = 90;

        switch (water_mark_position) {
          case 1: // top-left
            x = padding;
            y = height - padding - fontSize;
            break;

          case 2: // top-center
            x = (width - textWidth) / 2;
            y = height - padding - fontSize;
            break;

          case 3: // top-right
            x = width - textWidth - padding;
            y = height - padding - fontSize;
            break;

          case 4: // center-left
            x = padding;
            y = height / 2 - fontSize / 2;
            break;

          case 5: // center
            x = (width - textWidth) / 2;
            y = height / 2;
            break;

          case 6: // center-right
            x = width - textWidth - padding;
            y = height / 2;
            break;

          case 7: // bottom-left
            x = padding;
            y = padding;
            break;

          case 8: // bottom-center
            x = (width - textWidth) / 2;
            y = padding;
            break;

          case 9: // bottom-right
            x = width - textWidth - padding;
            y = padding;
            break;

          default:
            x = (width - textWidth) / 2;
            y = height / 2;
        }

        page.drawText(water_mark_text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(r, g, b),
          rotate: degrees(rotationValue),
          opacity: transparencyValue,
        });
      });

      const newPdfBytes = await pdfDoc.save();
      const blob = new Blob([newPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setdownloadFileURL(url);
      setCompletionStatus(true);

      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    addWatermark();
    // const formData = new FormData();
    // formData.append("pdf_file", files);
    // formData.append("water_mark_position", water_mark_position);
    // formData.append("water_mark_text", water_mark_text);
    // setTimeout(() => {
    //   if (serverPreparing) toast.info("Please refresh the page and try again");
    // }, 12000);
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/add_water_mark",formData);
  };

  let scrollbarStyle = {
    scrollbarWidth: "thin",
  };

  let positionArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  useEffect(() => {
    console.log("transparency", transparency);
    console.log("rotation", rotation);
    console.log("water_mark_text", water_mark_text);
    console.log("water_mark_position", water_mark_position);
  }, [transparency]);

  let dotPosition = {
    1: "top-8 left-8",
    2: "top-8 left-1/2 transform -translate-x-1/2",
    3: "top-8 right-8",
    4: "top-1/2 left-1 transform -translate-y-1/2",
    5: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    6: "top-1/2 right-1 transform -translate-y-1/2",
    7: "bottom-8 left-8",
    8: "bottom-8 left-1/2 transform -translate-x-1/2",
    9: "bottom-8 right-8",
  };

  let selected = 0;

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
              Free Online PDF Watermarker
            </FadeIn>
            <h1 className="section-heading text-center">
              Add <span className="gradient-text">Watermark</span> to PDFs
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Customize text, placement, and opacity to protect your documents in seconds
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
                Add watermark to PDF online for free
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
            <section className="bg-muted/30">
              <div className="container py-20">
                <div className="text-center mb-14">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                    Features of PDFtoolify
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Everything you need to watermark PDFs with confidence
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {features.map((feature, i) => (
                    <FeatureCard key={i} {...feature} delay={200 + i * 100} />
                  ))}
                </div>
              </div>
            </section>
            <section className="container py-20">
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  How to add a watermark online?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Protect your PDF in three simple steps
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
                      <item.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </section>
            <section className="container py-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Add Watermark FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Common questions about our watermark tool
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
            <section className="container py-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Add Watermark Blog Articles
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Learn more about watermarking PDFs effectively
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {articles.map((article, i) => (
                  <BlogCard
                    key={i}
                    post={{
                      ...article,
                      imageUrl: article.image,
                      slug: article.title.toLowerCase().replace(/ /g, "-"),
                    }}
                    index={i}
                  />
                ))}
              </div>
            </section>
            <ToolList />
          </div>
        )}

        {isDroped && !isUploading && !isProcessing && !completionStatus && (
          <div className="max-w-7xl mx-auto bg-gray-100 p-10 mt-24 flex justify-between">
            <div
              className="flex-1 px-10 max-h-screen overflow-auto "
              style={scrollbarStyle}
            >
              <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
                <ul className="flex flex-wrap justify-center gap-6">
                  {Array.from({ length: numPages }, (_, index) => (
                    <div className="rounded-xl bg-gray-50 p-2 relative"
                    key={index}
                    >
                      <Page pageNumber={index + 1} width={180} height={360} />
                      <div className="text-center bg-white">{index + 1}</div>
                      <p
                        className={`w-5 h-5 rounded-full absolute  bg-blue-400 ${dotPosition[water_mark_position]}`}
                      ></p>
                    </div>
                  ))}
                </ul>
              </Document>
              <button className="fixed bg-blue-500 px-4 py-2 rounded-md text-white text-xl top-11/12 right-4 z-20">
                Add watermark
              </button>
            </div>
            <div
              onClick={() => {
                setisActiveSetting((prev) => !prev);
              }}
              className={`w-fit absolute lg:hidden ${isActiveSetting ? "hidden" : "block"} right-1 top-22`}
            >
              <SidebarOpen size={30} />
            </div>
            <div
              className={` lg:relative fixed  lg:right-0 w-96 bg-white h-[90vh] operation-panel z-10 ${isActiveSetting ? "right-0" : "right-[-382px]"} transition-all duration-300 ease-in`}
            >
              <div
                className="lg:hidden block"
                onClick={() => {
                  setisActiveSetting((prev) => !prev);
                }}
              >
                <SidebarClose size={30} />
              </div>
              <h3 className="text-2xl font-semibold text-center text-gray-600">
                Watermark Options
              </h3>
              <div className="w-full px-2 mt-6">
                <label htmlFor="watermarkText" className="text-gray-800">
                  Watermark Text:
                </label>
                <input
                  id="watermarkText"
                  type="text"
                  value={water_mark_text}
                  onChange={(e) => setWater_mark_text(e.target.value)}
                  className="w-full border indent-2 rounded-sm h-10 mt-1"
                />
              </div>
              <div className="px-2 mt-6">
                <label htmlFor="">Position:</label>
                <div>
                  <div className="">
                    <table>
                      <tbody>
                        {positionArray.map((value, rowIndex) => {
                          return (
                            <tr key={`row-${rowIndex}`}>
                              {value.map((_, cellIndex) => {
                                selected++;
                                return (
                                  <td
                                    key={`cell-${rowIndex}-${cellIndex}`}
                                    className="w-6 cursor-pointer hover:bg-blue-200 h-6 border border-dashed"
                                    onClick={() => {
                                      setWater_mark_position(value[cellIndex]);
                                    }}
                                  >
                                    {selected == water_mark_position && (
                                      <p className="w-5 h-5 rounded-full mx-auto my-auto bg-blue-400"></p>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-2">
                <label htmlFor="t" className="text-gray-800">
                  Transparency:
                </label>
                <div>
                  <select
                    name="transparency"
                    id="t"
                    value={transparency}
                    onChange={(e) => {
                      setTransparency(e.target.value);
                    }}
                    className="border w-48 rounded-sm h-10 "
                  >
                    <option value="0">0%</option>
                    <option value="25">25%</option>
                    <option value="50">50%</option>
                    <option value="75">75%</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 p-2">
                <label htmlFor="t" className="text-gray-800">
                  Rotation:
                </label>
                <div>
                  <select
                    name="transparency"
                    id="t"
                    value={rotation}
                    onChange={(e) => {
                      setRotation(e.target.value);
                    }}
                    className="border w-48 rounded-sm h-10 "
                  >
                    <option value="0"> 0deg </option>
                    <option value="45"> 45deg </option>
                    <option value="90"> 90deg </option>
                    <option value="180"> 180deg </option>
                    <option value="270"> 270deg </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
        {serverPreparing && isDroped && (
          <div className="flex flex-col items-center mt-8">
            <p className="text-gray-700 text-md mb-2">
              Preparing Server... Please wait
            </p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {progress === 100 && isProcessing && <Processing />}
      </form>

      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-24">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download watermark Added PDF
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

export default AddWaterMarkPage;
