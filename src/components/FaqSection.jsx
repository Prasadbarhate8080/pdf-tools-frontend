import React from 'react'
import Faqs from './Faqs'

function FaqSection({heading,text,faqs}) {
  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {heading}
          {/* Merge PDF FAQs */}
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {text}
          {/* Common questions about our PDF merger tool */}
        </p>
      </div>
      <Faqs faqs={faqs} />
    </section>
  )
}

export default FaqSection
