import React from 'react'

function Faqs({ faqs }) {
  return (
    <ul className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <li
          key={i}
          className="border border-border/50 rounded-xl px-6 bg-card/50 backdrop-blur-sm shadow-sm"
        >
          <h3 className="text-left font-semibold text-foreground py-5 text-lg">{faq.question}</h3>

          <p className="text-muted-foreground leading-relaxed pb-2">{faq.answer}</p>
        </li>
      ))}
    </ul>
  )
}

export default Faqs
