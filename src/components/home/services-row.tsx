"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MonitorSmartphone, Code2, Megaphone, TrendingUp, PenTool, ShoppingCart } from "lucide-react"
import Link from "next/link"

const services = [
  { icon: MonitorSmartphone, text: "WEB DESIGN &\nDEVELOPMENT", href: "#services" },
  { icon: Code2, text: "CUSTOM SOFTWARE\nDEVELOPMENT", href: "#services" },
  { icon: ShoppingCart, text: "E-COMMERCE\nSOLUTIONS", href: "#services" },
  { icon: TrendingUp, text: "SEO & PERFORMANCE\nMARKETING", href: "#services" },
  { icon: Megaphone, text: "SOCIAL MEDIA\nMARKETING", href: "#services" },
  { icon: PenTool, text: "CONTENT CREATION\n& BRANDING", href: "#services" },
]

export function ServicesRow() {
  return (
    <section className="bg-[#050505] py-6 sm:py-10 md:py-12 border-t border-slate-900 overflow-hidden relative z-20">
      <h2 className="sr-only">Our Core Services & Capabilities</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 lg:gap-4 max-w-6xl mx-auto justify-items-center">
          {services.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="w-full flex flex-col items-center"
            >
              <Link 
                href={item.href}
                className="flex flex-col items-center text-center w-full max-w-[150px] group cursor-pointer relative"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full border-[3px] border-primary-600 flex items-center justify-center mb-3 sm:mb-4 transition-all shadow-[0_0_15px_rgba(37,99,235,0.25)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] group-hover:border-cyan-400 bg-black relative z-10 group-hover:scale-105 duration-300">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white relative z-10 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-slate-300 text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase whitespace-pre-line group-hover:text-white transition-colors leading-tight">
                  {item.text}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
