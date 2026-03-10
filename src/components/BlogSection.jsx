import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "./BlogCard";

export async function BlogSection({toolName}){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?toolName=${toolName}`)
    const data = await res.json()
    const articles = data.articles
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
            {articles.map((article, i) => (
                <BlogCard key={i} article={article} index={i} />
            ))}
        </div>
    )           
}