"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { 
  Users, 
  Target, 
  Code2, 
  Clock,
  Sparkles,
  Rocket
} from "lucide-react"

const squadValues = [
  {
    title: "Founded by Passionate Developers",
    desc: "We are a close-knit squad of young engineers and friends who turned our shared love for coding and design into a full-scale digital agency.",
    icon: Users,
    color: "from-blue-500 to-primary-600"
  },
  {
    title: "Affordable Pricing & Best Output",
    desc: "We believe quality software shouldn't cost a fortune. We provide high-end, scalable websites and apps at transparent, pocket-friendly budgets.",
    icon: Target,
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Direct Developer Collaboration",
    desc: "No corporate middlemen or bureaucratic delays. You communicate directly with the lead engineers who build and maintain your project.",
    icon: Code2,
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Fast Delivery & Continuous Support",
    desc: "We respect your time. From concept to launch, we work with agility, zero delays, and provide 24/7 post-launch technical assistance.",
    icon: Clock,
    color: "from-amber-500 to-orange-600"
  }
]

export function About() {
  return (
    <section id="about" className="py-24 bg-[#030712] border-t border-slate-900 relative overflow-hidden text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="About Us" 
          subtitle="The story, passion, and values powering Sri Web Squad."
        />
        
        {/* Main Story & Who We Are */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mt-12 mb-16">
          
          {/* Left Text Block */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Who We Are</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              A Dedicated Team of Builders Driving Real Digital Growth
            </h3>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              <strong className="text-white">Sri Web Squad</strong> was born out of a shared dream among close friends and passionate developers. We noticed that small and growing businesses were often overcharged by big agencies for basic websites, or left with slow, outdated tools.
            </p>

            <p className="text-base text-slate-400 leading-relaxed">
              We decided to change that. We combined our technical expertise in <span className="text-slate-200 font-semibold">Next.js</span>, <span className="text-slate-200 font-semibold">Mobile Apps</span>, <span className="text-slate-200 font-semibold">Custom ERPs</span>, and <span className="text-slate-200 font-semibold">AI Automation</span> to deliver enterprise-grade digital systems at prices that everyday businesses can comfortably afford.
            </p>


          </motion.div>
          
          {/* Right Pillar Cards Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 grid sm:grid-cols-2 gap-4"
          >
            {squadValues.map((value) => (
              <div 
                key={value.title}
                className="p-5 rounded-2xl bg-[#0a0f1d] border border-slate-800 hover:border-primary-500/50 hover:bg-[#0f172a] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-primary-400 transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Squad Commitment Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#0a0f1d] to-slate-900 border border-blue-500/30 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-2xl"
        >
          <div className="max-w-2xl">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
              <Rocket className="w-6 h-6 text-blue-400" />
              <span>Ready to transform your business digitally?</span>
            </h4>
            <p className="text-sm text-slate-300">
              Work directly with our team to get custom websites and software with the highest quality output at budget-friendly pricing.
            </p>
          </div>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm shadow-lg shadow-primary-600/40 hover:scale-105 transition-all shrink-0"
          >
            Start Your Project →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
