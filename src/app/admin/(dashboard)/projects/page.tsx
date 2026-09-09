"use client"

import * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2, Search, Upload } from "lucide-react"

export default function ProjectsAdmin() {
  const [isAdding, setIsAdding] = React.useState(false)

  const dummyProjects = [
    { id: 1, title: "E-Commerce Platform", client: "RetailStyle Co.", category: "Website" },
    { id: 2, title: "Health Tracker App", client: "FitLife", category: "App" },
    { id: 3, title: "School ERP System", client: "EduGlobal Academy", category: "Software" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Projects</h1>
          <p className="text-slate-500 dark:text-slate-400">Add, edit, or remove portfolio projects.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="shrink-0 shadow-lg shadow-primary-500/20">
          <Plus className="w-4 h-4 mr-2" /> {isAdding ? "Cancel" : "Add New Project"}
        </Button>
      </div>

      {isAdding && (
        <GlassCard className="p-6" hoverEffect={false}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Add New Project</h3>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Title</label>
                <Input placeholder="e.g. AI Customer Support" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Client Name</label>
                <Input placeholder="e.g. TechSolutions" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                <select className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-slate-800 dark:bg-slate-900">
                  <option>Website</option>
                  <option>App</option>
                  <option>Software</option>
                  <option>AI</option>
                  <option>Dashboard</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Image (Upload)</label>
                <div className="flex h-12 w-full rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 items-center px-4 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Upload className="w-4 h-4 text-slate-500 mr-2" />
                  <span className="text-sm text-slate-500">Click to upload from Supabase Storage</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
              <Textarea placeholder="Project description..." />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Live URL</label>
                <Input placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">GitHub URL</label>
                <Input placeholder="https://github.com/..." />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="button" onClick={() => setIsAdding(false)}>Save Project</Button>
            </div>
          </form>
        </GlassCard>
      )}

      <GlassCard className="p-0 overflow-hidden" hoverEffect={false}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input className="pl-9 h-10" placeholder="Search projects..." />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {dummyProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{project.title}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{project.client}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-medium border border-primary-100 dark:border-primary-800">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
