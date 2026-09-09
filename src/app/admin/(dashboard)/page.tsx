"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Users, FolderKanban, MessageSquare, Eye } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { name: "Total Projects", value: "24", icon: FolderKanban, change: "+12%" },
    { name: "Active Leads", value: "15", icon: Users, change: "+5%" },
    { name: "Messages", value: "48", icon: MessageSquare, change: "+18%" },
    { name: "Page Views", value: "2.4k", icon: Eye, change: "+24%" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400">Welcome back, Admin.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <GlassCard key={stat.name} className="p-6" hoverEffect={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <GlassCard className="p-6" hoverEffect={false}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Leads</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">John Doe {i}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">john.doe{i}@example.com</p>
                </div>
                <button className="text-primary-600 hover:underline text-sm font-medium">View</button>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6" hoverEffect={false}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 font-medium">
              + Add New Project
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 font-medium">
              + Update Pricing Plan
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 font-medium">
              ↓ Download Leads CSV
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
