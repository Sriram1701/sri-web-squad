import { Metadata } from "next"
import Link from "next/link"
import { Code2, LayoutDashboard, FolderKanban, Settings, Users, LogOut } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard | Sri Web Squad",
  description: "Secure admin dashboard for managing Sri Web Squad website content.",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">
            <FolderKanban className="w-5 h-5" /> Projects
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">
            <Users className="w-5 h-5" /> Leads & Contacts
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="md:hidden font-bold">Admin Panel</div>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-medium">
              AD
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
