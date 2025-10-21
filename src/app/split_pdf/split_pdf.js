"use client";
import React, {  useCallback,useEffect, useRef, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import Image from "next/image";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Processing from "@/components/Processing";
import ProgressBar from "@/components/ProgressBar";
import FileInput from "@/components/FileInput"; 
import { useFileUpload } from "@/hooks/useFileUpload";
import { CircleCheck, FileOutput, Scissors, Settings, ShieldCheck, Smartphone, Sparkles, SplitIcon, LucideScissorsLineDashed, Trash2 } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import { PDFDocument } from "pdf-lib";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function Split() {
  const [loading,setLoading] = useState(false)
  const [numPages, setNumPages] = useState("");
  const [splitRanges, setSplitRanges] = useState([])
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(numPages);
  const [splitedPDFs, setsplitedPDFs] = useState([])
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setFrom(1)
    setTo(numPages)
    setSplitRanges([[1,numPages]])
  }



  let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi,setCompletionStatus,setdownloadFileURL
      } = useFileUpload()

  // useEffect(() => {
  //     // console.log(downloadFileURL);
  //     // console.log(splitedPDFs);
      
  // }, [splitedPDFs])

    let splitPdf = async () => {
      try {
        setLoading(true)
        const arrayBuffer = await files.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer)
        let url = "";
        splitRanges.forEach(async (range) => {
          let splitedPDF = await PDFDocument.create()
          let pages = await splitedPDF.copyPages(
            pdf,
            Array.from({length: Number(range[1]) - Number(range[0])},(_,i) => range[0] + 1)
          )

          pages.forEach((page) => splitedPDF.addPage(page))

          let splitPDFBytes = await splitedPDF.save();
          const blob = new Blob([splitPDFBytes], { type: "application/pdf" });
          url = URL.createObjectURL(blob);
          setsplitedPDFs((prev) => [...prev,url] )
        })
        setdownloadFileURL(url);
        setCompletionStatus(true)
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false)
        setisDroped(false)
        setFiles([]);
      }
    } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // splitPdf()
    // const formData = new FormData();
    // formData.append("pdf_file", files);
    // formData.append("startPage", startPage);
    // formData.append("endingPage", endPage);
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/split",formData);
  };

  return (
    <div className="mx-auto p-1 bg-[#F7F5FB] min-h-[658px]">
      <ToastContainer />
      {!completionStatus && (
        <div>
          <h1 className="mt-12 text-3xl flex justify-center items-center gap-4 md:text-4xl font-bold text-gray-800">
            <SplitIcon color="gray" size={35} strokeWidth={2} /> Split PDF Files
          </h1>
          <p className="text-center text-gray-500 mt-2 md:text-md">
            Free to split PDF Files into smaller PDFs online
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">  
        {!isDroped && !completionStatus && (
          <div>
            <FileInput setisDroped={setisDroped} setFiles={setFiles} multiple={false} accept= {{ "application/pdf": [] }}/>
            <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">Split PDF files online for free</h1>
            {/* points section */}
            <div className="flex justify-center max-w-7xl mt-6 mx-auto gap-4">
              <div className="flex flex-col gap-2 w-xl text-sm">
                <div className="flex gap-2">
                  <CircleCheck color="green" strokeWidth={1.5} /> 
                  <span>Our free PDF Splitter can be work on any device </span>
                </div>
                <div className="flex gap-2">
                  <CircleCheck color="green" strokeWidth={1.5} /> 
                  <span>Using PDFtoolify split tool you can easily split PDF files</span>
                </div>
              </div>
              <div className="w-xl flex flex-col gap-2 text-sm">
                <div className="flex gap-2">
                  <CircleCheck color="green" strokeWidth={1.5} /> 
                  <span>PDFtoolify is secure and easy to use tool for PDF related operations</span>
                </div>  
                <div className="flex gap-2">
                  <CircleCheck color="green" strokeWidth={1.5} /> 
                  <span>No SignUp require to split PDF online</span>
                </div>
                <div className="flex gap-2">
                  <CircleCheck color="green" strokeWidth={1.5} /> 
                  <span>split PDFs in seconds with PDFtoolify — free, fast, and secure.</span>
                </div>
              </div>
            </div>
            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Why Choose PDFtoolify</h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">
              <FeaturesCard Icon={Scissors} heading={"Split PDFs Instantly"}
                paragraph={"Easily divide large PDF files into smaller parts in just seconds. Perfect for managing documents efficiently."}
              />
              <FeaturesCard Icon={Settings} heading={"Custom Page Selection"}
                paragraph={"Choose exactly which pages you want to split and create a new PDF tailored to your needs."}
              />
              <FeaturesCard Icon={FileOutput} heading={"Multiple Splitting Options"}
                paragraph={"Split PDFs by page range, specific pages, or extract every page into a separate file."}
              />
              <FeaturesCard Icon={ShieldCheck} heading={"Safe and Secure Splitting"}
                paragraph={"All your files are processed securely, and automatically deleted after splitting for complete privacy."}
              />
              <FeaturesCard Icon={Sparkles} heading={"High Quality Results"}
                paragraph={"Your split documents maintain the same quality and formatting as the original file—no loss."}
              />
              <FeaturesCard Icon={Smartphone} heading={"Work on Any Device"}
                paragraph={"Split PDFs directly from your browser on desktop, tablet, or mobile without any installation."}
              />
            </div>
            {/* how to section */}
            <div className="flex max-w-7xl mx-auto mt-24">
              <div className="flex basis-[50%] justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="560" height="360" viewBox="0 0 560 360" fill="none">
                  <rect width="560" height="360" rx="20" fill="#E6F0FF"/>
                  <rect x="100" y="100" width="80" height="100" rx="8" fill="white" stroke="#1E40AF" strokeWidth="2"/>
                  <text x="140" y="160" textAnchor="middle" fontSize="18" fill="#1E40AF" fontFamily="Arial">PDF</text>
                  <rect x="380" y="100" width="80" height="100" rx="8" fill="white" stroke="#1E40AF" strokeWidth="2"/>
                  <text x="420" y="160" textAnchor="middle" fontSize="18" fill="#1E40AF" fontFamily="Arial">PDF</text>
                  <path d="M220 150 H340" stroke="#1E3A8A" strokeWidth="4" markerEnd="url(#arrowhead)"/>
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                      refX="10" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#1E3A8A"/>
                    </marker>
                  </defs>
                  <rect x="240" y="220" width="80" height="100" rx="8" fill="white" stroke="#059669" strokeWidth="2"/>
                  <text x="280" y="280" textAnchor="middle" fontSize="18" fill="#059669" fontFamily="Arial">PDF</text>
                </svg>
              </div>
              <div className="flex basis-[50%] justify-center items-center">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 items-center">
                    <span className="w-5 h-5 rounded-md bg-black inline-block"></span> 
                    <span className="text-2xl text-gray-800 font-semibold">How to split PDFs online for free?</span>
                  </div>
                  <p className="whitespace-pre">1.     Select files or drag and drop files in the select container</p>
                  <p className="whitespace-pre">2.     Enter start and end page to split PDF and press split pdf button</p>
                  <p className="whitespace-pre">3.     Download the split PDFs by pressing Download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Split PDF FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col mt-12 items-start gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">Is PDFtoolify really free to split PDFs?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, splitting PDFs with PDFtoolify is 100% free. You can separate pages without any sign-up or hidden charges.
                </p>
                <hr className="text-gray-300"/>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">How can I split PDF files online?</p>
                <p className="text-sm font-medium text-gray-800">
                  Simply upload your PDF, select the pages you want to extract or split, and click on “Split PDF.” 
                  Your file will be ready to download instantly.
                </p>
                <hr className="text-gray-300"/>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">Will my PDF quality change after splitting?</p>
                <p className="text-sm font-medium text-gray-800">
                  No. PDFtoolify keeps the original formatting and quality of your PDF files after splitting.
                </p>
                <hr className="text-gray-300"/>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">Is it safe to split PDFs online?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. Your files are processed securely, and they are automatically deleted after the task is completed.
                </p>
                <hr className="text-gray-300"/>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">Can I split large PDFs with many pages?</p>
                <p className="text-sm font-medium text-gray-800">
                  Absolutely. PDFtoolify supports splitting large PDF files quickly and efficiently without any page limit.
                </p>
                <hr className="text-gray-300"/>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800 ">Does splitting PDFs cost anything?</p>
                <p className="text-sm font-medium text-gray-800">
                  No, splitting PDFs is completely free on PDFtoolify. There are no hidden fees.
                </p>
                <hr className="text-gray-300"/>
              </div>
            </div>
            {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Split PDF Blog Articles </h1> */}
            {/* PostCard section */}
            {/* <div className="max-w-6xl p-4 bg-[#fcf8f8] mx-auto mt-20 flex flex-wrap justify-evenly">
             <PostCard
                src={"https://www.google.com/imgres?q=split%20pdf%20images&imgurl=https%3A%2F%2Fwww.jotform.com%2Fblog%2Fwp-content%2Fuploads%2F2018%2F12%2FHow-to-split-PDF-files-00cec9.png&imgrefurl=https%3A%2F%2Fwww.jotform.com%2Fblog%2Fhow-to-split-pdf%2F&docid=77fWbPAi3IAUeM&tbnid=9VL9vFjHKFZ5fM&vet=12ahUKEwih7eHvlfmPAxWId2wGHXKcHZkQM3oECBgQAA..i&w=825&h=500&hcb=2&ved=2ahUKEwih7eHvlfmPAxWId2wGHXKcHZkQM3oECBgQAA  "}
                date={"15-9-2025"}
                heading={"How to Split PDF Files Online for Free in Seconds"}
                description={"Learn the easiest way to split PDF files online without downloading any software. Step-by-step guide to separate pages quickly and securely."}
              />
              <PostCard
                src={"/safe_to_merge.png"}
                date={"11-8-2025"}
                heading={"Best Free Online Tool to Split PDF Pages Instantly"}
                description={"Discover the fastest and most reliable tool to split PDF pages online. No sign-up, no hidden charges — just upload, split, and download."}
              />
              <PostCard
                src={"/onine_pdf_merger.jpg"}
                date={"23-8-2025"}
                heading={"Split Large PDF Files into Smaller Parts Easily"}
                description={"Need to manage big PDFs? Use our free Split PDF tool to break large documents into smaller, manageable files without losing quality."}
              />
            </div> */}
          </div>
        )}
        {isDroped && !isUploading && !completionStatus && (
          <div className="mx-auto bg-gray-100 p-1">
            <div className="flex">
              <div className="w-[70%]">
                <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
                  <ul className="mt-6 p-5 flex flex-wrap justify-center gap-8">
                    {
                      Array.from(new Array(0),(value,index) => {
                      let pageNumber = index +1;
                      return (
                        <div className="flex items-center gap-6 " key={index}>
                          <li
                          className="w-[220px] h-[300px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                          transition-all duration-300 overflow-hidden"
                          key={index}
                          >
                            <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                              <Page pageNumber={pageNumber} width={180} />
                            </div>  
                            {/* page number */}
                            <div className=" px-3 text-center">
                              <p
                                className="text-sm font-medium truncate"
                              >
                                {index + 1}
                              </p>
                            </div>
                          </li>
                          <div className="h-full flex flex-col items-center justify-center"
                          onClick={(e) => {
                            setSplitIndexes((prev) => {
                              let array = [...prev];
                              if(array.includes(index + 1)){
                                let elementIndex = array.indexOf(index + 1)
                                array.splice(elementIndex,1);
                              }
                              else{
                                array.push(index + 1)
                              }
                              return array;
                            })
                            showSplitPDFs();
                          }}
                          >
                            <div className={`border-1 border-dashed border-blue-500 w-0 h-30  ${splitIndexes.includes(index + 1) ? "block" : "hidden"}`}></div>
                            <div className={`h-10 w-10 flex justify-center items-center hover:bg-blue-500 hover:cursor-pointer rounded-full ${splitIndexes.includes(index + 1) ? "bg-blue-500" : "bg-blue-400"}`}>
                              <LucideScissorsLineDashed color="white" size={22} className="rotate-270"/> 
                            </div>
                            <div className={` border-1 w-0 h-30  border-dashed border-blue-500 ${splitIndexes.includes(index + 1) ? "block" : "hidden"}`}></div>
                          </div>
                        </div>
                      )
                      })
                    }
                    {splitRanges.length == 0 ? (
                      <div className="flex items-center relative border-dotted rounded-md gap-2 border p-2">
                        <li
                          className="w-[220px] h-[300px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                          transition-all duration-300 overflow-hidden"
                          >
                          <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                            <Page pageNumber={1} width={180} />
                          </div>
                          <div className=" px-3 text-center">
                              <p
                                className="text-sm font-medium truncate"
                              >
                                {1}
                              </p>
                          </div>
                        </li>
                        <div className="text-2xl  p-1">.......</div>
                        <li
                          className="w-[220px] h-[300px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                          transition-all duration-300 overflow-hidden"
                          >
                          <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                            <Page pageNumber={numPages} width={180} />
                          </div>
                          <div className=" px-3 text-center">
                              <p
                                className="text-sm font-medium truncate"
                              >
                                {numPages}
                              </p>
                            </div>
                        </li>
                        <div className="p-1.5 absolute top-[-16] left-[246px]  rounded-full bg-red-700 text-white"> <Trash2 size={22}  /> </div>
                      </div>
                    ) :
                    (
                      splitRanges.map((array,index) => <div key={index} className="flex items-center relative border-dotted rounded-md gap-2 border p-2">
                        <li
                          className="w-[220px] h-[300px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                          transition-all duration-300 overflow-hidden"
                          >
                          <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                            <Page pageNumber={array[0]} width={180} />
                          </div>
                          {/* PageNumber */}
                          <div className=" px-3 text-center">
                              <p
                                className="text-sm font-medium truncate"
                              >
                                {array[0]}
                              </p>
                          </div>
                        </li>
                        <div className="text-2xl  p-1">.......</div>
                        <li
                          className="w-[220px] h-[300px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
                          transition-all duration-300 overflow-hidden"
                          >
                          <div className="px-4 pt-4 pb-1 flex flex-col items-center justify-center">
                            <Page pageNumber={array[1]} width={180} />
                          </div>
                          {/* PageNumber */}
                          <div className=" px-3 text-center">
                              <p
                                className="text-sm font-medium truncate"
                              >
                                {array[1]}
                              </p>
                            </div>
                        </li>
                        <div className="p-1.5 absolute top-[-16] left-[246px]   rounded-full bg-red-700 text-white"
                        onClick={(e) => {
                          setSplitRanges((prev) => {
                            let array = [...prev];
                            array.splice(index,1);
                            return array;
                          })
                        }}
                        > <Trash2 size={22} color="white"  /> </div>
                      </div>)
                    )
                  }
                  </ul>
                </Document>
              </div>
              <div className="w-[30%] bg-gray-200 p-2 flex flex-col gap-4 h-[658px]">
                <h4 className="font-semibold  text-gray-800">Add Range:</h4>
                <div className="flex gap-4">
                  <label htmlFor="from" className="w-10">from:</label>
                  <input type="number" id="from" className="border rounded-md h-9" 
                  value={from}
                  onChange={(e) => {setFrom(e.currentTarget.value)}}
                  />
                </div>
                <div className="flex gap-4">
                  <label htmlFor="to" className="w-10">To:</label>
                  <input type="number" id="to" className="border rounded-md h-9" 
                  value={to}
                  onChange={(e) => {setTo(e.currentTarget.value)}}
                  />
                </div>
                <button className="bg-blue-600 rounded-md font-semibold w-80 h-9 mx-auto text-white px-2 py-1"
                onClick={(e) => {e.preventDefault()
                  setSplitRanges((prev) => {
                    if(prev.some((array) => {
                      if(array[0] == Number(from) && array[1] == Number(to)) 
                        return true
                      else 
                        return false
                    }))
                      return prev
                    if(Number(to) > numPages) return prev
                    let array = [...prev];
                    array.push([Number(from),Number(to)])
                    return array;
                  })
                }}
                >Add Range</button>
                <div className="">
                  <span className="font-semibold text-gray-800">Ranges:</span> 
                  <div className="w-90 min-h-14 bg-white rounded-md border">
                    {
                    splitRanges.map((array) => {
                      return array[0] + "-" + array[1] + ","
                    })
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <input
                  type="text"
                  onChange={(e) => {
                    setStartPage(e.target.value);
                  }}
                  placeholder="start page"
                  className="border-1 indent-1.5 bg-white border-gray-600 rounded-md h-10"
                />
                <br />
                <input
                  type="text"
                  onChange={(e) => {
                    setEndPage(e.target.value);
                  }}
                  placeholder="end page"
                  className="border-1 indent-1.5 bg-white border-gray-600 rounded-md h-10"
                />
                <br />
              </div>
              <button
                disabled={!startPage || !endPage}
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                ${
                  !startPage || !endPage
                    ? "bg-[#90CAF9] cursor-not-allowed"
                    : "bg-[#568DF8]  active:bg-[#90CAF9]"
                }`}
              >
                Split PDF
              </button>
            </div> */}
            <button
                disabled={splitRanges.length <= 0}
                className={`px-6 py-3 rounded-md font-semibold text-white transition-all duration-300
                ${
                  splitRanges.length <= 0
                    ? "bg-[#90CAF9] cursor-not-allowed"
                    : "bg-[#568DF8]  active:bg-[#90CAF9]"
                }`}
              >
                Split PDF
              </button>
          </div>
        )}
        {progress > 0 && progress < 100 && (
          <ProgressBar progress={progress} />
        )}

          {serverPreparing &&  <div className="flex flex-col items-center mt-8">
                <p className="text-gray-700 text-md mb-2">Preparing Server... Please wait</p>
                <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
          }

        {progress === 100 && isProcessing && (
          <Processing />
        )}
      </form>
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download Split PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
            onClick={() => {
              splitedPDFs.forEach((url) => {
                url.click();
              })
            }}
              // href={downloadFileURL}
              className="bg-blue-500 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              Download Split PDF
            </a>
          </div>
        </div>
      )}

     
    </div>
  );
}

export default Split;
