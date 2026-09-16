// Sri Web Squad - Admin Data Store & Expiry Notification Engine with Supabase Sync
import { getSupabaseClient, isSupabaseConfigured } from "./supabase"

export interface ProjectRecord {
  id: string
  projectName: string
  clientName: string
  clientPhone: string
  secondaryPhone?: string
  clientEmail?: string
  category: "Website" | "Web App" | "Mobile App" | "ERP & Billing" | "E-Commerce" | "Custom Software" | "Digital Growth"
  domainName: string
  domainRegistrar: string
  domainStartDate: string
  domainExpiryDate: string
  domainRenewalAmount: number
  hostingProvider: string
  hostingStartDate: string
  hostingExpiryDate: string
  hostingRenewalAmount: number
  amcAmount?: number
  sslIncluded: boolean
  status: "active" | "expiring_soon" | "expired" | "development"
  liveUrl?: string
  agreementPdfName?: string
  agreementPdfUrl?: string
  notes?: string
  createdAt: string
  lastReminderSentAt?: string
}

export interface LeadRecord {
  id: string
  name: string
  phone: string
  email?: string
  service: string
  budget?: string
  message: string
  status: "new" | "contacted" | "converted" | "closed"
  createdAt: string
}

export interface AdminSettings {
  adminEmail: string
  adminPass: string
  adminPin: string
  companyName: string
  companyPhone: string
  companyUpiId: string
  whatsappTemplate: string
  notifyDaysBefore: number
  supabaseUrl?: string
  supabaseAnonKey?: string
}

const STORAGE_KEY_PROJECTS = "sws_admin_projects_v1"
const STORAGE_KEY_LEADS = "sws_admin_leads_v1"
const STORAGE_KEY_SETTINGS = "sws_admin_settings_v1"
const STORAGE_KEY_AUTH = "sws_admin_session_auth"

// Helper to format date offset from today for realistic sample data
const getDateOffset = (days: number): string => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split("T")[0]
}

const getPastDate = (monthsAgo: number): string => {
  const d = new Date()
  d.setMonth(d.getMonth() - monthsAgo)
  return d.toISOString().split("T")[0]
}

export const DEFAULT_SETTINGS: AdminSettings = {
  adminEmail: "admin@sriwebsquad.in",
  adminPass: "admin123",
  adminPin: "1701",
  companyName: "Sri Web Squad",
  companyPhone: "+91 99446 88602",
  companyUpiId: "sriwebsquad@upi",
  whatsappTemplate: `*SRI WEB SQUAD - SERVICE RENEWAL REMINDER*

Dear Sir / Madam (*{clientName}*),
Greetings from Sri Web Squad!

This is a gentle reminder regarding the annual renewal of your digital services:

📌 *Project:* {projectName}

*Renewal Charges Breakdown:*
🌐 *Domain Charges ({domainName}):* ₹{domainRenewalAmount} (Exp: {domainExpiryDate})
💻 *Hosting Charges ({hostingProvider}):* ₹{hostingRenewalAmount} (Exp: {hostingExpiryDate})
🛠️ *Maintenance Charges (AMC):* ₹{amcAmount}
💰 *Total Renewal Amount:* ₹{totalAmount}

*Payment Details:*
UPI ID: {companyUpiId}
GPay / PhonePe: {companyPhone}

Once payment is completed, kindly share the screenshot for instant renewal processing.

For any queries, Call/WhatsApp: {companyPhone}
Thank you!
_Sri Web Squad - Web & Software Solutions_`,
  notifyDaysBefore: 30,
}

export const SEED_PROJECTS: ProjectRecord[] = [
  {
    id: "proj_1",
    projectName: "VKP Website & Catalogue",
    clientName: "P. Vijay Kumar",
    clientPhone: "+91 98401 23456",
    secondaryPhone: "+91 94440 98765",
    clientEmail: "vijay@vkpenterprises.in",
    category: "Website",
    domainName: "vkpenterprises.in",
    domainRegistrar: "GoDaddy",
    domainStartDate: getPastDate(11),
    domainExpiryDate: getDateOffset(18),
    domainRenewalAmount: 1199,
    hostingProvider: "Hostinger Cloud",
    hostingStartDate: getPastDate(11),
    hostingExpiryDate: getDateOffset(18),
    hostingRenewalAmount: 3499,
    amcAmount: 2000,
    sslIncluded: true,
    status: "expiring_soon",
    liveUrl: "https://vkpenterprises.in",
    notes: "Main business catalogue site. Contact Vijay directly via WhatsApp.",
    createdAt: getPastDate(11),
  },
  {
    id: "proj_2",
    projectName: "Sri Textiles Billing & Inventory",
    clientName: "M. Senthil Nathan",
    clientPhone: "+91 94432 19870",
    clientEmail: "senthil@sritextiles.com",
    category: "ERP & Billing",
    domainName: "sritextiles.com",
    domainRegistrar: "Hostinger",
    domainStartDate: getPastDate(12),
    domainExpiryDate: getDateOffset(4),
    domainRenewalAmount: 1499,
    hostingProvider: "AWS Lightsail",
    hostingStartDate: getPastDate(12),
    hostingExpiryDate: getDateOffset(4),
    hostingRenewalAmount: 5999,
    amcAmount: 3500,
    sslIncluded: true,
    status: "expiring_soon",
    liveUrl: "https://app.sritextiles.com",
    notes: "Critical billing software. Needs urgent renewal reminder.",
    createdAt: getPastDate(12),
  },
  {
    id: "proj_3",
    projectName: "Dr. Gowtham Smile Care",
    clientName: "Dr. K. Gowtham",
    clientPhone: "+91 98940 11223",
    category: "Website",
    domainName: "thetoothcliniquepondy.in",
    domainRegistrar: "Namecheap",
    domainStartDate: getPastDate(14),
    domainExpiryDate: getDateOffset(-5),
    domainRenewalAmount: 999,
    hostingProvider: "Hostinger Cloud",
    hostingStartDate: getPastDate(14),
    hostingExpiryDate: getDateOffset(-5),
    hostingRenewalAmount: 2999,
    amcAmount: 0,
    sslIncluded: true,
    status: "expired",
    liveUrl: "https://thetoothcliniquepondy.in",
    notes: "Dental clinic website. In grace period.",
    createdAt: getPastDate(14),
  },
  {
    id: "proj_4",
    projectName: "Aura Luxe Boutique Store",
    clientName: "Deepa Sundar",
    clientPhone: "+91 96001 23456",
    clientEmail: "deepa@auraluxe.shop",
    category: "E-Commerce",
    domainName: "auraluxe.shop",
    domainRegistrar: "GoDaddy",
    domainStartDate: getPastDate(11),
    domainExpiryDate: getDateOffset(24),
    domainRenewalAmount: 1599,
    hostingProvider: "Shopify / Custom Cloud",
    hostingStartDate: getPastDate(11),
    hostingExpiryDate: getDateOffset(24),
    hostingRenewalAmount: 4200,
    amcAmount: 2500,
    sslIncluded: true,
    status: "expiring_soon",
    liveUrl: "https://auraluxe.shop",
    notes: "E-Commerce store with payment gateway.",
    createdAt: getPastDate(11),
  },
]

export const SEED_LEADS: LeadRecord[] = [
  {
    id: "lead_1",
    name: "Murugan Traders",
    phone: "+91 98421 55667",
    email: "murugan@traders.com",
    service: "GST Billing & Accounting Software",
    budget: "₹25,000 - ₹40,000",
    message: "Need desktop and web software for multi-branch wholesale grocery shop with barcode billing.",
    status: "new",
    createdAt: getPastDate(0.1),
  },
  {
    id: "lead_2",
    name: "Dr. Ananya Dental Clinic",
    phone: "+91 94455 66778",
    email: "drananya@gmail.com",
    service: "Clinic Appointment & Patient Portal",
    budget: "₹15,000 - ₹25,000",
    message: "Looking for modern website with WhatsApp appointment booking system.",
    status: "contacted",
    createdAt: getPastDate(0.3),
  },
]

// Expiry Calculations
export function calculateDaysRemaining(expiryDateStr: string): number {
  if (!expiryDateStr) return 9999
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const exp = new Date(expiryDateStr)
  exp.setHours(0, 0, 0, 0)
  const diffTime = exp.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export interface ExpiryStatusDetails {
  domainDays: number
  hostingDays: number
  minDays: number
  isExpired: boolean
  isUrgent: boolean
  isExpiringSoon: boolean
  severity: "expired" | "urgent" | "warning" | "healthy"
  label: string
}

export function getProjectExpiryDetails(project: ProjectRecord, notifyDays = 30): ExpiryStatusDetails {
  const domainDays = calculateDaysRemaining(project.domainExpiryDate)
  const hostingDays = calculateDaysRemaining(project.hostingExpiryDate)
  const minDays = Math.min(domainDays, hostingDays)

  const isExpired = minDays < 0
  const isUrgent = minDays >= 0 && minDays <= 7
  const isExpiringSoon = minDays >= 0 && minDays <= notifyDays

  let severity: "expired" | "urgent" | "warning" | "healthy" = "healthy"
  let label = "Active & Healthy"

  if (isExpired) {
    severity = "expired"
    label = `Expired (${Math.abs(minDays)}d ago)`
  } else if (isUrgent) {
    severity = "urgent"
    label = `Urgent: ${minDays}d left`
  } else if (isExpiringSoon) {
    severity = "warning"
    label = `Due in ${minDays} days`
  } else {
    label = `${minDays} days left`
  }

  return {
    domainDays,
    hostingDays,
    minDays,
    isExpired,
    isUrgent,
    isExpiringSoon,
    severity,
    label,
  }
}

// WhatsApp Link Generator
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, "")
  if (cleaned.length === 10) {
    return `91${cleaned}`
  }
  return cleaned
}

export function generateWhatsAppReminderMessage(
  project: ProjectRecord,
  settings: AdminSettings
): string {
  const domainDays = calculateDaysRemaining(project.domainExpiryDate)
  const hostingDays = calculateDaysRemaining(project.hostingExpiryDate)

  const domainDaysText = domainDays < 0 
    ? `Expired ${Math.abs(domainDays)} days ago` 
    : domainDays === 0 
    ? "Expires TODAY" 
    : `${domainDays} days remaining`

  const hostingDaysText = hostingDays < 0 
    ? `Expired ${Math.abs(hostingDays)} days ago` 
    : hostingDays === 0 
    ? "Expires TODAY" 
    : `${hostingDays} days remaining`

  const totalAmount = (project.domainRenewalAmount || 0) + (project.hostingRenewalAmount || 0) + (project.amcAmount || 0)

  let template = settings.whatsappTemplate || DEFAULT_SETTINGS.whatsappTemplate

  template = template
    .replace(/{clientName}/g, project.clientName)
    .replace(/{projectName}/g, project.projectName)
    .replace(/{domainName}/g, project.domainName || "Not configured")
    .replace(/{domainExpiryDate}/g, project.domainExpiryDate || "N/A")
    .replace(/{domainDaysText}/g, domainDaysText)
    .replace(/{domainRenewalAmount}/g, (project.domainRenewalAmount || 0).toLocaleString("en-IN"))
    .replace(/{hostingProvider}/g, project.hostingProvider || "Cloud Hosting")
    .replace(/{hostingExpiryDate}/g, project.hostingExpiryDate || "N/A")
    .replace(/{hostingDaysText}/g, hostingDaysText)
    .replace(/{hostingRenewalAmount}/g, (project.hostingRenewalAmount || 0).toLocaleString("en-IN"))
    .replace(/{amcAmount}/g, (project.amcAmount || 0).toLocaleString("en-IN"))
    .replace(/{totalAmount}/g, totalAmount.toLocaleString("en-IN"))
    .replace(/{companyPhone}/g, settings.companyPhone)
    .replace(/{companyUpiId}/g, settings.companyUpiId)
    .replace(/{companyName}/g, settings.companyName)

  return template
}

export function getWhatsAppDirectUrl(phone: string, text: string): string {
  const formattedPhone = formatPhoneNumber(phone)
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`
}

// Storage Accessors (Safe with SSR / Next.js)
export function getStoredProjects(): ProjectRecord[] {
  if (typeof window === "undefined") return SEED_PROJECTS
  try {
    const data = localStorage.getItem(STORAGE_KEY_PROJECTS)
    if (!data) {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(SEED_PROJECTS))
      return SEED_PROJECTS
    }
    return JSON.parse(data)
  } catch {
    return SEED_PROJECTS
  }
}

export function saveStoredProjects(projects: ProjectRecord[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects))
    // Async background sync with Supabase if configured
    syncProjectsToSupabase(projects).catch(() => {})
  } catch (e) {
    console.error("Failed to save projects", e)
  }
}

export function getStoredLeads(): LeadRecord[] {
  if (typeof window === "undefined") return SEED_LEADS
  try {
    const data = localStorage.getItem(STORAGE_KEY_LEADS)
    if (!data) {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(SEED_LEADS))
      return SEED_LEADS
    }
    return JSON.parse(data)
  } catch {
    return SEED_LEADS
  }
}

export function saveStoredLeads(leads: LeadRecord[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads))
    syncLeadsToSupabase(leads).catch(() => {})
  } catch (e) {
    console.error("Failed to save leads", e)
  }
}

export function getStoredSettings(): AdminSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS
  try {
    const data = localStorage.getItem(STORAGE_KEY_SETTINGS)
    if (!data) {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS))
      return DEFAULT_SETTINGS
    }
    const parsed = JSON.parse(data)
    if (parsed.whatsappTemplate && (parsed.whatsappTemplate.includes("uninterrupted website uptime") || parsed.whatsappTemplate.includes("🔔"))) {
      parsed.whatsappTemplate = DEFAULT_SETTINGS.whatsappTemplate
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(parsed))
    }
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveStoredSettings(settings: AdminSettings): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings))
    if (settings.supabaseUrl && settings.supabaseAnonKey) {
      localStorage.setItem("sws_supabase_url", settings.supabaseUrl)
      localStorage.setItem("sws_supabase_anon_key", settings.supabaseAnonKey)
    }
  } catch (e) {
    console.error("Failed to save settings", e)
  }
}

// Authentication Helpers
export function checkAdminAuth(): boolean {
  if (typeof window === "undefined") return false
  try {
    return localStorage.getItem(STORAGE_KEY_AUTH) === "true"
  } catch {
    return false
  }
}

export function setAdminAuth(authenticated: boolean): void {
  if (typeof window === "undefined") return
  try {
    if (authenticated) {
      localStorage.setItem(STORAGE_KEY_AUTH, "true")
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH)
    }
  } catch (e) {
    console.error("Failed to set auth status", e)
  }
}

// Supabase Syncing Helpers
export async function syncProjectsToSupabase(projects: ProjectRecord[]): Promise<boolean> {
  const supabase = getSupabaseClient()
  if (!supabase) return false
  try {
    const rows = projects.map((p) => ({
      id: p.id,
      project_name: p.projectName,
      client_name: p.clientName,
      client_phone: p.clientPhone,
      secondary_phone: p.secondaryPhone || null,
      client_email: p.clientEmail || null,
      category: p.category,
      domain_name: p.domainName || null,
      domain_registrar: p.domainRegistrar || null,
      domain_start_date: p.domainStartDate || null,
      domain_expiry_date: p.domainExpiryDate || null,
      domain_renewal_amount: p.domainRenewalAmount || 0,
      hosting_provider: p.hostingProvider || null,
      hosting_start_date: p.hostingStartDate || null,
      hosting_expiry_date: p.hostingExpiryDate || null,
      hosting_renewal_amount: p.hostingRenewalAmount || 0,
      amc_amount: p.amcAmount || 0,
      ssl_included: p.sslIncluded ?? true,
      status: p.status || "active",
      live_url: p.liveUrl || null,
      agreement_pdf_name: p.agreementPdfName || null,
      agreement_pdf_url: p.agreementPdfUrl || null,
      notes: p.notes || null,
      created_at: p.createdAt || new Date().toISOString(),
    }))

    const { error } = await supabase.from("projects").upsert(rows, { onConflict: "id" })
    if (error) {
      console.error("Supabase upsert projects error:", error)
      return false
    }
    return true
  } catch (e) {
    console.error("Supabase sync projects failed:", e)
    return false
  }
}

export async function fetchProjectsFromSupabase(): Promise<ProjectRecord[] | null> {
  const supabase = getSupabaseClient()
  if (!supabase) return null
  try {
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })
    if (error || !data) {
      console.error("Supabase fetch projects error:", error)
      return null
    }
    return data.map((r: any) => ({
      id: r.id,
      projectName: r.project_name,
      clientName: r.client_name,
      clientPhone: r.client_phone,
      secondaryPhone: r.secondary_phone || "",
      clientEmail: r.client_email || "",
      category: r.category || "Website",
      domainName: r.domain_name || "",
      domainRegistrar: r.domain_registrar || "GoDaddy",
      domainStartDate: r.domain_start_date || "",
      domainExpiryDate: r.domain_expiry_date || "",
      domainRenewalAmount: Number(r.domain_renewal_amount) || 0,
      hostingProvider: r.hosting_provider || "Hostinger Cloud",
      hostingStartDate: r.hosting_start_date || "",
      hostingExpiryDate: r.hosting_expiry_date || "",
      hostingRenewalAmount: Number(r.hosting_renewal_amount) || 0,
      amcAmount: Number(r.amc_amount) || 0,
      sslIncluded: Boolean(r.ssl_included),
      status: r.status || "active",
      liveUrl: r.live_url || "",
      agreementPdfName: r.agreement_pdf_name || "",
      agreementPdfUrl: r.agreement_pdf_url || "",
      notes: r.notes || "",
      createdAt: r.created_at ? r.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
    }))
  } catch (e) {
    console.error("Supabase fetch error:", e)
    return null
  }
}

export async function syncLeadsToSupabase(leads: LeadRecord[]): Promise<boolean> {
  const supabase = getSupabaseClient()
  if (!supabase) return false
  try {
    const rows = leads.map((l) => ({
      id: l.id,
      name: l.name,
      phone: l.phone,
      email: l.email || null,
      service: l.service,
      budget: l.budget || null,
      message: l.message || null,
      status: l.status,
      created_at: l.createdAt || new Date().toISOString(),
    }))
    const { error } = await supabase.from("leads").upsert(rows, { onConflict: "id" })
    return !error
  } catch {
    return false
  }
}

export async function syncAllDataWithSupabase(): Promise<{ projects: ProjectRecord[]; leads: LeadRecord[] } | null> {
  const supabase = getSupabaseClient()
  if (!supabase) return null
  try {
    const localProjects = getStoredProjects()
    const localLeads = getStoredLeads()

    // 1. Fetch cloud projects
    const { data: cloudProjectsData } = await supabase.from("projects").select("*").order("created_at", { ascending: false })
    
    let mergedProjects = localProjects
    if (!cloudProjectsData || cloudProjectsData.length === 0) {
      if (localProjects.length > 0) {
        await syncProjectsToSupabase(localProjects)
      }
    } else {
      const cloudProjects: ProjectRecord[] = cloudProjectsData.map((r: any) => ({
        id: r.id,
        projectName: r.project_name,
        clientName: r.client_name,
        clientPhone: r.client_phone,
        secondaryPhone: r.secondary_phone || "",
        clientEmail: r.client_email || "",
        category: r.category || "Website",
        domainName: r.domain_name || "",
        domainRegistrar: r.domain_registrar || "GoDaddy",
        domainStartDate: r.domain_start_date || "",
        domainExpiryDate: r.domain_expiry_date || "",
        domainRenewalAmount: Number(r.domain_renewal_amount) || 0,
        hostingProvider: r.hosting_provider || "Hostinger Cloud",
        hostingStartDate: r.hosting_start_date || "",
        hostingExpiryDate: r.hosting_expiry_date || "",
        hostingRenewalAmount: Number(r.hosting_renewal_amount) || 0,
        amcAmount: Number(r.amc_amount) || 0,
        sslIncluded: Boolean(r.ssl_included),
        status: r.status || "active",
        liveUrl: r.live_url || "",
        agreementPdfName: r.agreement_pdf_name || "",
        agreementPdfUrl: r.agreement_pdf_url || "",
        notes: r.notes || "",
        createdAt: r.created_at ? r.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
      }))

      const cloudIds = new Set(cloudProjects.map((p) => p.id))
      const missingInCloud = localProjects.filter((p) => !cloudIds.has(p.id))
      if (missingInCloud.length > 0) {
        await syncProjectsToSupabase(missingInCloud)
      }
      mergedProjects = [...cloudProjects, ...missingInCloud]
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(mergedProjects))
      }
    }

    // 2. Sync leads
    const { data: cloudLeadsData } = await supabase.from("leads").select("*").order("created_at", { ascending: false })
    let mergedLeads = localLeads
    if (!cloudLeadsData || cloudLeadsData.length === 0) {
      if (localLeads.length > 0) {
        await syncLeadsToSupabase(localLeads)
      }
    } else {
      const cloudLeads: LeadRecord[] = cloudLeadsData.map((l: any) => ({
        id: l.id,
        name: l.name,
        phone: l.phone,
        email: l.email || "",
        service: l.service || "Website Development",
        budget: l.budget || "",
        message: l.message || "",
        status: l.status || "new",
        createdAt: l.created_at || new Date().toISOString(),
      }))
      const cloudLeadIds = new Set(cloudLeads.map((l) => l.id))
      const missingLeads = localLeads.filter((l) => !cloudLeadIds.has(l.id))
      if (missingLeads.length > 0) {
        await syncLeadsToSupabase(missingLeads)
      }
      mergedLeads = [...cloudLeads, ...missingLeads]
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(mergedLeads))
      }
    }

    return { projects: mergedProjects, leads: mergedLeads }
  } catch (e) {
    console.error("Auto-sync error with Supabase:", e)
    return null
  }
}

// Backup & Export Helpers
export function exportDatabaseBackupJSON(): string {
  const projects = getStoredProjects()
  const leads = getStoredLeads()
  const settings = getStoredSettings()

  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      version: "1.0",
      company: "Sri Web Squad",
      projects,
      leads,
      settings,
    },
    null,
    2
  )
}

export function importDatabaseBackupJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString)
    if (parsed.projects && Array.isArray(parsed.projects)) {
      saveStoredProjects(parsed.projects)
    }
    if (parsed.leads && Array.isArray(parsed.leads)) {
      saveStoredLeads(parsed.leads)
    }
    if (parsed.settings && typeof parsed.settings === "object") {
      saveStoredSettings(parsed.settings)
    }
    return true
  } catch (e) {
    console.error("Failed to import database", e)
    return false
  }
}

export function exportProjectsToCSV(): string {
  const projects = getStoredProjects()
  const headers = [
    "Project ID",
    "Project Name",
    "Client Name",
    "Client Phone",
    "Client Email",
    "Category",
    "Domain Name",
    "Domain Registrar",
    "Domain Expiry Date",
    "Domain Renewal Amount (INR)",
    "Hosting Provider",
    "Hosting Expiry Date",
    "Hosting Renewal Amount (INR)",
    "AMC Amount (INR)",
    "Total Annual Renewal (INR)",
    "Status",
    "Live URL",
    "Notes",
  ]

  const rows = projects.map((p) => {
    const total = (p.domainRenewalAmount || 0) + (p.hostingRenewalAmount || 0) + (p.amcAmount || 0)
    return [
      `"${p.id}"`,
      `"${p.projectName.replace(/"/g, '""')}"`,
      `"${p.clientName.replace(/"/g, '""')}"`,
      `"${p.clientPhone}"`,
      `"${p.clientEmail || ""}"`,
      `"${p.category}"`,
      `"${p.domainName || ""}"`,
      `"${p.domainRegistrar || ""}"`,
      `"${p.domainExpiryDate || ""}"`,
      p.domainRenewalAmount || 0,
      `"${p.hostingProvider || ""}"`,
      `"${p.hostingExpiryDate || ""}"`,
      p.hostingRenewalAmount || 0,
      p.amcAmount || 0,
      total,
      `"${p.status}"`,
      `"${p.liveUrl || ""}"`,
      `"${(p.notes || "").replace(/"/g, '""')}"`,
    ].join(",")
  })

  return [headers.join(","), ...rows].join("\n")
}

// 1-Click Printable PDF Master Report Generator
export function printProjectsPDFReport(): void {
  const projects = getStoredProjects()
  const settings = getStoredSettings()
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  const timeStr = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const totalAnnual = projects.reduce((acc, p) => {
    return acc + (p.domainRenewalAmount || 0) + (p.hostingRenewalAmount || 0) + (p.amcAmount || 0)
  }, 0)

  const printWindow = window.open("", "_blank", "width=1000,height=800")
  if (!printWindow) {
    alert("Please allow popups to view and export the PDF report.")
    return
  }

  const tableRows = projects
    .map((p, idx) => {
      const total = (p.domainRenewalAmount || 0) + (p.hostingRenewalAmount || 0) + (p.amcAmount || 0)
      const expiry = getProjectExpiryDetails(p, settings.notifyDaysBefore || 30)
      
      const badgeStyle = expiry.isExpired 
        ? "background: #fee2e2; color: #991b1b; border: 1px solid #f87171;" 
        : expiry.isExpiringSoon 
        ? "background: #fef3c7; color: #92400e; border: 1px solid #fcd34d;" 
        : "background: #dcfce7; color: #166534; border: 1px solid #86efac;"

      return `
        <tr>
          <td style="text-align: center; color: #64748b; font-size: 11px;">${idx + 1}</td>
          <td>
            <div style="font-weight: 700; color: #0f172a; font-size: 13px;">${p.projectName}</div>
            <div style="font-family: monospace; color: #2563eb; font-size: 11px; margin-top: 2px;">${p.domainName || "—"}</div>
          </td>
          <td>
            <div style="font-weight: 600; color: #1e293b;">${p.clientName}</div>
            <div style="font-size: 11px; color: #64748b; font-family: monospace;">${p.clientPhone}</div>
          </td>
          <td>
            <span style="display: inline-block; padding: 2px 6px; background: #f1f5f9; border-radius: 4px; font-size: 10px; font-weight: 600; color: #475569;">
              ${p.category}
            </span>
          </td>
          <td style="font-family: monospace; font-size: 11px; color: #334155;">
            <div>${p.domainExpiryDate || "—"}</div>
            <div style="font-size: 9px; color: #94a3b8;">${p.domainRegistrar || ""}</div>
          </td>
          <td style="font-family: monospace; font-size: 11px; color: #334155;">
            <div>${p.hostingExpiryDate || "—"}</div>
            <div style="font-size: 9px; color: #94a3b8;">${p.hostingProvider || ""}</div>
          </td>
          <td style="text-align: right; font-family: monospace; font-weight: 700; color: #0f172a; font-size: 12px;">
            ₹${total.toLocaleString("en-IN")}
          </td>
          <td style="text-align: center;">
            <span style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: 700; ${badgeStyle}">
              ${expiry.label}
            </span>
          </td>
        </tr>
      `
    })
    .join("")

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Sri Web Squad - Client Projects & Renewal Master Report (${dateStr})</title>
        <meta charset="utf-8" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Inter', sans-serif;
            background: #ffffff;
            color: #0f172a;
            padding: 24px;
            font-size: 12px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-bottom: 16px;
            border-bottom: 2px solid #0f172a;
            margin-bottom: 20px;
          }
          .brand-title {
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
          }
          .brand-sub {
            font-size: 12px;
            color: #64748b;
            font-weight: 500;
            margin-top: 2px;
          }
          .report-meta {
            text-align: right;
            font-size: 11px;
            color: #64748b;
            line-height: 1.5;
          }
          .kpi-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 20px;
          }
          .kpi-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 16px;
          }
          .kpi-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            color: #64748b;
            letter-spacing: 0.5px;
          }
          .kpi-val {
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            margin-top: 2px;
            font-family: 'JetBrains Mono', monospace;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          th {
            background: #0f172a;
            color: #ffffff;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 8px 10px;
            text-align: left;
          }
          td {
            padding: 9px 10px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: middle;
          }
          tr:nth-child(even) {
            background: #f8fafc;
          }
          .footer {
            margin-top: 30px;
            padding-top: 12px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #94a3b8;
          }
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 16px; text-align: right;">
          <button onclick="window.print()" style="background: #2563eb; color: #ffffff; border: none; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            🖨️ Print / Save as PDF
          </button>
        </div>

        <div class="header">
          <div>
            <div class="brand-title">SRI WEB SQUAD</div>
            <div class="brand-sub">Client Projects & Domain/Hosting Lifecycle Master Report</div>
          </div>
          <div class="report-meta">
            <div><strong>Generated:</strong> ${dateStr} at ${timeStr}</div>
            <div><strong>Company Phone:</strong> ${settings.companyPhone || "+91 99446 88602"}</div>
            <div><strong>Website:</strong> https://sriwebsquad.in</div>
          </div>
        </div>

        <div class="kpi-container">
          <div class="kpi-card">
            <div class="kpi-label">Total Projects</div>
            <div class="kpi-val">${projects.length}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Total Annual Value</div>
            <div class="kpi-val" style="color: #047857;">₹${totalAnnual.toLocaleString("en-IN")}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Report Type</div>
            <div class="kpi-val" style="font-size: 14px; margin-top: 6px;">Master Portfolio Backup</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 30px; text-align: center;">#</th>
              <th>Project & Domain</th>
              <th>Client Contact</th>
              <th>Category</th>
              <th>Domain Expiry</th>
              <th>Hosting Expiry</th>
              <th style="text-align: right;">Annual Fee</th>
              <th style="text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>

        <div class="footer">
          <div>Confidential — For Internal Admin & Accounting Use Only — Sri Web Squad</div>
          <div>Report Page 1 / 1</div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `

  printWindow.document.open()
  printWindow.document.write(htmlContent)
  printWindow.document.close()
}
