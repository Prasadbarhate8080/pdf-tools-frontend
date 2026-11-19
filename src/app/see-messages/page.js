'use client'

import { useCallback, useEffect, useState } from 'react'

function Page() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const formatDate = (date) => {
    if (!date) return 'Date unavailable'

    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }).format(new Date(date))
  }
  const getMessages = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('/api/get-messages', {
        cache: 'no-store',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch messages')
      }

      console.log(data.messages)
      setMessages(Array.isArray(data.messages) ? data.messages : [])
    } catch (error) {
      console.error(error)
      setError(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getMessages()
  }, [getMessages])

  const getInitial = (name) => {
    return String(name || 'U')
      .charAt(0)
      .toUpperCase()
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 pt-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 text-sm font-medium text-blue-600">ADMIN DASHBOARD</div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Contact Messages</h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage and review messages received from your website.
            </p>
          </div>

          <button
            onClick={getMessages}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={loading ? 'animate-spin' : ''}
            >
              <path d="M20 7v5h-5" />
              <path d="M4 17v-5h5" />
              <path d="M5.6 9a8 8 0 0 1 13.2-2L20 12" />
              <path d="M4 12l1.2 5a8 8 0 0 0 13.2-2" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Message Count */}

        <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm text-slate-500">Total Messages</p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">{messages.length}</h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>
        </div>

        {/* Error State */}

        {error && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">{error}</p>

            <button onClick={getMessages} className="text-sm font-semibold text-red-700 underline">
              Try Again
            </button>
          </div>
        )}

        {/* Loading Skeleton */}

        {loading && messages.length === 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-slate-200" />

                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 rounded bg-slate-200" />
                    <div className="h-3 w-40 rounded bg-slate-100" />
                  </div>
                </div>

                <div className="mb-4 h-4 w-2/3 rounded bg-slate-200" />

                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-slate-100" />
                  <div className="h-3 w-5/6 rounded bg-slate-100" />
                  <div className="h-3 w-4/6 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}

        {!loading && !error && messages.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-slate-800">No messages found</h3>

            <p className="mt-2 text-sm text-slate-500">
              Messages submitted through your contact form will appear here.
            </p>
          </div>
        )}

        {/* Messages Grid */}

        {messages.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {messages.map((message, index) => (
              <article
                key={message._id || `${message.email}-${index}`}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                {/* User Information */}

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                    {getInitial(message.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-slate-900">
                      {message.name || 'Unknown User'}
                    </h3>

                    <a
                      href={`mailto:${message.email}`}
                      className="block truncate text-sm text-blue-600 hover:underline"
                    >
                      {message.email || 'No email provided'}
                    </a>
                  </div>
                </div>

                {/* Subject */}

                <div className="mb-4">
                  <span className="mb-2 inline-block rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    SUBJECT
                  </span>

                  <h4 className="break-words text-base font-semibold text-slate-800">
                    {message.subject || 'No subject'}
                  </h4>
                </div>

                {/* Message Content */}

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Message
                  </p>

                  <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                    {message.message || 'No message content'}
                  </p>
                </div>

                {/* Footer */}


                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  {/* Message Date */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>🕒</span>

                    <time dateTime={message.createdAt || undefined}>
                      {formatDate(message.createdAt)}
                    </time>
                  </div>

                  {/* Reply Button */}
                  {message.email && (
                    <a
                      href={`mailto:${message.email}?subject=${encodeURIComponent(
                        `Re: ${message.subject || 'Your message'}`
                      )}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Reply via Email →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Page
