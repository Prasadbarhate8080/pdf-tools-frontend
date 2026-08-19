/* eslint-disable react/no-unescaped-entities */

import Image from 'next/image';
import parse from 'html-react-parser';

async function getPost(slug) {
  const siteFromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const siteFromVercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

  const baseUrl =
    siteFromEnv || siteFromVercel || "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/get_post_to_view/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  const data = await response.json();

  return data.post;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const post = await getPost(slug);

    if (!post) {
      return {
        title: "Post Not Found | PDFtoolify",
        description: "The requested blog post could not be found.",
      };
    } 

    const description =
      post.description ||
      post.excerpt ||
      post.content
        ?.replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160) ||
      "Read the latest PDF and document-related articles on PDFtoolify.";

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
        siteName: "PDFtoolify",
        type: "article",

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
        card: "summary_large_image",
        title: post.title,
        description,

        ...(post.imageUrl && {
          images: [post.imageUrl],
        }),
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);

    return {
      title: "PDFtoolify Blog",
      description:
        "Read useful articles, guides, and tips about PDFs and document tools.",
    };
  }
}

async function Page({ params }) {
  try {
    const { slug } = await params;

    const post = await getPost(slug);

    // Format updatedAt date
    const updatedDate = post?.updatedAt
      ? new Date(post.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

    return (
      <div className="mx-auto p-4 mt-20 max-w-5xl">

        {/* Blog Header */}
        <div className="mb-8">

          {/* Title */}
          <h1 className="text-4xl font-bold">
            {post?.title}
          </h1>

          {/* Last Updated */}
          {updatedDate && (
            <p className="text-sm text-gray-500 mt-3">
              Last updated: {updatedDate}
            </p>
          )}

        </div>

        {/* Featured Image */}
        <div className="flex items-center justify-center">
          {post?.imageUrl && (
            <Image
              src={post.imageUrl}
              width={1200}
              height={630}
              alt={post.title || "Blog post image"}
              className="rounded-lg"
            />
          )}
        </div>

        {/* Blog Content */}
        <article className="mt-10 prose dark:prose-invert ">
          {parse(post?.content || "<p>Post not found</p>")}
        </article>

      </div>
    );

  } catch (error) {
    console.log(error.message);

    return <h1>Unable to load post</h1>;
  }
}

export default Page;
