"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Phone, Mail, X, MessageSquare } from "lucide-react"

export function FloatingContact() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 mb-4"
          >
            <a
              href="mailto:sriwebsquad@gmail.com"
              className="flex items-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="font-medium text-sm">Email Us</span>
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
            </a>
            
            <a
              href="tel:+917845391712"
              className="flex items-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="font-medium text-sm">Call Now</span>
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
            </a>
            
            <a
              href="https://wa.me/917845391712"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="font-medium text-sm">WhatsApp</span>
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary-600 text-white shadow-xl shadow-primary-600/30 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 focus:outline-none"
        aria-label="Contact options"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  )
}
