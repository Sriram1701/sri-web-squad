"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import logoImg from "@/app/icon.png"
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  Users, 
  LogOut, 
  Globe, 
  Menu, 
  X, 
  ExternalLink,
  Shield,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { 
  checkAdminAuth, 
  setAdminAuth, 
} from "@/lib/admin-store"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  // Check auth
  React.useEffect(() => {
    const isAuth = checkAdminAuth()
    if (!isAuth) {
      router.push("/admin/login")
      return
    }
    setIsAuthenticated(true)
  }, [router, pathname])

  const handleSignOut = () => {
    setAdminAuth(false)
    router.push("/admin/login")
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-300">Verifying Admin Access...</span>
        </div>
      </div>
    )
  }

  const navLinks = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      name: "Leads & Inquiries",
      href: "/admin/leads",
      icon: Users,
    },
    {
      name: "Settings & Backups",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#060a12] text-slate-100 font-sans selection:bg-primary-500/30 selection:text-white">
      {/* Sidebar - Desktop Collapsible with Mini & Full Modes */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-[72px]"
        } bg-[#0c1426] border-r border-slate-800 flex flex-col hidden md:flex shrink-0 backdrop-blur-2xl transition-all duration-300 ease-in-out z-20 shadow-2xl`}
      >
        {/* Brand Header */}
        <div className={`h-16 flex items-center border-b border-slate-800 ${
          isSidebarOpen ? "justify-between px-3.5" : "justify-center px-2"
        }`}>
          {isSidebarOpen ? (
            <>
              {/* Full Brand Info with Round Logo */}
              <Link href="/admin" className="flex items-center gap-2.5 min-w-0 group">
                <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700/80 p-1 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/15 group-hover:border-blue-400 transition-colors overflow-hidden">
                  <Image 
                    src={logoImg} 
                    alt="Sri Web Squad Logo" 
                    width={32} 
                    height={32} 
                    className="w-full h-full object-contain rounded-full" 
                    priority 
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-black text-sm tracking-tight text-white block truncate">
                    Sri Web Squad
                  </span>
                  <span className="text-[11px] font-bold text-blue-300 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-blue-400 shrink-0" /> Admin Workspace
                  </span>
                </div>
              </Link>

              {/* Styled Collapse Button Container */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 text-slate-200 hover:text-white transition-all shadow-md shrink-0 group"
                title="Collapse Sidebar"
                aria-label="Collapse Sidebar"
              >
                <ChevronLeft className="w-4 h-4 text-blue-400 group-hover:text-white" />
              </button>
            </>
          ) : (
            /* Collapsed Brand Icon with Round Logo & Expand Button */
            <div className="flex items-center justify-center w-full">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="w-10 h-10 rounded-full bg-slate-900 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 p-1 flex items-center justify-center relative group transition-all shadow-md overflow-hidden"
                title="Expand Sidebar"
                aria-label="Expand Sidebar"
              >
                <Image 
                  src={logoImg} 
                  alt="Sri Web Squad Logo" 
                  width={28} 
                  height={28} 
                  className="w-full h-full object-contain rounded-full group-hover:opacity-10 transition-opacity" 
                  priority 
                />
                <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4 text-white font-bold" />
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Expand Bar below header if collapsed */}
        {!isSidebarOpen && (
          <div className="px-2 pt-2.5 pb-1 flex justify-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-7 rounded-lg bg-slate-800 hover:bg-blue-600 border border-slate-750 hover:border-blue-400 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm"
              title="Expand Sidebar"
            >
              <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
            </button>
          </div>
        )}

        {/* Navigation Items (High Contrast) */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1.5">
          {isSidebarOpen && (
            <div className="px-3 pb-1 text-[11px] font-black uppercase tracking-wider text-blue-400">
              Menu
            </div>
          )}
          
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            
            if (isSidebarOpen) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white border border-blue-400/50 shadow-md shadow-blue-600/30"
                      : "text-slate-200 hover:bg-slate-800/80 hover:text-white border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-blue-400"}`} />
                  <span className="truncate">{link.name}</span>
                </Link>
              )
            }

            // Collapsed icon-only link with tooltip
            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.name}
                className={`flex items-center justify-center w-11 h-11 mx-auto rounded-xl text-xs font-bold transition-all duration-150 relative group ${
                  isActive
                    ? "bg-blue-600 text-white border border-blue-400/50 shadow-md shadow-blue-600/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-blue-400 group-hover:text-white"}`} />
                {/* Floating tooltip */}
                <span className="absolute left-full ml-3 px-3 py-1 bg-slate-900 text-white border border-slate-700 text-xs font-bold rounded-lg shadow-2xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                  {link.name}
                </span>
              </Link>
            )
          })}

          {/* Website Section */}
          {isSidebarOpen ? (
            <>
              <div className="pt-5 px-3 pb-1 text-[11px] font-black uppercase tracking-wider text-blue-400">
                Website
              </div>
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all border border-transparent"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Public Website</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </>
          ) : (
            <>
              <div className="my-3 border-t border-slate-800 mx-1" />
              <Link
                href="/"
                target="_blank"
                title="Public Website"
                className="flex items-center justify-center w-11 h-11 mx-auto rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent transition-all relative group"
              >
                <Globe className="w-5 h-5 shrink-0 text-emerald-400 group-hover:text-white" />
                <span className="absolute left-full ml-3 px-3 py-1 bg-slate-900 text-white border border-slate-700 text-xs font-bold rounded-lg shadow-2xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                  Public Website
                </span>
              </Link>
            </>
          )}
        </nav>

        {/* Sign Out Footer */}
        <div className={`border-t border-slate-800 ${isSidebarOpen ? "p-3" : "p-2 flex justify-center"}`}>
          {isSidebarOpen ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2.5 px-3.5 py-2.5 w-full rounded-xl text-xs font-bold text-rose-300 hover:bg-rose-500/20 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="flex items-center justify-center w-11 h-11 rounded-xl text-rose-400 hover:bg-rose-500/20 hover:text-white transition-colors relative group"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="absolute left-full ml-3 px-3 py-1 bg-slate-900 text-rose-300 border border-slate-700 text-xs font-bold rounded-lg shadow-2xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                Sign Out
              </span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="h-14 md:hidden flex items-center justify-between px-4 bg-[#0c1426] border-b border-slate-800 backdrop-blur-xl z-30 relative">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700/80 p-0.5 flex items-center justify-center shrink-0 overflow-hidden">
              <Image 
                src={logoImg} 
                alt="Sri Web Squad" 
                width={28} 
                height={28} 
                className="w-full h-full object-contain rounded-full" 
              />
            </div>
            <span className="font-bold text-xs text-white">Sri Web Squad Admin</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0c1426] border-b border-slate-800 p-3 space-y-1.5 z-20 shadow-xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                    isActive ? "bg-blue-600 text-white shadow-md" : "text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              )
            })}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center px-1">
              <Link
                href="/"
                target="_blank"
                className="text-xs text-emerald-400 flex items-center gap-1.5 py-1.5 font-bold"
              >
                <Globe className="w-3.5 h-3.5" /> Public Website
              </Link>
              <button
                onClick={handleSignOut}
                className="text-xs text-rose-400 font-bold py-1.5"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#060a12] transition-all duration-300">
          {children}
        </div>
      </main>
    </div>
  )
}
