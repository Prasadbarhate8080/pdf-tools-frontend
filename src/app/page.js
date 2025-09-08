import React from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import toolsData from "@/data/toolsData.json"
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
              {
               toolsData.map((data,index) => 
                <ToolCard
                key={index}
                href={data.href}
                src={data.src}
                className={""}
                width={data.width}
                height={data.height}
                title={data.title}
                alt={data.alt}
                desc={data.desc}
              />
              )
              }
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
