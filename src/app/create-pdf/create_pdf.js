'use client' // if you're using Next.js
import { useEffect, useRef, useState } from 'react'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useFileUpload } from '@/hooks/useFileUpload'
import FileInput from '@/components/FileInput'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import FeatureCardSection from '@/components/FeatureCardSection'
import { PDFDocument } from 'pdf-lib'
import { toast } from 'react-toastify'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import { createPdfBenefits } from '@/data/benefits'
import { createPdfFeatures } from '@/data/features'
import { createPdfFaqs } from '@/data/faqs'
import { createPdfHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import { useDispatch, useSelector } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import HideMainContent from '@/components/HideMainContent'
import LoadingStateComponent from '@/components/LoadingStateComponent'
import OperationButton from '@/components/OperationButton'
import BottomBar from '@/components/BottomBar'
import PageContainer from '@/components/PDFPageComponents/PageContainer'
import PageImageContainer from '@/components/PDFPageComponents/PageImageContainer'
import PageData from '@/components/PDFPageComponents/PageData'
import Image from 'next/image'
import AddMoreFilesComponent from '@/components/AddMoreFilesComponent'
import { ImageIcon } from 'lucide-react'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function CreatePdf() {
  let draggingIndex = useRef(null)
  let draggingOverIndex = useRef(null)
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  const [images, setImages] = useState([])
  let dispatch = useDispatch()
  let { files, setFiles, toolFunctionWrapper } = useFileUpload()

  useEffect(() => {
    console.log(files)
  }, [files])

  async function createPdf() {
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

      // Center the image
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
    dispatch(setDownloadFileUrl(url))
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 10000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (files.length === 0) {
      alert('Please upload images')
      return
    }
    toolFunctionWrapper(createPdf)
  }

  return (
    <div className="bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online Image to PDF Creator'}
          headings={['Create', 'PDF from Images', '']}
          text={
            'Turn your images into polished PDFs with just few clicks. And manage your images by converting it into the PDFs.'
          }
        />
        <FileInput
          setFiles={setFiles}
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
          heading={'What benefit you can get by using this tool'}
          benefits={createPdfBenefits}
        />
        <FeatureCardSection
          tool={'Create PDF'}
          text="Everything you need to turn your images into professional PDFs. Make the PDFs from the images online."
          features={createPdfFeatures}
        />

        <HowToSection
          heading={'How to create a PDF from images?'}
          text={'Follow these steps to convert your images into a PDF document.'}
          steps={createPdfHowToSteps}
        />

        <FaqSection
          heading={'Create PDF FAQs'}
          text={'Common questions about creating PDFs from images'}
          faqs={createPdfFaqs}
        />
      </HideMainContent>

      <OperationBox>
        <OperationMain>
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {images &&
              images.map((imgObj, index) => (
                <div
                  key={index}
                  className="transition-all duration-100 p-1 rounded-md"
                  draggable
                  onDragStart={(e) => {
                    draggingIndex.current = index
                    e.currentTarget.classList.add('opacity-50')
                  }}
                  onDragOver={(e) => {
                    e.currentTarget.classList.add('bg-gray-100')
                    draggingOverIndex.current = index
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove('bg-gray-100')
                  }}
                  onDragEnd={(e) => {
                    e.currentTarget.classList.remove('opacity-50')
                    setFiles((prev) => {
                      let arr = [...prev]
                      let onDropfile = arr[draggingOverIndex.current]
                      let draggedFile = arr[draggingIndex.current]
                      arr.splice(draggingOverIndex.current, 1, draggedFile)
                      arr.splice(draggingIndex.current, 1, onDropfile)
                      return arr
                    })
                    setImages((prev) => {
                      let arr = [...prev]
                      let onDropImage = arr[draggingOverIndex.current]
                      let draggedImage = arr[draggingIndex.current]
                      arr.splice(draggingOverIndex.current, 1, draggedImage)
                      arr.splice(draggingIndex.current, 1, onDropImage)
                      return arr
                    })
                  }}
                >
                  <PageContainer
                    multipleFiles
                    fileIndex={index}
                    setFiles={setFiles}
                    setImages={setImages}
                    images
                    key={index}
                  >
                    <PageImageContainer>
                      <Image
                        className="object-contain object-center"
                        src={imgObj.preview}
                        alt={`uploaded-${index}`}
                        fill
                      />
                    </PageImageContainer>
                    <PageData data={imgObj.file.name}></PageData>
                  </PageContainer>
                </div>
              ))}
            <div className="flex items-center justify-center">
              <AddMoreFilesComponent
                setFiles={setFiles}
                accept={'.png,.jpg,.jpeg'}
                images
                multiple
                setImages={setImages}
              />
            </div>
          </ul>
          <BottomBar>
            <div className="flex flex-1 justify-end px-3 items-center ">
              <div className="border h-12 w-12 flex items-center justify-center rounded-lg">
                <div className="relative w-fit  border-gray-300">
                  <ImageIcon />
                  <span className="absolute -top-3 -right-2">{files && files.length}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <OperationButton buttonText={'Create PDF'} disabled={!files} onClick={handleSubmit} />
            </div>
            <div className="flex-1"></div>
          </BottomBar>
        </OperationMain>
      </OperationBox>
      <LoadingStateComponent />
      <DownloadComponent
        headingText={'Download created PDF'}
        buttonText={'Download created PDF'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />
    </div>
  )
}

export default CreatePdf
