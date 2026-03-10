/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import parse from 'html-react-parser';

async function Page({ params }) {
  const siteFromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const siteFromVercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  const baseUrl = siteFromEnv || siteFromVercel || "http://localhost:3000";

  try {
    const { slug } = await params;
    console.log(slug)
    let response = await fetch(`${baseUrl}/api/get_post_to_view/${slug}`)
    let data = await response.json();
    let post = data.post;
    return (
      <div className='w-6xl mx-auto p-4 mt-20'>
        <div className='flex items-center justify-center'>
          {post && <Image
            src={post.imageUrl}
            width={250}
            height={250}
            alt={"alt"}
          />
          }
        </div>
        <div className='w-fit mx-auto mt-10'>
          {
            parse(post.content ? post.content : "<h1>Loading...</h1>")
          }
        </div>
      </div>
    )
  } catch (error) {
    console.log(error.message)
  }
}

export default Page
