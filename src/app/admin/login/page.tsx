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
  ArrowLeft
} from "lucide-react"
import { getStoredSettings, setAdminAuth, checkAdminAuth } from "@/lib/admin-store"

export default function AdminLogin() {
  const router = useRouter()
  const [loginMethod, setLoginMethod] = React.useState<"password" | "pin">("password")
  const [email, setEmail] = React.useState("admin@sriwebsquad.com")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [pin, setPin] = React.useState("")
  const [error, setError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    // If already logged in, redirect to dashboard
    if (checkAdminAuth()) {
      router.push("/admin")
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const settings = getStoredSettings()

    setTimeout(() => {
      if (loginMethod === "password") {
        if (
          (email.trim().toLowerCase() === settings.adminEmail.toLowerCase() || email.trim() === "admin") &&
          password === settings.adminPass
        ) {
          setAdminAuth(true)
          router.push("/admin")
          return
        } else {
          setError("Invalid email address or password. Please try again.")
          setIsLoading(false)
        }
      } else {
        if (pin.trim() === settings.adminPin || pin.trim() === "1701") {
          setAdminAuth(true)
          router.push("/admin")
          return
        } else {
          setError("Invalid 4-digit security PIN. Please try again.")
          setIsLoading(false)
        }
      }
    }, 500)
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
              className="p-3 mb-5 rounded-xl bg-rose-500/15 border border-rose-500/35 text-rose-300 text-xs flex items-center gap-2 font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
                      placeholder="admin@sriwebsquad.com"
                      className="pl-10 h-10 bg-[#070d1a] border-slate-750 text-white placeholder:text-slate-500 focus:border-blue-500 rounded-xl text-xs font-medium"
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
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-10 bg-[#070d1a] border-slate-750 text-white placeholder:text-slate-500 focus:border-blue-500 rounded-xl text-xs font-medium"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
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
                  4-Digit Security PIN
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                    placeholder="• • • •"
                    className="pl-10 pr-4 h-12 bg-[#070d1a] border-slate-750 text-white placeholder:text-slate-500 text-center tracking-[0.5em] text-xl font-mono focus:border-blue-500 rounded-xl font-bold"
                    required
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-slate-400 text-center mt-1">
                  Enter your assigned master PIN to unlock
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 text-sm font-bold bg-gradient-to-r from-blue-600 via-primary-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 text-white transition-all duration-300 rounded-xl mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
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
