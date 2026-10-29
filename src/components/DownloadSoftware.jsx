import { Monitor, Smartphone, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const platforms = [
  {
    icon: Monitor,
    name: 'Windows',
    description:
      'Download PDFtoolify for Windows and simplify your PDF tasks. Use add PDF pages and more PDF related features for free.',
    href: '/download_page/windows',
    cta: 'Download Now',
  },
  {
    icon: Smartphone,
    name: 'Android',
    description:
      'Download PDFtoolify app free for Android. Use read, merge, split and more PDF related features for free.',
    href: '/download_page/android',
    cta: 'Download Now',
  },
]

export const DownloadSoftware = () => {
  return (
    <section className="py-28 overflow-hidden bg-card/30 container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="section-heading text-foreground">
          Handle PDF <span className="gradient-text">Anywhere</span>
        </h2>
        <p className="section-subheading mx-auto mt-4">
          Use PDFtoolify on your favorite platform. Available for Windows and Android.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {platforms.map((platform, index) => (
          <div
            key={platform.name}
            className="rounded-3xl border border-border bg-card p-8 md:p-10 hover:border-primary/40"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <platform.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">{platform.name}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">{platform.description}</p>
            <Button variant="default" size="lg" asChild>
              <Link href={platform.href} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                {platform.cta}
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
