import React from 'react'

function Faqs({ faqs }) {
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-border/50 rounded-xl px-6 bg-card/50 backdrop-blur-sm shadow-sm"
        >
          <h3 className="text-left font-semibold text-foreground py-5 text-lg">{faq.question}</h3>

          <div className="text-muted-foreground leading-relaxed pb-5">{faq.answer}</div>
        </div>
      ))}
    </div>
  )
}

export default Faqs
