"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import logoImg from "@/app/icon.png"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FloatingContact } from "@/components/ui/floating-contact"

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (isAdmin) {
    return <div className="min-h-screen bg-[#070b14] relative z-10">{children}</div>
  }

  return (
    <>
      {/* Global Logo Watermark Background (Only on Public Site) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.08] dark:opacity-[0.12] overflow-hidden">
        <Image 
          src={logoImg} 
          alt="" 
          fill 
          className="object-cover object-center" 
          priority 
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <FloatingContact />
      </div>
    </>
  )
}
