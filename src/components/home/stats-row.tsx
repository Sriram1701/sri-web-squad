"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Briefcase, Users, HeadphonesIcon } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export function StatsRow() {
  return (
    <section className="bg-black py-8 sm:py-10 relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 bg-[#070b14]/90 backdrop-blur-xl shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            {/* Stat 1 */}
            <div className="flex items-center gap-5 px-4 pt-2 md:pt-0 justify-center">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-primary-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary-600/30 p-3">
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <AnimatedCounter 
                  from={0} 
                  to={50} 
                  suffix="+" 
                  duration={2} 
                  className="text-3xl sm:text-4xl font-black text-white tracking-tight" 
                />
                <span className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">Projects Completed</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-5 px-4 pt-6 md:pt-0 justify-center">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-primary-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary-600/30 p-3">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <AnimatedCounter 
                  from={0} 
                  to={99} 
                  suffix="%" 
                  duration={2.2} 
                  className="text-3xl sm:text-4xl font-black text-white tracking-tight" 
                />
                <span className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">Client Satisfaction</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-5 px-4 pt-6 md:pt-0 justify-center">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-primary-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary-600/30 p-3">
                <HeadphonesIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <AnimatedCounter 
                  from={0} 
                  to={24} 
                  suffix="/7" 
                  duration={1.8} 
                  className="text-3xl sm:text-4xl font-black text-white tracking-tight" 
                />
                <span className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">Support Available</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
