import BlogCard from "@/components/BlogCard";

async function Posts({ toolName }) {
    const siteFromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const siteFromVercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
    const baseUrl = siteFromEnv || siteFromVercel || "http://localhost:3000";

    let articles = [];
    try {
        let response;
        if (!toolName) {
            response = await fetch(`${baseUrl}/api/get_posts`);
        }
        else{
            response = await fetch(`${baseUrl}/api/get_tool_posts/?toolName=${toolName}`);
        }
        if (!response.ok) {
            console.error("Failed to fetch posts:", response.statusText);
        } else {
            const data = await response.json();
            articles = data?.posts || [];
        }
        console.log(articles)
    } catch (error) {
        console.error("Error fetching posts:", error);
    }

    if (!articles || articles.length === 0)
        return <div className="text-center text-foreground text-2xl font-bold py-10">No posts found</div>

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mt-14">
            {articles.map((article, i) => (
                <BlogCard key={i} article={article} index={i} />
            ))}
        </div>
    );
}

export { Posts };