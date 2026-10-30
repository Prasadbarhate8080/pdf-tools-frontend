import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

function FailedState({ onRetry }) {
  return (
    <div className="mt-24 flex justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-zinc-900 p-8 text-center shadow-sm">

        {/* Error Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40">
          <AlertTriangle
            size={32}
            className="text-red-500"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Conversion Failed
        </h2>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground mb-6">
          Something went wrong while processing your file.
          Please try again. If the problem continues, try uploading
          another PDF file.
        </p>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          <RefreshCw size={16} />
          Try Again
        </button>

        <p className="mt-5 text-xs text-muted-foreground">
          Your file could not be processed. Please try again later.
        </p>

      </div>
    </div>
  )
}

export default FailedState