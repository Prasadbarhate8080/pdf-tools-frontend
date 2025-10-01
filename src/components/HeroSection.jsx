import React from 'react'
import Image from 'next/image'
function HeroSection() {
  return ( 
    <div className="flex h-[655px] max-w-7xl bg-[url('/dotted_pattern.png')] mx-auto items-center flex-col flex-col-reverse  md:flex-row justify-evenly">
      <div className="max-w-3xl flex justify-center items-center ">
        <div className='flex gap-4 max-w-[430px] pl-4 md:pl-0 flex-col'>
          <h1
          className="md:text-3xl text-2xl text-gray-800 font-bold whitespace-pre"
          >Work Smarter with Easy <br />
          PDF Tools.
          </h1>
          <p className=' text-gray-700 md:text-[16px] text-xs  '>All the PDF tools you need in one place. Manage your  documents  smarter and faster.</p>
          <button 
          className="font-bold md:text-[16px] text-xs text-[#0026FF] border-2 border-[#0026FF] px-2 py-1 rounded-md w-fit"
          >Explore All PDF Tools
          </button>
        </div>
      </div>
      <div className="w-[290px] h-[300px] lg:w-[510px] lg:h-[510px] md:w-[450px] md:h-[450px] relative flex justify-center items-center">
        <Image
        fill
        src={"/hero_image.gif"}
        alt="PDFtoolify-heroImage"
        />
      </div>
    </div>
  )
}

export default HeroSection
