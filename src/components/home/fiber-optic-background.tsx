"use client"

import * as React from "react"

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
  alpha: number
  maxAlpha: number
  pulseSpeed: number
}

interface FiberBeam {
  startX: number
  startY: number
  cp1X: number
  cp1Y: number
  cp2X: number
  cp2Y: number
  endX: number
  endY: number
  progress: number
  speed: number
  length: number
  color: string
  glowColor: string
  width: number
}

export function FiberOpticBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    let isVisible = true
    let isMobile = false

    // Set canvas dimensions with optimized mobile DPI
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      isMobile = width < 768
      
      // On mobile, cap DPR at 1 to save 4x GPU fill-rate bandwidth
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas, { passive: true })

    // Generate Fiber Optic Paths with adaptive count
    const createFiberBeams = (): FiberBeam[] => {
      const colors = [
        { stroke: "#38bdf8", glow: "rgba(56, 189, 248, 0.25)" }, // Cyan
        { stroke: "#60a5fa", glow: "rgba(59, 130, 246, 0.2)" },  // Electric Blue
        { stroke: "#a855f7", glow: "rgba(147, 51, 234, 0.2)" },  // Violet
        { stroke: "#2dd4bf", glow: "rgba(20, 184, 166, 0.2)" }   // Teal
      ]

      const beams: FiberBeam[] = []
      const beamCount = isMobile ? 3 : Math.min(Math.floor(width / 140) + 4, 8)

      for (let i = 0; i < beamCount; i++) {
        const c = colors[i % colors.length]
        const fromLeft = Math.random() > 0.4

        const startX = fromLeft ? -40 : Math.random() * width * 0.3
        const startY = Math.random() * height
        const endX = fromLeft ? width + 40 : width * (0.6 + Math.random() * 0.4)
        const endY = Math.random() * height

        const cp1X = startX + (endX - startX) * (0.2 + Math.random() * 0.3)
        const cp1Y = startY + (Math.random() - 0.5) * height * 0.7
        const cp2X = startX + (endX - startX) * (0.6 + Math.random() * 0.3)
        const cp2Y = endY + (Math.random() - 0.5) * height * 0.7

        beams.push({
          startX,
          startY,
          cp1X,
          cp1Y,
          cp2X,
          cp2Y,
          endX,
          endY,
          progress: Math.random(),
          speed: 0.0016 + Math.random() * 0.0022,
          length: 0.12 + Math.random() * 0.14,
          color: c.stroke,
          glowColor: c.glow,
          width: isMobile ? 1.2 : 1.5 + Math.random() * 1.2
        })
      }
      return beams
    }

    // Generate Floating Ambient Spark Particles
    const createParticles = (): Particle[] => {
      const particleColors = [
        "rgba(56, 189, 248, ",  // Cyan
        "rgba(96, 165, 250, ",  // Blue
        "rgba(192, 132, 252, ", // Purple
        "rgba(255, 255, 255, "  // White
      ]

      const particles: Particle[] = []
      const count = isMobile ? 12 : Math.min(Math.floor((width * height) / 25000), 28)

      for (let i = 0; i < count; i++) {
        const maxA = 0.25 + Math.random() * 0.55
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isMobile ? 1 + Math.random() * 1.5 : 1 + Math.random() * 2,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.15 - Math.random() * 0.3,
          alpha: Math.random() * maxA,
          maxAlpha: maxA,
          pulseSpeed: 0.012 + Math.random() * 0.018
        })
      }
      return particles
    }

    let fiberBeams = createFiberBeams()
    let particles = createParticles()

    // Cubic bezier calculation
    const getBezierPoint = (
      t: number,
      p0: number,
      p1: number,
      p2: number,
      p3: number
    ) => {
      const mt = 1 - t
      return (
        mt * mt * mt * p0 +
        3 * mt * mt * t * p1 +
        3 * mt * t * t * p2 +
        t * t * t * p3
      )
    }

    // Hardware-efficient Render loop without shadowBlur
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      // 1. Draw Subtle Fiber Guide Tracks
      ctx.strokeStyle = "rgba(56, 189, 248, 0.035)"
      ctx.lineWidth = 1
      for (let i = 0; i < fiberBeams.length; i++) {
        const beam = fiberBeams[i]
        ctx.beginPath()
        ctx.moveTo(beam.startX, beam.startY)
        ctx.bezierCurveTo(
          beam.cp1X,
          beam.cp1Y,
          beam.cp2X,
          beam.cp2Y,
          beam.endX,
          beam.endY
        )
        ctx.stroke()
      }

      // 2. Draw Moving Fiber Light Pulses
      const samples = isMobile ? 8 : 12
      for (let i = 0; i < fiberBeams.length; i++) {
        const beam = fiberBeams[i]
        beam.progress += beam.speed
        if (beam.progress > 1.2) {
          beam.progress = -beam.length
        }

        const headT = Math.min(Math.max(beam.progress, 0), 1)
        const tailT = Math.min(Math.max(beam.progress - beam.length, 0), 1)

        if (headT > 0 && tailT < 1 && headT !== tailT) {
          ctx.beginPath()
          for (let s = 0; s <= samples; s++) {
            const curT = tailT + ((headT - tailT) * s) / samples
            const px = getBezierPoint(
              curT,
              beam.startX,
              beam.cp1X,
              beam.cp2X,
              beam.endX
            )
            const py = getBezierPoint(
              curT,
              beam.startY,
              beam.cp1Y,
              beam.cp2Y,
              beam.endY
            )

            if (s === 0) {
              ctx.moveTo(px, py)
            } else {
              ctx.lineTo(px, py)
            }
          }

          // Pass 1: Outer soft glow line (hardware-accelerated 0-overhead replacement for shadowBlur)
          ctx.strokeStyle = beam.glowColor
          ctx.lineWidth = beam.width * 3
          ctx.lineCap = "round"
          ctx.stroke()

          // Pass 2: Sharp core beam line
          ctx.strokeStyle = beam.color
          ctx.lineWidth = beam.width
          ctx.stroke()

          // Photon head
          const headX = getBezierPoint(
            headT,
            beam.startX,
            beam.cp1X,
            beam.cp2X,
            beam.endX
          )
          const headY = getBezierPoint(
            headT,
            beam.startY,
            beam.cp1Y,
            beam.cp2Y,
            beam.endY
          )

          const glowGrad = ctx.createRadialGradient(
            headX,
            headY,
            0,
            headX,
            headY,
            isMobile ? 5 : 7
          )
          glowGrad.addColorStop(0, "#ffffff")
          glowGrad.addColorStop(0.4, beam.color)
          glowGrad.addColorStop(1, "transparent")

          ctx.fillStyle = glowGrad
          ctx.beginPath()
          ctx.arc(headX, headY, isMobile ? 5 : 7, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 3. Floating Light Sparks
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha += p.pulseSpeed

        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        const currentOpacity = Math.abs(Math.sin(p.alpha)) * p.maxAlpha

        ctx.fillStyle = `${p.color}${currentOpacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    // Pause rendering when Hero is scrolled out of viewport to save 100% mobile battery & CPU
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
      },
      { threshold: 0.05 }
    )

    if (canvas.parentElement) {
      observer.observe(canvas.parentElement)
    }

    // Pause on background tab
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible"
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] transform-gpu"
      style={{ opacity: 0.85, willChange: "transform", contain: "strict" }}
    />
  )
}

