"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hoverEffect = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-card rounded-2xl p-6",
          className
        )}
        whileHover={hoverEffect ? { y: -5, scale: 1.02 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
GlassCard.displayName = "GlassCard"
