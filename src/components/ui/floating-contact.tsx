"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Phone, Mail, X, MessageSquare } from "lucide-react"

export function FloatingContact() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end transform-gpu">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2.5 mb-3"
          >
            <a
              href="mailto:sriwebsquad@gmail.com"
              className="flex items-center justify-between gap-3 bg-[#0c1426] text-slate-100 px-4 py-2.5 rounded-full shadow-2xl border border-slate-700 hover:border-blue-500/60 hover:bg-[#111c38] transition-all"
            >
              <span className="font-bold text-xs">Email Us</span>
              <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5" />
              </div>
            </a>
            
            <a
              href="tel:+917845391712"
              className="flex items-center justify-between gap-3 bg-[#0c1426] text-slate-100 px-4 py-2.5 rounded-full shadow-2xl border border-slate-700 hover:border-blue-500/60 hover:bg-[#111c38] transition-all"
            >
              <span className="font-bold text-xs">Call Now</span>
              <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
            </a>
            
            <a
              href="https://wa.me/917845391712"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 bg-[#0c1426] text-slate-100 px-4 py-2.5 rounded-full shadow-2xl border border-slate-700 hover:border-emerald-500/60 hover:bg-[#111c38] transition-all"
            >
              <span className="font-bold text-xs">WhatsApp</span>
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-blue-600 to-primary-600 hover:from-blue-500 hover:to-primary-500 text-white shadow-xl shadow-blue-600/35 border-2 border-blue-400/40 flex items-center justify-center hover:scale-105 transition-transform active:scale-95 focus:outline-none"
        aria-label="Contact options"
      >
        {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>
    </div>
  )
}
