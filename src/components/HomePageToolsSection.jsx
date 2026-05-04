"use client"
import { motion } from 'framer-motion'
import { Merge, Split, FileDown, FileUp, Scissors, Lock, Unlock, Droplet, Image, FileText, FilePlus, FileX, Hash, Shield, Layers, ArrowUpRight } from 'lucide-react'
const tools = [
  {
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one in the order you want with the pdfToolify merge tool.',
    icon: Merge,
    href: '/merge_pdf',
    color: 'from-blue-500/15 to-blue-600/15 border-blue-200',
  },
  {
    name: 'Split PDF',
    description: 'Easily split PDF files into multiple PDFs. With a fast, secure, and free PDF splitter.',
    icon: Split,
    href: '/split_pdf',
    color: 'from-violet-500/15 to-violet-600/15 border-violet-200',
  },
    {
      name: 'Extract PDF',
      description: 'Extract the pages from the pdf instantly. Select and download Pages from your PDf.',
      icon: Scissors,
      href: '/extract_pdf',
      color: 'from-pink-500/15 to-pink-600/15 border-pink-200',
    },
  {
    name: 'JPG to PDF',
    description: 'Convert the JPG images into PDF. Easily select the JPG images and convert them into PDF fast.',
    icon: Image,
    href: '/jpg_to_pdf',
    color: 'from-amber-500/15 to-amber-600/15 border-amber-200',
  },
  {
    name: 'PDF to JPG',
    description: 'Convert the PDF into JPG images. Select the PDF file and convert it into JPG images smoothly.',
    icon: FileDown,
    href: '/pdf_to_jpg',
    color: 'from-orange-500/15 to-orange-600/15 border-orange-200',
  },
  {
    name: 'Compress PDF',
    description: 'Reduce the size of the PDF securely with better quality.',
    icon: FileDown,
    href: '/compress_pdf',
    color: 'from-emerald-500/15 to-emerald-600/15 border-emerald-200',
  },
  {
    name: 'Create PDF',
    description: 'Create PDF from images in seconds. Convert JPG and PNG format images into PDF.',
    icon: FilePlus,
    href: '/create_pdf',
    color: 'from-teal-500/15 to-teal-600/15 border-teal-200',
  },
  {
    name: 'Protect PDF',
    description: 'Protect the PDF with a password online and keep your PDF files safe and secure.',
    icon: Lock,
    href: '/protect_pdf',
    color: 'from-red-500/15 to-red-600/15 border-red-200',
  },
  {
    name: 'Remove PDF Pages',
    description: 'Remove pages from the PDF online easily. Delete unwanted pages and keep the pages that you need.',
    icon: FileX,
    href: '/remove_pdf_pages',
    color: 'from-slate-500/15 to-slate-600/15 border-slate-200',
  },
  {
    name: 'PNG to PDF',
    description: 'Create PDFs from PNG images online. Convert multiple PNG images into a high-quality PDF quickly.',
    icon: FileUp,
    href: '/png_to_pdf',
    color: 'from-lime-500/15 to-lime-600/15 border-lime-200',
  },
  {
    name: 'Unlock PDF',
    description: 'Unlock password-protected PDF files online. Remove PDF password securely and quickly with this free and easy-to-use PDF unlock tool.',
    icon: Unlock,
    href: '/unlock_pdf',
    color: 'from-cyan-500/15 to-cyan-600/15 border-cyan-200',
  },
  {
    name: 'Word to PDF',
    description: 'Convert Word files to PDF online quickly and easily. Turn DOC or DOCX documents into high-quality PDF files with this fast, secure, and free Word to PDF converter.',
    icon: FileText,
    href: '/word_to_pdf',
    color: 'from-indigo-500/15 to-indigo-600/15 border-indigo-200',
  },
  {
    name: 'PDF to PDFA',
    description: 'Convert PDF files to PDF/A format online. Ensure long-term document archiving with this fast, secure, and free PDF to PDF/A converter.',
    icon: Shield,
    href: '/pdf_to_pdfa',
    color: 'from-sky-500/15 to-sky-600/15 border-sky-200',
  },
  {
    name: 'Add Watermark',
    description: 'Add watermark to PDF files online easily.Insert text watermark to protect your documents with this fast, secure, and free PDF watermark tool.',
    icon: Droplet,
    href: '/add_watermark',
    color: 'from-blue-500/15 to-cyan-500/15 border-blue-200',
  },
  {
    name: 'Add Page Number',
    description: 'Add page numbers to PDF files online easily.Insert and customize page numbering in your PDF documents with this fast, secure, and free tool.',
    icon: Hash,
    href: '/add_page_no',
    color: 'from-purple-500/15 to-purple-600/15 border-purple-200',
  },
  {
    name: 'Add Pages to PDF',
    description: 'Add new pages to PDF files online easily. Insert blank or custom pages into your PDF document.',
    icon: FilePlus,
    href: '/add_pages_to_pdf',
    color: 'from-green-500/15 to-green-600/15 border-green-200',
  },
  {
    name: 'Add PDF in PDF',
    description: 'Insert PDF pages into an existing PDF file online. Merge and add one PDF into another at any position with this free tool.',
    icon: Layers,
    href: '/add_pdf_in_pdf',
    color: 'from-fuchsia-500/15 to-fuchsia-600/15 border-fuchsia-200',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
}

export const HomePageToolsSection = () => {
  return (
    <section id="tools" className="py-28 relative">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">All Tools</span>
          <h2 className="section-heading text-foreground">
            PDFtoolify <span className="gradient-text">Free Online Tools</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Tools you need to work with PDFs in one place. PDFtoolify offers dozens of tools to help you complete simple and quick PDF tasks directly in your web browser.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <motion.a
              key={tool.name}
              variants={itemVariants}
              href={tool.href}
              rel="noopener noreferrer"
              className={`group relative flex items-start gap-4 p-5 rounded-2xl border bg-gradient-to-br ${tool.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer`}
            >
              <div className="w-12 h-12 rounded-xl bg-card shadow-sm flex items-center justify-center shrink-0 group-hover:shadow-md transition-shadow">
                <tool.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors flex items-center gap-1">
                  {tool.name}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
