"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  Globe, 
  Server, 
  Phone, 
  MessageCircle, 
  RefreshCw, 
  Check, 
  Copy, 
  AlertTriangle, 
  ExternalLink,
  ShieldCheck,
  X,
  FileSpreadsheet,
  FileText,
  Paperclip,
  UploadCloud,
  FileCheck,
  Smartphone,
  CreditCard,
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
  calculateProjectTotalRenewal,
  ProjectRecord, 
  getStoredSettings,
  generateWhatsAppReminderMessage,
  getWhatsAppDirectUrl,
  exportProjectsToCSV,
  printProjectsPDFReport,
  syncAllDataWithSupabase
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

  // Mobile App
  playStoreUrl: "",
  playConsoleStatus: "Published",
  appStoreUrl: "",
  appleDevExpiryDate: "",
  appleDevRenewalAmount: 0,
  backendProvider: "Node.js on AWS",
  backendExpiryDate: "",
  backendRenewalAmount: 0,
  databaseProvider: "Supabase PostgreSQL",
  dltProvider: "",
  dltExpiryDate: "",
  dltRenewalAmount: 0,
  whatsappApiProvider: "",

  // ERP / Software
  softwareType: "Cloud Web ERP + Billing",
  backupProvider: "AWS S3 Cloud Auto-Backup",
  licenseType: "Annual Subscription",

  // E-Commerce
  paymentGateway: "Razorpay PG",

  // Digital Growth
  marketingServices: "SEO + Google Ads + Meta Ads",
  billingCycle: "Monthly Retainer",
  adAccountId: "",
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = React.useState<ProjectRecord[]>(() => getStoredProjects())
  const [settings] = React.useState(() => getStoredSettings())
  const [searchTerm, setSearchTerm] = React.useState("")
  const [activeTab, setActiveTab] = React.useState<"all" | "expiring_30" | "expired">("all")
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all")
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [editingProjectId, setEditingProjectId] = React.useState<string | null>(null)
  const [formData, setFormData] = React.useState<Omit<ProjectRecord, "id" | "createdAt">>(EMPTY_PROJECT)
  const pdfInputRef = React.useRef<HTMLInputElement>(null)
  
  // WhatsApp Modal
  const [selectedForWA, setSelectedForWA] = React.useState<ProjectRecord | null>(null)
  const [waMessageText, setWaMessageText] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  // Confirmation Modal states
  const [deleteConfirmProject, setDeleteConfirmProject] = React.useState<ProjectRecord | null>(null)
  const [renewConfirmProject, setRenewConfirmProject] = React.useState<ProjectRecord | null>(null)

  React.useEffect(() => {
    syncAllDataWithSupabase().then((result) => {
      if (result && result.projects) {
        setProjects(result.projects)
      }
    }).catch(() => {})
  }, [])

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

  // Handle PDF file selection
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result as string
      setFormData(prev => ({
        ...prev,
        agreementPdfName: file.name,
        agreementPdfUrl: base64,
      }))
    }
    reader.readAsDataURL(file)
  }

  // Process and filter projects
  const processedProjects = React.useMemo(() => {
    return projects.map((p) => ({
      ...p,
      expiryDetails: getProjectExpiryDetails(p, settings.notifyDaysBefore || 30),
    }))
  }, [projects, settings])

  const filteredProjects = React.useMemo(() => {
    return processedProjects.filter((p) => {
      // Tab filter
      if (activeTab === "expiring_30" && (!p.expiryDetails.isExpiringSoon || p.expiryDetails.isExpired)) return false
      if (activeTab === "expired" && !p.expiryDetails.isExpired) return false

      // Category filter
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false

      // Search term
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase()
        const matchTitle = p.projectName.toLowerCase().includes(query)
        const matchClient = p.clientName.toLowerCase().includes(query)
        const matchPhone = p.clientPhone.toLowerCase().includes(query)
        const matchDomain = (p.domainName || "").toLowerCase().includes(query)
        const matchRegistrar = (p.domainRegistrar || "").toLowerCase().includes(query)
        if (!matchTitle && !matchClient && !matchPhone && !matchDomain && !matchRegistrar) return false
      }

      return true
    })
  }, [processedProjects, activeTab, categoryFilter, searchTerm])

  // Counts for tabs
  const expiringCount = processedProjects.filter((p) => p.expiryDetails.isExpiringSoon && !p.expiryDetails.isExpired).length
  const expiredCount = processedProjects.filter((p) => p.expiryDetails.isExpired).length

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

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingProjectId(null)
    setFormData(EMPTY_PROJECT)
    setIsModalOpen(true)
  }

  // Open Edit Modal
  const handleOpenEdit = (project: ProjectRecord) => {
    setEditingProjectId(project.id)
    setFormData({
      projectName: project.projectName,
      clientName: project.clientName,
      clientPhone: project.clientPhone,
      secondaryPhone: project.secondaryPhone || "",
      clientEmail: project.clientEmail || "",
      category: project.category,
      domainName: project.domainName || "",
      domainRegistrar: project.domainRegistrar || "GoDaddy",
      domainStartDate: project.domainStartDate || "",
      domainExpiryDate: project.domainExpiryDate || "",
      domainRenewalAmount: project.domainRenewalAmount || 0,
      hostingProvider: project.hostingProvider || "",
      hostingStartDate: project.hostingStartDate || "",
      hostingExpiryDate: project.hostingExpiryDate || "",
      hostingRenewalAmount: project.hostingRenewalAmount || 0,
      amcAmount: project.amcAmount || 0,
      sslIncluded: project.sslIncluded ?? true,
      status: project.status || "active",
      liveUrl: project.liveUrl || "",
      agreementPdfName: project.agreementPdfName || "",
      agreementPdfUrl: project.agreementPdfUrl || "",
      notes: project.notes || "",

      // Mobile App
      playStoreUrl: project.playStoreUrl || "",
      playConsoleStatus: project.playConsoleStatus || "Published",
      appStoreUrl: project.appStoreUrl || "",
      appleDevExpiryDate: project.appleDevExpiryDate || "",
      appleDevRenewalAmount: project.appleDevRenewalAmount || 0,
      backendProvider: project.backendProvider || "",
      backendExpiryDate: project.backendExpiryDate || "",
      backendRenewalAmount: project.backendRenewalAmount || 0,
      databaseProvider: project.databaseProvider || "",
      dltProvider: project.dltProvider || "",
      dltExpiryDate: project.dltExpiryDate || "",
      dltRenewalAmount: project.dltRenewalAmount || 0,
      whatsappApiProvider: project.whatsappApiProvider || "",

      // ERP / Software
      softwareType: project.softwareType || "Cloud Web ERP + Billing",
      backupProvider: project.backupProvider || "",
      licenseType: project.licenseType || "Annual Subscription",

      // E-Commerce
      paymentGateway: project.paymentGateway || "Razorpay PG",

      // Digital Growth
      marketingServices: project.marketingServices || "SEO + Google Ads + Meta Ads",
      billingCycle: project.billingCycle || "Monthly Retainer",
      adAccountId: project.adAccountId || "",
    })
    setIsModalOpen(true)
  }

  // Save Project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault()
    let updated: ProjectRecord[] = []

    if (editingProjectId) {
      updated = projects.map((p) => {
        if (p.id === editingProjectId) {
          return {
            ...p,
            ...formData,
          }
        }
        return p
      })
    } else {
      const newProj: ProjectRecord = {
        ...formData,
        id: `proj_${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
      }
      updated = [newProj, ...projects]
    }

    setProjects(updated)
    saveStoredProjects(updated)
    setIsModalOpen(false)
  }

  // Delete Project with confirmation
  const handleConfirmDelete = (id: string) => {
    const updated = projects.filter((p) => p.id !== id)
    setProjects(updated)
    saveStoredProjects(updated)
    setDeleteConfirmProject(null)
  }

  // Quick 1-Year Extension with confirmation
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
  const openWhatsApp = (project: ProjectRecord) => {
    setSelectedForWA(project)
    const msg = generateWhatsAppReminderMessage(project, settings)
    setWaMessageText(msg)
    setCopied(false)
  }

  const copyWhatsAppText = () => {
    navigator.clipboard.writeText(waMessageText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Export CSV
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:items-center sm:text-center max-w-2xl mx-auto space-y-1">
        <div className="flex items-center justify-between sm:justify-center w-full">
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Projects & Renewals
          </h1>
          <span className="sm:hidden text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
            {projects.length} Total
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-300">
          Manage client projects, domain lifecycles, and renewal billing.
        </p>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex items-center justify-between gap-2.5">
        <div className="text-xs font-bold text-slate-300 sm:hidden">
          Showing {filteredProjects.length} Projects
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={printProjectsPDFReport}
            className="hidden sm:inline-flex text-xs h-9 px-3.5 border-rose-500/40 bg-slate-900/90 hover:bg-rose-500/15 text-rose-300 hover:text-white font-bold transition-all shadow-sm"
            title="Print or export as PDF report"
          >
            <FileText className="w-4 h-4 mr-1.5 text-rose-400" /> Export PDF
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="hidden sm:inline-flex text-xs h-9 px-3.5 border-emerald-500/40 bg-slate-900/90 hover:bg-emerald-500/15 text-emerald-300 hover:text-white font-bold transition-all shadow-sm"
            title="Export CSV spreadsheet"
          >
            <FileSpreadsheet className="w-4 h-4 mr-1.5 text-emerald-400" /> Export CSV
          </Button>

          <Button
            onClick={handleOpenAdd}
            size="sm"
            className="text-xs h-9 px-3 sm:px-4 bg-gradient-to-r from-blue-600 to-primary-600 hover:from-blue-500 hover:to-primary-500 text-white font-bold shadow-md shadow-blue-600/30 transition-all rounded-xl whitespace-nowrap flex items-center gap-1"
          >
            <Plus className="w-4 h-4 font-bold" />
            <span>Add Project</span>
          </Button>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0d1629] border border-slate-750 shadow-lg space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#070d1a] border border-slate-750 overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              All ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab("expiring_30")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "expiring_30"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25"
                  : "text-amber-300 hover:bg-amber-500/15"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Due 30d</span>
              {expiringCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black">
                  {expiringCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("expired")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "expired"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/25"
                  : "text-rose-400 hover:bg-rose-500/15"
              }`}
            >
              <span>Expired</span>
              {expiredCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-rose-300 text-[10px] font-black">
                  {expiredCount}
                </span>
              )}
            </button>
          </div>

          {/* Search & Category Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search project, client, domain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-xs bg-[#070d1a] border-slate-750 text-white placeholder:text-slate-400 focus:border-blue-500 font-medium rounded-xl"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 rounded-xl border border-slate-750 bg-[#070d1a] px-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 shrink-0 font-semibold"
            >
              <option value="all">All Types</option>
              <option value="Website">Website</option>
              <option value="Web App">Web App</option>
              <option value="Mobile App">Mobile App</option>
              <option value="ERP & Billing">ERP & Billing</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Custom Software">Custom Software</option>
              <option value="Digital Growth">Digital Growth</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Cards View (< sm) */}
      <div className="block sm:hidden space-y-3">
        {filteredProjects.length === 0 ? (
          <div className="p-8 rounded-xl bg-[#0d1629] border border-slate-750 text-center text-slate-400">
            <p className="font-bold text-white text-sm">No matching projects found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const totalRenewal = calculateProjectTotalRenewal(project)
            const isExp = project.expiryDetails.isExpired
            return (
              <div 
                key={project.id}
                className="p-4 rounded-xl bg-[#0c1426] border border-slate-800 shadow-md space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-white text-sm truncate">{project.projectName}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-750">
                        {project.category}
                      </span>
                      {project.playStoreUrl && (
                        <a
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-emerald-400 flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 font-semibold"
                        >
                          <Smartphone className="w-2.5 h-2.5" /> Play Store
                        </a>
                      )}
                      {project.paymentGateway && (
                        <span className="text-[10px] text-purple-300 flex items-center gap-0.5 bg-purple-500/10 px-1.5 py-0.2 rounded border border-purple-500/20 font-semibold">
                          <CreditCard className="w-2.5 h-2.5" /> {project.paymentGateway}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                      <span className="font-medium text-white">{project.clientName}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-400">{project.clientPhone}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-emerald-300 font-mono block">
                      ₹{totalRenewal.toLocaleString("en-IN")}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded inline-block mt-0.5 ${
                      isExp 
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" 
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}>
                      {project.expiryDetails.label}
                    </span>
                  </div>
                </div>

                {project.domainName && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <a
                      href={getDirectUrl(project.liveUrl || project.domainName)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-blue-300 hover:text-white font-semibold flex items-center gap-1 truncate"
                    >
                      <span>{project.domainName}</span>
                      <ExternalLink className="w-3 h-3 text-blue-400" />
                    </a>
                  </div>
                )}

                {/* Mobile Actions Toolbar */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
                  <Button
                    size="sm"
                    onClick={() => openWhatsApp(project)}
                    className="flex-1 h-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setRenewConfirmProject(project)}
                    className="h-8 px-2.5 border-slate-750 bg-slate-850 hover:bg-blue-600 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1"
                    title="+1 Year Extend"
                  >
                    <RefreshCw className="w-3 h-3 text-blue-400" />
                    <span>+1Y</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEdit(project)}
                    className="h-8 px-2.5 border-slate-750 bg-slate-850 text-slate-200 hover:text-white font-bold text-xs"
                    title="Edit"
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeleteConfirmProject(project)}
                    className="h-8 px-2.5 border-slate-750 bg-slate-850 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Main Table (Desktop View >= sm) */}
      <div className="hidden sm:block rounded-2xl overflow-hidden bg-[#0d1629] border border-slate-700/80 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#131f3a] text-slate-100 font-extrabold border-b border-slate-700 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-5 py-4">Project & Infrastructure</th>
                <th className="px-5 py-4">Client Contact</th>
                <th className="px-5 py-4">Domain / API</th>
                <th className="px-5 py-4">Hosting / Cloud Server</th>
                <th className="px-5 py-4">Total Renewal</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <p className="font-bold text-white text-sm">No matching projects found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const totalRenewal = calculateProjectTotalRenewal(project)
                  return (
                    <tr key={project.id} className="hover:bg-[#152342] transition-colors bg-[#0a1122]/60 group">
                      {/* Project Title & Category Badges */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-white text-sm flex items-center gap-1.5 flex-wrap">
                          <span>{project.projectName}</span>
                          {(project.liveUrl || project.domainName) && (
                            <a
                              href={getDirectUrl(project.liveUrl || project.domainName)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-white transition-colors inline-flex items-center p-0.5 rounded hover:bg-blue-600/30"
                              title={`Visit live site: ${project.domainName}`}
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.playStoreUrl && (
                            <a
                              href={project.playStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all font-semibold"
                              title="Google Play Store link"
                            >
                              <Smartphone className="w-3 h-3 text-emerald-400" />
                              <span>Play Store</span>
                            </a>
                          )}
                          {project.agreementPdfUrl && (
                            <a
                              href={project.agreementPdfUrl}
                              download={project.agreementPdfName || `${project.projectName}_Agreement.pdf`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all font-semibold"
                              title={`Download Attached PDF: ${project.agreementPdfName || "Agreement"}`}
                            >
                              <Paperclip className="w-3 h-3 text-cyan-400" />
                              <span>PDF</span>
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                            {project.category}
                          </span>
                          {project.softwareType && (
                            <span className="text-[10px] text-cyan-300 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20 font-medium">
                              {project.softwareType}
                            </span>
                          )}
                          {project.paymentGateway && (
                            <span className="text-[10px] text-purple-300 bg-purple-500/10 px-1.5 py-0.2 rounded border border-purple-500/20 font-medium">
                              💳 {project.paymentGateway}
                            </span>
                          )}
                          {project.databaseProvider && (
                            <span className="text-[10px] text-blue-300 bg-blue-500/10 px-1.5 py-0.2 rounded border border-blue-500/20 font-medium">
                              🗄️ {project.databaseProvider}
                            </span>
                          )}
                          {project.sslIncluded && (
                            <span className="text-[10px] text-emerald-300 flex items-center gap-0.5 font-bold">
                              <ShieldCheck className="w-3 h-3" /> SSL
                            </span>
                          )}
                        </div>
                        {project.notes && (
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 font-medium">
                            {project.notes}
                          </p>
                        )}
                      </td>

                      {/* Client Contact */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-white text-xs">{project.clientName}</div>
                        <div className="text-xs text-slate-300 font-mono mt-0.5 flex items-center gap-1 font-medium">
                          <Phone className="w-3 h-3 text-blue-400" />
                          <span>{project.clientPhone}</span>
                        </div>
                      </td>

                      {/* Domain Lifecycle */}
                      <td className="px-5 py-4">
                        <div className="font-mono text-xs text-blue-300 flex items-center gap-1 font-bold">
                          {project.domainName ? (
                            <a
                              href={getDirectUrl(project.liveUrl || project.domainName)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 hover:text-white transition-all font-semibold"
                              title={`Open https://${project.domainName}`}
                            >
                              <Globe className="w-3 h-3 text-blue-400" />
                              <span>{project.domainName}</span>
                            </a>
                          ) : (
                            <span className="text-slate-500">—</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-300 mt-1 font-medium">
                          {project.domainRegistrar || "DNS"} • Exp: <span className="text-amber-300 font-mono font-bold">{project.domainExpiryDate || "N/A"}</span>
                        </div>
                      </td>

                      {/* Hosting / Cloud Server */}
                      <td className="px-5 py-4">
                        <div className="text-xs text-slate-100 flex items-center gap-1.5 font-semibold">
                          <Server className="w-3.5 h-3.5 text-blue-400" /> {project.backendProvider || project.hostingProvider || "Cloud Host"}
                        </div>
                        <div className="text-xs text-slate-300 mt-1 font-medium">
                          Exp: <span className="text-slate-100 font-mono font-bold">{project.backendExpiryDate || project.hostingExpiryDate || "N/A"}</span>
                        </div>
                      </td>

                      {/* Total Renewal Charges */}
                      <td className="px-5 py-4">
                        <div className="font-black text-emerald-300 font-mono text-sm">
                          ₹{totalRenewal.toLocaleString("en-IN")}
                        </div>
                        <div className="text-[11px] text-slate-300 space-x-1 font-medium mt-0.5">
                          <span>{project.category === "Digital Growth" ? project.billingCycle || "Retainer" : `AMC: ₹${project.amcAmount || 0}`}</span>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp Button */}
                          <button
                            onClick={() => openWhatsApp(project)}
                            title="Send WhatsApp Reminder"
                            className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white transition-all shadow-sm"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>

                          {/* Quick Renew with Confirmation */}
                          <button
                            onClick={() => setRenewConfirmProject(project)}
                            title="Extend +1 Year (Confirm)"
                            className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-200 hover:text-white transition-all shadow-sm"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEdit(project)}
                            title="Edit Project"
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white transition-all shadow-sm"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          {/* Delete with Confirmation */}
                          <button
                            onClick={() => setDeleteConfirmProject(project)}
                            title="Delete Project (Confirm)"
                            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 border border-slate-700 hover:border-rose-500 text-rose-300 hover:text-white transition-all shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* Autocomplete Datalists for Suggestions */}
      <datalist id="projects-hosting-providers-list">
        {uniqueHostingProviders.map((provider) => (
          <option key={provider} value={provider} />
        ))}
      </datalist>

      <datalist id="projects-domain-registrars-list">
        {uniqueDomainRegistrars.map((reg) => (
          <option key={reg} value={reg} />
        ))}
      </datalist>

      <datalist id="projects-backend-providers-list">
        <option value="Node.js on AWS Lightsail" />
        <option value="Firebase Cloud Backend" />
        <option value="Supabase Backend" />
        <option value="FastAPI / Python on VPS" />
        <option value="AWS EC2 Ubuntu Server" />
        <option value="DigitalOcean Droplet" />
        <option value="Hostinger VPS" />
        <option value="Render Cloud API" />
      </datalist>

      <datalist id="projects-database-providers-list">
        <option value="Supabase PostgreSQL" />
        <option value="MongoDB Atlas Cloud" />
        <option value="Firebase Firestore" />
        <option value="MySQL Cloud on Hostinger" />
        <option value="PostgreSQL on AWS RDS" />
      </datalist>

      <datalist id="projects-dlt-providers-list">
        <option value="Fast2SMS DLT" />
        <option value="Jio DLT Gateway" />
        <option value="Airtel DLT Portal" />
        <option value="Textlocal SMS Gateway" />
        <option value="BSNL DLT" />
        <option value="Vodafone Idea DLT" />
      </datalist>

      <datalist id="projects-whatsapp-providers-list">
        <option value="Meta Cloud API (Official)" />
        <option value="Interakt WhatsApp API" />
        <option value="Wati WhatsApp Gateway" />
        <option value="AiSensy WhatsApp Suite" />
        <option value="UltraMsg API" />
      </datalist>

      <datalist id="projects-payment-gateways-list">
        <option value="Razorpay PG" />
        <option value="PhonePe Payment Gateway" />
        <option value="Cashfree Payments" />
        <option value="Stripe India" />
        <option value="PayU India" />
        <option value="Paytm Payment Gateway" />
      </datalist>

      <datalist id="projects-deployment-types-list">
        <option value="Cloud Web ERP + Billing" />
        <option value="Desktop Software + Cloud Sync" />
        <option value="On-Premise Local Ubuntu Server" />
        <option value="Multi-Branch Cloud VPS" />
        <option value="Offline Desktop Single-User" />
      </datalist>

      <datalist id="projects-backup-providers-list">
        <option value="AWS S3 Cloud Auto-Backup" />
        <option value="Google Drive Cloud Sync" />
        <option value="Daily Automated PostgreSQL Dump" />
        <option value="Local Synology NAS Backup" />
        <option value="Hostinger Daily Backup" />
      </datalist>

      {/* ADD / EDIT PROJECT DYNAMIC MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl bg-[#0d1629] border-2 border-slate-750 rounded-2xl shadow-2xl p-6 sm:p-7 my-8 relative max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-750 mb-5">
              <h3 className="font-black text-lg text-white">
                {editingProjectId ? "Edit Client Project" : "Add New Client Project"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-5">
              {/* Section 1: Client & Project Identity */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Client & Project Identity
                </h4>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">Project / App Name *</label>
                    <Input
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      className="bg-[#070d1a] border-slate-700 text-xs text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">Client Contact Person *</label>
                    <Input
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="bg-[#070d1a] border-slate-700 text-xs text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">Primary Phone / WhatsApp *</label>
                    <Input
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">Service Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectRecord["category"] })}
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
              {formData.category === "Mobile App" && (
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
                          value={formData.playStoreUrl || ""}
                          onChange={(e) => setFormData({ ...formData, playStoreUrl: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Play Console Status</label>
                        <select
                          value={formData.playConsoleStatus || "Published"}
                          onChange={(e) => setFormData({ ...formData, playConsoleStatus: e.target.value as ProjectRecord["playConsoleStatus"] })}
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
                          value={formData.appStoreUrl || ""}
                          onChange={(e) => setFormData({ ...formData, appStoreUrl: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Apple Dev Account Expiry</label>
                        <Input
                          type="date"
                          value={formData.appleDevExpiryDate || ""}
                          onChange={(e) => setFormData({ ...formData, appleDevExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Apple Dev Fee (₹ / $99)</label>
                        <Input
                          type="number"
                          value={formData.appleDevRenewalAmount === 0 ? "" : formData.appleDevRenewalAmount}
                          onChange={(e) => setFormData({ ...formData, appleDevRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
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
                          list="projects-backend-providers-list"
                          value={formData.backendProvider || ""}
                          onChange={(e) => setFormData({ ...formData, backendProvider: e.target.value, hostingProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Database Engine / Provider</label>
                        <Input
                          list="projects-database-providers-list"
                          value={formData.databaseProvider || ""}
                          onChange={(e) => setFormData({ ...formData, databaseProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Backend Hosting Expiry Date</label>
                        <Input
                          type="date"
                          value={formData.backendExpiryDate || formData.hostingExpiryDate || ""}
                          onChange={(e) => setFormData({ ...formData, backendExpiryDate: e.target.value, hostingExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Backend Server Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          value={formData.backendRenewalAmount || formData.hostingRenewalAmount || ""}
                          onChange={(e) => {
                            const val = e.target.value === "" ? 0 : Number(e.target.value)
                            setFormData({ ...formData, backendRenewalAmount: val, hostingRenewalAmount: val })
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
                          list="projects-dlt-providers-list"
                          value={formData.dltProvider || ""}
                          onChange={(e) => setFormData({ ...formData, dltProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">WhatsApp Notification API</label>
                        <Input
                          list="projects-whatsapp-providers-list"
                          value={formData.whatsappApiProvider || ""}
                          onChange={(e) => setFormData({ ...formData, whatsappApiProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">DLT / SMS Expiry Date (Optional)</label>
                        <Input
                          type="date"
                          value={formData.dltExpiryDate || ""}
                          onChange={(e) => setFormData({ ...formData, dltExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">DLT / SMS Annual Fee (₹)</label>
                        <Input
                          type="number"
                          value={formData.dltRenewalAmount === 0 ? "" : formData.dltRenewalAmount}
                          onChange={(e) => setFormData({ ...formData, dltRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
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
                          value={formData.domainName}
                          onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Registrar</label>
                        <Input
                          list="projects-domain-registrars-list"
                          value={formData.domainRegistrar}
                          onChange={(e) => setFormData({ ...formData, domainRegistrar: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Expiry Date</label>
                        <Input
                          type="date"
                          value={formData.domainExpiryDate}
                          onChange={(e) => setFormData({ ...formData, domainExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          value={formData.domainRenewalAmount === 0 ? "" : formData.domainRenewalAmount}
                          onChange={(e) => setFormData({ ...formData, domainRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* DYNAMIC CATEGORY SECTION: ERP & BILLING / CUSTOM SOFTWARE */}
              {(formData.category === "ERP & Billing" || formData.category === "Custom Software") && (
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
                          list="projects-deployment-types-list"
                          value={formData.softwareType || ""}
                          onChange={(e) => setFormData({ ...formData, softwareType: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Software License Model</label>
                        <Input
                          value={formData.licenseType || ""}
                          onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
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
                          list="projects-hosting-providers-list"
                          value={formData.hostingProvider}
                          onChange={(e) => setFormData({ ...formData, hostingProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Auto-Backup & Storage Cloud</label>
                        <Input
                          list="projects-backup-providers-list"
                          value={formData.backupProvider || ""}
                          onChange={(e) => setFormData({ ...formData, backupProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Server Renewal / Expiry Date</label>
                        <Input
                          type="date"
                          value={formData.hostingExpiryDate}
                          onChange={(e) => setFormData({ ...formData, hostingExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Server Hosting Fee (₹)</label>
                        <Input
                          type="number"
                          value={formData.hostingRenewalAmount === 0 ? "" : formData.hostingRenewalAmount}
                          onChange={(e) => setFormData({ ...formData, hostingRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
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
                          list="projects-dlt-providers-list"
                          value={formData.dltProvider || ""}
                          onChange={(e) => setFormData({ ...formData, dltProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">WhatsApp Notification API</label>
                        <Input
                          list="projects-whatsapp-providers-list"
                          value={formData.whatsappApiProvider || ""}
                          onChange={(e) => setFormData({ ...formData, whatsappApiProvider: e.target.value })}
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
                          value={formData.domainName}
                          onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Expiry Date</label>
                        <Input
                          type="date"
                          value={formData.domainExpiryDate}
                          onChange={(e) => setFormData({ ...formData, domainExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          value={formData.domainRenewalAmount === 0 ? "" : formData.domainRenewalAmount}
                          onChange={(e) => setFormData({ ...formData, domainRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">AMC Maintenance & Support (₹)</label>
                        <Input
                          type="number"
                          value={formData.amcAmount === 0 ? "" : formData.amcAmount}
                          onChange={(e) => setFormData({ ...formData, amcAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono font-bold text-emerald-400"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* DYNAMIC CATEGORY SECTION: E-COMMERCE */}
              {formData.category === "E-Commerce" && (
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
                          value={formData.domainName}
                          onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Registrar</label>
                        <Input
                          list="projects-domain-registrars-list"
                          value={formData.domainRegistrar}
                          onChange={(e) => setFormData({ ...formData, domainRegistrar: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Expiry Date *</label>
                        <Input
                          type="date"
                          value={formData.domainExpiryDate}
                          onChange={(e) => setFormData({ ...formData, domainExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          value={formData.domainRenewalAmount === 0 ? "" : formData.domainRenewalAmount}
                          onChange={(e) => setFormData({ ...formData, domainRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
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
                          list="projects-hosting-providers-list"
                          value={formData.hostingProvider}
                          onChange={(e) => setFormData({ ...formData, hostingProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Hosting Expiry Date *</label>
                        <Input
                          type="date"
                          value={formData.hostingExpiryDate}
                          onChange={(e) => setFormData({ ...formData, hostingExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Hosting Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          value={formData.hostingRenewalAmount === 0 ? "" : formData.hostingRenewalAmount}
                          onChange={(e) => setFormData({ ...formData, hostingRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Payment Gateway</label>
                        <Input
                          list="projects-payment-gateways-list"
                          value={formData.paymentGateway || ""}
                          onChange={(e) => setFormData({ ...formData, paymentGateway: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-semibold text-emerald-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">WhatsApp Order Alerts</label>
                        <Input
                          list="projects-whatsapp-providers-list"
                          value={formData.whatsappApiProvider || ""}
                          onChange={(e) => setFormData({ ...formData, whatsappApiProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">AMC Maintenance Fee (₹)</label>
                        <Input
                          type="number"
                          value={formData.amcAmount === 0 ? "" : formData.amcAmount}
                          onChange={(e) => setFormData({ ...formData, amcAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* DYNAMIC CATEGORY SECTION: DIGITAL GROWTH */}
              {formData.category === "Digital Growth" && (
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
                          value={formData.marketingServices || ""}
                          onChange={(e) => setFormData({ ...formData, marketingServices: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Billing Cycle</label>
                        <select
                          value={formData.billingCycle || "Monthly Retainer"}
                          onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
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
                          value={formData.hostingRenewalAmount === 0 ? "" : formData.hostingRenewalAmount}
                          onChange={(e) => setFormData({ ...formData, hostingRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono font-bold text-emerald-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Next Renewal / Billing Date</label>
                        <Input
                          type="date"
                          value={formData.hostingExpiryDate}
                          onChange={(e) => setFormData({ ...formData, hostingExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Google Ads / Meta CID / ID</label>
                        <Input
                          value={formData.adAccountId || ""}
                          onChange={(e) => setFormData({ ...formData, adAccountId: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* DYNAMIC CATEGORY SECTION: DEFAULT (WEBSITE / WEB APP) */}
              {(formData.category === "Website" || formData.category === "Web App") && (
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
                          value={formData.domainName}
                          onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Registrar</label>
                        <Input
                          list="projects-domain-registrars-list"
                          value={formData.domainRegistrar}
                          onChange={(e) => setFormData({ ...formData, domainRegistrar: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Expiry Date *</label>
                        <Input
                          type="date"
                          value={formData.domainExpiryDate}
                          onChange={(e) => setFormData({ ...formData, domainExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Domain Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          value={formData.domainRenewalAmount === 0 ? "" : formData.domainRenewalAmount}
                          onChange={(e) => setFormData({ ...formData, domainRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
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
                          list="projects-hosting-providers-list"
                          value={formData.hostingProvider}
                          onChange={(e) => setFormData({ ...formData, hostingProvider: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Hosting Expiry Date *</label>
                        <Input
                          type="date"
                          value={formData.hostingExpiryDate}
                          onChange={(e) => setFormData({ ...formData, hostingExpiryDate: e.target.value })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">Hosting Renewal Fee (₹)</label>
                        <Input
                          type="number"
                          value={formData.hostingRenewalAmount === 0 ? "" : formData.hostingRenewalAmount}
                          onChange={(e) => setFormData({ ...formData, hostingRenewalAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
                          className="bg-[#070d1a] border-slate-700 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-200">AMC Maintenance Fee (₹)</label>
                        <Input
                          type="number"
                          value={formData.amcAmount === 0 ? "" : formData.amcAmount}
                          onChange={(e) => setFormData({ ...formData, amcAmount: e.target.value === "" ? 0 : Number(e.target.value) })}
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
                  ₹{calculateProjectTotalRenewal(formData as ProjectRecord).toLocaleString("en-IN")}
                </span>
              </div>

              {/* Client Agreement / Invoice PDF */}
              <div className="space-y-2 pt-3 border-t border-slate-750">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5" /> Optional Client Agreement / Invoice PDF
                  </h4>
                  {formData.agreementPdfName && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, agreementPdfName: "", agreementPdfUrl: "" }))}
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
                    className="text-xs border-slate-700 bg-[#070d1a] hover:bg-slate-800 text-slate-200"
                  >
                    <UploadCloud className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                    {formData.agreementPdfName ? "Replace PDF File" : "Choose PDF Document"}
                  </Button>

                  {formData.agreementPdfName && (
                    <span className="text-xs text-cyan-300 font-medium truncate flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {formData.agreementPdfName}
                    </span>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1 pt-2 border-t border-slate-750">
                <label className="text-xs font-bold text-slate-200">Notes / Remarks</label>
                <Textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-[#070d1a] border-slate-700 text-xs text-white"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-700">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-300 hover:text-white text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 text-xs font-bold shadow-md shadow-blue-600/30"
                >
                  {editingProjectId ? "Update Project" : "Save Project"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* WHATSAPP MODAL */}
      {selectedForWA && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-[#0d1629] border-2 border-slate-700 rounded-2xl shadow-2xl p-6 relative"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-700 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Send WhatsApp Renewal Notice</h3>
                  <p className="text-xs text-slate-300">
                    To: <span className="font-semibold text-white">{selectedForWA.clientName}</span> ({selectedForWA.clientPhone})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedForWA(null)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2.5 py-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200">Message Content Preview:</label>
              <textarea
                rows={10}
                value={waMessageText}
                onChange={(e) => setWaMessageText(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-[#070d1a] border border-slate-700 text-xs font-mono text-slate-100 focus:border-emerald-500 focus:outline-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-700 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={copyWhatsAppText}
                className="text-xs border-slate-700 bg-slate-800 text-slate-100 hover:text-white font-bold"
              >
                {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedForWA(null)}
                  className="text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </Button>
                <a
                  href={getWhatsAppDirectUrl(selectedForWA.clientPhone, waMessageText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedForWA(null)}
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
            className="w-full max-w-md bg-[#0d1629] border-2 border-slate-700 rounded-2xl shadow-2xl p-6 relative"
          >
            <div className="flex items-center gap-3 pb-3.5 border-b border-slate-700 mb-4">
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

            <div className="space-y-3 bg-[#070d1a] p-4 rounded-xl border border-slate-750 text-xs">
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
                  ₹{((renewConfirmProject.domainRenewalAmount || 0) + (renewConfirmProject.hostingRenewalAmount || 0) + (renewConfirmProject.amcAmount || 0)).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRenewConfirmProject(null)}
                className="text-xs border-slate-700 bg-slate-800 text-slate-200 hover:text-white font-bold"
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

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-[#0d1629] border-2 border-slate-700 rounded-2xl shadow-2xl p-6 relative"
          >
            <div className="flex items-center gap-3 pb-3.5 border-b border-slate-700 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-white">Delete Client Project?</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 bg-[#070d1a] p-4 rounded-xl border border-slate-750 text-xs mb-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Project:</span>
                <span className="font-bold text-white text-sm">{deleteConfirmProject.projectName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Client:</span>
                <span className="text-white font-semibold">{deleteConfirmProject.clientName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Domain:</span>
                <span className="font-mono text-blue-300 font-bold">{deleteConfirmProject.domainName || "—"}</span>
              </div>
            </div>

            <p className="text-xs text-rose-300 font-semibold leading-relaxed">
              ⚠️ Warning: Deleting this project will remove all domain renewal reminders, hosting details, and contact associations.
            </p>

            <div className="flex items-center justify-end gap-2.5 mt-5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirmProject(null)}
                className="text-xs border-slate-700 bg-slate-800 text-slate-200 hover:text-white font-bold"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleConfirmDelete(deleteConfirmProject.id)}
                className="text-xs bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/30"
              >
                <Trash2 className="w-4 h-4" /> Yes, Delete Project
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
