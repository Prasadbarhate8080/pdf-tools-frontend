"use client";
import React from "react";
import styles from "./Header.module.css";
import { useRef, useEffect, useState } from "react";
import home from "@/app/home.module.css";
import Image from "next/image";
import MobileToolsSection from "./MobileToolsSection";
import HeaderToolsSection from "./HeaderToolsSection";
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
                src={"/PDFtoolify_logo.svg"}
                height={25}
                width={182}
                alt="PDFtoolify logo"
              ></Image>
            </Link>
          </div>
          <div className="hidden md:hidden lg:block">
            <ul className=" flex gap-8 text-gray-700 list-none text-md font-medium  h-full items-center">
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
              <Link href={"/split_pdf"}>
                <li className=" hover:cursor-pointer  hover:bg-gray-100 px-2 py-1 rounded-md">
                  Blogs
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
                  <HeaderToolsSection isActiveTools={isActiveTools} setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger}/>
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
        <MobileToolsSection
          isActiveTools={isActiveTools}
          setIsActiveTools={setIsActiveTools}
          setIsActiveHamBurger={setIsActiveHamBurger}
        />
      </nav>
    </header>
  );
}

export default Header;
