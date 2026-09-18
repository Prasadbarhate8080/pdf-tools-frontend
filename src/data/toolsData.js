import { Merge, Split, FileDown, FileUp, Scissors, Lock, Unlock, Droplet, Image, FileText, FilePlus, FileX, Hash, Shield, Layers, ArrowUpRight } from 'lucide-react'
export const tools = [
  {
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one in the order you want with the pdfToolify merge tool.',
    icon: Merge,
    href: '/merge_pdf',
    color: 'from-blue-500/15 to-blue-600/15 border-blue-200',
    textColor:"text-blue-400"
  },
  {
    name: 'Split PDF',
    description: 'Easily split PDF files into multiple PDFs. With a fast, secure, and free PDF splitter.',
    icon: Split,
    href: '/split_pdf',
    color: 'from-violet-500/15 to-violet-600/15 border-violet-200',
    textColor:"text-green-400"
  },
    {
      name: 'Extract PDF',
      description: 'Extract the pages from the pdf instantly. Select and download Pages from your PDf.',
      icon: Scissors,
      href: '/extract-pdf',
      color: 'from-pink-500/15 to-pink-600/15 border-pink-200',
      textColor:"text-green-400"
    },
  {
    name: 'PDF to JPG',
    description: 'Convert the PDF into JPG images. Select the PDF file and convert it into JPG images smoothly.',
    icon: FileDown,
    href: '/pdf-to-jpg',
    color: 'from-orange-500/15 to-orange-600/15 border-orange-200',
    textColor:"text-red-400"
  },
  {
    name: 'Compress PDF',
    description: 'Reduce the size of the PDF securely with better quality.',
    icon: FileDown,
    href: '/compress_pdf',
    color: 'from-emerald-500/15 to-emerald-600/15 border-emerald-200',
    textColor:"text-blue-400"
  },
  {
    name: 'Create PDF',
    description: 'Create PDF from images in seconds. Convert JPG and PNG format images into PDF.',
    icon: FilePlus,
    href: '/create-pdf',
    color: 'from-teal-500/15 to-teal-600/15 border-teal-200',
    textColor:"text-red-400"
  },
  {
    name: 'Protect PDF',
    description: 'Protect the PDF with a password online and keep your PDF files safe and secure.',
    icon: Lock,
    href: '/protect_pdf',
    color: 'from-red-500/15 to-red-600/15 border-red-200',
    textColor:"text-blue-400"
  },
  {
    name: 'Remove PDF Pages',
    description: 'Remove pages from the PDF online easily. Delete unwanted pages and keep the pages that you need.',
    icon: FileX,
    href: '/remove_pdf_pages',
    color: 'from-slate-500/15 to-slate-600/15 border-slate-200',
    textColor:"text-green-400"
  },
  {
    name: 'Unlock PDF',
    description: 'Unlock password-protected PDF files online. Remove PDF password securely and quickly with this free and easy-to-use PDF unlock tool.',
    icon: Unlock,
    href: '/unlock_pdf',
    color: 'from-cyan-500/15 to-cyan-600/15 border-cyan-200',
    textColor:"text-red-400"
  },
  {
    name: 'Word to PDF',
    description: 'Convert Word files to PDF online quickly and easily. Turn DOC or DOCX documents into high-quality PDF files.',
    icon: FileText,
    href: '/word_to_pdf',
    color: 'from-indigo-500/15 to-indigo-600/15 border-indigo-200',
    textColor:"text-red-400"
  },
  {
    name: 'PDF to PDFA',
    description: 'Convert PDF files to PDF/A format online. Ensure long-term document archiving with this fast, secure, and free PDF to PDF/A converter.',
    icon: Shield,
    href: '/pdf-to-pdfa',
    color: 'from-sky-500/15 to-sky-600/15 border-sky-200',
    textColor:"text-blue-400"
  },
  {
    name: 'Add Watermark',
    description: 'Add watermark to PDF files online easily.Insert text watermark to protect your documents with this fast, secure, and free PDF watermark tool.',
    icon: Droplet,
    href: '/add_watermark',
    color: 'from-blue-500/15 to-cyan-500/15 border-blue-200',
    textColor:"text-red-400"
  },
  {
    name: 'Add Page Number',
    description: 'Add page numbers to PDF files online easily.Insert and customize page numbering in your PDF documents with this fast, secure, and free tool.',
    icon: Hash,
    href: '/add_page_no',
    color: 'from-purple-500/15 to-purple-600/15 border-purple-200',
    textColor:"text-green-400"
  },
  {
    name: 'Add Pages to PDF',
    description: 'Add new pages to PDF files online easily. Insert blank or custom pages into your PDF document.',
    icon: FilePlus,
    href: '/add_pages_to_pdf',
    color: 'from-green-500/15 to-green-600/15 border-green-200',
    textColor:"text-green-400"
  },
  {
    name: 'Add PDF in PDF',
    description: 'Insert PDF pages into an existing PDF file online. Merge and add one PDF into another at any position with this free tool.',
    icon: Layers,
    href: '/add-pdf-in-pdf',
    color: 'from-fuchsia-500/15 to-fuchsia-600/15 border-fuchsia-200',
    textColor:"text-blue-400"
  },
]