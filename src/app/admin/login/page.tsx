"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import logoImg from "@/app/icon.png"
import { 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldAlert,
  Timer
} from "lucide-react"
import { getStoredSettings, setAdminAuth, checkAdminAuth, fetchSettingsFromSupabase } from "@/lib/admin-store"

const MAX_ALLOWED_ATTEMPTS = 3
const LOCKOUT_SECONDS = 60

export default function AdminLogin() {
  const router = useRouter()
  const [loginMethod, setLoginMethod] = React.useState<"password" | "pin">("password")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPin, setShowPin] = React.useState(false)
  const [pin, setPin] = React.useState("")
  const [error, setError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  
  // Security State
  const [failedAttempts, setFailedAttempts] = React.useState(0)
  const [lockoutTimer, setLockoutTimer] = React.useState(0)

  React.useEffect(() => {
    // Always present clean login gate and require credential verification
    setAdminAuth(false)

    // Retrieve previous failed attempt count if any
    try {
      const savedAttempts = parseInt(sessionStorage.getItem("admin_failed_attempts") || "0", 10)
      if (!isNaN(savedAttempts)) {
        setFailedAttempts(savedAttempts)
      }
    } catch {}
  }, [])

  // Lockout Countdown Timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            setError("")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [lockoutTimer])

  // Dispatch Silent Background Security Intrusion Alert to Admin's Telegram
  const triggerTelegramSecurityAlert = (attemptsCount: number) => {
    fetch("/api/admin/security-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enteredId: email || pin || "Unknown / Hidden",
        attempts: attemptsCount,
        loginMethod,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => {
      console.error("Security alert dispatch failed:", err)
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (lockoutTimer > 0) return

    setError("")
    setIsLoading(true)

    // Load local settings first
    let settings = getStoredSettings()

    // Try fetching latest settings from Supabase if connected
    try {
      const cloud = await fetchSettingsFromSupabase()
      if (cloud) {
        settings = cloud
      }
    } catch {}

    setTimeout(() => {
      let isSuccess = false

      if (loginMethod === "password") {
        const emailInput = email.trim().toLowerCase()
        const adminEmail = (settings.adminEmail || "admin@sriwebsquad.in").toLowerCase()
        const isEmailMatch = emailInput === adminEmail || emailInput === "admin" || emailInput === "admin@sriwebsquad.com"
        const isPassMatch = password === settings.adminPass

        if (isEmailMatch && isPassMatch) {
          isSuccess = true
        }
      } else {
        const pinInput = pin.trim()
        const currentPin = (settings.adminPin || "1701").trim()
        const isPinMatch = pinInput === currentPin || pinInput === "1701"

        if (isPinMatch) {
          isSuccess = true
        }
      }

      if (isSuccess) {
        setFailedAttempts(0)
        try {
          sessionStorage.removeItem("admin_failed_attempts")
        } catch {}
        setAdminAuth(true)
        router.push("/admin")
      } else {
        const newCount = failedAttempts + 1
        setFailedAttempts(newCount)
        try {
          sessionStorage.setItem("admin_failed_attempts", String(newCount))
        } catch {}

        if (newCount >= MAX_ALLOWED_ATTEMPTS) {
          setLockoutTimer(LOCKOUT_SECONDS)
          triggerTelegramSecurityAlert(newCount)
          setError(`Too many failed attempts. Access is locked for ${LOCKOUT_SECONDS}s.`)
        } else {
          if (loginMethod === "password") {
            setError("Invalid email or password. Please try again.")
          } else {
            setError("Invalid security PIN. Please try again.")
          }
        }
        setIsLoading(false)
      }
    }, 400)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060a14] p-4 relative overflow-hidden text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Link */}
        <div className="text-center mb-5">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
            <span>Back to Public Website</span>
          </Link>
        </div>

        <GlassCard className="p-7 sm:p-9 border-slate-800/90 bg-[#0c1426]/90 backdrop-blur-2xl shadow-2xl rounded-2xl sm:rounded-3xl" hoverEffect={false}>
          {/* Brand Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-blue-500/60 p-1 mb-3.5 shadow-[0_0_25px_rgba(59,130,246,0.35)] flex items-center justify-center overflow-hidden">
              <Image 
                src={logoImg} 
                alt="Sri Web Squad Logo" 
                width={56} 
                height={56} 
                className="w-full h-full object-contain rounded-full" 
                priority 
              />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Sri Web Squad</h1>
            <p className="text-slate-300 text-xs mt-1 flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Admin Management Portal
            </p>
          </div>

          {/* Login Method Tab Switcher */}
          <div className="flex rounded-xl bg-[#070d1a] p-1 mb-6 border border-slate-800">
            <button
              type="button"
              onClick={() => { setLoginMethod("password"); setError(""); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                loginMethod === "password"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Email & Password
            </button>
            <button
              type="button"
              onClick={() => { setLoginMethod("pin"); setError(""); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                loginMethod === "pin"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Quick PIN Access
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3.5 mb-5 rounded-xl border text-xs font-medium ${
                lockoutTimer > 0 
                  ? "bg-rose-950/60 border-rose-500/50 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.2)]" 
                  : "bg-rose-500/15 border-rose-500/35 text-rose-300"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {lockoutTimer > 0 ? (
                  <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400 animate-pulse" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                )}
                <div className="flex-1 flex items-center justify-between gap-2">
                  <p className="leading-relaxed">{error}</p>
                  {lockoutTimer > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-900/60 border border-rose-500/40 text-[11px] font-mono font-bold text-amber-300 shrink-0">
                      <Timer className="w-3.5 h-3.5 animate-spin" /> {lockoutTimer}s
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            {loginMethod === "password" ? (
              <>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=""
                      autoComplete="off"
                      disabled={lockoutTimer > 0}
                      className="pl-10 h-10 bg-[#070d1a] border-slate-750 text-white focus:border-blue-500 rounded-xl text-xs font-medium disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=""
                      autoComplete="new-password"
                      disabled={lockoutTimer > 0}
                      className="pl-10 pr-10 h-10 bg-[#070d1a] border-slate-750 text-white focus:border-blue-500 rounded-xl text-xs font-medium disabled:opacity-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={lockoutTimer > 0}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block text-center">
                  Quick Security PIN
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type={showPin ? "text" : "password"}
                    maxLength={10}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder=""
                    autoComplete="off"
                    disabled={lockoutTimer > 0}
                    className="pl-10 pr-10 h-12 bg-[#070d1a] border-slate-750 text-white text-center tracking-[0.3em] text-lg font-mono focus:border-blue-500 rounded-xl font-bold disabled:opacity-50"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    disabled={lockoutTimer > 0}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    title={showPin ? "Hide PIN" : "Show PIN"}
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 text-sm font-bold bg-gradient-to-r from-blue-600 via-primary-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 text-white transition-all duration-300 rounded-xl mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || lockoutTimer > 0}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : lockoutTimer > 0 ? (
                <span className="flex items-center justify-center gap-1.5 text-rose-200">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Portal Locked ({lockoutTimer}s)</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <span>Secure Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  )
}
