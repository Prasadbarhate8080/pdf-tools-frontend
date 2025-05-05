"use client";
import React from "react";
import styles from "./Header.module.css";
import { useRef, useEffect, useState } from "react";
import home from "@/app/home.module.css";
import Image from "next/image";
import ToolsSection from "./ToolsSection";
import Link from "next/link";
import ToolName from "./ToolName";
function Header() {
  const [isActiveTools, setIsActiveTools] = useState(false);
  const hamBurgerMenu = useRef(null);
  const hamBurgerIcon = useRef(null);
  const [isActiveHamBurger, setIsActiveHamBurger] = useState(false);
  const [isActiveDropdown, setIsActiveDropdown] = useState(false)

  const handleHamBurger = () => {
    setIsActiveHamBurger((prev) => !prev);
    setIsActiveTools(false);
  };

  const showTools = () => {
    setIsActiveTools(true);
  };



  useEffect(() => {
    if (hamBurgerIcon.current) {
      hamBurgerIcon.current.src = isActiveHamBurger
        ? "/close.png"
        : "/hamburger.png";
    }
    if (isActiveHamBurger) hamBurgerMenu.current.style.display = "block";
    else hamBurgerMenu.current.style.display = "none";
  }, [isActiveHamBurger]);

  return (
    <header className={`${home.shadow} mb-1 bg-white`}>
      <nav className={`${home.nav_bar} lg:max-w-7xl m-auto`}>
        <div className="flex lg:px-20 px-4 md:px-4 pt-2 items-center justify-between ">
          <div>
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                height={20}
                width={185}
                alt="allinone pdf logo"
              ></Image>
            </Link>
          </div>
          <div className="hidden md:hidden lg:block">
            <ul className=" flex gap-10 text-gray-700 list-none text-md font-semibold  h-full items-center">
              <Link href={"/"}>
                <li
                  className={` hover:cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md `}
                >
                  Home
                </li>
              </Link>
              <Link href={"/merge_pdf"}>
                <li className=" hover:cursor-pointer  hover:bg-gray-100 px-2 py-1 rounded-md">
                  Merge PDF
                </li>
              </Link>
              <Link href={"/split_pdf"}>
                <li className=" hover:cursor-pointer  hover:bg-gray-100 px-2 py-1 rounded-md">
                  Split PDF
                </li>
              </Link>
              <li
                className={`hover:cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md flex justify-center relative gap-1 items-center ${styles.toolItems}`}
                onMouseEnter={() => setIsActiveDropdown(true)}
                onMouseLeave={() => setIsActiveDropdown(false)}
              >
                <span
                >Tools</span>
                <div>
                  <Image
                    src={"/down_arrow.png"}
                    height={10}
                    width={12}
                    alt="down arrow"
                  ></Image>
                </div>

                {/* dropdown section of tools */}
                <div className={`${styles.dropdownCard} ${isActiveDropdown ? "flex" : "hidden" }  gap-8`}
                onClick={() => {setIsActiveDropdown(false)}}
                >
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
                </div>
              </li>
            </ul>
          </div>
          <div onClick={handleHamBurger} className="lg:hidden">
            <img
              ref={hamBurgerIcon}
              width={20}
              height={20}
              alt="hamburger"
              src="/hamburger.png"
              className="w-5 h-5"
            />
          </div>

          {/* Hamburger Menu */}
          <div
            ref={hamBurgerMenu}
            className="absolute z-10 lg:hidden! hidden right-0 top-20"
          >
            <ul className=" flex gap-8 py-2 bg-white px-8 shadow flex-col text-gray-700 list-none text-md font-semibold  h-full ">
              <Link href={"/merge_pdf"}>
                <li className="flex gap-2 hover:bg-gray-100 px-2 py-1 rounded-md items-center">
                  <Image
                    src={"/merge.png"}
                    width={30}
                    height={10}
                    alt="merge pdf"
                  ></Image>
                  <span>Merge PDF</span>
                </li>
              </Link>
              <Link href={"/split_pdf"}>
                <li className="flex gap-2 hover:bg-gray-100 px-2 py-1 rounded-md items-center">
                  <Image
                    src={"/split.png"}
                    width={24}
                    height={10}
                    alt="merge pdf"
                  ></Image>
                  <span>Split PDF</span>
                </li>
              </Link>
              <Link href={"/extract_pdf"}>
                <li className="flex gap-2 hover:bg-gray-100 px-2 py-1 rounded-md items-center">
                  <Image
                    src={"/extract.png"}
                    width={22}
                    height={10}
                    alt="merge pdf"
                  ></Image>
                  <span>Extract Pages</span>
                </li>
              </Link>
              <li
                onClick={() => {
                  showTools();
                }}
                className="flex gap-2 hover:bg-gray-100 px-2 py-1 rounded-md items-center"
              >
                <Image
                  src={"/down_arrow.png"}
                  width={22}
                  height={10}
                  alt="merge pdf"
                ></Image>
                <span>More Tools</span>
              </li>
            </ul>
          </div>
        </div>
        <ToolsSection
          isActiveTools={isActiveTools}
          setIsActiveTools={setIsActiveTools}
          setIsActiveHamBurger={setIsActiveHamBurger}
        />
      </nav>
    </header>
  );
}

export default Header;
