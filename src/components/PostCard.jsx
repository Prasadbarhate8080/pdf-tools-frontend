
function PostCard({
  $id, title, description, $createdAt, date, heading, src
}) {

  return (
    articles.map((article, i) => (
    <article
      key={i}
      className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 opacity-0 animate-fade-in"
      style={{ animationDelay: `${200 + i * 120}ms` }}
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={article.image}
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
  ))
  )
}

export default PostCard
