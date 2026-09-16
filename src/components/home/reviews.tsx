"use client"

import * as React from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Star, CheckCircle2, ExternalLink } from "lucide-react"

const GOOGLE_MAPS_REVIEW_URL = "https://g.page/r/CTzTPZIQwxQlECE/review"

interface Testimonial {
  id: number
  name: string
  company: string
  service: string
  content: string
  rating: number
  date: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Gowtham",
    company: "Dr. Gowtham's Smile Care, Cuddalore",
    service: "Clinical Web Portal & SEO",
    content: "Sri Web Squad transformed our clinic's online presence completely. The modern website they built for us has significantly increased our patient inquiries and online appointment bookings.",
    rating: 5,
    date: "Verified Google Review"
  },
  {
    id: 2,
    name: "Dr. Adeline Genivie",
    company: "The Tooth Clinique, Pondicherry",
    service: "Pediatric Dental Platform",
    content: "Extremely satisfied with the website developed by Sri Web Squad! The design is super vibrant, patient-friendly, and online consult inquiries have doubled since launch. Outstanding work!",
    rating: 5,
    date: "Verified Google Review"
  },
  {
    id: 3,
    name: "Mr. Prasana",
    company: "Subhi Subiksham Hospitals, Cuddalore",
    service: "Hospital Portal & Emergency Directory",
    content: "Their engineering squad delivered a high-speed, 24/7 emergency healthcare portal with fast execution, pocket-friendly pricing, and 100% dependable developer support.",
    rating: 5,
    date: "Verified Google Review"
  },
  {
    id: 4,
    name: "Murugan & Prabu",
    company: "VKP Engineering, Tirupur",
    service: "B2B Industrial & Fabrication Website",
    content: "A very professional and dedicated team of young developers. They built a high-class corporate website showcasing our heavy machinery and fabrication galleries. Truly exceeded our expectations.",
    rating: 5,
    date: "Verified Google Review"
  },
  {
    id: 5,
    name: "Sumthi Kumar",
    company: "NS Mahaveer Jewellery, Cuddalore",
    service: "Cross-Platform Mobile App",
    content: "The mobile app developed for our live daily gold & silver rates and customer savings scheme ledger works flawlessly. Our customers love the real-time push notifications!",
    rating: 5,
    date: "Verified Google Review"
  },
  {
    id: 6,
    name: "Trainer Vijay",
    company: "Mass Unisex Fitness Gym, Cuddalore",
    service: "Biometric Gym Management System",
    content: "The gym software automated member check-ins and subscription renewals effortlessly. No manual registers, zero errors, and instant WhatsApp alerts for our members.",
    rating: 5,
    date: "Verified Google Review"
  },
  {
    id: 7,
    name: "P. Sundaramoorthy",
    company: "Sri Lakshmi Pawn Finance, Cuddalore",
    service: "Biometric Loan & Pledge Software",
    content: "The biometric pawn broker software they developed with fingerprint authentication and automated interest calculation saved us hours of daily manual paperwork. Highly recommended!",
    rating: 5,
    date: "Verified Google Review"
  }
]

// Google Multi-Color SVG Icon
function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export function Reviews() {
  return (
    <section id="reviews" className="py-8 sm:py-14 md:py-18 bg-[#030712] border-t border-slate-900 overflow-hidden relative text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-primary-500/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 md:mb-8">
        <SectionHeader 
          title="Client Reviews" 
          subtitle="Real feedback from real businesses and clients who partnered with Sri Web Squad."
        />

        {/* Google Reviews Live Summary & Direct Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-3 sm:mt-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0a0f1d] border border-slate-800 shadow-md">
            <GoogleIcon className="w-5 h-5 shrink-0" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-white ml-1">5.0 Star Rating</span>
          </div>

          <a 
            href={GOOGLE_MAPS_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-sm font-bold shadow-lg shadow-primary-600/30 hover:scale-105 transition-all"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>Write a Google Review</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Auto-Scrolling Infinite Carousel Track */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#030712] via-[#030712]/90 to-transparent z-10 pointer-events-none" />

        {/* Single Forward Marquee */}
        <div className="flex gap-6 animate-marquee whitespace-normal py-2 hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={`review-${item.id}-${index}`}
              className="w-[340px] sm:w-[420px] shrink-0 rounded-3xl bg-gradient-to-b from-[#0c1224] via-[#080d1a] to-[#04070f] border border-slate-800/90 shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between hover:border-primary-500/70 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 group"
            >
              <div>
                {/* Card Top: Stars + Verified Google Badge */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-amber-400 ml-1">5.0</span>
                  </div>

                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-semibold">
                    <GoogleIcon className="w-3 h-3" />
                    <span>Google Review</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed italic mb-6">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Client Info Footer */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-primary-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-primary-400 font-semibold mt-0.5">
                      {item.company}
                    </p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
                <div className="text-[11px] text-slate-400 mt-2 font-mono flex items-center justify-between">
                  <span>Service: {item.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
