"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Code2, Lock, Mail } from "lucide-react"

export default function AdminLogin() {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Supabase auth logic would go here
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/admin"
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-lg bg-primary-500/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="p-8 sm:p-10" hoverEffect={false}>
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Access</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Sri Web Squad Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input type="email" placeholder="admin@sriwebsquad.com" className="pl-10" required />
              </div>
            </div>
            
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>

            <Button type="submit" className="w-full shadow-lg shadow-primary-500/30" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  )
}
