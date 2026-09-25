"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"
import { Globe, Smartphone, Monitor, Cpu, LayoutDashboard, ShoppingCart } from "lucide-react"

const services = [
  {
    title: "Website Development",
    icon: Globe,
    features: ["Modern", "Responsive", "SEO Friendly"]
  },
  {
    title: "AI & Business Automation",
    icon: Cpu,
    features: ["AI Chatbots", "Automation", "Smart Solutions"]
  },
  {
    title: "Mobile App Development",
    icon: Smartphone,
    features: ["Android Apps", "iOS Apps", "Custom Solutions"]
  },
  {
    title: "Software Development",
    icon: Monitor,
    features: ["Business Management Software", "Desktop Apps", "Electron Applications"]
  },
  {
    title: "E-Commerce Solutions",
    icon: ShoppingCart,
    features: ["Online Stores", "Secure", "Scalable"]
  },
  {
    title: "Admin Dashboard Development",
    icon: LayoutDashboard,
    features: ["Analytics", "Reports", "Management"]
  }
]

export function Services() {
  return (
    <section id="services" className="py-8 sm:py-14 md:py-18 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background decoration using fast CSS radial gradients */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-[radial-gradient(circle,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Our Services" 
          subtitle="Comprehensive digital solutions tailored to elevate your business in the modern landscape."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 md:mt-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-primary-500/30">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h3>
                <ul className="space-y-3 mt-auto">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-3 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
