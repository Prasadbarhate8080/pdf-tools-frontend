"use client"
import React, { useRef, useState } from 'react'
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useFileUpload } from '@/hooks/useFileUpload';
import FileInput from '@/components/FileInput';
import {
  BadgeCheck,
  CircleCheck,
  FilePlus,
  Gift,
  InfinityIcon,
  MousePointerClick,
  Plus,
  PlusCircle,
  ShieldCheck,
  Trash2,
  Zap,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import FeaturesCard from '@/components/FeatureCard';
import { PDFDocument } from 'pdf-lib';
import ToolList from '@/components/ToolList';
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
  "Add new pages to any PDF easily using PDFtoolify",
  "Upload images and insert them anywhere in your document",
  "Simple and secure tool for editing and updating PDFs online",
  "No signup needed — add pages to your PDF instantly",
  "Add pages in seconds — fast, free, and reliable experience",
];

const features = [
  {
    icon: MousePointerClick,
    heading: "Easy to Use",
    paragraph:
      "Designed to be simple and intuitive so anyone can easily add new pages to a PDF without technical knowledge.",
  },
  {
    icon: Gift,
    heading: "Free & No Sign Up",
    paragraph:
      "Add pages to your PDF files online for free—no account required. No hidden charges, no limits.",
  },
  {
    icon: FilePlus,
    heading: "Add Unlimited Pages",
    paragraph:
      "Insert as many pages as you want—images or blank pages. Organize them easily before downloading.",
  },
  {
    icon: BadgeCheck,
    heading: "Accurate Page Insertion",
    paragraph:
      "Add your new pages exactly where you want them. Our tool maintains original formatting and quality.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure & Private",
    paragraph:
      "Your files stay safe. All uploaded documents are automatically deleted after processing to protect your privacy.",
  },
  {
    icon: Zap,
    heading: "Fast & Powerful",
    paragraph:
      "Add pages to your PDF in seconds with high processing speed. Reliable, fast, and built for performance.",
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
    title: "Insert new pages",
    description:
      "Use the plus buttons to insert blank pages or image pages exactly where you need them.",
  },
  {
    step: "3",
    title: "Export and download",
    description:
      "Click on “Export PDF” to generate your updated file and download it instantly.",
  },
];

const faqs = [
  {
    question: "Is PDFtoolify really free?",
    answer:
      "Yes, PDFtoolify is completely free. You can add pages to your PDF files without creating an account.",
  },
  {
    question: "How can I add pages to a PDF using PDFtoolify?",
    answer:
      "Simply upload your PDF, insert blank or image pages where you want them, and click “Export PDF.” PDFtoolify will instantly generate your updated document.",
  },
  {
    question: "Will the quality of my PDF change after adding pages?",
    answer:
      "No, the original quality and formatting of your PDF remain unchanged. New pages are inserted without distortion.",
  },
  {
    question: "Is it safe to add pages to my PDF online?",
    answer:
      "Yes. PDFtoolify uses secure processing, and all uploaded files are automatically deleted after completion to protect your privacy.",
  },
  {
    question: "Can I add pages offline using PDFtoolify?",
    answer:
      "Yes. Download the Windows version of PDFtoolify to add pages to your PDF even without internet access.",
  },
  {
    question: "Does adding pages to a PDF cost anything?",
    answer:
      "No, adding pages with PDFtoolify is 100% free with no hidden fees.",
  },
];

function AddPagesInPdf() {
    const [loading, setLoading] = useState(false)
    const [isPopupActive, setIsPopupActive] = useState(false)
    const [pages,setPages] = useState([]);
    let pageNumberOfAddPage = useRef(1);
    let arrayLength = useRef(null);
    let imageFiles = useRef([])
    let selectedPageType = useRef("blank");
    
    let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi,setCompletionStatus,setdownloadFileURL
      } = useFileUpload()
      
    let pageno = 0;

     async function addPagesToPdf() {
      try {
        setLoading(true)
        const [imagesAndPageNumbers,blankPagesPageNumbers] = getPageNumbers()
        let images = imagesAndPageNumbers.map((val) => val.file)
        let imagesPageNumbers = imagesAndPageNumbers.map(val => val.pageNumber)
        const arrayBuffer = await files.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer)

        
        for (let i = 0; i < images.length; i++) {
          let imageBytes = await images[i].arrayBuffer();
          
          let embeddedImage;
          
          if (images[i].type === "image/jpeg") {
            embeddedImage = await pdfDoc.embedJpg(imageBytes);
          } else if (images[i].type === "image/png") {
            embeddedImage = await pdfDoc.embedPng(imageBytes);
          } else {  
            continue; // skip unsupported
          }

          // Page size (A4)
          const pageWidth = 595;
          const pageHeight = 842;
          const page = pdfDoc.insertPage(imagesPageNumbers[i] - 1, [pageWidth, pageHeight]);

          // 🖼 Image size calculation
          const imgWidth = pageWidth; // full width
          const imgHeight = pageHeight * 0.65; // 65% of page height (between 60–70%)
          const x = 0; // left se start
          const y = (pageHeight - imgHeight) / 2; // center vertically

          // Draw image
          page.drawImage(embeddedImage, {
            x,
            y,
            width: imgWidth,
            height: imgHeight,
          });
        }

        for (let i = 0; i < blankPagesPageNumbers.length; i++) {
          pdfDoc.insertPage(blankPagesPageNumbers[i] - 1, [595, 842]); // A4 size
        }
        const finalPdfBytes = await pdfDoc.save();
        const blob = new Blob([finalPdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setdownloadFileURL(url);
        setCompletionStatus(true)
      } catch (error) {
      }
      finally{
        setLoading(false  )
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("hsndlesubmit run");
      addPagesToPdf();
      // const [imagesAndPageNumbers,blankPagesPageNumbers] = getPageNumbers()
      // const formData = new FormData();
      // formData.append("pdf_file",files);
      // imagesAndPageNumbers.forEach((val) => {
      //   formData.append("images",val.file);
      // })
      // formData.append("imagesPageNumbers",JSON.stringify(imagesAndPageNumbers.map(val => val.pageNumber)));
      // formData.append("blankPagesPageNumbers",JSON.stringify(blankPagesPageNumbers));
      // callApi("http://localhost:8000/api/v1/pdf/add_pages_in_pdf",formData);
    }

    const onDocumentLoadSuccess = ({numPages}) => {
        arrayLength.current = numPages;
        setPages(() => {
          const pdfPages = [];
          for(let i = 0; i < numPages; i++)
          {
            pdfPages[i] = {type:"normal",url:null,blank:null,uniqueId:null}
          }
          return pdfPages;
        })
    }

    const addExtraPage = () => {
      if(selectedPageType.current == "image" && imageFiles.current[imageFiles.current.length - 1].file || selectedPageType.current == "blank"){
        const insertAt = parseInt(pageNumberOfAddPage.current,10);
        arrayLength.current++;
        setPages((prev) => {
          const newPages = [...prev];
          if(selectedPageType.current == "image"){
            let uniqueId = imageFiles.current[imageFiles.current.length - 1].uniqueId;
            let objectUrl = URL.createObjectURL(imageFiles.current[imageFiles.current.length - 1].file)
              newPages.splice(
                insertAt,
                0,
                {
                type:"extra",
                url:objectUrl,
                blank:false,
                uniqueId:uniqueId
                }
              )
          }
          else{
              newPages.splice(
                insertAt,
                0,
                {
                type:"extra",
                url:null,
                blank:true
                }
              )
          }
          return newPages;
        })
      }
    }

    const getPageNumbers = () => {
      let imagesAndPageNumbers = [];
      let blankPagesPageNumbers = [];
      
      for(let i = 0; i < arrayLength.current; i++)
      {
        let page = pages[i];
        if(page.type == "extra" && page.url && page.blank == false)  
        {
          let imageFile;
          for(let j = 0; j < imageFiles.current.length; j++)
          {
            if(imageFiles.current[j].uniqueId == page.uniqueId) //finding imgages in pages array
            {
              imageFile = imageFiles.current[j].file;
              break;
            }
          }
          imagesAndPageNumbers.push({file:imageFile,uniqueId:page.uniqueId,pageNumber:i + 1}); // adding file with page number in a new array
        }
        if(page.type == "extra" && !page.url && page.blank == true)
        {
          blankPagesPageNumbers.push(i + 1);
        }
      }
      return [imagesAndPageNumbers,blankPagesPageNumbers]
    }

    const removePages = (index) => {
      arrayLength.current--;
      URL.revokeObjectURL(pages[index].url);
      setPages((prev) => {
        const removePagesArray = [...prev];
        removePagesArray.splice(index,1);
        return removePagesArray;
      })
    }

  return (
    <div className='min-h-screen bg-background'>
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
              Free Online Add Pages to PDF
            </div>
            <h1 className="section-heading text-center">
              Add <span className="gradient-text">Pages to PDF</span> Easily
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Insert blank or image pages anywhere in your PDF — free, fast, and secure.
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
                Add pages to your PDF online for free
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
                    Features of PDFtoolify - Add Pages to PDF
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Powerful tools to insert new pages exactly where you need them
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
                  How to add pages in a PDF online?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Follow these quick steps to insert new pages into your PDF.
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
                  Add Pages to PDF FAQs
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Common questions about inserting new pages into your PDFs
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
      {isDroped && !isUploading && !completionStatus && <div className='flex'>
          <div data-name="pdf pages rendered panel" className=' max-w-6xl mx-auto mt-2 max-h-screen z-10 overflow-auto scrollbar-hide pt-4'>
            <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
              <div className="flex gap-8 flex-col sm:flex-row items-center flex-wrap z-0 justify-center">
                {
                  pages.map((page,index) => {
                    if(page.type == "normal") pageno++;
                    return page.type == "extra" ? (
                      <div key={index} className='flex gap-8 flex-col sm:flex-row  justify-center items-center'>
                        <div className='bg-blue-600 p-1 rounded-full'
                        onClick={() => {
                          pageNumberOfAddPage.current = index;
                          setIsPopupActive(true)}}
                        ><Plus color='white' /></div> {/* plus icon for adding page */}
                        <div key={index} className='relative'>
                          {page.blank ? (
                            <div className=' w-[185px] h-[261px] bg-gray-200 flex justify-center items-center'>blank page</div>
                          ) : (
                            <div className=' w-[185px] h-[261px] bg-gray-200 flex justify-center items-center'><img src={`${page.url}`}/></div>
                          )}
                          <div className='p-1 text-center'>{index + 1}</div>
                          <div className='text-md cursor-pointer p-1 rounded-full bg-red-700 text-white absolute top-0 right-0'
                          onClick={() => {
                            removePages(index)
                          }}
                          >
                            <Trash2 size={22}/>
                          </div> 
                        </div>
                      </div>
                    ) : (
                      <div key={index} className='flex gap-8 flex-col sm:flex-row justify-center items-center'>
                        <div className='bg-blue-600 p-1 rounded-full'
                        onClick={() => {
                          pageNumberOfAddPage.current = index;
                          setIsPopupActive(true)}}
                        ><Plus color='white' /></div>  {/* plus icon for adding page */}
                        <div key={index} className='relative'>
                          <Page  pageNumber={pageno} width={185} />
                          <div className='p-1 text-center'>{index + 1}</div>
                        </div>
                      </div>
                      )
                  }
                  )
                }
                <div className='bg-blue-600 p-1  rounded-full'
                onClick={() => {
                  pageNumberOfAddPage.current = pages.length;
                  setIsPopupActive(true)}}
                ><Plus color='white' /></div> {/* plus icon for adding page */}
                <div className={`fixed z-50 inset-0 bg-[rgba(70,70,70,0.4)] ${isPopupActive ? "flex" : "hidden"}   rounded-xl  justify-center items-center`}
                  onClick={(e) => {
                      setIsPopupActive(false)
                  }}
                >
                  <div className='bg-white rounded-2xl p-4 w-80 h-36'>
                    <div className='flex flex-col gap-6 p-4'>
                      <span
                      className='cursor-pointer'
                      onClick={() => {
                        selectedPageType.current = "blank"
                        addExtraPage()
                      }}
                      >Add a blank page</span>
                      <span>
                        <label htmlFor="image_input" className='cursor-pointer'>Tap to select image to add</label>
                        <input  
                          className='hidden'
                          id='image_input' type="file" accept='image/*'
                          onChange={(e) => {
                            const file1 = e.currentTarget.files[0]
                            if (!file1) return;
                            imageFiles.current.push({file:file1,uniqueId : Date.now() + Math.random().toString(36).substring(2, 9)})
                            selectedPageType.current = "image";
                            addExtraPage();
                            e.currentTarget.value = "";
                            }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Document>
          </div>
        </div>}
        {isDroped && !completionStatus && !loading && <button
          className='bg-blue-600 fixed top-20  right-4 z-20 text-white font-semibold text-xl rounded-md px-4 py-2'
          onClick={handleSubmit}
          >Export PDF</button>}
        {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download modified PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className=" bg-blue-600 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download modified PDF
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddPagesInPdf