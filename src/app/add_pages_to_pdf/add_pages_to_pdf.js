"use client"
import React, { useCallback,useEffect } from 'react'
import { useRef,useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Image from 'next/image';
import { useFileUpload } from '@/hooks/useFileUpload';
import FileInput from '@/components/FileInput';
import { BadgeCheck, CircleCheck, FilePlus, Gift, InfinityIcon, MousePointerClick, Plus, PlusCircle, ShieldCheck, Trash2, Zap } from "lucide-react";
import FeaturesCard from '@/components/FeaturesCard';
import { PDFDocument } from 'pdf-lib';

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

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
    <div className='mx-auto p-1 bg-[#F7F5FB] min-h-[658px] '>
      {!completionStatus && !isDroped && (
        <div>
          <h1 className="text-center mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            Add Pages in PDF
          </h1>
          <p className="text-center text-gray-500 md:text-md">
            Add pages in pdf easily
          </p>
        </div>
      )}
        {!isDroped && (
        <div>
          <FileInput files={files} setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept= {{ "application/pdf": [] }}/>
          <h1 className="text-xl font-semibold text-center mt-10 text-gray-800">
            Add Pages into the PDF
            </h1>
            {/* points section */}
            <div className="flex justify-center max-w-7xl mt-6 mx-auto gap-4 text-gray-800">
              <div className="flex flex-col gap-2 w-xl text-sm">
                
                <div className="flex gap-2">
                  <CircleCheck color="green" strokeWidth={1.5} /> 
                  <span>Add new pages to any PDF easily using PDFtoolify</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" strokeWidth={1.5} /> 
                  <span>Upload images or PDFs and insert them anywhere in your document</span>
                </div>

              </div>

              <div className="w-xl flex flex-col gap-2 text-sm">

                <div className="flex gap-2">
                  <CircleCheck color="green" strokeWidth={1.5} /> 
                  <span>Simple and secure tool for editing and updating PDFs online</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" strokeWidth={1.5} /> 
                  <span>No signup needed — add pages to your PDF instantly</span>
                </div>

                <div className="flex gap-2">
                  <CircleCheck color="green" strokeWidth={1.5} /> 
                  <span>Add pages in seconds — fast, free, and reliable experience</span>
                </div>

              </div>
            </div>

            {/* feature card section */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">
              Features of PDFtoolify - Add pages to PDF
            </h1>
            <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">

              <FeaturesCard 
                Icon={MousePointerClick} 
                heading={"Easy to Use"} 
                paragraph={
                  "Designed to be simple and intuitive so anyone can easily add new pages to a PDF without technical knowledge."
                }
              />

              <FeaturesCard 
                Icon={Gift} 
                heading={"Free & No Sign Up"} 
                paragraph={
                  "Add pages to your PDF files online for free—no account required. No hidden charges, no limits."
                }
              />

              <FeaturesCard 
                Icon={FilePlus} 
                heading={"Add Unlimited Pages"} 
                paragraph={
                  "Insert as many pages as you want—images or PDF pages. Organize them easily before downloading."
                }
              />

              <FeaturesCard 
                Icon={BadgeCheck} 
                heading={"Accurate Page Insertion"} 
                paragraph={
                  "Add your new pages exactly where you want them. Our tool maintains original formatting and quality."
                }
              />

              <FeaturesCard 
                Icon={ShieldCheck} 
                heading={"Secure & Private"} 
                paragraph={
                  "Your files stay safe. All uploaded documents are automatically deleted after processing to protect your privacy."
                }
              />

              <FeaturesCard 
                Icon={Zap} 
                heading={"Fast & Powerful"} 
                paragraph={
                  "Add pages to your PDF in seconds with high processing speed. Reliable, fast, and built for performance."
                }
              />

            </div>

            {/* how to section */}
            <div className="flex max-w-7xl justify-center md:gap-20 gap-4 items-center flex-wrap mx-auto mt-24 text-gray-800">
              <div className="flex relative w-[370px] h-[300px] md:w-[560px] md:h-[360px] justify-center items-center">
                <Image
                fill
                src={"/how_to_merge.png"}
                alt="how to merge pdf online"
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 items-center">
                    <span className="md:w-5 md:h-5 w-4 h-4 rounded-md bg-black inline-block"></span> 
                    <span className="md:text-2xl text-xl text-gray-800 font-semibold ">How to add pages in pdf online?</span>
                  </div>
                  <p className="whitespace-pre text-sm tracking-tighter">1.     Select file or drag and drop file in the select container</p>
                  <p className="whitespace-pre text-sm tracking-tighter">2.     Add the pages where you want to add by pressing plus icon</p>
                  <p className="whitespace-pre text-sm tracking-tighter">3.     Press export button to add pages into the pdf</p>
                  <p className="whitespace-pre text-sm tracking-tighter">4.     Download the pages added PDF by pressing Download button</p>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-center p-3 text-gray-800 mt-24">Add pages to PDF FAQs</h1>
            {/* FAQs Section */}
            <div className="max-w-4xl mx-auto flex flex-col mt-12 items-start gap-6">

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is PDFtoolify Really Free?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes, PDFtoolify is completely free. You can add pages to your PDF files without creating an account.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">How can I add pages to a PDF using PDFtoolify?</p>
                <p className="text-sm font-medium text-gray-800">
                  Simply upload your PDF and the pages you want to add (PDF or images), set their order, and click “Add Pages.” 
                  PDFtoolify will instantly generate your updated document.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Will the quality of my PDF change after adding pages?</p>
                <p className="text-sm font-medium text-gray-800">
                  No, the original quality and formatting of your PDF remain unchanged. New pages are inserted without distortion.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Is it safe to add pages to my PDF online?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. PDFtoolify uses secure processing, and all uploaded files are automatically deleted after completion to protect your privacy.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Can I add pages offline using PDFtoolify?</p>
                <p className="text-sm font-medium text-gray-800">
                  Yes. Download the Windows version of PDFtoolify to add pages to your PDF even without internet access.
                </p>
                <hr className="text-gray-800" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-gray-800">Does adding pages to a PDF cost anything?</p>
                <p className="text-sm font-medium text-gray-800">
                  No, adding pages with PDFtoolify is 100% free with no hidden fees.
                </p>
                <hr className="text-gray-800" />
              </div>

            </div>

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