'use client'

export default function Error({ reset }) {
  return (
    <div className="mx-auto max-w-2xl p-4 mt-32 text-center">
      <h1 className="text-3xl font-bold mb-4">Unable to load this post</h1>
      <p className="text-gray-500 mb-6">Something went wrong. Please try again.</p>
      <button onClick={() => reset()} className="text-blue-600 underline">
        Try again
      </button>
    </div>
  )
}