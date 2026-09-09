"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "₹15,000",
    description: "Perfect for small businesses establishing their online presence.",
    features: ["Business Website", "5 Pages", "Responsive Design", "Basic SEO", "Contact Form"],
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Professional",
    price: "₹35,000",
    description: "Ideal for growing companies needing advanced features.",
    features: ["Business Website", "Admin Panel", "CMS Integration", "Advanced SEO", "Hosting Support", "Analytics"],
    buttonVariant: "primary" as const,
    popular: true
  },
  {
    name: "Premium",
    price: "₹75,000+",
    description: "Complete digital transformation with custom solutions.",
    features: ["Custom Software", "Android App", "iOS App", "Admin Dashboard", "Cloud Database", "AI Features", "Priority Support"],
    buttonVariant: "secondary" as const,
    popular: false
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-900 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Transparent Pricing" 
          subtitle="Choose the perfect plan for your business needs with no hidden fees."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'md:-mt-8 md:mb-8' : ''}`}
            >
              <GlassCard 
                className={`h-full flex flex-col p-8 ${
                  plan.popular 
                    ? 'border-2 border-primary-500 shadow-primary-500/20 dark:shadow-primary-500/10' 
                    : ''
                }`}
                hoverEffect={!plan.popular} // Disable hover effect on popular so it stays prominent
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-primary-600 to-blue-400 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm h-10 mb-6">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                  {plan.name !== "Premium" && <span className="text-slate-500 dark:text-slate-400 font-medium">/project</span>}
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-primary-500 mr-3 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild 
                  variant={plan.buttonVariant} 
                  className={plan.popular ? 'w-full shadow-lg shadow-primary-500/30' : 'w-full'}
                >
                  <Link href="#contact">Get Started</Link>
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
