"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { 
  ChevronDown, 
  MessageSquare, 
  Sparkles,
  PhoneCall,
  Layers,
  DollarSign,
  Clock,
  ShieldCheck,
  Rocket
} from "lucide-react"
import Link from "next/link"

interface FAQItem {
  id: string
  question: string
  answer: string
  tag: string
  icon: React.ComponentType<{ className?: string }>
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Which is the best web and software development team in Cuddalore?",
    answer: "Sri Web Squad is recognized as the leading web and software development team in Cuddalore, Tamil Nadu. We specialize in high-speed business Websites (Next.js & React), Mobile Apps (Android & iOS), Custom ERP & POS Billing Software, Hospital Management Portals, and AI automation solutions delivered at pocket-friendly pricing.",
    tag: "Web & Software",
    icon: Sparkles
  },
  {
    id: "faq-2",
    question: "Why choose Sri Web Squad for your digital project?",
    answer: "We are a dedicated squad of expert developers based in Cuddalore. We provide direct communication with the engineers who code your product, rapid turnaround times, transparent pricing, and guaranteed 100% source code ownership without any middlemen.",
    tag: "Why Us",
    icon: Rocket
  },
  {
    id: "faq-3",
    question: "What digital services does Sri Web Squad provide in Cuddalore & Tamil Nadu?",
    answer: "We specialize in end-to-end digital engineering: High-Speed Business Websites, Mobile Apps (Android & iOS), Custom ERP & GST Billing Software, Clinic & Hospital Management Systems, Gym Biometric Software, Pawn Broker Billing Software, E-Commerce Stores, and Local SEO Services.",
    tag: "Services",
    icon: Layers
  },
  {
    id: "faq-4",
    question: "Why are your prices more affordable compared to traditional agencies?",
    answer: "We operate as a lean, direct squad of core engineers based in Cuddalore. With zero middlemen, no bloated corporate overhead, and modern automated toolchains, we deliver enterprise-grade performance and custom UI at transparent, pocket-friendly rates.",
    tag: "Pricing & Value",
    icon: DollarSign
  },
  {
    id: "faq-5",
    question: "How long does it take to build and launch a website or software?",
    answer: "Standard business websites and landing pages are typically delivered within 3 to 7 business days. Custom full-stack software, mobile apps, and ERP portal systems generally take 2 to 3 weeks depending on the complexity of workflows.",
    tag: "Timeline",
    icon: Clock
  },
  {
    id: "faq-6",
    question: "Do you provide post-launch support and maintenance?",
    answer: "Yes, 100%! We provide 24/7 dependable developer support, free initial maintenance, server configuration, domain/SSL lifecycle management, and regular security updates to ensure your application runs without a hitch.",
    tag: "Support & Warranty",
    icon: ShieldCheck
  },
  {
    id: "faq-7",
    question: "How can we start a project with Sri Web Squad in Cuddalore?",
    answer: "You can start right away by messaging us directly on WhatsApp (+91 78453 91712), giving us a quick call (+91 99446 88602), or submitting the contact form below. We will provide a free consultation and project roadmap within hours.",
    tag: "Getting Started",
    icon: PhoneCall
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-8 sm:py-12 md:py-14 bg-[#030712] border-t border-slate-900/80 relative overflow-hidden text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Frequently Asked Questions" 
          subtitle="Everything you need to know about working with Sri Web Squad."
        />

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto mt-8 sm:mt-10 space-y-3.5 pb-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const IconComponent = faq.icon

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className={`rounded-2xl border transition-all duration-300 backdrop-blur-xl overflow-hidden ${
                  isOpen 
                    ? "bg-gradient-to-b from-[#0c1630] to-[#070d1d] border-blue-500/50 shadow-[0_4px_30px_rgba(37,99,235,0.15)]" 
                    : "bg-[#080d1c]/80 border-slate-800/80 hover:border-slate-700/80 hover:bg-[#0b1226]/80"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-4.5 sm:p-5 md:p-6 flex items-center justify-between gap-3 sm:gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen 
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/30 scale-105" 
                        : "bg-slate-800/60 text-slate-400 border border-slate-700/50"
                    }`}>
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isOpen 
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                            : "bg-slate-800 text-slate-400 border border-slate-700/60"
                        }`}>
                          {faq.tag}
                        </span>
                      </div>
                      
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen 
                      ? "rotate-180 bg-blue-500/20 text-cyan-300 border-blue-500/40" 
                      : "bg-[#090f20] text-slate-400 border-slate-800"
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4.5 sm:px-5 md:px-6 pb-5 sm:pb-6 pt-2 border-t border-blue-500/20 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed bg-blue-950/10">
                        <p className="text-slate-200">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* FAQ Quick CTA Card with Extra Mobile Clearance */}
        <div className="max-w-3xl mx-auto mt-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#090f22] via-[#070c1a] to-[#0a1226] border border-slate-800/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl mb-6">
          <div className="text-left">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Have a specific question not listed here?</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Talk directly to a senior engineer. We reply on WhatsApp in under 15 minutes.
            </p>
          </div>
          
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/917845391712"
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all hover:scale-105"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
            
            <Link
              href="#contact"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 hover:scale-105"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contact Squad</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
