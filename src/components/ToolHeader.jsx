import React from 'react'
import FadeIn from './FadeIn'
import { Sparkles } from 'lucide-react'

function ToolHeader({sparklesText,headings,text}) {
  return (
    <section className="relative pt-16 pb-6 " style={{ background: 'var(--gradient-hero)' }}>
          <div
            className="absolute top-0 left-0 right-0 -bottom-96 pointer-events-none"
            style={{ background: 'var(--gradient-glow)' }}
          />
          <div className="container pt-16  text-center">
            <FadeIn className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              {sparklesText}
            </FadeIn>
            <h1 className="section-heading text-center">
              {headings[0]} <span className="gradient-text">{headings[1]}</span> {headings[2]}
            </h1>
            <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              {text}
            </p>
          </div>
        </section>
  )
}

export default ToolHeader
