"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, MessageCircle } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between min-h-[44px]">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 z-10">
            <div className="w-10 h-10 relative group-hover:scale-105 transition-transform flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Sri Web Squad Logo" 
                fill 
                className="object-contain"
                sizes="40px"
                priority
              />
            </div>
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-tight">
              Sri Web Squad
            </span>
          </Link>

          {/* Center: Perfectly Centered Floating Menu Pill Container */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="flex items-center gap-1 bg-[#090e1c]/90 border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1),0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-xl rounded-full px-4 py-1.5 transition-colors hover:border-white/70">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right: WhatsApp & Contact Buttons & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0 z-10">
            <a 
              href="https://wa.me/917845391712?text=Hi%20Sri%20Web%20Squad,%20I'm%20interested%20in%20your%20services." 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <Link 
              href="#contact" 
              className="hidden sm:inline-flex items-center justify-center rounded-full font-bold text-sm bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 shadow-lg shadow-primary-600/30 hover:scale-105 transition-all duration-200"
            >
              Contact Us
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-slate-700 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
                <a 
                  href="https://wa.me/917845391712?text=Hi%20Sri%20Web%20Squad,%20I'm%20interested%20in%20your%20services." 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
                <Link 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none btn-primary px-6 py-3 text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
