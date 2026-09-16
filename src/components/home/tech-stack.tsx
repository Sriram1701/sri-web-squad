"use client"

import * as React from "react"

interface TechItem {
  name: string
  iconBg: string
  iconColor: string
  svg: React.ReactNode
}

const techStackRow1: TechItem[] = [
  {
    name: "Flutter",
    iconBg: "bg-sky-500/10 border-sky-500/20",
    iconColor: "text-sky-400",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zM14.314 11.286L8.143 17.457 14.314 23.63h7.372l-9.83-9.83 3.686-3.685-1.228 1.171z" />
      </svg>
    )
  },
  {
    name: "Swift",
    iconBg: "bg-orange-500/10 border-orange-500/20",
    iconColor: "text-orange-500",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.572 16.486c-.053-.092-2.92-4.996-7.502-7.854 4.544 3.738 6.55 7.15 6.64 7.306.27.466.072.827-.442.806-.514-.02-3.136-.57-6.22-3.042-3.633-2.91-5.748-6.388-6.074-6.932-.23-.38-.073-.772.35-.873.424-.1 3.518.337 7.02 2.76-4.57-3.92-7.44-8.083-7.52-8.2-.23-.343-.07-.743.35-.89.42-.148 3.59.04 7.6 2.652C11.396.793 6.946.068 6.745.034c-.45-.078-.71.18-.58.57.13.39 2.5 6.09 6.76 10.3 4.26 4.21 8.87 5.61 8.87 5.61.42.13.63-.03.45-.4-.18-.37-.67-1.07-.67-1.07z"/>
      </svg>
    )
  },
  {
    name: "Android",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-500",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.411 13.8533 8.1 12 8.1s-3.5902.311-5.1367.8507L4.841 5.4477a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
      </svg>
    )
  },
  {
    name: "Kotlin",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-400",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 24H0V0h24L12 12Z" />
      </svg>
    )
  },
  {
    name: "PHP",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    iconColor: "text-indigo-400",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm-4.32 13.333H6.13l.897-4.464h1.724a2.22 2.22 0 0 1 1.637.584 1.764 1.764 0 0 1 .472 1.258 2.378 2.378 0 0 1-.777 1.848 2.894 2.894 0 0 1-2.402.774zm6.066-1.576h-1.55l.317-1.577h1.551a1.05 1.05 0 0 1 .808.28 1.01 1.01 0 0 1 .236.72c0 .64-.453.577-1.362.577zm4.12 1.576h-1.55l.896-4.464h1.724a2.22 2.22 0 0 1 1.637.584 1.764 1.764 0 0 1 .472 1.258 2.378 2.378 0 0 1-.777 1.848 2.895 2.895 0 0 1-2.402.774z"/>
      </svg>
    )
  },
  {
    name: "Next.js",
    iconBg: "bg-white/10 border-white/20",
    iconColor: "text-white",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.88 18.06l-6.8-9.08v9.08H9.6V5.94h1.48l6.8 9.08V5.94h1.48v12.12h-1.48z" />
      </svg>
    )
  },
  {
    name: "React",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    iconColor: "text-cyan-400",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="2.2"/>
        <path d="M12 21.5c-4.4 0-8.2-1.3-10.3-3.4-.6-.6-.9-1.3-.9-2.1 0-1.7 1.4-3.5 3.8-4.9-1.1-.9-1.8-1.9-1.8-3.1 0-2.4 2.8-4.4 6.7-5.3.8-1.7 1.9-2.7 3.1-2.7s2.3 1 3.1 2.7c3.9.9 6.7 2.9 6.7 5.3 0 1.2-.7 2.2-1.8 3.1 2.4 1.4 3.8 3.2 3.8 4.9 0 .8-.3 1.5-.9 2.1-2.1 2.1-5.9 3.4-10.3 3.4zm0-19c-.8 0-1.6.8-2.3 2.2 2.9.7 5.2 1.9 6.5 3.4-.6-2.2-2.1-4.2-4.2-5.6z"/>
      </svg>
    )
  },
  {
    name: "TypeScript",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.26 13.92H8.38V20H6.28v-6.08H2.9v-1.74h8.86v1.74zm9.34 2.06c0 1.2-.42 2.18-1.26 2.92-.84.74-1.94 1.1-3.3 1.1-1.28 0-2.34-.34-3.18-1.02a4.4 4.4 0 0 1-1.34-2.58l1.92-.66c.2.8.54 1.42 1.02 1.84.48.42 1.1.64 1.86.64.76 0 1.34-.16 1.76-.48.42-.32.62-.76.62-1.32 0-.46-.14-.84-.42-1.14-.28-.3-.72-.56-1.32-.78l-1.32-.48c-1.12-.4-1.94-.96-2.46-1.68-.52-.72-.78-1.6-.78-2.64 0-1.14.4-2.06 1.2-2.76.8-.7 1.86-1.06 3.18-1.06 1.16 0 2.14.3 2.94.9.8.6 1.28 1.44 1.44 2.52l-1.9.52c-.14-.62-.42-1.1-.84-1.42-.42-.32-.98-.48-1.68-.48-.68 0-1.22.16-1.62.48-.4.32-.6.74-.6 1.26 0 .42.14.76.42 1.02.28.26.74.5 1.38.72l1.32.46c1.16.42 2.02.98 2.58 1.7.56.72.84 1.62.84 2.7z"/>
      </svg>
    )
  },
  {
    name: "Python",
    iconBg: "bg-yellow-500/10 border-yellow-500/20",
    iconColor: "text-yellow-400",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.914 0C5.82 0 6.2 2.652 6.2 2.652l.006 2.748h5.8v.83H3.84S0 5.79 0 11.908c0 6.12 3.35 5.9 3.35 5.9h2V15.01s-.11-3.35 3.3-3.35h5.68s3.24.05 3.24-3.15V3.35S18.01 0 11.914 0zm-3.23 1.83a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zm3.4 22.17c6.09 0 5.72-2.65 5.72-2.65l-.01-2.75h-5.8v-.83h8.17s3.84.44 3.84-5.68c0-6.12-3.35-5.9-3.35-5.9h-2v2.8s.11 3.35-3.3 3.35H9.68s-3.24-.05-3.24 3.15v5.16s-.44 3.35 5.65 3.35zm3.23-1.83a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z"/>
      </svg>
    )
  },
  {
    name: "Node.js",
    iconBg: "bg-green-500/10 border-green-500/20",
    iconColor: "text-green-500",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm8.8 17.1l-8.8 5.1-8.8-5.1V6.9l8.8-5.1 8.8 5.1v10.2z"/>
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    iconBg: "bg-teal-500/10 border-teal-500/20",
    iconColor: "text-teal-400",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
      </svg>
    )
  },
  {
    name: "Docker",
    iconBg: "bg-blue-600/10 border-blue-600/20",
    iconColor: "text-blue-500",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.187.187 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm8.847 2.714h2.12a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.184.185zm-5.884 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.083.185.186.185zM23.79 10.99c-.527-.406-1.57-.492-2.39-.42-.162-.777-.557-1.493-1.157-2.074l-.442-.426-.35.503c-.63.905-.838 2.06-.607 3.125-.436.19-.948.337-1.536.425-1.127.168-2.61.168-3.923.168H.452c-.25 0-.452.202-.452.451.04 1.258.33 2.502.857 3.655.772 1.69 2.023 3.078 3.593 3.99 1.637.95 3.518 1.458 5.437 1.47 6.46 0 11.777-4.47 12.607-10.457.653-.16 1.41-.53 1.874-1.047l.42-.472-.988-.366z"/>
      </svg>
    )
  },
  {
    name: "PostgreSQL",
    iconBg: "bg-blue-400/10 border-blue-400/20",
    iconColor: "text-blue-300",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    )
  },
  {
    name: "Firebase",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-400",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.89 15.672L6.255.461A.54.54 0 0 1 7.27.228l2.97 5.586-6.35 9.858zm16.357-3.414l-1.92-3.664-5.267 9.878 6.19-3.52c.62-.352.997-.994.997-1.694v-1zm-1.077 3.864l-6.837 3.885a.997.997 0 0 1-.99 0l-6.84-3.885 6.84 4.267a.997.997 0 0 0 .99 0l6.837-4.267zM11.848 8.877L9.366 4.21a.54.54 0 0 0-.962-.03L2.348 15.02l9.5-6.143z"/>
      </svg>
    )
  }
]

export function TechStack() {
  return (
    <section className="py-8 sm:py-12 bg-[#030712] border-y border-slate-800/90 overflow-hidden relative z-20">
      <div className="container mx-auto px-4 mb-4 sm:mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
          Technologies We Master
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Engineered With Modern Industry-Leading Tech
        </h2>
      </div>

      {/* Infinite Carousel Container */}
      <div className="relative w-full overflow-hidden flex flex-col gap-4">
        {/* Left & Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#030712] via-[#030712]/80 to-transparent z-10 pointer-events-none" />

        {/* Row 1: Forward Marquee */}
        <div className="flex gap-4 sm:gap-6 animate-marquee whitespace-nowrap py-1 hover:[animation-play-state:paused]">
          {[...techStackRow1, ...techStackRow1].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="inline-flex items-center gap-3.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0a0f1d] border border-slate-700/80 shadow-lg backdrop-blur-md hover:border-primary-500/70 hover:bg-[#0f172a] hover:scale-105 transition-all duration-300 cursor-pointer shrink-0 group"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110 ${tech.iconBg} ${tech.iconColor}`}>
                {tech.svg}
              </div>
              <span className="font-bold text-sm sm:text-base text-slate-100 tracking-wide group-hover:text-primary-400 transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Reverse Marquee */}
        <div className="flex gap-4 sm:gap-6 animate-marquee-reverse whitespace-nowrap py-1 hover:[animation-play-state:paused]">
          {[...techStackRow1.slice().reverse(), ...techStackRow1.slice().reverse()].map((tech, index) => (
            <div
              key={`rev-${tech.name}-${index}`}
              className="inline-flex items-center gap-3.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0a0f1d] border border-slate-700/80 shadow-lg backdrop-blur-md hover:border-primary-500/70 hover:bg-[#0f172a] hover:scale-105 transition-all duration-300 cursor-pointer shrink-0 group"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110 ${tech.iconBg} ${tech.iconColor}`}>
                {tech.svg}
              </div>
              <span className="font-bold text-sm sm:text-base text-slate-100 tracking-wide group-hover:text-primary-400 transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
