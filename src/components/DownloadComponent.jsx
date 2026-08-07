'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'

const ALL_TOOLS = [
  {
    name: 'Merge PDF',
    href: '/merge-pdf',
    desc: 'Combine multiple PDFs into one file',
    icon: '🗂️',
  },
  { name: 'Split PDF', href: '/split-pdf', desc: 'Extract or separate pages', icon: '✂️' },
  {
    name: 'Compress PDF',
    href: '/compress-pdf',
    desc: 'Reduce file size, keep quality',
    icon: '🗜️',
  },
  { name: 'PDF to Word', href: '/pdf-to-word', desc: 'Editable DOCX in seconds', icon: '📝' },
  { name: 'PDF to JPG', href: '/pdf-to-jpg', desc: 'Turn pages into images', icon: '🖼️' },
  { name: 'JPG to PDF', href: '/jpg-to-pdf', desc: 'Images into a single PDF', icon: '📸' },
  { name: 'Rotate PDF', href: '/rotate-pdf', desc: 'Fix page orientation', icon: '🔄' },
  { name: 'Unlock PDF', href: '/unlock-pdf', desc: 'Remove PDF password', icon: '🔓' },
  { name: 'Protect PDF', href: '/protect-pdf', desc: 'Add a password to your PDF', icon: '🔒' },
]

function DownloadComponent({
  headingText = 'Your file is ready',
  buttonText = 'Download PDF',
  downloadFileURL,
  currentTool = '',
  suggestions,
  setCompletionStatus,
  setisDroped,
  setFiles,
  setdownloadFileURL
}) {
  const [copied, setCopied] = useState(false)

  const tools = (suggestions || ALL_TOOLS)
    .filter((t) => t.name.toLowerCase() !== currentTool.toLowerCase())
    .slice(0, 6)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(downloadFileURL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_) {}
  }

  let handleReset = () => {
    setisDroped(false),
    setCompletionStatus(false)
    setFiles([])
    setdownloadFileURL("")
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      {/* Success card */}
      <div className="rounded-2xl border border-slate-200 bg-white px-6 text-center py-4 shadow-sm sm:px-8">
        <div className="text-left">
          <button onClick={handleReset} className="hover:bg-gray-100 p-1 rounded-full">
            <ArrowLeft />
          </button>
        </div>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50/60">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {headingText}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Processing complete. Your file is ready to download and will be deleted from our servers
          automatically within one hour.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={downloadFileURL}
            download
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-[0.99] sm:w-auto"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
              />
            </svg>
            {buttonText}
          </a>
          <button
          onClick={handleReset}
          className=" p-2 hover:bg-gray-100 rounded-full">
            {' '}
            <Trash2 />{' '}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">🔒 Secure SSL transfer</span>
          <span className="inline-flex items-center gap-1.5">🗑️ Auto-deleted in 1 hour</span>
          <span className="inline-flex items-center gap-1.5">✅ Free, no sign-up</span>
        </div>
      </div>

      {/* Suggested tools */}
      <div className="mt-12">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Continue with another tool</h3>
            <p className="mt-1 text-sm text-slate-500">Free, unlimited, and just as fast.</p>
          </div>
          <Link
            href="/#tools"
            className="hidden text-sm font-medium text-blue-600 hover:underline sm:block"
          >
            View all tools →
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-base">
                  {tool.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                    {tool.name}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{tool.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/#tools"
          className="mt-4 block text-center text-sm font-medium text-blue-600 hover:underline sm:hidden"
        >
          View all tools →
        </Link>
      </div>
    </div>
  )
}

export default DownloadComponent
