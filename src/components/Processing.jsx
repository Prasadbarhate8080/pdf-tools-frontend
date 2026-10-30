import React, { useEffect, useState } from 'react'

const TIPS = [
  'Reading your PDF pages…',
  'Optimizing for speed…',
  'Almost there, hang tight…',
]

function Processing() {
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setTipIndex((i) => (i + 1) % TIPS.length),
      2500
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center py-24 select-none">
      {/* Spinner */}
      <div className="relative w-20 h-20">
        {/* Soft glow behind */}
        <div className="absolute inset-0 rounded-full bg-[#0077D7]/20 blur-xl animate-pulse" />
        {/* Track */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
        {/* Gradient arc spinning */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0077D7] border-r-sky-400 animate-spin [animation-duration:0.9s]" />
        {/* Inner counter-spin ring */}
        <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-indigo-300 animate-spin [animation-duration:1.4s] [animation-direction:reverse]" />
        {/* PDF icon center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-[#0077D7]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <p className="mt-6 text-lg font-semibold text-slate-800">
        Processing PDF
        <span className="inline-flex w-6 justify-start">
          <span className="animate-pulse">…</span>
        </span>
      </p>

      {/* Rotating tip */}
      <p
        key={tipIndex}
        className="mt-1.5 text-sm text-slate-400 animate-in fade-in slide-in-from-bottom-1 duration-500"
      >
        {TIPS[tipIndex]}
      </p>
    </div>
  )
}

export default Processing
