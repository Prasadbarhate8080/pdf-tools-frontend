import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const stats = [
  { value: '17+', label: 'PDF Tools' },
  { value: '100%', label: 'Free to Use' },
  { value: 'Safe', label: '& Private' },
]
export const HeroSection = () => {
  return (
    <section
      className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Free Online PDF Tools</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] text-foreground tracking-tight">
              Work Smarter with Easy <span className="gradient-text">PDF Tools.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              All the PDF tools you need in one place. Manage your documents smarter and faster.
            </p>

            {/* Features list */}
            <ul className="flex flex-col sm:flex-row gap-4 mb-10">
              {['No sign-up required', '100% Secure', 'Always free'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div
              className="flex flex-wrap gap-4"
            >
              <Button variant="default" size="xl" asChild>
                <Link href="#tools">
                  Explore All PDF Tools
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link href="#features">Why PDFtoolify?</Link>
              </Button>
            </div>
          </div>

          {/* Right - Hero illustration */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-full max-w-lg">
              
              <div className="relative z-10 w-72 h-[340px] mx-auto rounded-3xl bg-card border border-border shadow-2xl p-6 overflow-hidden">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-[10px] font-bold">PDF</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">PDFtoolify</div>
                    <div className="text-xs text-muted-foreground">Document ready</div>
                  </div>
                </div>
                <div className="space-y-2.5 mb-5">
                  <div className="w-full h-3 rounded-full bg-primary/15" />
                  <div className="w-4/5 h-3 rounded-full bg-primary/10" />
                  <div className="w-full h-2.5 rounded-full bg-muted" />
                  <div className="w-full h-2.5 rounded-full bg-muted" />
                  <div className="w-3/5 h-2.5 rounded-full bg-muted" />
                </div>
                <div className="w-full h-24 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 mx-auto mb-2 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs text-primary font-medium">Processed</span>
                  </div>
                </div>
              </div>

              <div className="absolute -left-8 top-12 w-44 h-52 rounded-2xl bg-card border border-border shadow-lg p-4 opacity-80">
                <div className="w-full h-3 rounded bg-accent/20 mb-2" />
                <div className="w-3/4 h-3 rounded bg-accent/15 mb-3" />
                <div className="space-y-1.5">
                  <div className="w-full h-2 rounded bg-muted" />
                  <div className="w-full h-2 rounded bg-muted" />
                  <div className="w-2/3 h-2 rounded bg-muted" />
                </div>
              </div>

              <div className="absolute -right-6 bottom-4 w-40 h-48 rounded-2xl bg-card border border-border shadow-lg p-4 opacity-80">
                <div className="w-full h-3 rounded bg-primary/20 mb-2" />
                <div className="w-2/3 h-3 rounded bg-primary/15 mb-3" />
                <div className="space-y-1.5">
                  <div className="w-full h-2 rounded bg-muted" />
                  <div className="w-full h-2 rounded bg-muted" />
                  <div className="w-1/2 h-2 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-3 max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-4 ${i < 2 ? 'border-r border-border' : ''}`}
            >
              <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <span className="text-sm text-muted-foreground mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
