"use client"
import React from 'react'
import toolsData from "@/data/toolsData.json"
import ToolCard from './ToolCard'
function HomePageToolsSection() {
  return (
    <>
      <div id='homePageTools' className="p-1">
        <h1 className="md:text-3xl text-2xl text-gray-800 text-center font-semibold">
          PDFtoolify Free Online Tools
        </h1>
        <p className="text-sm md:text-[16px]  px-1 mx-auto text-center max-w-3xl   mt-2 text-gray-700">
          Tools you need to work with PDFs in one place PDFtoolify offers dozens of tools to help you complete simple and quick PDF tasks directly in your web browser.
        </p>
      </div>
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
    </>
  )
}

export default HomePageToolsSection
