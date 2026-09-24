"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, MessageCircle, ExternalLink, Send, Sparkles } from "lucide-react"
import QRCode from "react-qr-code"

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GOOGLE_MAPS_LOCATION_URL = "https://www.google.com/maps/place/Sri+Web+Squad/@11.7040456,79.7671579,17z/data=!3m1!4b1!4m6!3m5!1s0x3a54970bc69bcd31:0x2514c310923dd33c!8m2!3d11.7040456!4d79.7671579!16s%2Fg%2F11zh8sgg4p?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"

export function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleWhatsAppSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.message) {
      alert("Please fill in at least your name and message.")
      return
    }
    
    const text = `*New Inquiry from Website*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone || 'N/A'}%0A*Email:* ${formData.email || 'N/A'}%0A*Company:* ${formData.company || 'N/A'}%0A%0A*Message:*%0A${formData.message}`
    window.open(`https://wa.me/917845391712?text=${text}`, '_blank')
  }

  const handleEmailSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.message) {
      alert("Please fill in at least your name and message.")
      return
    }
    
    const subject = `Website Inquiry from ${formData.name}`
    const body = `Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AEmail: ${formData.email}%0D%0ACompany: ${formData.company || 'N/A'}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`
    window.location.href = `mailto:sriwebsquad@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="py-8 sm:py-12 md:py-14 bg-[#030712] border-t border-slate-900 relative overflow-hidden text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Get in Touch" 
          subtitle="Ready to start your digital project? Contact us today for a free consultation and quick quote."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 mt-6 sm:mt-8 md:mt-10 max-w-6xl mx-auto">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-2 grid md:grid-cols-2 lg:grid-cols-1 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-gradient-to-b from-[#0a0f1e] via-[#070b16] to-[#04070e] border border-slate-800/90 shadow-2xl backdrop-blur-xl"
            >
              <h3 className="text-2xl font-black text-white mb-2">Direct Contact</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Connect directly with our engineering team. We reply within minutes.
              </p>
              
              <div className="space-y-6">
                {/* Office Location */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-400 shrink-0">
                    <MapPin className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Office Location</h4>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5">Sri Web Squad</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      36, Salt Office Road, Pachayankuppam, Cuddalore Old Town, Tamil Nadu - 607003
                    </p>
                    <a 
                      href={GOOGLE_MAPS_LOCATION_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 mt-1.5 transition-colors group font-semibold"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
                
                {/* Phone Number */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Call / WhatsApp</h4>
                    <div className="flex flex-col gap-1 mt-0.5 font-semibold font-mono">
                      <a 
                        href="tel:+917845391712" 
                        className="text-sm text-slate-200 hover:text-white transition-colors block"
                      >
                        +91 78453 91712
                      </a>
                      <a 
                        href="tel:+919486470454" 
                        className="text-sm text-slate-200 hover:text-white transition-colors block"
                      >
                        +91 94864 70454
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Email Address */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Email Inquiry</h4>
                    <a 
                      href="mailto:sriwebsquad@gmail.com" 
                      className="text-sm text-slate-200 hover:text-white transition-colors block mt-0.5 font-semibold"
                    >
                      sriwebsquad@gmail.com
                    </a>
                  </div>
                </div>

                {/* Social Connect */}
                <div className="pt-4 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">Follow & Connect</h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    <a 
                      href="https://www.instagram.com/sri_web_squad" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-3 py-1.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold flex items-center gap-1.5 hover:border-pink-400 hover:bg-pink-500/20 transition-all hover:scale-105"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                      <span>Instagram</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/sriram-nagarajan-24a9a837b" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center gap-1.5 hover:border-blue-400 hover:bg-blue-500/20 transition-all hover:scale-105"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="https://www.facebook.com/profile.php?id=61594401073325" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 hover:border-indigo-400 hover:bg-indigo-500/20 transition-all hover:scale-105"
                      aria-label="Facebook"
                    >
                      <FacebookIcon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* WhatsApp QR Direct Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-3xl bg-gradient-to-b from-[#061224] via-[#040c1a] to-[#02060e] border border-blue-500/30 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white flex items-center gap-2 text-sm sm:text-base mb-1">
                    <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" /> 
                    <span>Scan & Chat on WhatsApp</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Instant response for free quotes & consultations.
                  </p>
                  <a
                    href="https://wa.me/917845391712"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold mt-3 transition-colors"
                  >
                    <span>Click to Open WhatsApp</span> →
                  </a>
                </div>

                <div className="bg-white p-2 rounded-2xl shadow-lg shrink-0">
                  <QRCode 
                    value="https://wa.me/917845391712" 
                    size={80}
                    level="H"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Project Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0a0f1e] via-[#070b16] to-[#04070e] border border-slate-800/90 shadow-2xl backdrop-blur-xl h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Free Consultation & Estimate</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Tell Us About Your Project
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  Fill in your details below and we will get back with a customized strategy and budget.
                </p>

                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-300">Your Name *</label>
                      <Input 
                        id="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="e.g. John Doe" 
                        className="bg-[#050811] border-slate-800 text-white focus:border-primary-500 rounded-xl"
                        required 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-300">Phone Number *</label>
                      <Input 
                        id="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        type="tel" 
                        placeholder="+91 78453 91712" 
                        className="bg-[#050811] border-slate-800 text-white focus:border-primary-500 rounded-xl font-mono"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-300">Email Address</label>
                      <Input 
                        id="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        type="email" 
                        placeholder="name@company.com" 
                        className="bg-[#050811] border-slate-800 text-white focus:border-primary-500 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-slate-300">Company / Business Name</label>
                      <Input 
                        id="company" 
                        value={formData.company} 
                        onChange={handleChange} 
                        placeholder="e.g. Smile Care Clinic" 
                        className="bg-[#050811] border-slate-800 text-white focus:border-primary-500 rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-300">Project Requirements *</label>
                    <Textarea 
                      id="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Tell us what you want to build (Website, Mobile App, Business Management System, etc.)..." 
                      rows={4}
                      className="bg-[#050811] border-slate-800 text-white focus:border-primary-500 rounded-xl"
                      required 
                    />
                  </div>
                  
                  <div className="pt-3 flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="button" 
                      onClick={handleWhatsAppSubmit} 
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" /> Send via WhatsApp
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleEmailSubmit} 
                      className="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-primary-600/30 transition-all hover:scale-[1.02]"
                    >
                      <Send className="w-4 h-4 mr-2" /> Send via Email
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
