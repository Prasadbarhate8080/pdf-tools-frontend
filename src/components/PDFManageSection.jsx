"use client"
import { motion } from 'framer-motion'
import { ArrowRight, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const PDFManageSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/3 blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            <FolderOpen className="w-4 h-4" />
            All-in-One Platform
          </span>
          <h2 className="section-heading text-foreground">
            Simplify Your PDF Tasks
            <br />
            With <span className="gradient-text">PDFtoolify</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">PDFtoolify is a secure and trusted PDF software. We have all the tools to work on PDF. PDFtoolify is free and easy to use.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-border bg-card p-8 md:p-12 shadow-xl overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-[100px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-tr-[80px]" />

            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Manage All Your PDF Tasks In One Place</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  PDFtoolify brings all essential PDF tools together — merge, split, compress, convert and more. Everything you need to work with PDF documents efficiently and securely.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <a href="#tools">
                    Explore PDF Tools
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>

              {/* Visual illustration */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Merge', color: 'bg-primary/10 border-primary/20' },
                    { label: 'Split', color: 'bg-accent/10 border-accent/20' },
                    { label: 'Compress', color: 'bg-primary/10 border-primary/20' },
                    { label: 'Convert', color: 'bg-accent/10 border-accent/20' },
                    { label: 'Protect', color: 'bg-accent/10 border-accent/20' },
                    { label: 'Extract', color: 'bg-primary/10 border-primary/20' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                      className={`rounded-2xl border ${item.color} p-5 text-center`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 mx-auto mb-2 flex items-center justify-center">
                        <div className="w-5 h-5 rounded bg-primary/30" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
