import React from 'react'

function DownloadComponent({headingText,buttonText,downloadFileURL}) {
  return (
   <div className="max-w-5xl text-center mx-auto mt-4">
          <h1 className="text-center text-gray-700 text-3xl font-semibold">{headingText}</h1>
          <div className="mt-3 w-fit mx-auto">
            <a
              href={downloadFileURL}
              download
              className="bg-blue-500  active:bg-blue-400 font-bold text-white px-4 py-4 rounded-md inline-block mt-2"
            >
              {buttonText}
            </a>      
          </div>
        </div>
  )
}

export default DownloadComponent