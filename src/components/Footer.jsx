"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="h-[410px] bg-[#202020] mt-20">
      <div className="flex h-[300px] pt-16 justify-between max-w-6xl mx-auto">
        <div className="basis-[30%]">
          <div className="flex flex-col gap-4">
            <Image
            src={"/PDFtoolify_footer_logo.svg"}
            height={25}
            width={182}
            alt="PDFtoolify logo"
          ></Image>
          <p className="text-xl text-white w-fit text-center">Smart And Simple PDF <br /> Solution.</p>
          </div>
        </div>
        <div className="flex basis-[70%] justify-between">
          <div className="w-[180px] text-sm flex flex-col gap-4 text-white">
            <span>PDF Online Tools</span>
            <div className="flex flex-col gap-4 text-sm text-[#C4C4C4]">
              <a href="">Merge PDF</a>
              <a href="">Add Pages to PDF</a>
              <a href="">JPG to PDF</a>
              <a href="">Remove PDF Pages</a>
            </div>
          </div>
          <div className="border-white text-sm w-[180px] text-white flex flex-col gap-4">
            <span>PDF Software</span>
            <div className="flex flex-col gap-4 text-sm text-[#C4C4C4]">
              <a href="">PDFtoolify for Windows</a>
              <a href="">PDFtoolify for Android</a>
            </div>
          </div>
          <div className="border-white text-sm w-[180px] text-white flex flex-col gap-4">
            <span>Company</span>
            <div className="flex flex-col gap-4 text-sm text-[#C4C4C4]">
              <a href="">About</a>
              <a href="">Company</a>
              <a href="">Blog</a>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-[#C4C4C4] mt-6"/>
      <div className="text-[#C4C4C4] text-sm">
        <span className="flex gap-10 w-fit mx-auto">
          <a href="">Terms And Condition</a>
          <a href="">Privacy Policy</a>
        </span>
        <span className="w-fit block mt-2 mx-auto">
          Copyright @ 2025 PDFtoolify
        </span>
      </div>
    </footer>
  );
}

export default Footer;