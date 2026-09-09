"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MonitorSmartphone, Megaphone, TrendingUp, PenTool, ShoppingCart } from "lucide-react"

const services = [
  { icon: MonitorSmartphone, text: "WEB DESIGN &\nDEVELOPMENT" },
  { icon: Megaphone, text: "SOCIAL MEDIA\nMARKETING" },
  { icon: TrendingUp, text: "SEO & PERFORMANCE\nMARKETING" },
  { icon: PenTool, text: "CONTENT CREATION\n& BRANDING" },
  { icon: ShoppingCart, text: "E-COMMERCE\nSOLUTIONS" },
]

export function ServicesRow() {
  return (
    <section className="bg-[#050505] py-16 border-t border-slate-900 overflow-hidden relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center lg:justify-between items-start gap-10 md:gap-4 max-w-6xl mx-auto">
          {services.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center max-w-[140px] md:max-w-[160px] group cursor-pointer relative"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-primary-600 flex items-center justify-center mb-6 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.2)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] bg-black relative z-10 hover:scale-105 duration-300">
                <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-slate-300 text-[11px] md:text-xs font-bold tracking-[0.15em] uppercase whitespace-pre-line group-hover:text-white transition-colors">
                {item.text}
              </h3>
              
              {/* Optional dividing line between items (hidden on small screens, shown on large) */}
              {index !== services.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[100%] w-full h-[1px] bg-slate-800 -z-10" style={{ width: 'calc(100% + 2rem)' }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
