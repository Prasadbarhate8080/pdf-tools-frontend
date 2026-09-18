import { ArrowRight, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const PDFManageSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            <FolderOpen className="w-4 h-4" />
            All-in-One Platform
          </span>
          <h2 className="section-heading text-foreground">
            Simplify Your PDF Tasks
            <br />
            With <span className="gradient-text">PDFtoolify</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            PDFtoolify is a secure and trusted PDF software. We have all the tools to work on PDF.
            PDFtoolify is free and easy to use.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative rounded-3xl border border-border bg-card p-8 md:p-12 shadow-xl overflow-hidden">
          {/* Decorative corner accents */}
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Manage All Your PDF Tasks In One Place
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                PDFtoolify brings all essential PDF tools together — merge, split, compress, convert
                and more. Everything you need to work with PDF documents efficiently and securely.
              </p>
              <Button variant="default" size="lg" asChild>
                <Link href="#tools">
                  Explore PDF Tools
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Visual illustration */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Merge', color: 'bg-primary/10 border-primary/20' },
                { label: 'Split', color: 'bg-accent/10 border-accent/20' },
                { label: 'Compress', color: 'bg-primary/10 border-primary/20' },
                { label: 'Convert', color: 'bg-accent/10 border-accent/20' },
                { label: 'Protect', color: 'bg-accent/10 border-accent/20' },
                { label: 'Extract', color: 'bg-primary/10 border-primary/20' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`rounded-2xl border ${item.color} p-5 text-center`}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 mx-auto mb-2 flex items-center justify-center">
                    <div className="w-5 h-5 rounded bg-primary/30" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
