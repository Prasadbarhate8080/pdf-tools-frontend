import { ArrowRight } from "lucide-react";
import Link from "next/link";

async function Post() {

    const response = await fetch("https://pdftoolify.com/api/get_posts");
    const data = await response.json();
    const articles = data.posts;
    console.log(data)
    if (!articles || articles.length === 0)
        return <div className="text-center text-foreground text-2xl font-bold">No posts found</div>

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mt-14">
            {articles.map((article, i) => (
                <Link href={`/view_blog/${article.slug}`} key={i}>
                    <article
                        key={i}
                        className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 opacity-0 animate-fade-in"
                        style={{ animationDelay: `${200 + i * 120}ms` }}
                    >
                        <div className="aspect-video overflow-hidden bg-muted">
                            <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                {article.description}
                            </p>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                                Read more <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </article>
                </Link>
            ))}
        </div>
    );
}

export { Post };