"use client"
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";

const BlogCard = ({ post, index = 0 }) => {
  return (
    <FadeIn delay={index * 100} className="h-full">
      <Link
        href={`/view_blog/${post.slug}`}
        className="group block h-full rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300"
      >
        <div className="aspect-video relative overflow-hidden bg-muted">
          <Image
            src={post.imageUrl || "/placeholder-blog.jpg"}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {post.description}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            Read more <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </FadeIn>
  );
};

export default BlogCard;
