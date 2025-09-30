"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="min-h-[410px] bg-[#202020] mt-20">
      <div className="flex min-h-[300px] pt-16 justify-center items-center max-w-6xl gap-y-16 mx-auto flex-wrap">
        <div className="w-[345px]">
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <Image
            src={"/PDFtoolify_footer_logo.svg"}
            height={25}
            width={182}
            alt="PDFtoolify logo"
          ></Image>
          <p className="text-xl text-white w-fit text-center">Smart And Simple PDF <br /> Solution.</p>
          </div>
        </div>
        <div className="flex w-[806px] gap-x-[130px] gap-y-14 flex-wrap justify-center">
          <div className="w-[180px] flex sm:justify-center">
            <div className="text-sm flex flex-col gap-4 text-white w-fit">
              <span>PDF Online Tools</span>
              <div className="flex flex-col gap-4 text-sm text-[#C4C4C4]">
                <Link href="/merge_pdf">Merge PDF</Link>
                <Link href="/add_pages_to_pdf">Add Pages to PDF</Link>
                <Link href="/jpg_to_pdf">JPG to PDF</Link>
                <Link href="/remove_pdf_pages">Remove PDF Pages</Link>
              </div>
            </div>
          </div>
          <div className="w-[180px] flex sm:justify-center">
            <div className="text-sm flex flex-col gap-4 text-white w-fit">
              <span>PDF Software</span>
              <div className="flex flex-col gap-4 text-sm text-[#C4C4C4]">
                <Link href="">PDFtoolify for Windows</Link>
                <Link href="">PDFtoolify for Android</Link>
              </div>
            </div>
          </div>
          <div className="w-[180px] flex sm:justify-center">
            <div className="text-sm flex flex-col gap-4 text-white w-fit">
              <span>Company</span>
              <div className="flex flex-col gap-4 text-sm text-[#C4C4C4]">
                <Link href="/">About</Link>
                <Link href="/">Company</Link>
                <Link href="/">Blog</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-[#C4C4C4] mt-6"/>
      <div className="text-[#C4C4C4] text-sm">
        <span className="flex gap-10 w-fit mx-auto flex-wrap">
          <Link href="/">Terms And Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </span>
        <span className="w-fit block mt-2 mx-auto">
          Copyright © 2025 PDFtoolify. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;