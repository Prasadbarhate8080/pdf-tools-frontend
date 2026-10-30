import React from 'react'

function WaitingLoader() {
  return (
    <div className="flex flex-col items-center py-24 select-none">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-[#0077D7]/15 blur-lg animate-pulse" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0077D7] border-r-sky-400 animate-spin [animation-duration:0.9s]" />
        <div className="absolute inset-2.5 rounded-full border-2 border-transparent border-b-indigo-300 animate-spin [animation-duration:1.4s] [animation-direction:reverse]" />
      </div>

      <p className="mt-5 text-sm font-medium tracking-wide text-slate-500">
        Please wait
        <span className="inline-flex w-5 justify-start">
          <span className="animate-pulse">…</span>
        </span>
      </p>
    </div>
  )
}

export default WaitingLoader
