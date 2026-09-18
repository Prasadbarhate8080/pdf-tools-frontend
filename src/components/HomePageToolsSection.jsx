import Link from 'next/link'
import { tools } from '@/data/toolsData.js'
import { ArrowUpRight } from 'lucide-react'

export const HomePageToolsSection = () => {
  return (
    <section id="tools" className="py-28 relative container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
          All Tools
        </span>
        <h2 className="section-heading text-foreground">
          PDFtoolify <span className="gradient-text">Free Online Tools</span>
        </h2>
        <p className="section-subheading mx-auto mt-4">
          Tools you need to work with PDFs in one place. PDFtoolify offers dozens of tools to help
          you complete simple and quick PDF tasks directly in your web browser.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link href={tool.href} rel="noopener noreferrer" key={tool.name}>
            <div
              className={`group h-full relative flex items-start gap-4 p-5 rounded-2xl border bg-gradient-to-br ${tool.color} cursor-pointer`}
            >
              <div className="w-12 h-12 rounded-xl bg-card shadow-sm flex items-center justify-center shrink-0 ">
                <tool.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <strong className="font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors flex items-center gap-1">
                  {tool.name}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </strong>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
