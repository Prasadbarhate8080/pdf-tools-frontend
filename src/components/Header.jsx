"use client";
import React from "react";
import { useRef, useEffect, useState } from "react";
import home from "@/app/home.module.css";
import Image from "next/image";
import Link from "next/link";
function Header() {
  const hamBurgerMenu = useRef(null);
  const hamBurgerIcon = useRef(null);
  const [isActiveHamBurger, setIsActiveHamBurger] = useState(false);

  const handleHamBurger = () => {
    setIsActiveHamBurger((prev) => !prev);
  };

  useEffect(() => {
    if (hamBurgerIcon.current) {
      hamBurgerIcon.current.src = isActiveHamBurger
        ? "/close.png"
        : "/hamburger.png";
    }
    if(isActiveHamBurger)
      hamBurgerMenu.current.style.display="block";
    else
      hamBurgerMenu.current.style.display="none";
  }, [isActiveHamBurger]);

  return (
    <header className={`${home.shadow} mb-1 bg-white`}>
      <nav className={`${home.nav_bar} lg:max-w-7xl m-auto`}>
        <div className="flex lg:px-20 px-4 md:px-4 pt-2 items-center justify-between ">
          <div>
            <Image
              src={"/logo.jpg"}
              height={10}
              width={165}
              alt="allinone pdf logo"
            ></Image>
          </div>
          <div className="hidden md:hidden lg:block">
            <ul className=" flex gap-10 text-gray-700 list-none text-md font-semibold  h-full items-center">
              <Link href={"/merge_pdf"}>
                <li className="hover:text-[#F79B2E] hover:cursor-pointer ">
                  Merge PDF
                </li>
              </Link>
              <Link href={"/split_pdf"}>
                <li className="hover:text-[#F79B2E] hover:cursor-pointer ">
                  Split PDF
                </li>
              </Link>
              <Link href={"/extract_pdf"}>
                <li className="hover:text-[#F79B2E] hover:cursor-pointer ">
                  Extract
                </li>
              </Link>
              <Link href={"/jpg_to_pdf"}>
                <li className="hover:text-[#F79B2E] hover:cursor-pointer ">
                  JPG to PDF
                </li>
              </Link>
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
          <div
            ref={hamBurgerMenu}
            className="absolute z-10 lg:block hidden right-0 top-20"
          >
            <ul className=" flex gap-8 py-2 bg-white px-8 shadow flex-col text-gray-700 list-none text-md font-semibold  h-full ">
              <Link href={"/merge_pdf"}>
                <li className="hover:text-[#F79B2E] hover:cursor-pointer ">
                  Merge PDF
                </li>
              </Link>
              <Link href={"/split_pdf"}>
                <li className="hover:text-[#F79B2E] hover:cursor-pointer ">
                  Split PDF
                </li>
              </Link>
              <Link href={"/extract_pdf"}>
                <li className="hover:text-[#F79B2E] hover:cursor-pointer ">
                  Extract
                </li>
              </Link>
              <Link href={"/jpg_to_pdf"}>
                <li className="hover:text-[#F79B2E] hover:cursor-pointer ">
                  JPG to PDF
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
