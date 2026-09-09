"use client"

import * as React from "react"
import { useInView, animate } from "framer-motion"

export interface AnimatedCounterProps {
  from?: number
  to?: number
  value?: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  from = 0,
  to,
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = ""
}: AnimatedCounterProps) {
  const target = to !== undefined ? to : (value !== undefined ? value : 0)
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [count, setCount] = React.useState(from)

  React.useEffect(() => {
    if (!isInView) return

    const controls = animate(from, target, {
      duration: duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate: (latest) => {
        setCount(Math.round(latest))
      },
    })

    return () => controls.stop()
  }, [isInView, from, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}
