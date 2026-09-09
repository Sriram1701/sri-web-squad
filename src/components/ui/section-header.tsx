"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, centered = true, className }) => {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
