"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react"
import Link from "next/link"

interface FAQItem {
  question: string
  answer: string
  tag: string
}

const faqs: FAQItem[] = [
  {
    question: "What digital services does Sri Web Squad provide?",
    answer: "We specialize in end-to-end digital solutions including High-Speed Websites (Next.js, React), Mobile Apps (Flutter, Android, iOS), and Custom Business Software (Clinical & Hospital Portals, Biometric Gym/Pawn Systems, E-Commerce, and Inventory Portals).",
    tag: "Services"
  },
  {
    question: "Why are your prices more affordable compared to traditional agencies?",
    answer: "We are a close-knit squad of young developers working directly with clients. With zero middlemen, no heavy agency overheads, and efficient modern tech stacks, we deliver high-performance, premium solutions at transparent, budget-friendly pricing.",
    tag: "Pricing & Value"
  },
  {
    question: "How long does it take to build and launch a project?",
    answer: "Standard business websites and landing pages are typically delivered within 3 to 7 business days. Custom full-stack software, mobile apps, and portal systems generally take 2 to 3 weeks depending on the complexity of features.",
    tag: "Timeline"
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer: "Yes, 100%! We provide 24/7 dependable developer support, regular performance updates, server configuration, domain/SSL setup, and free initial maintenance to ensure your platform runs without interruptions.",
    tag: "Support"
  },
  {
    question: "Can our software be customized to match our exact business workflow?",
    answer: "Absolutely. We don't use rigid templates. Every web portal, mobile app, and backend management tool is tailored from scratch to automate and optimize your exact day-to-day business operations.",
    tag: "Customization"
  },
  {
    question: "How can we start a project with Sri Web Squad?",
    answer: "You can start immediately by messaging us directly on WhatsApp (+91 78453 91712), calling us, or submitting your project inquiry via the contact form below. We will provide a free consultation and project roadmap.",
    tag: "Getting Started"
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-[#030712] border-t border-slate-900 relative overflow-hidden text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-primary-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Frequently Asked Questions" 
          subtitle="Everything you need to know about working with Sri Web Squad."
        />

        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 backdrop-blur-xl overflow-hidden ${
                  isOpen 
                    ? "bg-[#0a1022] border-primary-500/50 shadow-[0_8px_30px_rgba(37,99,235,0.15)]" 
                    : "bg-[#060a14]/80 border-slate-800 hover:border-slate-700 hover:bg-[#080d1a]"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-primary-600 text-white" : "bg-slate-800/80 text-slate-400"
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-primary-400 uppercase tracking-wider block mb-0.5">
                        {faq.tag}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-slate-700/80 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-primary-600/20 text-primary-400 border-primary-500/40" : "text-slate-400"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-800/60 text-slate-300 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* FAQ Quick CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-400 mb-3">
            Have a custom question not listed here?
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a0f1d] border border-slate-700 hover:border-primary-500 hover:bg-primary-600/20 text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:scale-105"
          >
            <MessageSquare className="w-4 h-4 text-primary-400" />
            <span>Chat With Our Team</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
