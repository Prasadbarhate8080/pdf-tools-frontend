'use client'
import React, { useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useFileUpload } from '@/hooks/useFileUpload'
import FileInput from '@/components/FileInput'
import { Dot, Plus, Trash2, Zap } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import ToolList from '@/components/ToolList'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { addPagesBenefits } from '@/data/benefits'
import FeatureCardSection from '@/components/FeatureCardSection'
import { addPagesFeatures } from '@/data/features'
import HowToSection from '@/components/HowToSection'
import { addPagesHowToSteps } from '@/data/howTo'
import FaqSection from '@/components/FaqSection'
import { addPagesFaqs } from '@/data/faqs'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import OperationSidebar from '@/components/OperationSidebar'
import { Button } from '@/components/ui/button'
import MainOperationButton from '@/components/MainOperationButton'
import SidebarOperationButton from '@/components/SidebarOperationButton'
import { useDispatch } from 'react-redux'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function AddPagesInPdf() {
  const [loading, setLoading] = useState(false)
  const [isPopupActive, setIsPopupActive] = useState(false)
  const [pages, setPages] = useState([])
  let pageNumberOfAddPage = useRef(1)
  let arrayLength = useRef(null)
  let imageFiles = useRef([])
  let selectedPageType = useRef('blank')
  let dispatch = useDispatch()

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
  } = useFileUpload()

  let pageno = 0

  async function addPagesToPdf() {
    try {
      setLoading(true)
      const [imagesAndPageNumbers, blankPagesPageNumbers] = getPageNumbers()
      let images = imagesAndPageNumbers.map((val) => val.file)
      let imagesPageNumbers = imagesAndPageNumbers.map((val) => val.pageNumber)
      const arrayBuffer = await files.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      for (let i = 0; i < images.length; i++) {
        let imageBytes = await images[i].arrayBuffer()

        let embeddedImage

        if (images[i].type === 'image/jpeg') {
          embeddedImage = await pdfDoc.embedJpg(imageBytes)
        } else if (images[i].type === 'image/png') {
          embeddedImage = await pdfDoc.embedPng(imageBytes)
        } else {
          continue // skip unsupported
        }

        // Page size (A4)
        const pageWidth = 595
        const pageHeight = 842
        const page = pdfDoc.insertPage(imagesPageNumbers[i] - 1, [pageWidth, pageHeight])

        // 🖼 Image size calculation
        const imgWidth = pageWidth // full width
        const imgHeight = pageHeight * 0.65 // 65% of page height (between 60–70%)
        const x = 0 // left se start
        const y = (pageHeight - imgHeight) / 2 // center vertically

        // Draw image
        page.drawImage(embeddedImage, {
          x,
          y,
          width: imgWidth,
          height: imgHeight,
        })
      }

      for (let i = 0; i < blankPagesPageNumbers.length; i++) {
        pdfDoc.insertPage(blankPagesPageNumbers[i] - 1, [595, 842]) // A4 size
      }
      const finalPdfBytes = await pdfDoc.save()
      const blob = new Blob([finalPdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      setdownloadFileURL(url)
      setCompletionStatus(true)
    } catch (error) {
      dispatch(showContent())
    } finally {
      setLoading(false)
      dispatch(showContent())
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('hsndlesubmit run')
    addPagesToPdf()
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

  const onDocumentLoadSuccess = ({ numPages }) => {
    arrayLength.current = numPages
    setPages(() => {
      const pdfPages = []
      for (let i = 0; i < numPages; i++) {
        pdfPages[i] = { type: 'normal', url: null, blank: null, uniqueId: null }
      }
      return pdfPages
    })
  }

  const addExtraPage = () => {
    if (
      (selectedPageType.current == 'image' &&
        imageFiles.current[imageFiles.current.length - 1].file) ||
      selectedPageType.current == 'blank'
    ) {
      const insertAt = parseInt(pageNumberOfAddPage.current, 10)
      arrayLength.current++
      setPages((prev) => {
        const newPages = [...prev]
        if (selectedPageType.current == 'image') {
          let uniqueId = imageFiles.current[imageFiles.current.length - 1].uniqueId
          let objectUrl = URL.createObjectURL(
            imageFiles.current[imageFiles.current.length - 1].file
          )
          newPages.splice(insertAt, 0, {
            type: 'extra',
            url: objectUrl,
            blank: false,
            uniqueId: uniqueId,
          })
        } else {
          newPages.splice(insertAt, 0, {
            type: 'extra',
            url: null,
            blank: true,
          })
        }
        return newPages
      })
    }
  }

  const getPageNumbers = () => {
    let imagesAndPageNumbers = []
    let blankPagesPageNumbers = []

    for (let i = 0; i < arrayLength.current; i++) {
      let page = pages[i]
      if (page.type == 'extra' && page.url && page.blank == false) {
        let imageFile
        for (let j = 0; j < imageFiles.current.length; j++) {
          if (imageFiles.current[j].uniqueId == page.uniqueId) //finding imgages in pages array
          {
            imageFile = imageFiles.current[j].file
            break
          }
        }
        imagesAndPageNumbers.push({ file: imageFile, uniqueId: page.uniqueId, pageNumber: i + 1 }) // adding file with page number in a new array
      }
      if (page.type == 'extra' && !page.url && page.blank == true) {
        blankPagesPageNumbers.push(i + 1)
      }
    }
    return [imagesAndPageNumbers, blankPagesPageNumbers]
  }

  const removePages = (index) => {
    arrayLength.current--
    URL.revokeObjectURL(pages[index].url)
    setPages((prev) => {
      const removePagesArray = [...prev]
      removePagesArray.splice(index, 1)
      return removePagesArray
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {!completionStatus && !isDroped && (
        <ToolHeader
          sparklesText={'Free Online Add Pages to PDF'}
          headings={['Add', 'Pages to PDF', 'Easily']}
          text={' Insert blank or image pages anywhere in your PDF — free, fast, and secure.'}
        />
      )}
      {!isDroped && (
        <div>
          <FileInput
            files={files}
            setFiles={setFiles}
            setisDroped={setisDroped}
            multiple={false}
            accept={{ 'application/pdf': [] }}
          />
          <BenefitsSection
            heading={'Add pages to your PDF online for free'}
            benefits={addPagesBenefits}
          />
          <FeatureCardSection
            tool={'Add Pages to PDF'}
            text="Powerful tools to insert new pages exactly where you need them"
            features={addPagesFeatures}
          />
          <HowToSection
            heading={'How to add pages in a PDF online?'}
            text={'Follow these quick steps to insert new pages into your PDF.'}
            steps={addPagesHowToSteps}
          />
          <FaqSection
            heading={' Add Pages to PDF FAQs'}
            text={'Common questions about inserting new pages into your PDFs'}
            faqs={addPagesFaqs}
          />
          <ToolList />
        </div>
      )}
      {isDroped && !isUploading && !completionStatus && (
        <OperationBox>
          <OperationMain>
            <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
              {(() => {
                let pageno = 0
                return (
                  <div className="flex gap-8 flex-col sm:flex-row items-center flex-wrap justify-center p-2">
                    {pages.map((page, index) => {
                      if (page.type === 'normal') pageno++
                      return page.type === 'extra' ? (
                        <div
                          key={index}
                          className="flex gap-8 flex-col sm:flex-row  justify-center items-center"
                        >
                          <div
                            className="bg-blue-600 p-1 rounded-full"
                            onClick={() => {
                              pageNumberOfAddPage.current = index
                              setIsPopupActive(true)
                            }}
                          >
                            <Plus color="white" />
                          </div>
                          <div key={index} className="relative">
                            {page.blank ? (
                              <div className=" w-[185px] h-[261px] bg-gray-200 flex justify-center items-center">
                                blank page
                              </div>
                            ) : (
                              <div className=" w-[185px] h-[261px] bg-gray-200 flex justify-center items-center">
                                <img src={`${page.url}`} alt="" />
                              </div>
                            )}
                            <div className="p-1 text-center">{index + 1}</div>
                            <div
                              className="text-md cursor-pointer p-1 rounded-full bg-red-700 text-white absolute top-0 right-0"
                              onClick={() => {
                                removePages(index)
                              }}
                            >
                              <Trash2 size={22} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="flex gap-8 flex-col sm:flex-row justify-center items-center"
                        >
                          <div
                            className="bg-blue-600 p-1 rounded-full"
                            onClick={() => {
                              pageNumberOfAddPage.current = index
                              setIsPopupActive(true)
                            }}
                          >
                            <Plus color="white" />
                          </div>
                          <div key={index} className="relative">
                            <Page pageNumber={pageno} width={185} />
                            <div className="p-1 text-center">{index + 1}</div>
                          </div>
                        </div>
                      )
                    })}
                    <div
                      className="bg-blue-600 p-1  rounded-full"
                      onClick={() => {
                        pageNumberOfAddPage.current = pages.length
                        setIsPopupActive(true)
                      }}
                    >
                      <Plus color="white" />
                    </div>
                  </div>
                )
              })()}
            </Document>
            <MainOperationButton buttonText={"Export PDF"} onClick={handleSubmit} disabled={files.length < 1}/>
          </OperationMain>
          <OperationSidebar>
            <div className="p-2 bg-blue-50 border-1">
              <h1 className="flex text-gray-600 text-sm items-center">
                {' '}
                <Dot /> Click on the plus icon to add the page:
              </h1>
            </div>
            <div className="mt-3 p-3">
              <SidebarOperationButton buttonText={"Export PDF"} onClick={handleSubmit} disabled={files.length < 1}/>
            </div>
          </OperationSidebar>
          <div
            className={`fixed z-50 inset-0 bg-[rgba(70,70,70,0.4)] ${isPopupActive ? 'flex' : 'hidden'} justify-center items-center`}
            onClick={(e) => {
              setIsPopupActive(false)
            }}
          >
            <div className="bg-white rounded-2xl p-4 w-80 h-36">
              <div className="flex flex-col gap-6 p-4">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    selectedPageType.current = 'blank'
                    addExtraPage()
                  }}
                >
                  Add a blank page
                </span>
                <span>
                  <label htmlFor="image_input" className="cursor-pointer">
                    Tap to select image to add
                  </label>
                  <input
                    className="hidden"
                    id="image_input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file1 = e.currentTarget.files[0]
                      if (!file1) return
                      imageFiles.current.push({
                        file: file1,
                        uniqueId: Date.now() + Math.random().toString(36).substring(2, 9),
                      })
                      selectedPageType.current = 'image'
                      addExtraPage()
                      e.currentTarget.value = ''
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </OperationBox>
      )}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <div className="bg-card p-6 rounded-xl shadow-lg border border-border flex flex-col items-center gap-4">
            <Zap className="w-10 h-10 text-primary animate-pulse" />
            <p className="text-lg font-semibold text-foreground">Generating PDF...</p>
          </div>
        </div>
      )}
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-24">
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
