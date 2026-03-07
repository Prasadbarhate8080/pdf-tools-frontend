import Image from 'next/image';
import parse from 'html-react-parser';

async function Page({ params }) {
  try {
    const { slug } = await params;
    let response = await fetch(`https://pdftoolify.com/api/get_post_to_view/${slug}`)
    let data = await response.json();
    let post = data.post;
    return (
      <div className='w-6xl mx-auto p-4 mt-10'>
        <div className='flex items-center justify-center'>
          {post && <Image
            src={"/close.png"}
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
