import React from 'react'
import {
  ArrowRight,
  CheckCircle,
  Download,
  Gift,
  GitMerge,
  Infinity as InfinityIcon,
  Lock,
  Shield,
  Sparkles,
  Upload,
  Zap,
} from 'lucide-react'
import FeatureCard from './FeatureCard'
function FeatureCardSection({tool,text="Everything you need to manage your PDF files with confidence",features}) {
  return (
    <section className="bg-muted/30">
      <div className="container py-20">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Features of PDFtoolify - {tool}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
           {text}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} delay={200 + i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureCardSection
