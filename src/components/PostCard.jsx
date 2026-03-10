"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function PostCard({
  title, description, imageUrl, index = 0
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (200 + index * 120) / 1000 }}
      className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full"
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          Read more <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </motion.article>
  );
}

export default PostCard;
