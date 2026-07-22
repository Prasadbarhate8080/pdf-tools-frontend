import React from 'react'
import FadeIn from './FadeIn'

function HowToSection({heading,text,steps}) {
  return (
    <section className="container py-20">
      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
          {heading}
          {/* How to merge PDFs online for free? */}
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
            {text}
          {/* Combine your PDF documents in three simple steps */}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((item, i) => (
          <FadeIn
            key={i}
            delay={200 + i * 150}
            className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
              {item.step}
            </div>
            <div className="w-16 h-16 rounded-2xl feature-icon-gradient flex items-center justify-center mb-5 mt-2">
              <item.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

export default HowToSection
