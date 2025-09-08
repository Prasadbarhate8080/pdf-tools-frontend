"use client"
import React, { useCallback,useEffect } from 'react'
import { useRef,useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useDropzone } from "react-dropzone";
import Image from 'next/image';
import { useFileUpload } from '@/hooks/useFileUpload';
import FileInput from '@/components/FileInput';

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

function AddPagesInPdf() {
    const [pages,setPages] = useState([]);
    let afterBefore = useRef("after")
    let pageNumberOfAddPage = useRef(1);
    let arrayLength = useRef(null);
    let imageFiles = useRef([])
    let selectedPageType = useRef("blank");
    
    let {files,isDroped,isProcessing,completionStatus,isUploading,
      downloadFileURL,serverPreparing,progress,setisDroped,setFiles,callApi
      } = useFileUpload()
    useEffect(() => {console.log(files)},[files])
    let pageno = 0;

    const handleSubmit = (e) => {
      e.preventDefault();
      const [imagesAndPageNumbers,blankPagesPageNumbers] = getPageNumbers()
      const formData = new FormData();
      formData.append("pdf_file",files);
      imagesAndPageNumbers.forEach((val) => {
        formData.append("images",val.file);
      })
      formData.append("imagesPageNumbers",JSON.stringify(imagesAndPageNumbers.map(val => val.pageNumber)));
      formData.append("blankPagesPageNumbers",JSON.stringify(blankPagesPageNumbers));
      callApi("http://localhost:8000/api/v1/pdf/add_pages_in_pdf",formData);
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
            if(afterBefore.current == "after")
            {
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
                insertAt - 2,
                0,
                {
                type:"extra",
                url:objectUrl,
                blank:false,
                uniqueId:uniqueId
                }
              )
            }
          }
          else{
            if(afterBefore.current == "after")
            {
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
            else{
              newPages.splice(
                insertAt - 2,
                0,
                {
                type:"extra",
                url:null,
                blank:true
                }
              )
            }
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
      {!completionStatus && (
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
        <FileInput files={files} setFiles={setFiles} setisDroped={setisDroped} multiple={false} accept= {{ "application/pdf": [] }}/>
      )}
      {isDroped && !isUploading && !completionStatus && <div className='flex'>
          <div data-name="pdf pages rendered panel" className=' basis-[70%] max-h-screen z-10 overflow-auto scrollbar-hide'>
            <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
              <div className="flex gap-10 items-center flex-wrap z-0 justify-center">
                {
                  pages.map((page,index) => {
                    if(page.type == "normal") pageno++;
                    return page.type == "extra" ? (
                      <div key={index} className='relative'>
                        {page.blank ? (
                          <div className=' w-[185px] h-[261px] bg-gray-200 flex justify-center items-center'>blank page</div>
                        ) : (
                          <div className=' w-[185px] h-[261px] bg-gray-200 flex justify-center items-center'><img src={`${page.url}`}/></div>
                        )}
                        <div className='p-5 text-center'>{index + 1}</div>
                        <div className='text-md cursor-pointer px-1 absolute top-0 right-0'
                        onClick={() => {
                          removePages(index)
                        }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12"/>
                          </svg>
                        </div>  
                      </div>
                    ) : (
                      <div key={index} className='relative'>
                        <Page  pageNumber={pageno} width={185} />
                        <div className='p-5 text-center'>{index + 1}</div>  
                      </div>
                      )
                  }
                  )
                }
              </div>
            </Document>
          </div>
          <div data-name="operations panel" className=' bg-gray-100 basis-[30%]'>
            <div>
              <label htmlFor="pageNumber">Enter Page Number: </label>
              <input id='pageNumber' type="number"
                className='border-1'
                defaultValue={1}
                onChange={(e) => {
                  let val = Number(e.currentTarget.value);
                  if(val > arrayLength.current){
                    pageNumberOfAddPage.current = arrayLength.current;
                }else{
                  pageNumberOfAddPage.current = val;
                }
              }}
              />
              </div>
              <div>
                <div>
                  <label htmlFor="after">after </label>
                  <input type="radio" name='afterBefore' value={"after"} id='after' defaultChecked={true}  onChange={(e) => {afterBefore.current = e.currentTarget.value}}/>
                </div>
                <div>
                  <label htmlFor="before">before </label>
                  <input type="radio" name='afterBefore' value={"before"} id='before'  onChange={(e) => {afterBefore.current = e.currentTarget.value}}/>
                </div>
              </div>
              <label htmlFor="image_input">tap to select image to add</label>
              <input  
                className='hidden'
                id='image_input' type="file" accept='image/*'
                onChange={(e) => {
                  const file1 = e.currentTarget.files[0]
                  imageFiles.current.push({file:file1,uniqueId : Date.now() + Math.random().toString(36).substring(2, 9)})
                  selectedPageType.current = "image";
                  addExtraPage();
                }}
              />  

              <div>
                <button onClick={() => {
                  selectedPageType.current = "blank";
                  addExtraPage();
                }}>Add balnk page</button>
              </div>
              <div>
                <button onClick={() => {
                  const [imagesAndPageNumbers,blankPagesPageNumbers] = getPageNumbers()
                  console.log("imagesAndPageNumbers:",imagesAndPageNumbers,"blankPagesPageNumbers:",blankPagesPageNumbers);
                }}>Get Page Numbers</button>
              </div>
              <button onClick={handleSubmit}
              className='px-2 py-1 bg-blue-600 rounded-md text-white text-xl'  
              >Export Pdf</button>
          </div>
        </div>}
        {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-10">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">
            Download modified PDF
          </h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className=" bg-[#F58A07] font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
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