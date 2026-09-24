"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  KeyRound, 
  MessageCircle, 
  Download, 
  Upload, 
  RotateCcw, 
  Save, 
  Check, 
  ShieldCheck, 
  Building2, 
  FileText, 
  FileSpreadsheet, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  BellRing,
  SendHorizontal,
  ShieldAlert
} from "lucide-react"
import { 
  getStoredSettings, 
  saveStoredSettings, 
  syncSettingsToSupabase, 
  fetchSettingsFromSupabase, 
  AdminSettings, 
  DEFAULT_SETTINGS,
  SEED_PROJECTS, 
  exportDatabaseBackupJSON, 
  importDatabaseBackupJSON, 
  generateWhatsAppReminderMessage, 
  exportProjectsToCSV, 
  printProjectsPDFReport 
} from "@/lib/admin-store"

export default function SettingsAdminPage() {
  const [settings, setSettings] = React.useState<AdminSettings>(() => getStoredSettings())
  const [savedSuccess, setSavedSuccess] = React.useState(false)
  const [securitySuccess, setSecuritySuccess] = React.useState(false)
  const [showPass, setShowPass] = React.useState(false)
  const [showPin, setShowPin] = React.useState(false)
  const [showBotToken, setShowBotToken] = React.useState(false)
  const [testAlertLoading, setTestAlertLoading] = React.useState(false)
  const [testAlertSuccess, setTestAlertSuccess] = React.useState(false)
  const [testAlertError, setTestAlertError] = React.useState("")
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    fetchSettingsFromSupabase().then((cloud) => {
      if (cloud) {
        setSettings(cloud)
      }
    }).catch(() => {})
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    saveStoredSettings(settings)
    await syncSettingsToSupabase(settings).catch(() => {})
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const handleSaveSecurityOnly = async () => {
    if (!settings.adminPass.trim()) {
      alert("Password cannot be empty!")
      return
    }
    if (!settings.adminPin.trim()) {
      alert("PIN cannot be empty!")
      return
    }
    saveStoredSettings(settings)
    await syncSettingsToSupabase(settings).catch(() => {})
    setSecuritySuccess(true)
    setTimeout(() => setSecuritySuccess(false), 3500)
  }

  const handleSendTestTelegram = async () => {
    if (!settings.telegramBotToken?.trim() || !settings.telegramChatId?.trim()) {
      alert("Please enter both your Telegram Bot Token and Chat ID first!")
      return
    }
    setTestAlertLoading(true)
    setTestAlertError("")
    setTestAlertSuccess(false)

    try {
      const res = await fetch("/api/admin/security-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isTest: true,
          botTokenOverride: settings.telegramBotToken.trim(),
          chatIdOverride: settings.telegramChatId.trim(),
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setTestAlertSuccess(true)
        setTimeout(() => setTestAlertSuccess(false), 6000)
      } else {
        setTestAlertError(data.error || "Failed to send Telegram test message. Please check token & chat ID.")
      }
    } catch (err: any) {
      setTestAlertError(err.message || "Network error sending test alert.")
    } finally {
      setTestAlertLoading(false)
    }
  }

  const handleResetTemplate = () => {
    setSettings({
      ...settings,
      whatsappTemplate: DEFAULT_SETTINGS.whatsappTemplate,
    })
  }

  const handleExportJSON = () => {
    const jsonData = exportDatabaseBackupJSON()
    const blob = new Blob([jsonData], { type: "application/json;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `sri_web_squad_backup_${new Date().toISOString().split("T")[0]}.json`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (content) {
        const success = importDatabaseBackupJSON(content)
        if (success) {
          setSettings(getStoredSettings())
          alert("Database imported and restored successfully!")
        } else {
          alert("Invalid backup file format.")
        }
      }
    }
    reader.readAsText(file)
  }

  // Generate live sample preview of the WhatsApp template using sample project
  const sampleMsgPreview = React.useMemo(() => {
    return generateWhatsAppReminderMessage(SEED_PROJECTS[0], settings)
  }, [settings])

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:items-center sm:text-center max-w-2xl mx-auto space-y-1">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Settings & Backups
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-300">
          Configure WhatsApp templates, payment instructions, login credentials, and data backups.
        </p>
      </div>

      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold max-w-md mx-auto shadow-md"
        >
          <Check className="w-4 h-4" /> Settings Saved Successfully!
        </motion.div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: WhatsApp Renewal Template Engine */}
        <div className="p-6 rounded-2xl bg-[#0c1426] border border-slate-800 shadow-md space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">WhatsApp Renewal Reminder Template</h3>
                <p className="text-xs text-slate-400">
                  Customizable message template sent to clients when domain or hosting is due.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetTemplate}
              className="text-xs border-slate-750 bg-slate-850 hover:bg-slate-750 text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Template
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-5 pt-1">
            {/* Template Editor */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200">Template Text Editor:</label>
              <Textarea
                rows={14}
                value={settings.whatsappTemplate}
                onChange={(e) => setSettings({ ...settings, whatsappTemplate: e.target.value })}
                className="bg-[#080e1c] border-slate-800 text-xs font-mono text-slate-100 focus:border-emerald-500 leading-relaxed"
              />
            </div>

            {/* Live Preview Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Live Preview Output:
              </label>
              <div className="p-4 rounded-xl bg-[#080e1c] border border-emerald-500/20 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed h-[290px] overflow-y-auto">
                {sampleMsgPreview}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Company & Payment Details */}
        <div className="p-6 rounded-2xl bg-[#0c1426] border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Company Contact & Payment Info</h3>
              <p className="text-xs text-slate-400">
                These values are dynamically populated in the WhatsApp reminder invoices.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Business / Agency Name</label>
              <Input
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="bg-[#080e1c] border-slate-800 text-white focus:border-blue-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Official Contact & WhatsApp Number</label>
              <Input
                value={settings.companyPhone}
                onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                className="bg-[#080e1c] border-slate-800 text-white focus:border-blue-500 font-mono font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">UPI ID for Client Renewals</label>
              <Input
                value={settings.companyUpiId}
                onChange={(e) => setSettings({ ...settings, companyUpiId: e.target.value })}
                placeholder="sriwebsquad@upi"
                className="bg-[#080e1c] border-slate-800 text-white focus:border-blue-500 font-mono font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Notification Alert Days Ahead</label>
              <Input
                type="number"
                value={settings.notifyDaysBefore || 30}
                onChange={(e) => setSettings({ ...settings, notifyDaysBefore: Number(e.target.value) })}
                className="bg-[#080e1c] border-slate-800 text-white focus:border-blue-500 font-mono font-medium"
              />
              <p className="text-xs text-slate-400">Alert triggers this many days before expiry (default 30 days).</p>
            </div>
          </div>
        </div>

        {/* Section 3: Admin Security Credentials */}
        <div className="p-6 rounded-2xl bg-[#0c1426] border border-purple-500/30 shadow-md space-y-4 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Admin Security Credentials</h3>
                <p className="text-xs text-slate-400">
                  Update your Login Email, Master Password, or 4-Digit Quick PIN (synced across browser & cloud).
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleSaveSecurityOnly}
              className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-purple-600/20"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Update Password & PIN
            </Button>
          </div>

          {securitySuccess && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-purple-400" />
              Password & PIN Updated Successfully! Active for next login.
            </motion.div>
          )}

          <div className="grid sm:grid-cols-3 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Admin Login Email</label>
              <Input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value.trim() })}
                className="bg-[#080e1c] border-slate-800 text-white focus:border-purple-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>Master Password</span>
                <span className="text-[10px] text-purple-400 font-mono">Current: {showPass ? settings.adminPass : "••••••••"}</span>
              </label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  value={settings.adminPass}
                  onChange={(e) => setSettings({ ...settings, adminPass: e.target.value })}
                  className="bg-[#080e1c] border-slate-800 text-white focus:border-purple-500 font-mono font-medium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  title={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>4-Digit Quick PIN</span>
                <span className="text-[10px] text-cyan-400 font-mono">PIN: {showPin ? settings.adminPin : "••••"}</span>
              </label>
              <div className="relative">
                <Input
                  type={showPin ? "text" : "password"}
                  maxLength={6}
                  value={settings.adminPin}
                  onChange={(e) => setSettings({ ...settings, adminPin: e.target.value.trim() })}
                  className="bg-[#080e1c] border-slate-800 text-white focus:border-cyan-500 font-mono font-medium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  title={showPin ? "Hide PIN" : "Show PIN"}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Telegram Automated Security Alerts (100% Free) */}
        <div className="p-6 rounded-2xl bg-[#0c1426] border border-sky-500/30 shadow-md space-y-5 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center">
                <SendHorizontal className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-white">Telegram Automated Security Alerts</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    100% Free
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Instant background push notification to your phone whenever unauthorized login intrusions are detected.
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleSendTestTelegram}
              disabled={testAlertLoading}
              className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-sky-600/20 disabled:opacity-50"
            >
              {testAlertLoading ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending Test...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <BellRing className="w-3.5 h-3.5" />
                  Send Test Alert
                </span>
              )}
            </Button>
          </div>

          {testAlertSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>✅ Test alert sent successfully! Check your Telegram app for the instant push notification.</span>
            </motion.div>
          )}

          {testAlertError && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-medium flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{testAlertError}</span>
            </motion.div>
          )}

          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">
                Telegram Bot Token
              </label>
              <div className="relative">
                <Input
                  type={showBotToken ? "text" : "password"}
                  value={settings.telegramBotToken || ""}
                  onChange={(e) => setSettings({ ...settings, telegramBotToken: e.target.value.trim() })}
                  placeholder="e.g. 7123456789:AAHk..."
                  className="bg-[#080e1c] border-slate-800 text-white focus:border-sky-500 font-mono text-xs font-medium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowBotToken(!showBotToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  title={showBotToken ? "Hide Token" : "Show Token"}
                >
                  {showBotToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">
                Telegram Chat ID
              </label>
              <Input
                type="text"
                value={settings.telegramChatId || ""}
                onChange={(e) => setSettings({ ...settings, telegramChatId: e.target.value.trim() })}
                placeholder="e.g. 543219876"
                className="bg-[#080e1c] border-slate-800 text-white focus:border-sky-500 font-mono text-xs font-medium"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            className="px-8 py-5 bg-gradient-to-r from-blue-600 to-primary-600 hover:from-blue-500 hover:to-primary-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30"
          >
            <Save className="w-4 h-4 mr-2" /> Save Settings
          </Button>
        </div>
      </form>

      {/* Section 4: Database Backup, Export & Recovery */}
      <div className="p-6 rounded-2xl bg-[#0c1426] border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Database Backup & Report Export</h3>
            <p className="text-xs text-slate-400">
              Export high-resolution PDF reports, CSV spreadsheets, and secure JSON database backups.
            </p>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImportJSON}
          accept=".json"
          className="hidden"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
          <Button
            type="button"
            onClick={printProjectsPDFReport}
            className="w-full justify-center bg-[#080e1c] hover:bg-rose-500/15 text-rose-300 hover:text-white text-xs border border-rose-500/30 font-bold px-3 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 mr-1.5 text-rose-400 shrink-0" /> 
            <span className="truncate">Export PDF Report</span>
          </Button>

          <Button
            type="button"
            onClick={handleExportCSV}
            className="w-full justify-center bg-[#080e1c] hover:bg-emerald-500/15 text-emerald-300 hover:text-white text-xs border border-emerald-500/30 font-bold px-3 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-emerald-400 shrink-0" /> 
            <span className="truncate">Export CSV Sheet</span>
          </Button>

          <Button
            type="button"
            onClick={handleExportJSON}
            className="w-full justify-center bg-[#080e1c] hover:bg-purple-500/15 text-purple-300 hover:text-white text-xs border border-purple-500/30 font-bold px-3 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-purple-400 shrink-0" /> 
            <span className="truncate">Export JSON Backup</span>
          </Button>

          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full justify-center bg-[#080e1c] hover:bg-cyan-500/15 text-cyan-300 hover:text-white text-xs border border-cyan-500/30 font-bold px-3 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5 text-cyan-400 shrink-0" /> 
            <span className="truncate">Restore JSON DB</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
