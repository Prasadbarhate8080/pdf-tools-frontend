/* eslint-disable react/no-unescaped-entities */

import Image from 'next/image'
import parse from 'html-react-parser'
import { notFound } from 'next/navigation'
import Link from 'next/link'

async function getPost(slug) {
  const siteFromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  const siteFromVercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''

  const baseUrl = siteFromEnv || siteFromVercel || 'http://localhost:3000'

  const response = await fetch(`${baseUrl}/api/get_post_to_view/${slug}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }
  const data = await response.json()
  return data.post
}

export async function generateMetadata({ params }) {
  const { slug } = await params

  try {
    const post = await getPost(slug)
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
  } catch (error) {
    console.error('Metadata error:', error)

    return {
      title: 'PDFtoolify Blog',
      description: 'Read useful articles, guides, and tips about PDFs and document tools.',
    }
  }
}



async function Page({ params }) {
  try {
    const { slug } = await params

    const post = await getPost(slug)

    if (!post) {
      notFound()
    }
    // Format updatedAt date
    const updatedDate = post?.updatedAt
      ? new Date(post.updatedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null

    return (
      <div className="mx-auto relative gap-8 mt-18 max-w-7xl flex ">
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
        <div className={` ${post.faqs ? "w-72" : ""} hidden sticky top-18 lg:block h-[500px]  p-2`}>
          {  post.faqs && <>
              <h4 className="text-lg">Table of Contents</h4>
              <ol className='pl-1'>
                { post.faqs.map((faq,index) => {
                  return (
                    <li key={index} className='p-1.5 text-primary'>
                      <Link href={'#' + faq.id}>{index+1 + ".  "  + faq.text}</Link>
                    </li>
                  )
                })}
              </ol>
            </>
          }
        </div>
        <div className="max-w-4xl p-6 lg:p-2 ">
          {/* Blog Header */}
          <div className="mb-8">
            {/* Title */}
            <h1 className="">{post?.title}</h1>

            <div className="mt-6 flex gap-4">
              <div className="w-12 h-12 rounded-full relative bg-purple-200">
                <Image
                  src={'/profile.png'}
                  fill
                  alt={"author"}
                  className="rounded-full"
                />
              </div>
              <div>
                <strong>Prasad Barhate</strong>
                <p>Last updated on {updatedDate}</p>
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
              />
            )}
          </div>

          {/* Blog Content */}
          <article className="mt-10 prose dark:prose-invert ">
            {parse(post?.content || '<p>Post not found</p>')}
          </article>
        </div>
      </div>
    )
  } catch (error) {
    console.log(error.message)

    return <h1>Unable to load post</h1>
  }
}

export default Page
