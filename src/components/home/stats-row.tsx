"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Briefcase, Users, HeadphonesIcon } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export function StatsRow() {
  return (
    <section className="bg-black py-4 sm:py-6 md:py-8 relative z-20">
      <h2 className="sr-only">Key Statistics & Performance Highlights</h2>
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto border border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-8 bg-[#070b14]/90 backdrop-blur-xl shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 divide-x divide-slate-800">
            
            {/* Stat 1 */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-2 sm:px-4 justify-center text-center sm:text-left">
              <div className="w-10 h-10 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-primary-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary-600/30 p-2 sm:p-3">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <AnimatedCounter 
                  from={0} 
                  to={50} 
                  suffix="+" 
                  duration={2} 
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight" 
                />
                <span className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-medium tracking-wide">Projects Completed</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-2 sm:px-4 justify-center text-center sm:text-left">
              <div className="w-10 h-10 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-primary-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary-600/30 p-2 sm:p-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <AnimatedCounter 
                  from={0} 
                  to={100} 
                  suffix="%" 
                  duration={2.2} 
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight" 
                />
                <span className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-medium tracking-wide">Client Satisfaction</span>
              </div>
            </div>

            {/* Stat 3 (Desktop Only) */}
            <div className="hidden md:flex items-center gap-4 px-4 justify-center text-left">
              <div className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-primary-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary-600/30 p-3">
                <HeadphonesIcon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <AnimatedCounter 
                  from={0} 
                  to={24} 
                  suffix="/7" 
                  duration={1.8} 
                  className="text-3xl md:text-4xl font-black text-white tracking-tight" 
                />
                <span className="text-xs md:text-sm text-slate-400 font-medium tracking-wide">Support Available</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
