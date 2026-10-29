'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AlignLeft, ArrowLeft, Download, Gift, MoveLeft, Recycle, Shield, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { resetOperationState } from '@/store/operationStateSlice'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import { setIsdroped } from '@/store/isDropedSlice'
import { tools } from '@/data/toolsData'
import { Button } from './ui/button'

function DownloadComponent({
  headingText = 'Your file is ready',
  buttonText = 'Download PDF',
  downloadFileUrl,
  currentTool = '',
  suggestions,
  setFiles,
}) {
  let dispatch = useDispatch()
  let operationState = useSelector((state) => state.operationState.operationState)
  const filteredTools = (suggestions || tools)
    .filter((t) => t.name.toLowerCase() !== currentTool.toLowerCase())
    .slice(0, 6)

  let handleReset = () => { 
    dispatch(setIsdroped(false))
    dispatch(resetOperationState())
    setFiles([])
    dispatch(setDownloadFileUrl(''))
  }
  if (downloadFileUrl && operationState == 'completed')
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 mt-10 sm:py-12">
        {/* Success card */}
        <div className="rounded-2xl border border-slate-200 bg-white px-6 text-center py-4 sm:px-8">
          <div className="text-left">
            <button onClick={handleReset} className="hover:bg-gray-100 py-2 px-3 bg-gray-50 rounded-full flex gap-2 items-center justify-center">
              <MoveLeft size={18}/>Back
            </button>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            {headingText}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Processing complete. Your file is ready to download and will be deleted from our servers
            automatically.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={downloadFileUrl} download>
              <Button variant={'default'} size={'xl'}>
                <Download size={18} />
                {buttonText}
              </Button>
            </a>
            <button onClick={handleReset} className=" p-2 hover:bg-gray-100 rounded-full">
              {' '}
              <Trash2 />{' '}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5"><Shield size={16}/> Secure SSL transfer</span>
            <span className="inline-flex items-center gap-1.5"><Recycle size={16}/> Auto deleted</span>
            <span className="inline-flex items-center gap-1.5"><Gift size={16}/> Free, no sign-up</span>
          </div>
        </div>
        
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
            {filteredTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-base">
                    <tool.icon className={`${tool.textColor}`} strokeWidth={0.7} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                      {tool.name}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {tool.description}
                    </p>
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
  else return null
}

export default DownloadComponent
