import React from 'react'
import ToolName from './ToolName'

function HeaderToolsSection({isActiveTools,setIsActiveTools,setIsActiveHamBurger}) {
  return (
    <>
      <ul className="list-none flex flex-col text-md text-gray-700 gap-5">
        <ToolName
            href={"/merge_pdf"}
            src={"/merge.png"}
            className={""}
            width={33}
            height={10}
            title="Merge PDF"
            alt="merge pdf"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        <ToolName
            href={"/split_pdf"}
            src={"/split.png"}
            className={""}
            width={27}
            height={10}
            title="Split PDF"
            alt="split pdf"
            desc="Split the PDF into two parts"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        <ToolName
            href={"/extract_pdf"}
            src={"/extract.png"}
            className={""}
            width={25}
            height={10}
            title="Extract PDF"
            alt="extract pdf pages"
            desc="Extract the pages from the pdf which you want"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        <ToolName
            href={"/jpg_to_pdf"}
            src={"/convert.png"}
            className={""}
            width={25}
            height={10}
            title="JPG to PDF"
            alt="convert jpg to pdf"
            desc="Convert the jpg images into PDF"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        </ul>
        <ul className="list-none flex flex-col text-md text-gray-700 gap-5">
        <ToolName
            href={"/pdf_to_jpg"}
            src={"/pdf_to_jpg.jpg"}
            className={""}
            width={30}
            height={10}
            title="PDF to JPG"
            alt="PDF to jpg converter"
            desc="Convert the PDF into JPG images"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        <ToolName
            href={"/compress_pdf"}
            src={"/compress_pdf.png"}
            className={""}
            width={33}
            height={10}
            title="Compress PDF"
            alt="compress pdf file"
            desc="minimize the size of the pdf"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        <ToolName
            href={"/protect_pdf"}
            src={"/protect_pdf.jpg"}
            className={""}
            width={27}
            height={10}
            title="Protect PDF"
            alt="Protect pdf"
            desc="Protect the PDF with password"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        <ToolName
            href={"/remove_pdf_pages"}
            src={"/remove_pages.jpg"}
            className={""}
            width={27}
            height={10}
            title="Remove PDF Pages"
            alt="remove pdf pages"
            desc="Remove the pages from the "
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        </ul>
        <ul className="list-none flex flex-col text-md text-gray-700 gap-5">
        <ToolName
            href={"/unlock_pdf"}
            src={"/unlock_pdf.jpg"}
            className={""}
            width={30}
            height={10}
            title="Unlock PDF"
            alt="unlock pdf"
            desc="Unlock the pdf from any password"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        <ToolName
            href={"/word_to_pdf"}
            src={"/word_to_pdf.jpg"}
            className={""}
            width={30}
            height={10}
            title="Word to PDF"
            alt="convert word file into PDF"
            desc="Convert the word file into PDF"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        <ToolName
            href={"/pdf_to_pdfa"}
            src={"/pdf_to_pdfa.jpg"}
            className={""}
            width={30}
            height={10}
            title="PDF to PDFA"
            alt="convert PDF file into PDFA"
            desc="convert The PDF file into PDFAF"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        <ToolName
            href={"/add_watermark"}
            src={"/pdf_watermark.jpg"}
            className={""}
            width={30}
            height={10}
            title="Add Watermark"
            alt="add wateramrk in pdf"
            desc="Add watermark into pdf file"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        <ToolName
            href={"/add_page_no"}
            src={"/add_page_no.png"}
            className={""}
            width={30}
            height={10}
            title="Add Page Number"
            alt="add page number in pdf"
            desc="Add page number into pdf file"
            isActiveTools={isActiveTools}
            setIsActiveTools={setIsActiveTools}
            setIsActiveHamBurger={setIsActiveHamBurger}
        />
        </ul>
        </>
  )
}

export default HeaderToolsSection
