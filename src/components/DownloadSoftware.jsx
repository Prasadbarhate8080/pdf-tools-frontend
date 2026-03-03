"use client"
import { motion } from 'framer-motion'
import { Monitor, Smartphone, Download, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const platforms = [
  {
    icon: Monitor,
    name: 'Windows',
    description: 'Download PDFtoolify for Windows and simplify your PDF tasks. Use add PDF pages and more PDF related features for free.',
    href: 'https://www.pdftoolify.com/download_page/windows',
    cta: 'Download Now',
  },
  {
    icon: Smartphone,
    name: 'Android',
    description: 'Download PDFtoolify app free for Android. Use read, merge, split and more PDF related features for free.',
    href: '#',
    cta: 'Coming Soon',
  },
]

export const DownloadSoftware = () => {
  return (
    <section className="py-28 relative overflow-hidden bg-card/30">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-15" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h2 className="section-heading text-foreground">
            Handle PDF <span className="gradient-text">Anywhere</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">Use PDFtoolify on your favorite platform. Available for Windows and Android.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-3xl border border-border bg-card p-8 md:p-10 transition-all duration-500 hover:border-primary/40 hover:shadow-xl"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors duration-300">
                  <platform.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{platform.name}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{platform.description}</p>
                <Button variant="hero" size="lg" asChild>
                  <a href={platform.href} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    {platform.cta}
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
