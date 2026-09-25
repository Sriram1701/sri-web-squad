"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import logoImg from "@/app/icon.png"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Code2, 
  Globe, 
  Smartphone, 
  Layout, 
  Cloud, 
  Cpu, 
  TrendingUp, 
  Search, 
  Receipt, 
  Users, 
  Building2, 
  Hospital, 
  Dumbbell, 
  ShieldCheck, 
  Coins, 
  ShoppingCart, 
  ExternalLink,
  MessageCircle
} from "lucide-react"

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Sri+Web+Squad/@11.7040456,79.7671579,17z/data=!3m1!4b1!4m6!3m5!1s0x3a54970bc69bcd31:0x2514c310923dd33c!8m2!3d11.7040456!4d79.7671579!16s%2Fg%2F11zh8sgg4p?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"

// Social Icons
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-[#02050c] text-slate-300 pt-10 sm:pt-14 pb-6 sm:pb-8 border-t border-slate-900 relative z-20 overflow-hidden">
      {/* Ambient background glow using fast CSS radial gradients */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-8 sm:pb-10 border-b border-slate-800/80">
          
          {/* Column 1: Brand & About (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 group mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-750 p-0.5 relative group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
                  <Image 
                    src={logoImg} 
                    alt="Sri Web Squad Logo" 
                    width={38}
                    height={38}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-primary-400 to-cyan-400 tracking-tight">
                  SRI WEB SQUAD
                </span>
              </Link>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                Sri Web Squad is a leading software & web development team in India offering ERP software, CRM solutions, GST billing software, web development, mobile app development, AI solutions, and digital growth services for startups, SMEs, and enterprises.
              </p>

              {/* Blue accent line */}
              <div className="w-12 h-1 bg-primary-500 rounded-full mb-5" />

              {/* Social Follow Us */}
              <div>
                <h5 className="text-xs font-bold text-slate-200 tracking-widest uppercase mb-3">
                  FOLLOW US
                </h5>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61594401073325" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-[#0a0f1e] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-600/20 transition-all hover:scale-110 shadow-sm"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://www.instagram.com/sri_web_squad" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-[#0a0f1e] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-pink-500 hover:bg-pink-600/20 transition-all hover:scale-110 shadow-sm"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/sriram-nagarajan-24a9a837b" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-[#0a0f1e] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-600/20 transition-all hover:scale-110 shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://wa.me/917845391712" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-[#0a0f1e] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-500 hover:bg-emerald-600/20 transition-all hover:scale-110 shadow-sm"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-900/80">
              <div className="px-2.5 py-1 rounded-md bg-[#0a0f1e] border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>GST Registered</span>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-[#0a0f1e] border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>MSME Verified</span>
              </div>
            </div>
          </div>

          {/* Column 2: COMPANY (col-span-2) */}
          <div className="lg:col-span-2">
            <div className="inline-block pb-1.5 border-b-2 border-primary-500 mb-4">
              <h4 className="text-sm font-black text-primary-400 tracking-wider uppercase">
                COMPANY
              </h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Products", href: "#portfolio" },
                { name: "Portfolio", href: "#portfolio" },
                { name: "Reviews", href: "#reviews" },
                { name: "FAQ", href: "#faq" },
                { name: "Contact Us", href: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: OUR SERVICES (col-span-2) */}
          <div className="lg:col-span-2">
            <div className="inline-block pb-1.5 border-b-2 border-primary-500 mb-4">
              <h4 className="text-sm font-black text-primary-400 tracking-wider uppercase">
                OUR SERVICES
              </h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { icon: Code2, name: "Custom Software Dev", href: "#services" },
                { icon: Globe, name: "Website Development", href: "#services" },
                { icon: Smartphone, name: "Mobile App Dev", href: "#services" },
                { icon: Layout, name: "UI/UX Design", href: "#services" },
                { icon: Cloud, name: "Cloud Solutions", href: "#services" },
                { icon: Cpu, name: "AI Development", href: "#services" },
                { icon: TrendingUp, name: "Digital Marketing", href: "#services" },
                { icon: Search, name: "SEO & Ads Services", href: "#services" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    <item.icon className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: OUR PRODUCTS (col-span-2) */}
          <div className="lg:col-span-2">
            <div className="inline-block pb-1.5 border-b-2 border-primary-500 mb-4">
              <h4 className="text-sm font-black text-primary-400 tracking-wider uppercase">
                OUR PRODUCTS
              </h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { icon: Receipt, name: "GST Billing Software", href: "#portfolio" },
                { icon: Users, name: "Smart CRM Systems", href: "#portfolio" },
                { icon: Building2, name: "ERP Solutions", href: "#portfolio" },
                { icon: Hospital, name: "Hospital Management", href: "#portfolio" },
                { icon: Dumbbell, name: "Gym Biometric Software", href: "#portfolio" },
                { icon: Coins, name: "Pawn & Loan Software", href: "#portfolio" },
                { icon: ShoppingCart, name: "Supermarket Billing", href: "#portfolio" },
                { icon: Cloud, name: "Industrial ERP", href: "#portfolio" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    <item.icon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: GET IN TOUCH (col-span-3) */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="inline-block pb-1.5 border-b-2 border-primary-500 mb-4">
              <h4 className="text-sm font-black text-primary-400 tracking-wider uppercase">
                GET IN TOUCH
              </h4>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 lg:gap-3 text-xs sm:text-sm">
              <div className="space-y-3">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary-600/20 flex items-center justify-center text-primary-400 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="text-slate-300 leading-snug">
                  No 36, Salt Office Road, Pachayankuppam, Cuddalore Old Town, Cuddalore, Tamil Nadu 607003
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col gap-0.5 font-mono font-semibold">
                  <a href="tel:+917845391712" className="text-slate-300 hover:text-white transition-colors">
                    +91 78453 91712
                  </a>
                  <a href="tel:+919486470454" className="text-slate-300 hover:text-white transition-colors">
                    +91 94864 70454
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a href="mailto:sriwebsquad@gmail.com" className="text-slate-300 hover:text-white font-semibold transition-colors">
                  sriwebsquad@gmail.com
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="text-slate-300">
                  Mon–Sat : 9 AM – 7 PM
                </div>
              </div>
            </div>

            {/* Google Maps Mini Preview Card Widget */}
            <div className="pt-0 md:pt-1.5 flex flex-col justify-center">
              <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl bg-gradient-to-br from-[#0c1326] to-[#060b18] border border-blue-500/30 p-3 shadow-xl hover:border-primary-500 transition-all hover:scale-[1.02] group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>Sri Web Squad Location</span>
                    </div>
                    <span className="text-[11px] text-blue-400 group-hover:text-blue-300 font-semibold flex items-center gap-0.5">
                      View on Maps <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 leading-tight">
                    Pachayankuppam, Cuddalore Old Town, Tamil Nadu • 5.0 ★ Google Rating
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono pb-2 sm:pb-0 pr-0 sm:pr-20">
          <div>
            &copy; {new Date().getFullYear()} Sri Web Squad. All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="#about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="#services" className="hover:text-slate-300 transition-colors">Services</Link>
            <Link href="#contact" className="hover:text-slate-300 transition-colors">Support</Link>
            <Link href="#reviews" className="hover:text-slate-300 transition-colors">Reviews</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
