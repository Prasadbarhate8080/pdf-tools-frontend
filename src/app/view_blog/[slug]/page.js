import Image from 'next/image';
import parse from 'html-react-parser';

async function Page({ params }) {
  const { slug } = await params;
  const siteFromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const siteFromVercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  const baseUrl = siteFromEnv || siteFromVercel || "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/get_post_to_view/${slug}`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const data = await response.json();
    const post = data?.post;

    if (!post) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        </div>
      );
    }

    return (
      <div className='max-w-4xl mx-auto px-4 py-16 sm:py-24'>
        <div className='flex flex-col items-center mb-12'>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-8 text-center leading-tight">
            {post.title}
          </h1>
          {post.imageUrl && (
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border/50">
              <Image
                src={post.imageUrl}
                fill
                alt={post.title}
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
        
        <div className="mt-12 bg-card/50 p-8 sm:p-12 rounded-3xl border border-border/50 backdrop-blur-sm shadow-sm text-foreground leading-relaxed">
          <div className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4">
            {parse(post.content || "<p>No content available.</p>")}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-2xl font-bold text-destructive mb-4">Error loading post</h1>
        <p className="text-muted-foreground">Something went wrong while fetching the article. Please try again later.</p>
      </div>
    );
  }
}

export default Page
