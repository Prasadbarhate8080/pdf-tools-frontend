import React from 'react'
import Image from 'next/image'
function InfoCard({heading,paragraph,buttonText,src,alt,flip,imageHeight=400,imageWidth=400}) {
  return (
    <div className={`${flip ? "lg:flex-row-reverse" : ""} mt-10 flex max-w-6xl justify-evenly mx-auto flex-wrap lg:flex-row flex-col-reverse  lg:flex-nowrap`}>
      <div className="max-w-3xl flex  items-center justify-center text-gray-800">
        <div className="max-w-[400px] flex flex-col gap-4 px-2">
          <h2 className=" text-xl md:text-2xl font-semibold">{heading}</h2>  
          <p className="text-xs md:text-sm ">
            {paragraph}
          </p>
          <button className="flex gap-2 text-blue-700">
            {buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" fill="0026FF" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
      <div className="max-w-3xl flex items-center justify-center">
        <div className={`md:w-[400px] md:h-[400px] w-[300px] h-[300px] relative`}>
          <Image 
          src={src}
          fill
          alt={alt}
          />
        </div>
      </div>
    </div>
  )
}

export default InfoCard
