import Image from 'next/image'
import parse from 'html-react-parser'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import BlogCard from '@/components/BlogCard'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://pdftoolify.com'
const AUTHOR_NAME = 'Prasad Barhate'

function getBaseUrl() {
  const siteFromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  const siteFromVercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''
  return siteFromEnv || siteFromVercel || 'http://localhost:3000'
}

// Returns the post, or null if it does not exist. Throws only on real server errors.
async function getPost(slug) {
  const response = await fetch(`${getBaseUrl()}/api/get_post_to_view/${slug}`, {
    next: { revalidate: 60 },
  })

  if (response.status === 404) return null

  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }

  const data = await response.json()
  return data.post || null
}

async function getRelatedPosts(slug, limit = 3) {
  try {
    const response = await fetch(
      `${getBaseUrl()}/api/get_random_posts?limit=${limit}&exclude=${encodeURIComponent(slug)}`,
      { next: { revalidate: 3600 } }
    )
    if (!response.ok) return []
    const data = await response.json()
    console.log(data)
    console.log("get related blogpost called")
    return data.posts || []
  } catch {
    return []
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params

  let post
  try {
    post = await getPost(slug)
  } catch (error) {
    console.error('Metadata error:', error)
    return {
      title: 'PDFtoolify Blog',
      description: 'Read useful articles, guides, and tips about PDFs and document tools.',
    }
  }

  // outside try/catch, so Next.js can return a real 404
  if (!post) {
    notFound()
  }

  const description =
    post.description ||
    post.excerpt ||
    post.content
      ?.replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160) ||
    'Read the latest PDF and document-related articles on PDFtoolify.'

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/view_blog/${slug}`,
    },

    openGraph: {
      title: post.title,
      description,
      url: `/view_blog/${slug}`,
      siteName: 'PDFtoolify',
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,

      ...(post.imageUrl && {
        images: [
          {
            url: post.imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },

    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,

      ...(post.imageUrl && {
        images: [post.imageUrl],
      }),
    },
  }
}

async function Page({ params }) {
  const { slug } = await params

  // Only the data fetching is inside try/catch
  let post
  let relatedPosts
  try {
    ;[post, relatedPosts] = await Promise.all([getPost(slug), getRelatedPosts(slug, 3)])
  } catch (error) {
    console.error('Blog page error:', error.message)
    throw error // goes to Next's error page (500), not a fake 200 page
  }

  // outside try/catch, so Next.js can return a real 404
  if (!post) {
    notFound()
  }

  const tableOfContent = Array.isArray(post?.tableOfContent)
    ? post.tableOfContent.filter(
        (item) =>
          typeof item?.id === 'string' &&
          item.id.trim() !== '' &&
          typeof item?.text === 'string' &&
          item.text.trim() !== ''
      )
    : []

  const updatedDate = post?.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description || undefined,
    image: post.imageUrl ? [post.imageUrl] : undefined,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: { '@type': 'Person', name: AUTHOR_NAME },
    publisher: { '@type': 'Organization', name: 'PDFtoolify' },
    mainEntityOfPage: `${SITE_URL}/view_blog/${slug}`,
  }

  return (
    <div className="mx-auto relative gap-8 mt-18 max-w-7xl flex ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {post?.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            }),
          }}
        />
      )}

      {/* Table of Contents */}
      {tableOfContent.length > 0 && (
        <aside className="w-72 hidden sticky top-18 lg:block h-fit p-2 border-r">
          <h4 className="text-lg font-semibold">Table of Contents</h4>

          <ol className="pl-1">
            {tableOfContent.map((item, index) => (
              <li key={item.id} className="p-1.5 text-primary">
                <Link href={`#${item.id}`}>
                  {index + 1}. {item.text}
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      )}

      <div className="max-w-4xl p-6 lg:p-2 ">
        {/* Blog Header */}
        <div className="mb-8">
          <h1>{post?.title}</h1>

          <div className="mt-6 flex gap-4">
            <div className="w-12 h-12 rounded-full relative bg-purple-200">
              <Image src={'/profile.png'} fill alt={AUTHOR_NAME} className="rounded-full" />
            </div>
            <div>
              <strong>{AUTHOR_NAME}</strong>
              {updatedDate && <p>Last updated on {updatedDate}</p>}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="flex items-center justify-center">
          {post?.imageUrl && (
            <Image
              src={post.imageUrl}
              width={500}
              height={200}
              alt={post.title || 'Blog post image'}
              className="rounded-lg"
              priority
            />
          )}
        </div>

        {/* Blog Content */}
        <article className="mt-10 prose dark:prose-invert blog-content">
          {parse(post?.content || '')}
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t pt-10">
            <h2 className="text-2xl font-bold mb-6">More from PDFtoolify</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Page