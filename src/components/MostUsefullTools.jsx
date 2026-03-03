"use client"
import { motion } from "framer-motion";
import { FileText, PenTool, FileDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    icon: FileText,
    title: "Create a Perfect PDF Document",
    description: "Create PDF from JPG, PNG images and also manage your PDF document safely. Convert your images into professional PDF documents in seconds.",
    cta: "Create a PDF Document",
    href: "https://www.pdftoolify.com/jpg_to_pdf",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    icon: PenTool,
    title: "Add Pages in Existing PDF Document",
    description: "You can add pages in existing PDF document. And also remove pages from PDF — simple and easy to use tool for everyone.",
    cta: "Add Pages to PDF",
    href: "https://www.pdftoolify.com/add_pages_to_pdf",
    accent: "from-violet-500 to-purple-500",
  },
  {
    icon: FileDown,
    title: "Compress PDF Files",
    description: "Minimize the size of the PDF without losing quality. Use PDFtoolify compress tool to decrease the size of your PDF documents.",
    cta: "Compress PDF File",
    href: "https://www.pdftoolify.com/compress_pdf",
    accent: "from-emerald-500 to-teal-500",
  },
];

export const MostUsefullTools = () => {
  return (
    <section id="how-it-works" className="py-28 relative bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            Featured
          </span>
          <h2 className="section-heading text-foreground">
            Most Useful Tools by <span className="gradient-text">PDFtoolify</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Simplify your PDF tasks with our most popular tools. Quick, easy, and reliable.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-20">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Visual */}
              <div className="flex-shrink-0 w-full md:w-[320px]">
                <div className="relative">
                  {/* Background glow */}
                  <div className={`absolute inset-4 rounded-3xl bg-gradient-to-br ${item.accent} opacity-10 blur-2xl`} />
                  <div className="relative rounded-3xl bg-card border border-border p-8 shadow-lg">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center mb-6 shadow-lg`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    {/* Mock document lines */}
                    <div className="space-y-2.5">
                      <div className="w-full h-2.5 rounded-full bg-muted" />
                      <div className="w-full h-2.5 rounded-full bg-muted" />
                      <div className="w-4/5 h-2.5 rounded-full bg-muted" />
                      <div className="w-full h-2.5 rounded-full bg-muted" />
                      <div className="w-3/5 h-2.5 rounded-full bg-muted" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {item.description}
                </p>
                <Button variant="hero" size="lg" asChild>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};