import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl p-4 mt-32 text-center">
      <h1 className="text-4xl font-bold mb-4">404 — Page Not Found</h1>
      <p className="text-gray-500 mb-8">
        Sorry, the page you are looking for doesnt exist or may have been moved.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/" className="text-blue-600 underline">
          Go to Homepage
        </Link>
        <Link href="/blog" className="text-blue-600 underline">
          Browse Blog
        </Link>
      </div>
    </div>
  )
}