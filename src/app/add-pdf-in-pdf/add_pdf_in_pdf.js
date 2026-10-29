'use client'
import { useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import FileInput from '@/components/FileInput'
import { useFileUpload } from '@/hooks/useFileUpload'
import { Plus } from 'lucide-react'
import FeatureCardSection from '@/components/FeatureCardSection'
import { PDFDocument } from 'pdf-lib'
import ToolHeader from '@/components/ToolHeader'
import BenefitsSection from '@/components/BenefitsSection'
import FaqSection from '@/components/FaqSection'
import HowToSection from '@/components/HowToSection'
import { addPdfInPdfBenefits } from '@/data/benefits'
import { addPdfInPdfFeatures } from '@/data/features'
import { addPdfInPdfFaqs } from '@/data/faqs'
import { addPdfInPdfHowToSteps } from '@/data/howTo'
import OperationBox from '@/components/OperationBox'
import OperationMain from '@/components/OperationMain'
import { useDispatch, useSelector } from 'react-redux'
import DownloadComponent from '@/components/DownloadComponent'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import HideMainContent from '@/components/HideMainContent'
import LoadingStateComponent from '@/components/LoadingStateComponent'
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

function AddPdfInPdf() {
  let dispatch = useDispatch()
  let downloadFileUrl = useSelector((state) => state.downloadFileUrl.downloadFileUrl)
  let pdfFile = useRef(null)
  let newPdfNumPages = useRef(0)
  let addingFilePageNo = useRef(null)
  const [numPages, setnumPages] = useState(0)
  const [isPopupActive, setIsPopupActive] = useState(false)
  const [pdfFilePageno, setPdfFilePageno] = useState(1)
  let { files, setFiles, toolFunctionWrapper } = useFileUpload()

  async function addPdfIntoPdf() {
    if (!files) throw new Error('No main PDF selected')
    if (!pdfFile) throw new Error('No PDF selected to insert')

    // ✅ Load Main PDF
    const mainBytes = await files.arrayBuffer()
    const mainPdfDoc = await PDFDocument.load(mainBytes)

    // ✅ Load Insert PDF
    const insertBytes = await pdfFile.current.arrayBuffer()
    const insertPdfDoc = await PDFDocument.load(insertBytes)

    // ✅ Copy pages from insert PDF
    const insertPages = await mainPdfDoc.copyPages(insertPdfDoc, insertPdfDoc.getPageIndices())

    // ✅ Insert before this page (0-based index)
    const insertAt = Number(pdfFilePageno) - 1

    insertPages.forEach((page, index) => {
      mainPdfDoc.insertPage(insertAt + index, page)
    })

    // ✅ Save final PDF
    const newPdfBytes = await mainPdfDoc.save()

    const blob = new Blob([newPdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    dispatch(setDownloadFileUrl(url))
  }

  function onDocumentLoadSuccess({ numPages }) {
    setnumPages(numPages)
  }
  function newPdfLoaded({ numPages }) {
    newPdfNumPages.current = numPages
  }
  return (
    <div className="min-h-screen bg-background">
      <HideMainContent>
        <ToolHeader
          sparklesText={'Free Online PDF Inserter'}
          headings={['Insert', 'PDF into PDF', 'Easily']}
          text={'Insert a PDF into another PDF at any page position Quickly.'}
        />
        <FileInput
          files={files}
          setFiles={setFiles}
          multiple={false}
          accept={{ 'application/pdf': [] }}
        />
        <BenefitsSection
          heading={'How this pdf inserter tool will help you'}
          benefits={addPdfInPdfBenefits}
        />
        <FeatureCardSection
          tool={'Add PDF in PDF'}
          text="Powerful tools to insert entire PDF exactly where you need to add"
          features={addPdfInPdfFeatures}
        />
        <HowToSection
          heading={'How to add a PDF inside another PDF?'}
          text={'Insert one PDF into another in three quick steps.'}
          steps={addPdfInPdfHowToSteps}
        />
        <FaqSection
          heading={'Add PDF in PDF FAQs'}
          text={'Common questions about inserting a PDF into another PDF'}
          faqs={addPdfInPdfFaqs}
        />
      </HideMainContent>

      <OperationBox>
        <OperationMain>
          <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
            <ul className="flex flex-wrap justify-center  items-center gap-6">
              {Array.from({ length: numPages }, (_, index) => {
                return (
                  <li className="flex gap-4 justify-center items-center " key={index}>
                    <div
                      className="bg-blue-600 p-1 rounded-full"
                      onClick={() => {
                        setPdfFilePageno(index + 1)
                        setIsPopupActive(true)
                      }}
                    >
                      <Plus color="white" />
                    </div>
                    <div className="rounded-xl bg-gray-50 p-2 relative">
                      <Page pageNumber={index + 1} width={180} height={360} />
                      <div className="text-center bg-white">{index + 1}</div>
                    </div>
                  </li>
                )
              })}
              <li
                className="bg-blue-600 p-1 rounded-full"
                onClick={() => {
                  setIsPopupActive(true)
                  setPdfFilePageno(numPages + 1)
                }}
              >
                <Plus color="white" />
              </li>
            </ul>
          </Document>
          <div
            className={`fixed z-50 inset-0 bg-[rgba(70,70,70,0.4)] ${isPopupActive ? 'flex' : 'hidden'}   rounded-xl  justify-center items-center`}
            onClick={(e) => {
              setIsPopupActive(false)
            }}
          >
            <div className="bg-white px-10 py-5 rounded-md ">
              <label htmlFor="pdfFile" className="cursor-pointer">
                Select pdf file
              </label>
              <input
                type="file"
                id="pdfFile"
                className="hidden"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files[0].type == 'application/pdf')
                      pdfFile.current = e.target.files[0]
                    else return
                  toolFunctionWrapper(addPdfIntoPdf)
                }}
              />
            </div>
          </div>
        </OperationMain>
      </OperationBox>
      <LoadingStateComponent />
      <DownloadComponent
        headingText={'Download PDF Inserted PDF'}
        buttonText={'Download Final PDF'}
        downloadFileUrl={downloadFileUrl}
        setFiles={setFiles}
      />
      <ToastContainer />
    </div>
  )
}

export default AddPdfInPdf
