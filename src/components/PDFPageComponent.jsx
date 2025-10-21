import Image from 'next/image'
import React from 'react'
function PDFPageConponent({file}) {
  return (
    <div>
      <div
        className="w-[220px] h-[300px] bg-white rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg
          transition-all duration-300 overflow-hidden"
      >
        <div className="px-4 pt-4 pb-1 w-full h-full flex flex-col items-center justify-center">
          <Image
            src={"/pdf_logo.png"}
            width={190}
            height={100}
            alt="PDFtoolify"
          />
        </div>
        {/* File name */}
        <div className=" py-2 px-3 text-center">
          <p
            className="text-sm font-medium truncate"
            title={file.name}
          >
            {file.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PDFPageConponent
