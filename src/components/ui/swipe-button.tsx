"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

interface SwipeButtonProps {
  onComplete?: () => void
  text?: string
  completedText?: string
  href?: string
  className?: string
}

export function SwipeButton({
  onComplete,
  text = "LET'S GROW TOGETHER",
  completedText = "LET'S GO! 🚀",
  href = "#contact",
  className = ""
}: SwipeButtonProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [maxDrag, setMaxDrag] = React.useState(180)
  const [isCompleted, setIsCompleted] = React.useState(false)
  const x = useMotionValue(0)

  // Measure track width dynamically for any screen size
  React.useEffect(() => {
    const updateMaxDrag = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const thumbWidth = 48 // 44px + margins
        setMaxDrag(Math.max(containerWidth - thumbWidth - 8, 80))
      }
    }

    updateMaxDrag()
    window.addEventListener("resize", updateMaxDrag)
    return () => window.removeEventListener("resize", updateMaxDrag)
  }, [])

  // Opacity of text fades as user swipes right
  const textOpacity = useTransform(x, [0, maxDrag * 0.6], [1, 0.15])
  // Dynamic background fill trailing the thumb
  const fillWidth = useTransform(x, (currentX) => `${currentX + 24}px`)

  const triggerCompletion = React.useCallback(() => {
    setIsCompleted(true)
    animate(x, maxDrag, {
      type: "spring",
      stiffness: 400,
      damping: 30
    })

    if (onComplete) {
      onComplete()
    } else if (href) {
      setTimeout(() => {
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        } else {
          window.location.hash = href
        }
      }, 200)
    }

    // Reset back smoothly after 2 seconds
    setTimeout(() => {
      animate(x, 0, {
        type: "spring",
        stiffness: 300,
        damping: 25
      })
      setIsCompleted(false)
    }, 2000)
  }, [href, maxDrag, onComplete, x])

  const handleDragEnd = () => {
    if (x.get() >= maxDrag * 0.7) {
      triggerCompletion()
    } else {
      // Snap back if threshold not reached
      animate(x, 0, {
        type: "spring",
        stiffness: 400,
        damping: 30
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
      e.preventDefault()
      triggerCompletion()
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none h-14 w-full max-w-[320px] sm:max-w-[340px] rounded-full bg-black/90 border border-slate-700/90 shadow-[0_4px_25px_rgba(0,0,0,0.5)] p-1 flex items-center overflow-hidden transition-all duration-300 hover:border-primary-500/60 ${className}`}
    >
      {/* Dynamic glow track fill */}
      <motion.div
        style={{ width: fillWidth }}
        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-primary-700/40 via-primary-600/30 to-blue-500/20 rounded-full pointer-events-none"
      />

      {/* Background Animated Text */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none pl-12 pr-4"
      >
        <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-200 uppercase flex items-center gap-1">
          {isCompleted ? completedText : text}
          {!isCompleted && (
            <span className="inline-flex text-primary-400 font-mono tracking-tighter animate-pulse ml-1 text-xs">
              ❯❯❯
            </span>
          )}
        </span>
      </motion.div>

      {/* Draggable Thumb */}
      <motion.button
        type="button"
        drag="x"
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.06}
        dragMomentum={false}
        style={{ x }}
        onDragEnd={handleDragEnd}
        onKeyDown={handleKeyDown}
        whileTap={{ scale: 1.05 }}
        role="slider"
        aria-label="Swipe to connect"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isCompleted ? 100 : 0}
        aria-valuetext={isCompleted ? completedText : text}
        className="relative z-10 w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center cursor-grab active:cursor-grabbing text-white shadow-[0_0_20px_rgba(37,99,235,0.6)] hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors shrink-0"
      >
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Check className="w-6 h-6 text-white" />
          </motion.div>
        ) : (
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </motion.button>
    </div>
  )
}
