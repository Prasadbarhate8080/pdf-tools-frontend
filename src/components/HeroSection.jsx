import React from 'react'
import Image from 'next/image'
function HeroSection() {
  return (
    <div className="flex h-[655px] max-w-7xl bg-[url('/dotted_pattern.png')] mx-auto ">
        <div className=" basis-[50%] flex justify-center items-center ">
            <div className='flex gap-4 flex-col'>
                <h1
                className="text-3xl text-gray-800 font-bold whitespace-pre"
                >Work Smarter with Easy <br />PDF Tools.</h1>
                <p className='text-gray-700'>All the PDF tools you need in one place. Manage your  documents <br /> smarter and faster.</p>
                <button 
                className="font-bold text-[20px] text-[#0026FF] border-2 border-[#0026FF] px-2 py-1 rounded-md w-fit"
                >Explore All PDF Tools</button>
            </div>
        </div>
        <div className=" basis-[50%] flex justify-center items-center   ">
            <Image
            src={"/hero_image.gif"}
            width={510}
            height={510}
            alt="PDFtoolify-heroImage"
            />
        </div>
    </div>
  )
}

export default HeroSection
