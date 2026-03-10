
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";

function PostCard({
  title, description, slug, imageUrl, index = 0
}) {
  return (
    <FadeIn delay={200 + index * 120}>
      <Link href={`/view_blog/${slug}`}>
        <article className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300">
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {description}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
              Read more <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </article>
      </Link>
    </FadeIn>
  );
}

export default PostCard;
