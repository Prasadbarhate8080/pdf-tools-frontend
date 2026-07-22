import React from 'react'
import FadeIn from './FadeIn'
import { CheckCircle } from 'lucide-react'

function BenefitsSection({heading,benefits}) {
  return (
    <section className="container py-20">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
        {heading}
      </h2>
      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {benefits.map((benefit, i) => (
          <FadeIn
            key={i}
            delay={400 + i * 80}
            className="flex items-start gap-3 p-4 rounded-xl hover:bg-card border border-transparent hover:border-border/50 transition-all duration-200"
          >
            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{benefit}</span>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

export default BenefitsSection
