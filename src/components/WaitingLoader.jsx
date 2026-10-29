import React from 'react'

function WaitingLoader() {
  return (
    <div className="flex flex-col items-center mt-24">
      <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-700 text-md mb-2">please wait</p>
    </div>
  )
}

export default WaitingLoader
