import React from 'react'
import Faqs from './Faqs'

function FaqSection({heading,text,faqs,headingClass}) {
  return (
    <section className="container py-12">
        <h2 className={`text-2xl text-center md:text-3xl lg:text-4xl font-bold text-foreground mb-4 ${headingClass}`}>
            {heading}
        </h2>
        <p className="text-muted-foreground text-center max-w-lg mb-12 mx-auto">
          {text}
        </p>
      <Faqs faqs={faqs} />
    </section>
  )
}

export default FaqSection
