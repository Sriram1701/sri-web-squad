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
  Rocket,
  CheckCircle2,
  ArrowRight,
  MessageSquare
} from "lucide-react"

const squadValues = [
  {
    num: "01",
    title: "Passionate Developers",
    tag: "OUR ORIGIN",
    desc: "A close-knit squad of young engineers and designers who code with genuine pride and obsession for modern digital craft.",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    glow: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  },
  {
    num: "02",
    title: "Affordable & Transparent",
    tag: "FAIR PRICING",
    desc: "Enterprise-grade digital systems and websites at honest, pocket-friendly budgets without high agency markups.",
    icon: Target,
    gradient: "from-emerald-500 to-teal-500",
    glow: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  },
  {
    num: "03",
    title: "Direct Developer Access",
    tag: "ZERO MIDDLEMEN",
    desc: "No account managers or delayed replies. You communicate directly with the lead engineers who actually code your product.",
    icon: Code2,
    gradient: "from-purple-500 to-indigo-500",
    glow: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  },
  {
    num: "04",
    title: "Rapid Delivery & 24/7 Support",
    tag: "FAST TURNAROUND",
    desc: "Fast turnaround in 3–7 days with zero compromises on quality, followed by round-the-clock technical assistance.",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    glow: "group-hover:border-amber-500/50 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  }
]

const highlightBadges = [
  "Direct Lead Developer Access",
  "Zero Agency Markup / Fair Rates",
  "3 to 7 Days Rapid Launch",
  "100% Custom Code & Source Ownership",
  "24/7 Dedicated Support"
]

const techPills = [
  "Next.js 16",
  "React",
  "Flutter",
  "Supabase",
  "Tailwind CSS",
  "Node.js",
  "AI Automation"
]

export function About() {
  return (
    <section id="about" className="py-10 sm:py-16 md:py-20 bg-[#030712] border-t border-slate-900/80 relative overflow-hidden text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-primary-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="About Us" 
          subtitle="The story, passion, and values powering Sri Web Squad."
        />
        
        {/* Main Story & Who We Are */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-8 mb-10 sm:mt-10 sm:mb-14">
          
          {/* Left Text Block / Glass Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#090f20]/90 to-[#050914]/90 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />
            
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Who We Are</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                A Dedicated Team of Builders Driving Real{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Digital Growth
                </span>
              </h3>

              <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/20 border border-blue-500/20">
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  <strong className="text-white font-semibold">Sri Web Squad</strong> was built in <strong className="text-white font-semibold">Cuddalore</strong> by a passionate squad of engineers. We noticed businesses in Cuddalore, Pondicherry, and across Tamil Nadu were constantly overcharged by large agencies for basic websites or left with slow, unmaintained templates.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We set out to deliver Cuddalore&apos;s premier web & software solutions — building enterprise-grade custom web applications, Android & iOS mobile apps, ERP billing systems, and AI automation at transparent, affordable pricing.
              </p>

              {/* Highlights Checkmark List */}
              <div className="pt-2 space-y-2.5">
                {highlightBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills Strip */}
            <div className="pt-6 mt-6 border-t border-slate-800/80">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                Core Technologies We Master
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {techPills.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-[#0e162c] border border-slate-700/60 text-slate-200 text-xs font-medium hover:border-blue-400/50 hover:text-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right Pillar Cards Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 grid sm:grid-cols-2 gap-4 items-stretch"
          >
            {squadValues.map((value) => (
              <div 
                key={value.title}
                className={`p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#090f20]/90 to-[#060a15]/90 border border-slate-800/80 ${value.glow} transition-all duration-300 flex flex-col justify-between group backdrop-blur-xl hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <value.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-mono font-black text-slate-700 group-hover:text-slate-500 transition-colors">
                      {value.num}
                    </span>
                  </div>

                  <span className={`inline-block text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border mb-2 ${value.badgeBg}`}>
                    {value.tag}
                  </span>

                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {value.title}
                  </h4>
                  
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
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
          className="rounded-3xl bg-gradient-to-r from-[#0b1530] via-[#091124] to-[#0d1c3a] border border-blue-500/30 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <span>Available for New Projects</span>
            </div>
            
            <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
              <Rocket className="w-6 h-6 text-cyan-400" />
              <span>Ready to transform your business digitally?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Partner directly with our core engineering squad. High performance websites, custom software, and mobile apps delivered with speed and zero headaches.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <a
              href="https://wa.me/917845391712"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#0e1b38] hover:bg-[#14264e] border border-blue-400/30 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
            
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-primary-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
