export async function BlogSection({toolName}){
    const res = await fetch(`/api/blogs?toolName=${toolName}`)
    const data = await res.json()
    const articles = data.articles
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
            {articles.map((article, i) => (
                <Link href={`/view_blog/${article.slug}`} key={i}>
                    <article
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
    )           
}