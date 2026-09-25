"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, MessageCircle } from "lucide-react"
import Image from "next/image"
import logoImg from "@/app/icon.png"
import { setAdminAuth } from "@/lib/admin-store"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#portfolio" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
]

export function Navbar() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [adminHint, setAdminHint] = React.useState<string | null>(null)
  const tapCountRef = React.useRef(0)
  const tapTimerRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Secret 10-tap Developer Easter Egg to open Admin Login Gateway
  const handleLogoClick = (e: React.MouseEvent) => {
    tapCountRef.current += 1

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current)
    }

    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0
      setAdminHint(null)
    }, 2500)

    if (tapCountRef.current >= 10) {
      e.preventDefault()
      tapCountRef.current = 0
      setAdminHint("🔓 Gateway Authorized • Opening Login...")
      setAdminAuth(false)
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([80, 40, 80])
      }
      setTimeout(() => {
        router.push("/admin/login")
      }, 400)
    } else if (tapCountRef.current >= 6) {
      setAdminHint(`🛡️ Admin Portal: ${10 - tapCountRef.current} taps remaining`)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform-gpu ${
        isScrolled 
          ? "bg-[#060a14]/90 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.8)] border-b border-white/10 py-3" 
          : "bg-[#060a14]/60 backdrop-blur-sm border-b border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between min-h-[48px] relative">
          
          {/* Left: Brand Logo + Responsive Brand Name (With Secret 10-Tap Admin Trigger) */}
          <div className="relative z-10 flex items-center">
            <Link 
              href="/" 
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
              title="Sri Web Squad"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-slate-900 border-2 border-primary-500/60 p-0.5 relative group-hover:scale-105 active:scale-95 transition-transform flex items-center justify-center shrink-0 overflow-hidden shadow-[0_0_18px_rgba(59,130,246,0.35)]">
                <Image 
                  src={logoImg} 
                  alt="Sri Web Squad Logo" 
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-full" 
                  priority
                />
              </div>
              {/* Responsive Brand Text - Naturally aligned next to logo */}
              <span className="text-lg sm:text-xl lg:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-200 tracking-tight whitespace-nowrap">
                Sri Web Squad
              </span>
            </Link>

            {/* Subtle, Professional Floating Admin Gateway Pill */}
            <AnimatePresence>
              {adminHint && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 6, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full whitespace-nowrap px-3 py-1.5 rounded-full bg-[#0a1122]/95 border border-blue-500/40 text-blue-200 text-[11px] font-mono font-bold shadow-[0_4px_25px_rgba(0,0,0,0.9),0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-xl z-50 pointer-events-none flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{adminHint}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center: Desktop Only Floating Glassmorphic Menu Pill Container */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="flex items-center gap-1 bg-[#0d1527]/40 border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-2xl rounded-full px-5 py-2 transition-all hover:border-white/45">
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

          {/* Right: WhatsApp & Contact Buttons & Responsive Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0 z-10">
            <a 
              href="https://wa.me/917845391712?text=Hi%20Sri%20Web%20Squad,%20I'm%20interested%20in%20your%20services." 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center gap-1.5 rounded-full font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 lg:px-5 py-2 lg:py-2.5 shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            <Link 
              href="#contact" 
              className="hidden sm:inline-flex items-center justify-center rounded-full font-bold text-xs sm:text-sm bg-primary-600 hover:bg-primary-500 text-white px-3.5 sm:px-4 lg:px-5 py-2 sm:py-2 lg:py-2.5 shadow-lg shadow-primary-600/30 hover:scale-105 transition-all duration-200"
            >
              Contact Us
            </Link>

            {/* Mobile & Tablet Menu Toggle with Frosted Glass */}
            <button 
              className="lg:hidden p-2 text-slate-200 hover:text-white rounded-xl bg-[#0d1527]/60 border border-white/20 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.6)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Dropdown with Frosted Glass */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#080d1a]/95 backdrop-blur-2xl border-b border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-semibold text-slate-200 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
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
