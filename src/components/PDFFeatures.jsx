"use client"
import { motion } from 'framer-motion'
import { Users, Zap, Shield, Globe, Gift, Clock } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'User-Friendly Experience',
    description: 'Designed to be simple and intuitive for everyone. Anyone can easily use this tool and make their work simple.',
  },
  {
    icon: Zap,
    title: 'Fast And Easy to Use',
    description: 'Operate on your PDFs within seconds. Make your PDF tasks fast and easy, and make your work life better.',
  },
  {
    icon: Shield,
    title: 'Secure And Private',
    description: 'We never store your files. Your files are deleted automatically after task completion. Your documents remain safe and private.',
  },
  {
    icon: Globe,
    title: 'Work Anywhere',
    description: 'Use PDFtoolify on any device — desktop, tablet, or mobile. Work comfortably anywhere you want with PDFs.',
  },
  {
    icon: Gift,
    title: 'Free & Affordable',
    description: 'Enjoy our tools for free. We offer all essential PDF tools at no charge so you can get things done easily.',
  },
  {
    icon: Clock,
    title: 'Save Time, Save Work',
    description: 'By using our tools you can quickly complete your tasks. Save your time and focus on what matters most.',
  },
]

export const PDFFeatures = () => {
  return (
    <section id="features" className="py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[120px] translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">Why Us</span>
          <h2 className="section-heading text-foreground">
            Why Choose <span className="gradient-text">PDFtoolify</span>?
          </h2>
          <p className="section-subheading mx-auto mt-4">PDFtoolify is a secure and trusted PDF software with all the tools to work on PDF — free and easy to use.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative p-8 rounded-3xl border border-border/60 bg-card hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
