"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Users, 
  MessageCircle, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  Search, 
  CheckCircle2, 
  X
} from "lucide-react"
import { 
  getStoredLeads, 
  saveStoredLeads, 
  LeadRecord, 
  getWhatsAppDirectUrl 
} from "@/lib/admin-store"

const EMPTY_LEAD: Omit<LeadRecord, "id" | "createdAt"> = {
  name: "",
  phone: "",
  email: "",
  service: "Website Development",
  budget: "₹15,000 - ₹30,000",
  message: "",
  status: "new",
}

export default function LeadsAdminPage() {
  const [leads, setLeads] = React.useState<LeadRecord[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [newLeadData, setNewLeadData] = React.useState(EMPTY_LEAD)

  React.useEffect(() => {
    setLeads(getStoredLeads())
  }, [])

  const filteredLeads = React.useMemo(() => {
    return leads.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) return false
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase()
        const matchName = lead.name.toLowerCase().includes(query)
        const matchPhone = lead.phone.toLowerCase().includes(query)
        const matchService = lead.service.toLowerCase().includes(query)
        const matchMsg = lead.message.toLowerCase().includes(query)
        if (!matchName && !matchPhone && !matchService && !matchMsg) return false
      }
      return true
    })
  }, [leads, statusFilter, searchTerm])

  const handleUpdateStatus = (leadId: string, newStatus: LeadRecord["status"]) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    setLeads(updated)
    saveStoredLeads(updated)
  }

  const handleDeleteLead = (leadId: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      const updated = leads.filter((l) => l.id !== leadId)
      setLeads(updated)
      saveStoredLeads(updated)
    }
  }

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: LeadRecord = {
      ...newLeadData,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    const updated = [newEntry, ...leads]
    setLeads(updated)
    saveStoredLeads(updated)
    setIsAddModalOpen(false)
    setNewLeadData(EMPTY_LEAD)
  }

  const getWhatsAppLeadUrl = (lead: LeadRecord) => {
    const msg = `Hello *${lead.name}*! 👋

Thank you for reaching out to *Sri Web Squad*. We received your inquiry regarding *${lead.service}*.

We would love to discuss your project requirements and provide the best solution. When would be a convenient time for a quick call?

Best regards,
*Sri Web Squad Team*
🌐 https://sriwebsquad.com`
    return getWhatsAppDirectUrl(lead.phone, msg)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:items-center sm:text-center max-w-2xl mx-auto space-y-1">
        <div className="flex items-center justify-between sm:justify-center w-full">
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Leads & Inquiries
          </h1>
          <span className="sm:hidden text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
            {leads.length} Total
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-300">
          Manage incoming project requests and connect instantly with prospective clients.
        </p>
      </div>

      {/* Top Action Button */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-slate-300 sm:hidden">
          {filteredLeads.length} Leads
        </span>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          size="sm"
          className="text-xs h-9 px-3.5 bg-gradient-to-r from-blue-600 to-primary-600 hover:from-blue-500 hover:to-primary-500 text-white font-bold shadow-md shadow-blue-600/30 transition-all rounded-xl ml-auto"
        >
          <Plus className="w-4 h-4 mr-1 font-bold" /> Add Lead
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0d1629] border border-slate-750 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#070d1a] border border-slate-750 overflow-x-auto">
            {["all", "new", "contacted", "converted", "closed"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap ${
                  statusFilter === st
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {st === "all" ? `All (${leads.length})` : st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search leads by name, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs bg-[#070d1a] border-slate-750 text-white placeholder:text-slate-400 focus:border-blue-500 font-medium rounded-xl"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Leads Grid / Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLeads.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="font-bold text-white text-base">No client leads found</p>
            <p className="text-xs text-slate-400 mt-1">Incoming website contact form inquiries will appear here.</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-5 rounded-2xl bg-[#0d1629] border border-slate-750 hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-lg shadow-black/30"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-base text-white">{lead.name}</h3>
                    <span className="text-xs font-bold text-blue-400 block mt-0.5">
                      {lead.service}
                    </span>
                  </div>

                  <select
                    value={lead.status}
                    onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none capitalize ${
                      lead.status === "new"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : lead.status === "contacted"
                        ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                        : lead.status === "converted"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    <option value="new" className="bg-slate-900 text-amber-300">New</option>
                    <option value="contacted" className="bg-slate-900 text-blue-300">Contacted</option>
                    <option value="converted" className="bg-slate-900 text-emerald-300">Converted</option>
                    <option value="closed" className="bg-slate-900 text-slate-300">Closed</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-xs text-slate-200 mb-4 font-medium">
                  <div className="flex items-center gap-2 font-mono">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-white font-semibold">{lead.phone}</span>
                  </div>
                  {lead.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-300">{lead.email}</span>
                    </div>
                  )}
                  {lead.budget && (
                    <div className="text-xs text-slate-300">
                      Budget: <strong className="text-emerald-300 font-bold">{lead.budget}</strong>
                    </div>
                  )}
                </div>

                {lead.message && (
                  <div className="p-3.5 rounded-xl bg-[#070d1a] border border-slate-750 text-xs text-slate-200 italic mb-4 leading-relaxed">
                    &ldquo;{lead.message}&rdquo;
                  </div>
                )}
              </div>

              <div className="pt-3.5 border-t border-slate-750 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400 font-mono font-medium">
                  Date: {lead.createdAt}
                </span>

                <div className="flex items-center gap-1.5">
                  <a
                    href={getWhatsAppLeadUrl(lead)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>

                  <button
                    onClick={() => handleDeleteLead(lead.id)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 border border-slate-700 hover:border-rose-500 text-rose-300 hover:text-white transition-all"
                    title="Delete lead"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0d1629] border-2 border-slate-700 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-700 mb-4">
              <h3 className="font-black text-lg text-white">Add New Client Lead</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Client / Business Name *</label>
                <Input
                  value={newLeadData.name}
                  onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                  placeholder="e.g. Murugan Traders"
                  className="bg-[#070d1a] border-slate-700 text-white text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Phone Number *</label>
                <Input
                  value={newLeadData.phone}
                  onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="bg-[#070d1a] border-slate-700 text-white font-mono text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Service Interested In</label>
                <Input
                  value={newLeadData.service}
                  onChange={(e) => setNewLeadData({ ...newLeadData, service: e.target.value })}
                  placeholder="e.g. GST Billing Software"
                  className="bg-[#070d1a] border-slate-700 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Notes / Requirement</label>
                <Textarea
                  value={newLeadData.message}
                  onChange={(e) => setNewLeadData({ ...newLeadData, message: e.target.value })}
                  placeholder="Details of client requirements..."
                  rows={3}
                  className="bg-[#070d1a] border-slate-700 text-white text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-700">
                <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)} className="text-slate-300 hover:text-white text-xs font-bold">
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30">
                  Save Lead
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
