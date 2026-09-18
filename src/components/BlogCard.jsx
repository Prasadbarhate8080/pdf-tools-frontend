'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const BlogCard = ({ post}) => {
  return (
    <Link
      href={`/view_blog/${post.slug}`}
      className="group block h-full rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30"
    >
      <div className="aspect-video relative bg-muted">
        <Image
          src={post.imageUrl || '/placeholder-blog.jpg'}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {post.description}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
          Read more <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}

export default BlogCard
