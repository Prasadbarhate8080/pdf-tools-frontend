import Image from 'next/image'
import React from 'react'
function DownloadSoftware({imgSrc,heading,paragraph,buttonText}) {
  return (
    <div className="w-[370px] h-[440px] bg-[#F7F8FA] p-2 rounded-3xl flex items-center">
        <div className="flex flex-col gap-5 items-center">  
            <Image
            src={imgSrc}
            width={140}
            height={150}
            alt="works on windows"
            ></Image>
            <h2 className="text-2xl  font-semibold">{heading}</h2>
            <p className="mx-auto text-center">
                {paragraph}
            </p>
            <button 
            className="text-xl text-white font-semibold bg-blue-500 rounded-md px-5 py-2"
            >
                {buttonText}
            </button>
        </div>
    </div>
  )
}

export default DownloadSoftware
