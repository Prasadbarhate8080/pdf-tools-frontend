import { FileText, Twitter, Linkedin, Youtube } from 'lucide-react'
import Image from 'next/image'

const footerLinks = {
  tools: [
    { name: 'Merge PDF', href: 'https://www.pdftoolify.com/merge_pdf' },
    { name: 'Split PDF', href: 'https://www.pdftoolify.com/split_pdf' },
    { name: 'Compress PDF', href: 'https://www.pdftoolify.com/compress_pdf' },
    { name: 'JPG to PDF', href: 'https://www.pdftoolify.com/jpg_to_pdf' },
    { name: 'PDF to JPG', href: 'https://www.pdftoolify.com/pdf_to_jpg' },
    { name: 'Word to PDF', href: 'https://www.pdftoolify.com/word_to_pdf' },
  ],
  moreTools: [
    { name: 'Protect PDF', href: 'https://www.pdftoolify.com/protect_pdf' },
    { name: 'Unlock PDF', href: 'https://www.pdftoolify.com/unlock_pdf' },
    { name: 'Add Watermark', href: 'https://www.pdftoolify.com/add_watermark' },
    { name: 'Extract PDF', href: 'https://www.pdftoolify.com/extract_pdf' },
    { name: 'Create PDF', href: 'https://www.pdftoolify.com/create_pdf' },
    { name: 'PNG to PDF', href: 'https://www.pdftoolify.com/png_to_pdf' },
  ],
  resources: [
    { name: 'Blogs', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 mt-10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className=" rounded-lg flex items-center justify-center "><Image  src={"/pdftoolify_logo.svg"} alt='pdftoolify.com' height={36} width={36}/></div>
              <span className="text-xl font-bold text-foreground">
                PDF<span className="text-primary">toolify</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">All the PDF tools you need in one place. Manage your documents smarter and faster with PDFtoolify.</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2.5">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">More Tools</h4>
            <ul className="space-y-2.5">
              {footerLinks.moreTools.map((link) => (
                <li key={link.name}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} PDFtoolify. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Work Smarter with Easy PDF Tools ✨</p>
        </div>
      </div>
    </footer>
  )
}
