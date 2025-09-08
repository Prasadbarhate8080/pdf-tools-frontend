import React from 'react'
import { useSelector } from 'react-redux'

function ProgressBar({progress}) {
  // const progress = useSelector((state) => state.fileProgress.progress);
  return (
    <div>
    <div className="mt-10 max-w-5xl mx-auto bg-gray-200 h-4 rounded">
      <div
        className="bg-orange-700 h-full rounded transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <p className="mt-2 text-xl font-bold text-center text-gray-600">{progress}% uploaded</p>
  </div>
  )
}

export default ProgressBar
