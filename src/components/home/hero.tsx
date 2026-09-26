"use client"

import { motion } from "framer-motion"
import { ArrowRight, Globe, TrendingUp, Sparkles, Lock, Code2, FolderKanban, ArrowUpRight } from "lucide-react"
import { SwipeButton } from "@/components/ui/swipe-button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { FiberOpticBackground } from "@/components/home/fiber-optic-background"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden pt-28 sm:pt-32 lg:pt-24 pb-16 sm:pb-24 lg:pb-16 bg-[#080b14] text-white">
      {/* Dynamic Animated Fiber Optic Light Beams & Photons */}
      <FiberOpticBackground />

      {/* Cyber Network Grid Lines Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf808_1px,transparent_1px),linear-gradient(to_bottom,#38bdf808_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Background ambient glows using fast CSS radial gradients */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col lg:flex-row items-center pt-4 sm:pt-6 lg:pt-2">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center mb-10 lg:mb-0 px-0 lg:pl-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-black leading-[1.12] mb-4 tracking-tight text-white text-center lg:text-left">
              AI-Powered Software Development &{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-primary-400 drop-shadow-[0_0_25px_rgba(59,130,246,0.35)] block lg:inline mt-1 lg:mt-0">
                Digital Solutions
              </span>
            </h1>

            {/* Stylish Brand Divider */}
            <div className="flex items-center justify-center lg:justify-start gap-4 my-5 max-w-xl lg:max-w-2xl mx-auto lg:mx-0">
              <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-blue-500/60 to-cyan-400/90" />
              <span className="font-black tracking-[0.32em] lg:tracking-[0.38em] text-sm sm:text-base md:text-lg lg:text-xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.55)] select-none shrink-0 font-mono">
                SRI WEB SQUAD
              </span>
              <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-blue-500/60 to-cyan-400/90" />
            </div>

            {/* Description Text with Rich Details on Laptop */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300/90 mb-7 max-w-xl lg:max-w-2xl leading-relaxed font-normal text-center lg:text-left mx-auto lg:mx-0">
              Building High-Performance{" "}
              <span className="text-white font-semibold">Websites</span>,{" "}
              <span className="text-white font-semibold">Mobile Apps</span>, and{" "}
              <span className="text-white font-semibold">Software Solutions</span> in{" "}
              <strong className="text-white font-semibold">Cuddalore</strong>
              <span className="hidden lg:inline">
                {" "}— delivering scalable cloud architecture, intuitive modern UI/UX, and AI-driven systems engineered to accelerate your business growth
              </span>.
            </p>

            {/* Action CTAs: Matching Interactive Swipe Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 flex flex-col items-center lg:items-start gap-3.5"
            >
              {/* Top: See Our Projects Interactive Button */}
              <SwipeButton 
                text="SEE OUR PROJECTS" 
                completedText="VIEWING PROJECTS... 🚀" 
                href="#portfolio"
                variant="cyan"
              />

              {/* Bottom: Let's Grow Together Interactive Button */}
              <SwipeButton 
                text="LET'S GROW TOGETHER" 
                completedText="CONNECTING... 🚀" 
                href="#contact"
                variant="blue"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Content - Ultra-Modern Animated UI Mockup */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative mb-8 sm:mb-12 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-xl"
          >
            {/* Desktop Console Mockup Card */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1222] via-[#090d16] to-[#04070e] border border-slate-700/80 shadow-2xl overflow-hidden p-5 sm:p-7">
              
              {/* Fake Browser Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-[11px] text-slate-400 font-mono">
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  <span className="text-slate-300">sriwebsquad.in</span>
                  <span className="text-blue-400">/studio</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Internal Content */}
              <div className="relative z-10 max-w-sm">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
                  <Sparkles className="w-3 h-3" />
                  <span>High-Converting Digital Agency</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
                  WE BUILD BRANDS THAT<br />
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                    LEAD & INSPIRE
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
                  Creative strategies. High-speed performance. Custom digital systems engineered for growth.
                </p>

                {/* Animated Metric Bars */}
                <div className="space-y-3 mb-6 p-3.5 rounded-xl bg-black/40 border border-slate-800/80">
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-blue-400" />
                        Next.js Web Platforms
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">100% Speed</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                        Mobile & Software Systems
                      </span>
                      <span className="font-mono text-blue-400 font-bold">+184% Impact</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <Link 
                  href="#services" 
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-full text-xs sm:text-sm font-semibold text-white transition-all inline-flex items-center gap-2 shadow-lg shadow-primary-600/30 hover:scale-105"
                >
                  Explore Our Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Orbital Graphic / Spinning Tech Rings on Right */}
              <div className="hidden sm:flex absolute right-0 top-10 bottom-0 w-1/2 items-center justify-center pointer-events-none">
                <div className="relative w-64 h-64 border border-slate-800/80 rounded-full flex items-center justify-center">
                  <div className="w-52 h-52 border border-primary-900/40 rounded-full flex items-center justify-center animate-[spin_25s_linear_infinite]" />
                  <div className="absolute w-60 h-60 border-t-2 border-primary-500/80 rounded-full animate-[spin_8s_linear_infinite]" />
                  <div className="absolute w-40 h-40 border-b-2 border-cyan-400/60 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
                  <Globe className="w-24 h-24 text-primary-500/15 absolute animate-pulse" />
                </div>
              </div>
            </div>

            {/* Mobile Phone Mockup Overlay with Levitating Motion */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-10 -right-4 sm:right-6 w-44 sm:w-52 bg-[#0a0f1d] border-4 border-slate-700/80 rounded-[2.2rem] shadow-[0_20px_45px_rgba(0,0,0,0.85)] aspect-[9/18.5] overflow-hidden z-20 transform-gpu"
            >
              {/* Phone Speaker Notch */}
              <div className="absolute top-0 inset-x-0 h-5 bg-slate-800 rounded-b-xl w-24 mx-auto z-30" />
              
              <div className="p-4 pt-9 flex flex-col h-full bg-gradient-to-b from-[#0f172a] via-[#090d16] to-black">
                
                {/* Floating mini alert */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="mb-3 p-2 rounded-xl bg-blue-950/70 border border-blue-500/30 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="text-[9px] text-blue-200 font-medium leading-tight">Fast delivery & low price</span>
                </motion.div>

                <p className="text-xs font-black text-slate-200 leading-snug">
                  WE GROW<br />YOUR BUSINESS
                </p>
                <p className="text-xs font-black text-primary-500 mb-2">ONLINE</p>
                
                <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
                  Turning ideas into digital success with modern tools.
                </p>
                
                <Link 
                  href="#contact" 
                  className="text-[10px] bg-primary-600 hover:bg-primary-500 rounded-full py-2 px-3 text-center mb-auto text-white font-semibold transition-all hover:scale-105 shadow-md shadow-primary-600/30 inline-block"
                >
                  Get Free Quote →
                </Link>

                <div className="flex justify-between border-t border-slate-800 pt-3 mt-3">
                  <div className="text-center">
                    <AnimatedCounter from={0} to={50} suffix="+" duration={2} className="text-primary-500 font-black text-sm block" />
                    <div className="text-[8px] text-slate-400 uppercase font-semibold">Projects</div>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter from={0} to={100} suffix="%" duration={2.2} className="text-emerald-400 font-black text-sm block" />
                    <div className="text-[8px] text-slate-400 uppercase font-semibold">Satisfaction</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
