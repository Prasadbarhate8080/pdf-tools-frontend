import React from 'react'
function ProgressBar({progress}) {
  return (
    <div className='mt-24'>
    <div className=" max-w-5xl mx-auto bg-gray-200 h-4 rounded">
      <div
        className="bg-primary h-full rounded transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <p className="mt-2 text-xl font-bold text-center text-muted-foreground">{progress}% uploaded</p>
  </div>
  )
}
export default ProgressBar
