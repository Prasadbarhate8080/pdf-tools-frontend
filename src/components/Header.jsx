'use client'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import HeaderToolsSection from './HeaderToolsSection'
import { useSelector } from 'react-redux'
import { tools } from '@/components/HomePageToolsSection'
import Link from 'next/link'
import ToolName from './ToolName'
const navItems = [
  { name: 'Home', href: '/' },
  {
    name: 'Merge PDF',
    href: '/merge_pdf',
  },
  {
    name: 'Split PDF',
    href: '/split_pdf',
  },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Tools', href: '#' },
]
const navMobileMenuItems = [
  { name: 'Home', href: '/' },
  {
    name: 'Merge PDF',
    href: '/merge_pdf',
  },
  {
    name: 'Split PDF',
    href: '/split_pdf',
  },
  { name: 'Blogs', href: '/blogs' },
]

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isToolsHovered, setIsToolsHovered] = useState(false)
  const [mobileMoreTools, setMobileMoreTools] = useState(false)
  useEffect(() => {
    if (!isMobileMenuOpen) setMobileMoreTools(false)
  }, [isMobileMenuOpen])
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const blurHeader = useSelector((state) => state.blurHeader.blurHeader)
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen || blurHeader
          ? 'bg-background/80 backdrop-blur-xl  border-b border-border/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`flex items-center justify-between ${blurHeader ? 'h-10 md:h-12' : 'h-12 md:h-14'}`}
        >
          {/* Logo of pdftoolify*/}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className=" rounded-lg flex items-center justify-center  shadow-md group-hover:shadow-lg transition-shadow">
              <Image src={'/PDFtoolify_logo.svg'} alt="pdftoolify.com" height={40} width={40} />
            </div>
            <span className="text-xl font-bold text-foreground">
              PDF<span className="text-primary">toolify</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.name === 'Tools') {
                return (
                  <div
                    key={item.name}
                    className="relative group h-full flex items-center"
                    onMouseEnter={() => setIsToolsHovered(true)}
                    onMouseLeave={() => setIsToolsHovered(false)}
                  >
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-all duration-200 flex items-center gap-1"
                    >
                      {item.name}{' '}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isToolsHovered ? 'rotate-180' : ''}`}
                      />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {isToolsHovered && (
                      <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-4 w-max">
                        <HeaderToolsSection
                          setIsActiveTools={setIsToolsHovered}
                          setIsActiveHamBurger={setIsMobileMenuOpen}
                        />
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-all duration-200"
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="default" asChild>
              <a href="/#tools">Explore All Tools</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu (kept in DOM for smooth transitions) */}
        <div
          className="md:hidden border-t border-border/50 overflow-auto"
          aria-hidden={!isMobileMenuOpen}
          style={{
            maxHeight: isMobileMenuOpen ? '100vh' : '0px',
            transition: 'max-height 300ms ease, padding 200ms ease, opacity 200ms ease',
            paddingTop: isMobileMenuOpen ? '1rem' : '0px',
            paddingBottom: isMobileMenuOpen ? '1rem' : '0px',
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
        >
          <div className="px-0">
            <div className="flex flex-col gap-1">
              {!mobileMoreTools &&
                navMobileMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              <div className="pt-3 px-4">
                <Button
                  variant={`${mobileMoreTools ? 'outline' : 'hero'}`}
                  size={`${mobileMoreTools ? 'sm' : 'lg'}`}
                  className={`w-full`}
                  onClick={() => setMobileMoreTools((prev) => !prev)}
                >
                  {mobileMoreTools ? 'Close' : 'Explore All Tools'}
                </Button>
              </div>
            </div>

            {/* More tools panel - animated via maxHeight */}
            <div
              className="px-4 mt-3 overflow-auto"
              style={{
                maxHeight: mobileMoreTools ? '60vh' : '0px',
                transition: 'max-height 300ms ease, opacity 200ms ease',
                opacity: mobileMoreTools ? 1 : 0,
              }}
            >
              <ul className="flex flex-col gap-1 h-full overflow-auto">
                {tools.map((tool) => {
                  return (
                    <ToolName
                      href={tool.href}
                      title={tool.name}
                      Icon={tool.icon}
                      setIsActiveHamBurger={setIsMobileMenuOpen}
                      setIsActiveTools={setIsToolsHovered}
                      key={tool.href || tool.name}
                    />
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
