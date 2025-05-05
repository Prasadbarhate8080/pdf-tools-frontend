import React from "react";
import Image from "next/image";
import home from "./home.module.css";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
function Home() {
  return (
    <div className="bg-[#F7F5FB]">
      <main className="">
        <div className="bg-[#F7F5FB]">
          <div className="p-1 ">
            <h1 className="md:text-4xl text-2xl mt-10 text-gray-800 text-center font-semibold">
              Tools you need to work with PDFs in one place
            </h1>
            <p className="md:text-2xl text-xl text-center mt-2 text-gray-600">
              All are 100% FREE and easy to use! Merge, split, convert, extract
              PDFs with just a few clicks.
            </p>
          </div>
          <Image
          width={0}
          height={0}
          src={"/wave.svg"}
          sizes="100vw"
          alt="wave"
          style={{ width: '100%', height: '100' }}
          />
          <div className="bg-[#F8ECE7]">
            <div className="p-6 flex max-w-7xl justify-center gap-4 md:gap-8 flex-wrap mx-auto">
              <ToolCard
                href={"/merge_pdf"}
                src={"/merge.png"}
                className={""}
                width={33}
                height={10}
                title="Merge PDF"
                alt="merge pdf"
                desc="Combine multiple pages and PDFs into one"
              />
              <ToolCard
                href={"/split_pdf"}
                src={"/split.png"}
                className={""}
                width={27}
                height={10}
                title="Split PDF"
                alt="split pdf"
                desc="Split the PDF into two parts"
              />
              <ToolCard
                href={"/extract_pdf"}
                src={"/extract.png"}
                className={""}
                width={25}
                height={10}
                title="Extract PDF"
                alt="extract pdf pages"
                desc="Extract the pages from the pdf which you want"
              />
              <ToolCard
                href={"/jpg_to_pdf"}
                src={"/convert.png"}
                className={""}
                width={25}
                height={10}
                title="JPG to PDF"
                alt="convert jpg to pdf"
                desc="Convert the jpg images into PDF"
              />
              <ToolCard
                href={"/pdf_to_jpg"}
                src={"/pdf_to_jpg.jpg"}
                className={""}
                width={27}
                height={10}
                title="PDF to JPG"
                alt="PDF to jpg converter"
                desc="Convert the PDF into JPG images"
              />
              <ToolCard
                href={"/compress_pdf"}
                src={"/compress_pdf.png"}
                className={""}
                width={35}
                height={10}
                title="Compress PDF"
                alt="compress pdf file"
                desc="minimize the size of the pdf"
              />
              <ToolCard
                href={"/protect_pdf"}
                src={"/protect_pdf.jpg"}
                className={""}
                width={27}
                height={10}
                title="Protect PDF"
                alt="Protect pdf"
                desc="Protect the PDF with password"
              />
              <ToolCard
                href={"/remove_pdf_pages"}
                src={"/remove_pages.jpg"}
                className={""}
                width={25}
                height={10}
                title="Remove PDF Pages"
                alt="remove pdf pages"
                desc="Remove the pages from the "
              />
              <ToolCard
                href={"/unlock_pdf"}
                src={"/unlock_pdf.jpg"}
                className={""}
                width={30}
                height={10}
                title="Unlock PDF"
                alt="unlock pdf"
                desc="Unlock the pdf from any password"
              />
              <ToolCard
                href={"/word_to_pdf"}
                src={"/word_to_pdf.jpg"}
                className={""}
                width={30}
                height={10}
                title="Word to PDF"
                alt="convert word file into PDF"
                desc="Convert the word file into PDF"
              />
              <ToolCard
                href={"/pdf_to_pdfa"}
                src={"/pdf_to_pdfa.jpg"}
                className={""}
                width={30}
                height={10}
                title="PDF to PDFA"
                alt="convert PDF file into PDFA"
                desc="convert The PDF file into PDFA"
              />
              <ToolCard
                href={"/add_watermark"}
                src={"/pdf_watermark.jpg"}
                className={""}
                width={30}
                height={10}
                title="Add Watermark"
                alt="add wateramrk in pdf"
                desc="Add watermark into pdf file"
              />
               <ToolCard
                href={"/add_page_no"}
                src={"/add_page_no.png"}
                className={""}
                width={33}
                height={10}
                title="Add Page Number"
                alt="add page number in pdf"
                desc="Add page number into pdf file"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
