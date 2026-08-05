'use client' // if you're using Next.js
import React, { useState } from 'react'
import Image from 'next/image'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Processing from '@/components/Processing'
import { useFileUpload } from '@/hooks/useFileUpload'
import FileInput from '@/components/FileInput'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import { Trash2, Sparkles, Dot } from 'lucide-react'
import FeatureCardSection from '@/components/FeatureCardSection'
import { PDFDocument } from 'pdf-lib'
import { toast } from 'react-toastify'
import ToolList from '@/components/ToolList'
import FadeIn from '@/components/FadeIn'
import { showContent } from '@/store/hideContentSlice'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { pngToPdfBenefits } from '@/data/benefits'
import { pngToPdfFeatures } from '@/data/features'
import { pngToPdfFaqs } from '@/data/faqs'
import { pngToPdfHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import OperationSidebar from '@/components/OperationSidebar'
import MainOperationButton from '@/components/MainOperationButton'
import SidebarOperationButton from '@/components/SidebarOperationButton'
import { useDispatch } from 'react-redux'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function PNGToPDF() {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
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

  async function pngToPdf() {
    try {
      setLoading(true)
      let pdfDoc = await PDFDocument.create()
      const PAGE_WIDTH = 595.28
      const PAGE_HEIGHT = 841.89

      for (let img of files) {
        let ext = img.name.split('.').pop().toLowerCase()
        let imageBytes = await img.arrayBuffer()
        let image
        if (ext == 'jpg' || ext == 'jpeg') image = await pdfDoc.embedJpg(imageBytes)
        else if (ext == 'png') image = await pdfDoc.embedPng(imageBytes)

        if (!image) {
          toast.error('unsupported file')
          setFiles([])
          return
        }

        const { width: imgWidth, height: imgHeight } = image.scale(1)
        const scale = Math.min(PAGE_WIDTH / imgWidth, PAGE_HEIGHT / imgHeight, 1)
        const drawWidth = imgWidth * scale
        const drawHeight = imgHeight * scale

        const x = (PAGE_WIDTH - drawWidth) / 2
        const y = (PAGE_HEIGHT - drawHeight) / 2

        const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
        page.drawImage(image, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        })
      }
      const extractedPDF = await pdfDoc.save()
      const blob = new Blob([extractedPDF], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      setdownloadFileURL(url)
      setCompletionStatus(true)
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 10000)
    } catch (error) {
      console.log(error)
      dispatch(showContent())
    } finally {
      setLoading(false)
      dispatch(showContent())
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (files.length === 0) {
      alert('Please upload images')
      return
    }
    pngToPdf()
    // const formData = new FormData();
    // files.forEach((file) => formData.append("images", file));
    // callApi("https://pdf-tools-backend-45yy.onrender.com/api/v1/pdf/jpg_to_pdf",formData)
  }

  return (
    <div className="bg-background">
      {!completionStatus && !isDroped && (
        <ToolHeader
          sparklesText={'Free Online PNG to PDF Converter'}
          headings={['Convert', 'PNG to PDF', ' Instantly']}
          text={
            'Turn your PNG images into a single high-quality PDF — fast, secure, and completely free.'
          }
        />
      )}

      <form
        onSubmit={(e) => {
          handleSubmit(e)
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
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png'],
                'image/webp': ['.webp'],
              }}
            />

            <BenefitsSection
              heading={'Create PDF from PNG images online for free'}
              benefits={pngToPdfBenefits}
            />

            <FeatureCardSection
              tool={'PNG to PDF'}
              text="Powerful tools to turn your PNG images into professional PDFs"
              features={pngToPdfFeatures}
            />

            <HowToSection
              heading={'How to convert PNG to PDF online?'}
              text={'Follow these quick steps to convert your PNG images into a PDF.'}
              steps={pngToPdfHowToSteps}
            />

            {/* FAQs Section */}
            <FaqSection
              heading={'PNG to PDF FAQs'}
              text={'Answers to common questions about converting PNG images to PDF'}
              faqs={pngToPdfFaqs}
            />

            <ToolList />
          </div>
        )}
        {isDroped && !isUploading && !completionStatus && (
          <OperationBox>
            <OperationMain>
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
                            src={imgObj.preview}
                            alt={`uploaded-${index}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* File name */}
                    <div className=" py-2 px-3 text-center">
                      <p className="text-sm font-medium  truncate" title={`/${imgObj.file.name}`}>
                        {imgObj.file.name}
                      </p>
                    </div>
                    <div
                      className="p-1.5 absolute top-1 right-1 bg-red-500 cursor-pointer rounded-full "
                      onClick={(e) => {
                        setImages((prev) => {
                          let array = [...prev]
                          URL.revokeObjectURL(array[index].preview)
                          array.splice(index, 1)
                          return array
                        })
                      }}
                    >
                      {' '}
                      <Trash2 size={22} color="white" />
                    </div>
                  </li>
                ))}
              </ul>
              <MainOperationButton buttonText={"Create PDF"} disabled={files.length < 1} />
            </OperationMain>
            <OperationSidebar>
              <div className="p-2 bg-blue-50 border-1">
                <h1 className="flex text-gray-600 text-sm items-center">
                  {' '}
                  <Dot /> Click on create PDF button to create a pdf.
                </h1>
              </div>
              <div className="mt-3 p-3">
                <SidebarOperationButton buttonText={"Create PDF"} disabled={files.length < 1} />
              </div>
            </OperationSidebar>
          </OperationBox>
        )}
        {loading && <Processing />}
      </form>
      {downloadFileURL && (
        <div className="max-w-5xl text-center mx-auto  mt-24">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">Download created PDF</h1>
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
  )
}

export default PNGToPDF
