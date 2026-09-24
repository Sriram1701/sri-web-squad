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
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Generate Fiber Optic Paths
    const createFiberBeams = (): FiberBeam[] => {
      const colors = [
        { stroke: "rgba(56, 189, 248, 0.9)", glow: "rgba(56, 189, 248, 0.45)" }, // Cyan
        { stroke: "rgba(96, 165, 250, 0.9)", glow: "rgba(59, 130, 246, 0.4)" },  // Electric Blue
        { stroke: "rgba(168, 85, 247, 0.9)", glow: "rgba(147, 51, 234, 0.35)" }, // Violet
        { stroke: "rgba(45, 212, 191, 0.9)", glow: "rgba(20, 184, 166, 0.4)" }   // Teal
      ]

      const beams: FiberBeam[] = []
      const beamCount = Math.min(Math.floor(width / 120) + 6, 12)

      for (let i = 0; i < beamCount; i++) {
        const c = colors[i % colors.length]
        const fromLeft = Math.random() > 0.4

        const startX = fromLeft ? -50 : Math.random() * width * 0.4
        const startY = Math.random() * height
        const endX = fromLeft ? width + 50 : width * (0.6 + Math.random() * 0.4)
        const endY = Math.random() * height

        const cp1X = startX + (endX - startX) * (0.2 + Math.random() * 0.3)
        const cp1Y = startY + (Math.random() - 0.5) * height * 0.8
        const cp2X = startX + (endX - startX) * (0.6 + Math.random() * 0.3)
        const cp2Y = endY + (Math.random() - 0.5) * height * 0.8

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
          speed: 0.0018 + Math.random() * 0.0028,
          length: 0.12 + Math.random() * 0.16,
          color: c.stroke,
          glowColor: c.glow,
          width: 1.5 + Math.random() * 1.5
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
      const count = Math.min(Math.floor((width * height) / 18000), 45)

      for (let i = 0; i < count; i++) {
        const maxA = 0.25 + Math.random() * 0.65
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1 + Math.random() * 2.2,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          vx: (Math.random() - 0.5) * 0.35,
          vy: -0.15 - Math.random() * 0.35,
          alpha: Math.random() * maxA,
          maxAlpha: maxA,
          pulseSpeed: 0.015 + Math.random() * 0.02
        })
      }
      return particles
    }

    let fiberBeams = createFiberBeams()
    let particles = createParticles()

    // Helper: calculate point on cubic bezier
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

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw Static / Subtle Fiber Guide Tracks
      for (const beam of fiberBeams) {
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
        ctx.strokeStyle = "rgba(56, 189, 248, 0.04)"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // 2. Draw Moving Fiber Light Pulses
      for (const beam of fiberBeams) {
        beam.progress += beam.speed
        if (beam.progress > 1.2) {
          beam.progress = -beam.length
        }

        const headT = Math.min(Math.max(beam.progress, 0), 1)
        const tailT = Math.min(Math.max(beam.progress - beam.length, 0), 1)

        if (headT > 0 && tailT < 1 && headT !== tailT) {
          // Draw pulsing light segment
          const samples = 14
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

          // Glowing laser line
          ctx.strokeStyle = beam.color
          ctx.lineWidth = beam.width
          ctx.lineCap = "round"
          ctx.shadowColor = beam.glowColor
          ctx.shadowBlur = 12
          ctx.stroke()
          ctx.shadowBlur = 0 // reset shadow

          // Glowing leading photon head
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
            7
          )
          glowGrad.addColorStop(0, "#ffffff")
          glowGrad.addColorStop(0.4, beam.color)
          glowGrad.addColorStop(1, "transparent")

          ctx.fillStyle = glowGrad
          ctx.beginPath()
          ctx.arc(headX, headY, 7, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 3. Draw Floating Light Sparks & Photons
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.alpha += p.pulseSpeed

        // Wrap around borders
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        const currentOpacity =
          Math.abs(Math.sin(p.alpha)) * p.maxAlpha

        ctx.fillStyle = `${p.color}${currentOpacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.shadowColor = "rgba(56, 189, 248, 0.7)"
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ opacity: 0.85 }}
    />
  )
}
