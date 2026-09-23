"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  FolderKanban, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  MessageCircle, 
  Plus, 
  ExternalLink, 
  RefreshCw, 
  ArrowUpRight, 
  Globe, 
  FileSpreadsheet, 
  FileText,
  Download,
  Copy,
  Check,
  ArrowRight,
  X,
  Search,
  FileCheck,
  UploadCloud,
  Paperclip,
  Smartphone,
  Server,
  TrendingUp,
  Cpu,
  Layers,
  HardDrive,
  Radio,
  ShoppingBag
} from "lucide-react"
import { 
  getStoredProjects, 
  saveStoredProjects,
  getProjectExpiryDetails, 
  ProjectRecord, 
  getStoredSettings,
  generateWhatsAppReminderMessage,
  getWhatsAppDirectUrl,
  exportProjectsToCSV,
  printProjectsPDFReport,
  syncAllDataWithSupabase,
  calculateProjectTotalRenewal
} from "@/lib/admin-store"

const EMPTY_PROJECT: Omit<ProjectRecord, "id" | "createdAt"> = {
  projectName: "",
  clientName: "",
  clientPhone: "",
  secondaryPhone: "",
  clientEmail: "",
  category: "Website",
  domainName: "",
  domainRegistrar: "GoDaddy",
  domainStartDate: new Date().toISOString().split("T")[0],
  domainExpiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
  domainRenewalAmount: 1199,
  hostingProvider: "Hostinger Cloud",
  hostingStartDate: new Date().toISOString().split("T")[0],
  hostingExpiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
  hostingRenewalAmount: 3499,
  amcAmount: 0,
  sslIncluded: true,
  status: "active",
  liveUrl: "",
  agreementPdfName: "",
  agreementPdfUrl: "",
  notes: "",

  // Mobile App extensions
  playStoreUrl: "",
  playConsoleStatus: "Published",
  appStoreUrl: "",
  appleDevExpiryDate: "",
  appleDevRenewalAmount: 0,
  backendProvider: "",
  backendExpiryDate: "",
  backendRenewalAmount: 0,
  databaseProvider: "",
  dltProvider: "",
  dltExpiryDate: "",
  dltRenewalAmount: 0,
  whatsappApiProvider: "",

  // ERP & Custom Software extensions
  softwareType: "Cloud Web ERP + Billing",
  backupProvider: "",
  licenseType: "Annual Subscription",

  // E-Commerce
  paymentGateway: "",

  // Digital Growth
  marketingServices: "SEO + Social Media",
  billingCycle: "Monthly Retainer",
  adAccountId: "",
}

export default function AdminDashboardPage() {
  const [projects, setProjects] = React.useState<ProjectRecord[]>(() => getStoredProjects())
  const [settings] = React.useState(() => getStoredSettings())
  const [dashboardSearch, setDashboardSearch] = React.useState("")
  const [selectedProjectForWA, setSelectedProjectForWA] = React.useState<ProjectRecord | null>(null)
  const [renewConfirmProject, setRenewConfirmProject] = React.useState<ProjectRecord | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [newProjectData, setNewProjectData] = React.useState<Omit<ProjectRecord, "id" | "createdAt">>(EMPTY_PROJECT)
  const [customMsg, setCustomMsg] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  const pdfInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    // Auto-sync with Supabase in background
    syncAllDataWithSupabase().then((result) => {
      if (result && result.projects) {
        setProjects(result.projects)
      }
    }).catch(() => {})
  }, [])

  // Helper for +1 year calculation preview
  const getPlusOneYear = (dateStr?: string) => {
    if (!dateStr) return "—"
    try {
      const d = new Date(dateStr)
      d.setFullYear(d.getFullYear() + 1)
      return d.toISOString().split("T")[0]
    } catch {
      return "—"
    }
  }

  // Helper to format live client website URL
  const getDirectUrl = (urlOrDomain?: string) => {
    if (!urlOrDomain) return ""
    if (urlOrDomain.startsWith("http://") || urlOrDomain.startsWith("https://")) {
      return urlOrDomain
    }
    return `https://${urlOrDomain}`
  }

  // Calculate metrics
  const projectsWithExpiry = React.useMemo(() => {
    return projects.map((p) => ({
      ...p,
      expiryDetails: getProjectExpiryDetails(p, settings.notifyDaysBefore || 30),
    }))
  }, [projects, settings])

  const totalProjects = projects.length
  const expiringSoonProjects = projectsWithExpiry.filter((p) => p.expiryDetails.isExpiringSoon && !p.expiryDetails.isExpired)
  const expiredProjects = projectsWithExpiry.filter((p) => p.expiryDetails.isExpired)
  const activeProjects = projectsWithExpiry.filter((p) => !p.expiryDetails.isExpiringSoon && !p.expiryDetails.isExpired)

  // Total renewal revenue from upcoming renewals
  const upcomingRenewalRevenue = expiringSoonProjects.reduce((acc, p) => {
    return acc + calculateProjectTotalRenewal(p)
  }, 0)

  const totalAnnualRevenue = projects.reduce((acc, p) => {
    return acc + calculateProjectTotalRenewal(p)
  }, 0)

  // Autocomplete dynamic suggestions from existing projects
  const uniqueHostingProviders = React.useMemo(() => {
    const defaults = ["Hostinger Cloud", "Hostinger", "Netlify", "Vercel", "AWS Lightsail", "AWS EC2", "DigitalOcean", "Cloudflare Pages", "Render", "HostGator", "Bluehost", "cPanel Shared", "VPS Hosting"]
    const fromProjects = projects.map(p => p.hostingProvider).filter(Boolean)
    return Array.from(new Set([...defaults, ...fromProjects]))
  }, [projects])

  const uniqueDomainRegistrars = React.useMemo(() => {
    const defaults = ["GoDaddy", "Hostinger", "Namecheap", "Google Domains", "Cloudflare", "BigRock", "Porkbun", "HostGator", "Bluehost"]
    const fromProjects = projects.map(p => p.domainRegistrar).filter(Boolean)
    return Array.from(new Set([...defaults, ...fromProjects]))
  }, [projects])

  // Filtered list for search results on dashboard
  const searchResults = React.useMemo(() => {
    if (!dashboardSearch.trim()) return []
    const query = dashboardSearch.toLowerCase()
    return projects.filter((p) => {
      return (
        p.projectName.toLowerCase().includes(query) ||
        p.clientName.toLowerCase().includes(query) ||
        p.domainName.toLowerCase().includes(query) ||
        p.clientPhone.includes(query)
      )
    })
  }, [projects, dashboardSearch])

  // Handle PDF file selection
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result as string
      setNewProjectData(prev => ({
        ...prev,
        agreementPdfName: file.name,
        agreementPdfUrl: base64,
      }))
    }
    reader.readAsDataURL(file)
  }

  // Direct Add Project Handler
  const handleSaveNewProject = (e: React.FormEvent) => {
    e.preventDefault()
    const newProj: ProjectRecord = {
      ...newProjectData,
      id: `proj_${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    const updated = [newProj, ...projects]
    setProjects(updated)
    saveStoredProjects(updated)
    setIsAddModalOpen(false)
    setNewProjectData(EMPTY_PROJECT)
  }

  // Quick 1-Year Renewal extension with confirmation
  const handleConfirmRenew = (projectId: string) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        const domExp = new Date(p.domainExpiryDate || new Date())
        domExp.setFullYear(domExp.getFullYear() + 1)
        
        const hostExp = new Date(p.hostingExpiryDate || new Date())
        hostExp.setFullYear(hostExp.getFullYear() + 1)

        return {
          ...p,
          domainExpiryDate: domExp.toISOString().split("T")[0],
          hostingExpiryDate: hostExp.toISOString().split("T")[0],
          status: "active" as const,
        }
      }
      return p
    })
    setProjects(updated)
    saveStoredProjects(updated)
    setRenewConfirmProject(null)
  }

  // Open WhatsApp Modal
  const openWhatsAppModal = (project: ProjectRecord) => {
    setSelectedProjectForWA(project)
    const msg = generateWhatsAppReminderMessage(project, settings)
    setCustomMsg(msg)
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(customMsg)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExportCSV = () => {
    const csvData = exportProjectsToCSV()
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `sri_web_squad_projects_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Get client avatar initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* HTML5 Datalists for Autocomplete Suggestions */}
      <datalist id="hosting-providers-list">
        {uniqueHostingProviders.map(item => (
          <option key={item} value={item} />
        ))}
      </datalist>

      <datalist id="domain-registrars-list">
        {uniqueDomainRegistrars.map(item => (
          <option key={item} value={item} />
        ))}
      </datalist>

      <datalist id="dashboard-backend-providers-list">
        <option value="Node.js Express / AWS EC2" />
        <option value="Next.js App Router / Vercel Serverless" />
        <option value="Firebase Cloud Functions + Firestore" />
        <option value="Supabase Edge Functions + Auth" />
        <option value="Python FastAPI / Render" />
        <option value="PHP Laravel / DigitalOcean Droplet" />
        <option value="Spring Boot / AWS Lightsail" />
      </datalist>

      <datalist id="dashboard-database-providers-list">
        <option value="Supabase PostgreSQL" />
        <option value="MongoDB Atlas Cloud" />
        <option value="Firebase Firestore Realtime" />
        <option value="MySQL on Hostinger Cloud" />
        <option value="AWS RDS PostgreSQL" />
        <option value="Neon Serverless Postgres" />
      </datalist>

      <datalist id="dashboard-dlt-providers-list">
        <option value="Fast2SMS Quick SMS API" />
        <option value="Jio DLT Enterprise" />
        <option value="Vodafone Idea DLT" />
        <option value="Textlocal SMS Gateway" />
        <option value="MSG91 SMS + OTP" />
      </datalist>

      <datalist id="dashboard-whatsapp-providers-list">
        <option value="Meta WhatsApp Cloud API (Official)" />
        <option value="AiSensy WhatsApp Business API" />
        <option value="Interakt Official WhatsApp Partner" />
        <option value="Wati Official WhatsApp API" />
        <option value="UltraMsg WhatsApp Web Gateway" />
      </datalist>

      <datalist id="dashboard-payment-gateways-list">
        <option value="Razorpay Standard PG" />
        <option value="PhonePe Payment Gateway" />
        <option value="Stripe Global Payments" />
        <option value="Cashfree Payments PG" />
        <option value="Paytm Payment Gateway" />
      </datalist>

      <datalist id="dashboard-deployment-types-list">
        <option value="Cloud Web ERP + Billing" />
        <option value="Desktop Software + Cloud Sync" />
        <option value="On-Premise Local Ubuntu Server" />
        <option value="Multi-Branch Cloud VPS" />
        <option value="Offline Desktop Single-User" />
      </datalist>

      <datalist id="dashboard-backup-providers-list">
        <option value="AWS S3 Cloud Auto-Backup" />
        <option value="Google Drive Cloud Sync" />
        <option value="Daily Automated PostgreSQL Dump" />
        <option value="Local Synology NAS Backup" />
        <option value="Hostinger Daily Backup" />
      </datalist>

      {/* Top Header */}
      <div className="flex flex-col sm:items-center sm:text-center max-w-3xl mx-auto space-y-1">
        <div className="flex items-center justify-between sm:justify-center w-full">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Dashboard
          </h1>
          <span className="sm:hidden text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
            {activeProjects.length} Active
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-300">
          Client projects, domain lifecycles, and renewal notifications.
        </p>
      </div>

      {/* Top Banner Alert (Compact Mobile & Premium Desktop) */}
      {(expiringSoonProjects.length > 0 || expiredProjects.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl sm:rounded-2xl p-3 sm:p-5 bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-transparent border border-amber-500/30 shadow-lg backdrop-blur-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/20 border border-amber-500/35 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-white text-xs sm:text-base tracking-tight">
                  Renewal Attention Required
                </h3>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black shrink-0">
                  {expiringSoonProjects.length + expiredProjects.length} Due
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[11px] sm:text-xs flex-wrap font-medium">
                {expiredProjects.length > 0 && (
                  <span className="text-rose-400 font-bold">
                    {expiredProjects.length} expired
                  </span>
                )}
                {expiringSoonProjects.length > 0 && (
                  <span className="text-slate-200">
                    {expiringSoonProjects.length} expiring in 30d
                  </span>
                )}
                <span className="text-emerald-300 font-mono font-bold bg-emerald-500/15 px-1.5 py-0.2 rounded border border-emerald-500/30">
                  Pending: ₹{upcomingRenewalRevenue.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href="/admin/projects?filter=expiring"
              className="w-full sm:w-auto text-center px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <span>Review Reminders</span>
              <ArrowRight className="w-3.5 h-3.5 font-bold" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Search Bar & Action Buttons Bar (Responsive Row) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Website / Client Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Quick search client, website, domain..."
            value={dashboardSearch}
            onChange={(e) => setDashboardSearch(e.target.value)}
            className="pl-9 sm:pl-10 h-9 sm:h-10 text-xs bg-[#0b1220] border-slate-750 text-white placeholder:text-slate-400 focus:border-blue-500 rounded-xl font-medium"
          />
          {dashboardSearch && (
            <button
              onClick={() => setDashboardSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={printProjectsPDFReport}
            className="hidden sm:inline-flex text-xs h-9 px-3.5 border-rose-500/30 bg-[#0b1220] hover:bg-rose-500/15 text-rose-300 hover:text-white font-bold transition-all shadow-sm"
            title="Print or export as PDF report"
          >
            <FileText className="w-4 h-4 mr-1.5 text-rose-400" /> Export PDF
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="hidden sm:inline-flex text-xs h-9 px-3.5 border-emerald-500/30 bg-[#0b1220] hover:bg-emerald-500/15 text-emerald-300 hover:text-white font-bold transition-all shadow-sm"
            title="Export CSV spreadsheet"
          >
            <FileSpreadsheet className="w-4 h-4 mr-1.5 text-emerald-400" /> Export CSV
          </Button>

          <Button
            size="sm"
            onClick={() => {
              setNewProjectData(EMPTY_PROJECT)
              setIsAddModalOpen(true)
            }}
            className="text-xs h-9 px-3 sm:px-4 bg-gradient-to-r from-blue-600 to-primary-600 hover:from-blue-500 hover:to-primary-500 text-white font-bold shadow-md shadow-blue-600/25 transition-all rounded-xl whitespace-nowrap flex items-center gap-1"
          >
            <Plus className="w-4 h-4 font-bold" />
            <span>Add Project</span>
          </Button>
        </div>
      </div>

      {/* Live Search Results Popup Dropdown / Panel */}
      {dashboardSearch.trim() !== "" && (
        <div className="p-4 rounded-2xl bg-[#0d1629] border border-slate-750 shadow-2xl space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <span className="font-bold text-slate-300">
              Search Results for &ldquo;{dashboardSearch}&rdquo; ({searchResults.length})
            </span>
            <button
              onClick={() => setDashboardSearch("")}
              className="text-slate-400 hover:text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>

          {searchResults.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center">
              No matching client projects or websites found.
            </p>
          ) : (
            <div className="divide-y divide-slate-800">
              {searchResults.map((proj) => (
                <div key={proj.id} className="py-2.5 flex items-center justify-between gap-3 hover:bg-[#131f3a]/60 px-2 rounded-lg transition-colors">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs truncate">{proj.projectName}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {proj.category}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
                      <span>{proj.clientName} ({proj.clientPhone})</span>
                      <span>•</span>
                      {proj.domainName ? (
                        <span className="font-mono text-blue-300">{proj.domainName}</span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      onClick={() => openWhatsAppModal(proj)}
                      className="h-7 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-1" /> WhatsApp
                    </Button>
                    <Link
                      href="/admin/projects"
                      className="h-7 px-2.5 rounded-lg border border-slate-750 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center transition-colors"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Metric Cards Grid - 2x2 on Mobile, 4 columns on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Card 1: Due in 30 Days */}
        <div className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border shadow-md transition-all flex flex-col justify-between ${
          expiringSoonProjects.length > 0 
            ? "bg-gradient-to-br from-[#18130c] to-[#0c1426] border-amber-500/40 hover:border-amber-400/60" 
            : "bg-[#0c1426] border-slate-800 hover:border-slate-750"
        }`}>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider truncate">Due in 30 Days</span>
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-300 shrink-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <h3 className="text-xl sm:text-3xl font-black text-amber-300">{expiringSoonProjects.length}</h3>
            <span className="text-[10px] sm:text-xs font-bold text-amber-300 bg-amber-500/20 px-1.5 sm:px-2.5 py-0.5 rounded-full border border-amber-500/30 font-mono truncate">
              ₹{upcomingRenewalRevenue.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-[10px] sm:text-xs font-medium text-slate-400 mt-1.5 sm:mt-3 truncate">Upcoming renewals</p>
        </div>

        {/* Card 2: Overdue / Expired */}
        <div className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border shadow-md transition-all flex flex-col justify-between ${
          expiredProjects.length > 0 
            ? "bg-gradient-to-br from-[#1c0d13] to-[#0c1426] border-rose-500/40 hover:border-rose-400/60" 
            : "bg-[#0c1426] border-slate-800 hover:border-slate-750"
        }`}>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider truncate">Overdue / Expired</span>
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center text-rose-300 shrink-0">
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <h3 className="text-xl sm:text-3xl font-black text-rose-400">{expiredProjects.length}</h3>
            <span className="text-[10px] sm:text-xs font-bold text-rose-300 bg-rose-500/20 px-1.5 sm:px-2.5 py-0.5 rounded-full border border-rose-500/30">
              Grace
            </span>
          </div>
          <p className="text-[10px] sm:text-xs font-medium text-slate-400 mt-1.5 sm:mt-3 truncate">Action required</p>
        </div>

        {/* Card 3: Total Projects */}
        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0c1426] border border-slate-800 shadow-md hover:border-blue-500/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider truncate">Total Projects</span>
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-300 shrink-0">
              <FolderKanban className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <h3 className="text-xl sm:text-3xl font-black text-white">{totalProjects}</h3>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-300 bg-emerald-500/20 px-1.5 sm:px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {activeProjects.length} Active
            </span>
          </div>
          <p className="text-[10px] sm:text-xs font-medium text-slate-400 mt-1.5 sm:mt-3 truncate">Active clients</p>
        </div>

        {/* Card 4: Total Annual Renewal */}
        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0c1426] border border-slate-800 shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider truncate">Annual Revenue</span>
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-300 shrink-0">
              <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <h3 className="text-xl sm:text-3xl font-black text-emerald-300 font-mono truncate">
              ₹{totalAnnualRevenue.toLocaleString("en-IN")}
            </h3>
            <span className="text-[10px] sm:text-xs font-bold text-blue-300 bg-blue-500/20 px-1.5 sm:px-2.5 py-0.5 rounded-full border border-blue-500/30">
              Yearly
            </span>
          </div>
          <p className="text-[10px] sm:text-xs font-medium text-slate-400 mt-1.5 sm:mt-3 truncate">Recurring value</p>
        </div>
      </div>

      {/* Priority Renewal Section (Mobile Cards + Desktop Table) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Action Required ({expiringSoonProjects.length + expiredProjects.length})
            </h2>
          </div>
          <Link 
            href="/admin/projects" 
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>View All ({totalProjects})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile View: Cards (< sm) */}
        <div className="block sm:hidden space-y-2.5">
          {[...expiredProjects, ...expiringSoonProjects].length === 0 ? (
            <div className="p-6 rounded-xl bg-[#0c1426] border border-slate-800 text-center text-slate-400">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto mb-1.5" />
              <p className="font-bold text-white text-xs">No renewals due in 30 days</p>
              <p className="text-[11px] text-slate-400 mt-0.5">All domains & hosting are active</p>
            </div>
          ) : (
            [...expiredProjects, ...expiringSoonProjects].map((proj) => {
              const totalCost = calculateProjectTotalRenewal(proj)
              const isExp = proj.expiryDetails.isExpired
              return (
                <div 
                  key={proj.id}
                  className="p-3.5 rounded-xl bg-[#0c1426] border border-slate-800 shadow-md space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-white text-xs truncate">{proj.projectName}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-750">
                          {proj.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5 flex items-center gap-1.5">
                        <span className="font-medium text-slate-200">{proj.clientName}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-400">{proj.clientPhone}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-emerald-300 font-mono block">
                        ₹{totalCost.toLocaleString("en-IN")}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isExp 
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" 
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}>
                        Exp: {proj.domainExpiryDate}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar on Mobile */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <Button
                      size="sm"
                      onClick={() => openWhatsAppModal(proj)}
                      className="flex-1 h-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Notice</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setRenewConfirmProject(proj)}
                      className="h-8 px-3 border-slate-750 bg-slate-850 hover:bg-blue-600 hover:border-blue-500 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3 text-blue-400" />
                      <span>+1 Yr</span>
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Desktop View: Table (>= sm) */}
        <div className="hidden sm:block rounded-2xl overflow-hidden bg-[#0c1426] border border-slate-800 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#101b33] text-slate-200 font-extrabold border-b border-slate-800 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-5 py-4">Project / Domain</th>
                  <th className="px-5 py-4">Client Contact</th>
                  <th className="px-5 py-4">Domain Expiry</th>
                  <th className="px-5 py-4">Hosting Server</th>
                  <th className="px-5 py-4">Renewal Amount</th>
                  <th className="px-5 py-4 text-right">Instant Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {[...expiredProjects, ...expiringSoonProjects].length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <p className="font-bold text-white text-sm">No renewals due in the next 30 days</p>
                      <p className="text-xs text-slate-400 mt-0.5">All client domains & hosting are active and healthy</p>
                    </td>
                  </tr>
                ) : (
                  [...expiredProjects, ...expiringSoonProjects].map((proj) => {
                    const totalCost = calculateProjectTotalRenewal(proj)
                    return (
                      <tr key={proj.id} className="hover:bg-[#121f3d] transition-colors bg-[#091020]/50">
                        {/* Project / Domain */}
                        <td className="px-5 py-4">
                          <div className="font-bold text-white text-sm flex items-center gap-2">
                            {proj.projectName}
                            {(proj.liveUrl || proj.domainName) && (
                              <a
                                href={getDirectUrl(proj.liveUrl || proj.domainName)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-white transition-colors inline-flex items-center p-0.5 rounded hover:bg-blue-600/30"
                                title={`Visit live site: ${proj.domainName}`}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {proj.agreementPdfUrl && (
                              <a
                                href={proj.agreementPdfUrl}
                                download={proj.agreementPdfName || `${proj.projectName}_invoice.pdf`}
                                className="text-cyan-400 hover:text-cyan-300 p-0.5 rounded hover:bg-cyan-500/20"
                                title={`Download PDF: ${proj.agreementPdfName || "Agreement"}`}
                              >
                                <Paperclip className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          
                          <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                            {proj.domainName ? (
                              <a
                                href={getDirectUrl(proj.liveUrl || proj.domainName)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 hover:text-white font-mono text-xs font-semibold transition-all"
                                title={`Open https://${proj.domainName}`}
                              >
                                <Globe className="w-3 h-3 text-blue-400" />
                                <span>{proj.domainName}</span>
                              </a>
                            ) : (
                              <span className="text-slate-500 font-mono text-xs">—</span>
                            )}
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-750">
                              {proj.category}
                            </span>
                          </div>
                        </td>

                        {/* Client Contact */}
                        <td className="px-5 py-4">
                          <div className="font-bold text-white text-xs">{proj.clientName}</div>
                          <div className="text-xs text-slate-300 font-mono font-medium mt-0.5">
                            {proj.clientPhone}
                          </div>
                        </td>

                        {/* Domain Expiry */}
                        <td className="px-5 py-4 font-mono">
                          <div className="text-amber-300 font-bold text-xs bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20 inline-block">
                            {proj.domainExpiryDate}
                          </div>
                        </td>

                        {/* Hosting Expiry */}
                        <td className="px-5 py-4">
                          <div className="text-slate-200 font-mono font-semibold text-xs">{proj.hostingExpiryDate}</div>
                          <div className="text-xs text-slate-400 mt-0.5 font-medium">{proj.hostingProvider}</div>
                        </td>

                        {/* Renewal Amount */}
                        <td className="px-5 py-4">
                          <div className="font-black text-emerald-300 font-mono text-sm">
                            ₹{totalCost.toLocaleString("en-IN")}
                          </div>
                        </td>

                        {/* Instant Actions */}
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={() => openWhatsAppModal(proj)}
                              className="h-8 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setRenewConfirmProject(proj)}
                              title="Extend +1 Year (Confirm)"
                              className="h-8 px-2.5 border-slate-750 bg-slate-850 hover:bg-blue-600 hover:border-blue-500 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1 transition-all"
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
                              <span>+1 Yr</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid: All Projects & Quick Operations */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* All Projects Overview List */}
        <div className="p-5 rounded-2xl bg-[#0c1426] border border-slate-800 shadow-md lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white">Client Portfolio</h3>
            <Link href="/admin/projects" className="text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline">
              View All ({totalProjects}) →
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => {
              return (
                <div
                  key={project.id}
                  className="p-3.5 rounded-xl bg-[#0f1930] border border-slate-800 hover:border-blue-500/50 transition-all flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-xs text-white shrink-0 shadow-sm">
                      {getInitials(project.clientName)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-white truncate">{project.projectName}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-750">
                          {project.category}
                        </span>
                        {project.agreementPdfUrl && (
                          <span className="text-[10px] text-cyan-400 flex items-center gap-0.5 font-semibold bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20">
                            <Paperclip className="w-2.5 h-2.5" /> PDF
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-300 flex items-center gap-2 mt-1">
                        <span className="font-medium text-slate-200">{project.clientName}</span>
                        <span>•</span>
                        {project.domainName ? (
                          <a
                            href={getDirectUrl(project.liveUrl || project.domainName)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-white hover:underline font-mono inline-flex items-center gap-1 font-semibold"
                            title={`Open https://${project.domainName}`}
                          >
                            <span>{project.domainName}</span>
                            <ExternalLink className="w-3 h-3 text-blue-400" />
                          </a>
                        ) : (
                          <span className="text-slate-500 font-mono">—</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openWhatsAppModal(project)}
                      className="p-2 rounded-xl bg-emerald-600/15 hover:bg-emerald-600 border border-emerald-500/25 text-emerald-300 hover:text-white transition-all shadow-sm"
                      title="Send WhatsApp Message"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Operations */}
        <div className="p-5 rounded-2xl bg-[#0c1426] border border-slate-800 shadow-md space-y-3">
          <h3 className="font-bold text-base text-white mb-3">Quick Actions</h3>
          
          <button
            onClick={() => {
              setNewProjectData(EMPTY_PROJECT)
              setIsAddModalOpen(true)
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0f1930] hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/40 text-slate-100 hover:text-white transition-all text-xs font-bold text-left shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-blue-400" />
              <span>Add New Client Project</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={printProjectsPDFReport}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0f1930] hover:bg-rose-600/20 border border-slate-800 hover:border-rose-500/40 text-slate-100 hover:text-white transition-all text-xs font-bold text-left shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-rose-400" />
              <span>Export PDF Master Report</span>
            </div>
            <Download className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={handleExportCSV}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0f1930] hover:bg-emerald-600/20 border border-slate-800 hover:border-emerald-500/40 text-slate-100 hover:text-white transition-all text-xs font-bold text-left shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export CSV Spreadsheet</span>
            </div>
            <Download className="w-4 h-4 text-slate-400" />
          </button>

          <Link
            href="/admin/settings"
            className="flex items-center justify-between p-3 rounded-xl bg-[#0f1930] hover:bg-green-600/20 border border-slate-800 hover:border-green-500/40 text-slate-100 hover:text-white transition-all text-xs font-bold shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span>Configure WhatsApp Template</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* WhatsApp Modal */}
      {selectedProjectForWA && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-[#0c1426] border border-slate-750 rounded-2xl shadow-2xl p-6 relative"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Send WhatsApp Renewal Notice</h3>
                  <p className="text-xs text-slate-300">
                    To: <span className="font-semibold text-white">{selectedProjectForWA.clientName}</span> ({selectedProjectForWA.clientPhone})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProjectForWA(null)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2.5 py-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200">Message Content Preview:</label>
              <textarea
                rows={10}
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-[#080e1c] border border-slate-800 text-xs font-mono text-slate-100 focus:border-emerald-500 focus:outline-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="text-xs border-slate-750 bg-slate-850 text-slate-100 hover:text-white font-bold"
              >
                {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProjectForWA(null)}
                  className="text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </Button>
                <a
                  href={getWhatsAppDirectUrl(selectedProjectForWA.clientPhone, customMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedProjectForWA(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Open in WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* RENEW CONFIRMATION MODAL */}
      {renewConfirmProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-[#0c1426] border border-slate-750 rounded-2xl shadow-2xl p-6 relative"
          >
            <div className="flex items-center gap-3 pb-3.5 border-b border-slate-800 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-white">Confirm 1-Year Extension</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Extend domain & hosting renewal dates by +1 Year.
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-[#080e1c] p-4 rounded-xl border border-slate-800 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-300 font-medium">Project:</span>
                <span className="font-bold text-white text-sm">{renewConfirmProject.projectName}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-300 font-medium">Client:</span>
                <span className="text-white font-semibold">{renewConfirmProject.clientName} ({renewConfirmProject.clientPhone})</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-300 font-medium">Domain ({renewConfirmProject.domainName}):</span>
                <span className="font-mono text-slate-200">
                  <span className="line-through text-slate-400 mr-1.5">{renewConfirmProject.domainExpiryDate}</span>
                  ➔ <span className="text-emerald-300 font-bold ml-1">{getPlusOneYear(renewConfirmProject.domainExpiryDate)}</span>
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-300 font-medium">Hosting ({renewConfirmProject.hostingProvider}):</span>
                <span className="font-mono text-slate-200">
                  <span className="line-through text-slate-400 mr-1.5">{renewConfirmProject.hostingExpiryDate}</span>
                  ➔ <span className="text-emerald-300 font-bold ml-1">{getPlusOneYear(renewConfirmProject.hostingExpiryDate)}</span>
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-300 font-bold">Total Renewal Fee:</span>
                <span className="font-mono font-black text-emerald-300 text-sm">
                  ₹{calculateProjectTotalRenewal(renewConfirmProject).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRenewConfirmProject(null)}
                className="text-xs border-slate-750 bg-slate-850 text-slate-200 hover:text-white font-bold"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleConfirmRenew(renewConfirmProject.id)}
                className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30"
              >
                <Check className="w-4 h-4" /> Confirm Renew (+1 Year)
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* DIRECT ADD PROJECT DYNAMIC MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl bg-[#0d1629] border-2 border-slate-750 rounded-2xl shadow-2xl p-6 sm:p-7 my-8 relative max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-750 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-lg text-white">Add New Client Project</h3>
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[11px] font-bold">
                    {newProjectData.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Save project requirements, deployment architecture, servers, and renewal lifecycle.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewProject} className="space-y-5">
              {/* Section 1: Client & Project Identity */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Client & Project Identity
                </h4>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">Project / App Name *</label>
                    <Input
                      placeholder={
                        newProjectData.category === "Mobile App" 
                          ? "e.g. Doctor Quick Patient App" 
                          : newProjectData.category === "ERP & Billing"
                          ? "e.g. Sri Textiles Billing ERP"
                          : newProjectData.category === "E-Commerce"
                          ? "e.g. Aura Luxe Online Store"
                          : "e.g. VKP Enterprises Website"
                      }
                      value={newProjectData.projectName}
                      onChange={(e) => setNewProjectData({ ...newProjectData, projectName: e.target.value })}
                      className="bg-[#070d1a] border-slate-700 text-xs text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">Client Contact Person *</label>
                    <Input
                      placeholder="e.g. S. Murugesan"
                      value={newProjectData.clientName}
                      onChange={(e) => setNewProjectData({ ...newProjectData, clientName: e.target.value })}
                      className="bg-[#070d1a] border-slate-700 text-xs text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">Primary Phone / WhatsApp *</label>
                    <Input
                      placeholder="+91 98401 23456"
                      value={newProjectData.clientPhone}
                      onChange={(e) => setNewProjectData({ ...newProjectData, clientPhone: e.target.value })}
                      className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">Service Category *</label>
                    <select
                      value={newProjectData.category}
                      onChange={(e) => setNewProjectData({ ...newProjectData, category: e.target.value as ProjectRecord["category"] })}
                      className="h-9 w-full rounded-xl border border-blue-500/50 bg-[#070d1a] px-3 text-xs text-white focus:outline-none focus:border-blue-500 font-bold text-blue-300"
                    >
                      <option value="Website">🌐 Website</option>
                      <option value="Web App">⚡ Web App</option>
                      <option value="Mobile App">📱 Mobile App (Android / iOS)</option>
                      <option value="ERP & Billing">🖥️ ERP & Billing Software</option>
                      <option value="E-Commerce">🛍️ E-Commerce Store</option>
                      <option value="Custom Software">⚙️ Custom Software</option>
                      <option value="Digital Growth">📈 Digital Growth / SEO</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* DYNAMIC CATEGORY SECTION: MOBILE APP */}
              {newProjectData.category === "Mobile App" && (
                <>
                  {/* App Stores & Accounts */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" /> App Stores & Developer Accounts
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-200">Google Play Store URL</label>
                        <Input
                          placeholder="https://play.google.com/store/apps/details?id=com..."
                          value={newProjectData.playStoreUrl || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, playStoreUrl: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Play Console Status</label>
                        <select
                          value={newProjectData.playConsoleStatus || "Published"}
                          onChange={(e) => setNewProjectData({ ...newProjectData, playConsoleStatus: e.target.value as ProjectRecord["playConsoleStatus"] })}
                          className="h-9 w-full rounded-xl border border-slate-700 bg-[#070d1a] px-3 text-xs text-white font-medium"
                        >
                          <option value="Published">Published Live</option>
                          <option value="In Review">In Review</option>
                          <option value="Account Setup">Account Setup / Testing</option>
                          <option value="Pending">Pending Deployment</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Apple App Store URL</label>
                        <Input
                          placeholder="https://apps.apple.com/app/..."
                          value={newProjectData.appStoreUrl || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, appStoreUrl: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Apple Dev Account Expiry</label>
                        <Input
                          type="date"
                          value={newProjectData.appleDevExpiryDate || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, appleDevExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Apple Dev Fee (₹ / $99)</label>
                        <Input
                          type="number"
                          placeholder="8900"
                          value={newProjectData.appleDevRenewalAmount === 0 ? "" : newProjectData.appleDevRenewalAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, appleDevRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Backend & Database Cloud Infrastructure */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" /> Backend API & Database Infrastructure
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Backend Server Provider</label>
                        <Input
                          placeholder="Node.js on AWS / Firebase / Supabase"
                          list="dashboard-backend-providers-list"
                          value={newProjectData.backendProvider || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, backendProvider: e.target.value, hostingProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Database Engine / Provider</label>
                        <Input
                          placeholder="Supabase PostgreSQL / MongoDB Atlas"
                          list="dashboard-database-providers-list"
                          value={newProjectData.databaseProvider || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, databaseProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Backend Hosting Expiry Date</label>
                        <Input
                          type="date"
                          value={newProjectData.backendExpiryDate || newProjectData.hostingExpiryDate || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, backendExpiryDate: e.target.value, hostingExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Backend Server Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          placeholder="4500"
                          value={newProjectData.backendRenewalAmount || newProjectData.hostingRenewalAmount || ""}
                          onChange={(e) => {
                            const val = e.target.value === "" ? 0 : Number(e.target.value)
                            setNewProjectData({ ...newProjectData, backendRenewalAmount: val, hostingRenewalAmount: val })
                          }}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* DLT, SMS & WhatsApp Gateway */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5" /> DLT, SMS & WhatsApp Gateways
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">DLT / Bulk SMS Provider</label>
                        <Input
                          placeholder="Fast2SMS / Jio DLT / Textlocal"
                          list="dashboard-dlt-providers-list"
                          value={newProjectData.dltProvider || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, dltProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">WhatsApp Notification API</label>
                        <Input
                          placeholder="Meta Cloud API / Interakt / AiSensy"
                          list="dashboard-whatsapp-providers-list"
                          value={newProjectData.whatsappApiProvider || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, whatsappApiProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">DLT / SMS Expiry Date (Optional)</label>
                        <Input
                          type="date"
                          value={newProjectData.dltExpiryDate || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, dltExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">DLT / SMS Annual Fee (₹)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={newProjectData.dltRenewalAmount === 0 ? "" : newProjectData.dltRenewalAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, dltRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* API Domain & Landing */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> API Domain & App Landing Page
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">API / App Domain Name</label>
                        <Input
                          placeholder="e.g. api.doctorquick.in"
                          value={newProjectData.domainName}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainName: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Registrar</label>
                        <Input
                          placeholder="GoDaddy / Hostinger / Namecheap"
                          list="domain-registrars-list"
                          value={newProjectData.domainRegistrar}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainRegistrar: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Expiry Date</label>
                        <Input
                          type="date"
                          value={newProjectData.domainExpiryDate}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          placeholder="1199"
                          value={newProjectData.domainRenewalAmount === 0 ? "" : newProjectData.domainRenewalAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* DYNAMIC CATEGORY SECTION: ERP & BILLING / CUSTOM SOFTWARE */}
              {(newProjectData.category === "ERP & Billing" || newProjectData.category === "Custom Software") && (
                <>
                  {/* Deployment & License Setup */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" /> Software Deployment & License Setup
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Deployment Architecture</label>
                        <Input
                          placeholder="Cloud Web ERP / Desktop + Cloud Sync / On-Premise"
                          list="dashboard-deployment-types-list"
                          value={newProjectData.softwareType || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, softwareType: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Software License Model</label>
                        <Input
                          placeholder="Annual Subscription / Perpetual + AMC"
                          value={newProjectData.licenseType || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, licenseType: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cloud Server & Auto-Backup Storage */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5" /> Server Hosting & Auto-Backup Cloud
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Server / VPS Host</label>
                        <Input
                          placeholder="AWS Lightsail / Hostinger VPS / Ubuntu Server"
                          list="hosting-providers-list"
                          value={newProjectData.hostingProvider}
                          onChange={(e) => setNewProjectData({ ...newProjectData, hostingProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Auto-Backup & Storage Cloud</label>
                        <Input
                          placeholder="AWS S3 Cloud Auto-Backup / Google Drive Sync"
                          list="dashboard-backup-providers-list"
                          value={newProjectData.backupProvider || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, backupProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Server Renewal / Expiry Date</label>
                        <Input
                          type="date"
                          value={newProjectData.hostingExpiryDate}
                          onChange={(e) => setNewProjectData({ ...newProjectData, hostingExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Server Hosting Fee (₹)</label>
                        <Input
                          type="number"
                          placeholder="5999"
                          value={newProjectData.hostingRenewalAmount === 0 ? "" : newProjectData.hostingRenewalAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, hostingRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Transactional SMS & WhatsApp Gateway */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5" /> SMS & WhatsApp Invoice Gateway
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">DLT / SMS Gateway</label>
                        <Input
                          placeholder="Fast2SMS / Jio DLT"
                          list="dashboard-dlt-providers-list"
                          value={newProjectData.dltProvider || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, dltProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">WhatsApp Notification API</label>
                        <Input
                          placeholder="Meta Cloud API / UltraMsg"
                          list="dashboard-whatsapp-providers-list"
                          value={newProjectData.whatsappApiProvider || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, whatsappApiProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Web Portal Domain */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> Web Portal / ERP Subdomain
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Portal Domain / Subdomain</label>
                        <Input
                          placeholder="e.g. app.sritextiles.com"
                          value={newProjectData.domainName}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainName: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Expiry Date</label>
                        <Input
                          type="date"
                          value={newProjectData.domainExpiryDate}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          placeholder="1499"
                          value={newProjectData.domainRenewalAmount === 0 ? "" : newProjectData.domainRenewalAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">AMC Maintenance & Support (₹)</label>
                        <Input
                          type="number"
                          placeholder="3500"
                          value={newProjectData.amcAmount === 0 ? "" : newProjectData.amcAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, amcAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono font-bold text-emerald-400"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* DYNAMIC CATEGORY SECTION: E-COMMERCE */}
              {newProjectData.category === "E-Commerce" && (
                <>
                  {/* Domain */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> Store Domain Details
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Online Store Domain *</label>
                        <Input
                          placeholder="e.g. auraluxe.shop"
                          value={newProjectData.domainName}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainName: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Registrar</label>
                        <Input
                          placeholder="GoDaddy / Namecheap"
                          list="domain-registrars-list"
                          value={newProjectData.domainRegistrar}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainRegistrar: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Expiry Date *</label>
                        <Input
                          type="date"
                          value={newProjectData.domainExpiryDate}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          placeholder="1599"
                          value={newProjectData.domainRenewalAmount === 0 ? "" : newProjectData.domainRenewalAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hosting & Platform */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" /> E-Commerce Platform & Hosting
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Platform / Cloud Host</label>
                        <Input
                          placeholder="Shopify / WooCommerce VPS / Next.js Store"
                          list="hosting-providers-list"
                          value={newProjectData.hostingProvider}
                          onChange={(e) => setNewProjectData({ ...newProjectData, hostingProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Hosting Expiry Date *</label>
                        <Input
                          type="date"
                          value={newProjectData.hostingExpiryDate}
                          onChange={(e) => setNewProjectData({ ...newProjectData, hostingExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Hosting Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          placeholder="4200"
                          value={newProjectData.hostingRenewalAmount === 0 ? "" : newProjectData.hostingRenewalAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, hostingRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Payment Gateway</label>
                        <Input
                          placeholder="Razorpay PG / PhonePe PG / Cashfree"
                          list="dashboard-payment-gateways-list"
                          value={newProjectData.paymentGateway || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, paymentGateway: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-semibold text-emerald-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">WhatsApp Order Alerts</label>
                        <Input
                          placeholder="AiSensy / Meta Cloud API"
                          list="dashboard-whatsapp-providers-list"
                          value={newProjectData.whatsappApiProvider || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, whatsappApiProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">AMC Maintenance Fee (₹)</label>
                        <Input
                          type="number"
                          placeholder="2500"
                          value={newProjectData.amcAmount === 0 ? "" : newProjectData.amcAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, amcAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* DYNAMIC CATEGORY SECTION: DIGITAL GROWTH */}
              {newProjectData.category === "Digital Growth" && (
                <>
                  {/* Campaign Scope */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" /> Marketing Services & Scope
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-200">Services Included</label>
                        <Input
                          placeholder="SEO Ranking + Google Ads + Meta / Instagram Ads + Content"
                          value={newProjectData.marketingServices || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, marketingServices: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Billing Cycle</label>
                        <select
                          value={newProjectData.billingCycle || "Monthly Retainer"}
                          onChange={(e) => setNewProjectData({ ...newProjectData, billingCycle: e.target.value })}
                          className="h-9 w-full rounded-xl border border-slate-700 bg-[#070d1a] px-3 text-xs text-white font-medium"
                        >
                          <option value="Monthly Retainer">Monthly Retainer</option>
                          <option value="Quarterly Retainer">Quarterly Retainer</option>
                          <option value="Half-Yearly">Half-Yearly (6 Months)</option>
                          <option value="Annual Retainer">Annual Retainer</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Retainer Fee per Cycle (₹)</label>
                        <Input
                          type="number"
                          placeholder="15000"
                          value={newProjectData.hostingRenewalAmount === 0 ? "" : newProjectData.hostingRenewalAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, hostingRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono font-bold text-emerald-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Next Renewal / Billing Date</label>
                        <Input
                          type="date"
                          value={newProjectData.hostingExpiryDate}
                          onChange={(e) => setNewProjectData({ ...newProjectData, hostingExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Google Ads / Meta CID / ID</label>
                        <Input
                          placeholder="e.g. 123-456-7890 (Google Ads)"
                          value={newProjectData.adAccountId || ""}
                          onChange={(e) => setNewProjectData({ ...newProjectData, adAccountId: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* DYNAMIC CATEGORY SECTION: DEFAULT (WEBSITE / WEB APP) */}
              {(newProjectData.category === "Website" || newProjectData.category === "Web App") && (
                <>
                  {/* Domain Details */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> Domain Lifecycle Details
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Name *</label>
                        <Input
                          placeholder="e.g. vkpenterprises.in"
                          value={newProjectData.domainName}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainName: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Registrar</label>
                        <Input
                          placeholder="GoDaddy / Hostinger / Namecheap"
                          list="domain-registrars-list"
                          value={newProjectData.domainRegistrar}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainRegistrar: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Expiry Date *</label>
                        <Input
                          type="date"
                          value={newProjectData.domainExpiryDate}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          placeholder="1199"
                          value={newProjectData.domainRenewalAmount === 0 ? "" : newProjectData.domainRenewalAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, domainRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hosting Server */}
                  <div className="space-y-3 pt-3 border-t border-slate-750">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5" /> Hosting Server & Maintenance
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Hosting Provider</label>
                        <Input
                          placeholder="Hostinger Cloud / Netlify / Vercel / AWS"
                          list="hosting-providers-list"
                          value={newProjectData.hostingProvider}
                          onChange={(e) => setNewProjectData({ ...newProjectData, hostingProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Hosting Expiry Date *</label>
                        <Input
                          type="date"
                          value={newProjectData.hostingExpiryDate}
                          onChange={(e) => setNewProjectData({ ...newProjectData, hostingExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Hosting Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          placeholder="3499"
                          value={newProjectData.hostingRenewalAmount === 0 ? "" : newProjectData.hostingRenewalAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, hostingRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">AMC Maintenance Fee (₹)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={newProjectData.amcAmount === 0 ? "" : newProjectData.amcAmount}
                          onChange={(e) => setNewProjectData({ ...newProjectData, amcAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Total Live Renewal Amount Preview Box */}
              <div className="p-3.5 rounded-xl bg-[#070d1a] border border-blue-500/30 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Total Calculated Annual Renewal:</span>
                <span className="font-mono text-base font-black text-emerald-300">
                  ₹{calculateProjectTotalRenewal(newProjectData as ProjectRecord).toLocaleString("en-IN")}
                </span>
              </div>

              {/* Client Agreement / Invoice PDF */}
              <div className="space-y-2 pt-3 border-t border-slate-750">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5" /> Optional Client Agreement / Invoice PDF
                  </h4>
                  {newProjectData.agreementPdfName && (
                    <button
                      type="button"
                      onClick={() => setNewProjectData(prev => ({ ...prev, agreementPdfName: "", agreementPdfUrl: "" }))}
                      className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                    >
                      Remove File ✕
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={pdfInputRef}
                  onChange={handlePdfUpload}
                  accept=".pdf"
                  className="hidden"
                />

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => pdfInputRef.current?.click()}
                    className="text-xs border-slate-700 bg-[#070d1a] hover:bg-slate-800 text-slate-200 font-semibold"
                  >
                    <UploadCloud className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                    {newProjectData.agreementPdfName ? "Replace PDF File" : "Choose PDF Document"}
                  </Button>

                  {newProjectData.agreementPdfName && (
                    <span className="text-xs text-cyan-300 font-medium truncate flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {newProjectData.agreementPdfName}
                    </span>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1 pt-2 border-t border-slate-750">
                <label className="text-xs font-bold text-slate-200">Notes / Client Remarks</label>
                <Textarea
                  rows={2}
                  placeholder="Additional server credentials, staging links, or client preferences..."
                  value={newProjectData.notes}
                  onChange={(e) => setNewProjectData({ ...newProjectData, notes: e.target.value })}
                  className="bg-[#070d1a] border-slate-700 text-xs text-white"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-750">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-300 hover:text-white text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 text-xs font-bold shadow-md shadow-blue-600/30"
                >
                  Save Project
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
