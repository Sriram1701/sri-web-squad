"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { ArrowRight, Check, FolderKanban } from "lucide-react"

interface SwipeButtonProps {
  onComplete?: () => void
  text?: string
  completedText?: string
  href?: string
  variant?: "blue" | "cyan" | "purple"
  icon?: React.ReactNode
  className?: string
}

export function SwipeButton({
  onComplete,
  text = "LET'S GROW TOGETHER",
  completedText = "LET'S GO! 🚀",
  href = "#contact",
  variant = "blue",
  icon,
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
        const thumbWidth = 48
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
    if (x.get() >= maxDrag * 0.6) {
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

  const colorStyles = {
    blue: {
      border: "hover:border-blue-400/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]",
      fill: "from-blue-600/35 via-blue-500/20 to-transparent",
      thumbBg: "bg-[#2563eb] text-white shadow-[0_0_24px_rgba(37,99,235,0.7)] focus:ring-blue-400",
      iconColor: "text-white",
      chevron: "text-blue-400"
    },
    cyan: {
      border: "hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]",
      fill: "from-cyan-500/35 via-cyan-400/20 to-transparent",
      thumbBg: "bg-[#00c5df] text-[#050b14] shadow-[0_0_24px_rgba(6,182,212,0.7)] focus:ring-cyan-400",
      iconColor: "text-[#050b14]",
      chevron: "text-cyan-400"
    },
    purple: {
      border: "hover:border-purple-400/60 hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]",
      fill: "from-purple-600/35 via-purple-500/20 to-transparent",
      thumbBg: "bg-purple-600 text-white shadow-[0_0_24px_rgba(147,51,234,0.7)] focus:ring-purple-400",
      iconColor: "text-white",
      chevron: "text-purple-400"
    }
  }

  const style = colorStyles[variant] || colorStyles.blue

  return (
    <div
      ref={containerRef}
      onClick={(e) => {
        // If user tapped track directly (not thumb)
        if ((e.target as HTMLElement).tagName !== "BUTTON") {
          triggerCompletion()
        }
      }}
      style={{ touchAction: "pan-y" }}
      className={`relative select-none h-14 w-full max-w-[340px] rounded-full bg-[#0d1527] border border-white/20 shadow-lg p-1 flex items-center overflow-hidden cursor-pointer transition-all duration-300 group ${style.border} ${className}`}
    >
      {/* Top Glass Bevel Reflection */}
      <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

      {/* Dynamic glow track fill */}
      <motion.div
        style={{ width: fillWidth }}
        className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r ${style.fill} rounded-full pointer-events-none`}
      />

      {/* Background Animated Text */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none pl-12 pr-4"
      >
        <span className="text-xs sm:text-sm font-black tracking-wider text-white uppercase flex items-center gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {isCompleted ? completedText : text}
          {!isCompleted && (
            <span className={`inline-flex ${style.chevron} font-mono tracking-tighter animate-pulse ml-1 text-xs font-black`}>
              ❯❯❯
            </span>
          )}
        </span>
      </motion.div>

      {/* Draggable Thumb */}
      <motion.div
        role="button"
        tabIndex={0}
        drag="x"
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.06}
        dragMomentum={false}
        style={{ x, touchAction: "none" }}
        onDragEnd={handleDragEnd}
        onKeyDown={handleKeyDown}
        whileTap={{ scale: 1.05 }}
        aria-label={text}
        className={`relative z-10 w-12 h-12 rounded-full ${style.thumbBg} flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 transition-transform shrink-0`}
      >
        {isCompleted ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="inline-flex items-center justify-center"
          >
            <Check className="w-5 h-5" />
          </motion.span>
        ) : (
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="inline-flex items-center justify-center"
          >
            {icon ? icon : <ArrowRight className={`w-5 h-5 ${style.iconColor} stroke-[2.5]`} />}
          </motion.span>
        )}
      </motion.div>
    </div>
  )
}


