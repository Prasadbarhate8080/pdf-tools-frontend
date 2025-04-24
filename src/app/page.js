import React from "react";
import Image from "next/image";
import home from "./home.module.css";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
function Home() {
  return (
    <div className="bg-[#F7F5FB]">
      <main className="">
        <div className="bg-[#F7F5FB]">
          <div className="p-10 ">
            <h1 className="md:text-4xl text-2xl text-gray-800 text-center font-semibold">
              Tools you need to work with PDFs in one place
            </h1>
            <p className="md:text-2xl text-xl text-center mt-2 text-gray-600">
              All are 100% FREE and easy to use! Merge, split, convert, extract
              PDFs with just a few clicks.
            </p>
          </div>

          <div className="bg-[#F8ECE7]">
            <div className="p-6 flex max-w-7xl justify-center gap-8 flex-wrap mx-auto mt-10 ">
              <Link href={"/merge_pdf"}>
                <div
                  className=" w-[300px] h-[130px] p-5
               bg-[#FFF]  rounded-xl hover:bg-[#F7F5FB] hover:cursor-pointer"
                >
                  <div className="flex items-center">
                    <div>
                      <Image
                        src={"/merge.png"}
                        width={33}
                        height={10}
                        alt="merge pdf"
                      ></Image>
                    </div>
                    <span className="font-semibold ml-2 text-sm text-gray-600">
                      Merge PDF
                    </span>
                  </div>
                  <p
                    className="text-[14px] leading-[16px] 
                text-[#777] mt-3 "
                  >
                    Combine multiple pages and PDFs into one
                  </p>
                </div>
              </Link>

              <Link href={"/split_pdf"}>
                <div
                  className=" w-[300px] h-[130px] p-5
               bg-[#FFF]  rounded-xl hover:bg-[#F7F5FB] hover:cursor-pointer"
                >
                  <div className="flex items-center">
                    <div>
                      <Image
                        src={"/split.png"}
                        width={27}
                        height={10}
                        alt="merge pdf"
                      ></Image>
                    </div>
                    <span className="font-semibold ml-2 text-sm text-gray-600">
                      Split PDF
                    </span>
                  </div>
                  <p
                    className="text-[14px] leading-[16px] 
                text-[#777] mt-3"
                  >
                    Split the PDF into two parts
                  </p>
                </div>
              </Link>

              <Link href={"/extract_pdf"}>
                <div
                  className=" w-[300px] h-[130px] p-5
               bg-[#FFF]  rounded-xl hover:bg-[#F7F5FB] hover:cursor-pointer"
                >
                  <div className="flex items-center">
                    <div>
                      <Image
                        src={"/extract.png"}
                        width={25}
                        height={10}
                        alt="merge pdf"
                      ></Image>
                    </div>
                    <span className="font-semibold ml-2 text-sm text-gray-600">
                      Extract PDF Pages
                    </span>
                  </div>
                  <p
                    className="text-[14px] leading-[16px] 
                text-[#777] mt-3"
                  >
                    Extract the pages from the pdf do you want
                  </p>
                </div>
              </Link>

              <Link href={"/jpg_to_pdf"}>
                <div
                  className=" w-[300px] h-[130px] p-5
               bg-[#FFF]  rounded-xl hover:bg-[#F7F5FB] hover:cursor-pointer"
                >
                  <div className="flex items-center">
                    <div>
                      <Image
                        src={"/convert.png"}
                        width={25}
                        height={10}
                        alt="merge pdf"
                      ></Image>
                    </div>
                    <span className="font-semibold ml-2 text-sm text-gray-600">
                      JPG to PDF
                    </span>
                  </div>
                  <p
                    className="text-[14px] leading-[16px] 
                text-[#777] mt-3"
                  >
                    Create the PDF from Images
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
