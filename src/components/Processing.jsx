import React from 'react'

function Processing() {
  return (
    <div className="flex flex-col items-center mt-8">
            <p className="text-gray-700 text-md mb-2">Processing PDF... Please wait</p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
  )
}

export default Processing
