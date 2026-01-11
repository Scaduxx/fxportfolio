"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Instagram, Linkedin, Twitter, Mail } from "lucide-react"

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// Behance icon (inline svg)
function BehanceIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8.2 11.4c1.2 0 2.2-.8 2.2-2.2 0-1.6-1.2-2.4-2.8-2.4H3v12h4.9c2.2 0 3.8-1 3.8-3.4 0-1.8-1-2.8-2.4-3.1v-.1c.8-.3 1.9-1 1.9-2.6 0-2.7-2.2-3.9-4.6-3.9H1.5c-.8 0-1.5.7-1.5 1.5v14c0 .8.7 1.5 1.5 1.5H8c3 0 5.2-1.3 5.2-4.6 0-2.2-1.2-3.6-3-4.1Zm-4.1-3.7h2.9c1 0 1.5.4 1.5 1.3 0 .9-.6 1.3-1.6 1.3H4.1V7.7Zm3.1 8.9H4.1v-4h3.1c1.2 0 2 .5 2 2s-.7 2-2 2Z"
        fill="currentColor"
      />
      <path d="M14.6 9.1h4V7.6h-4v1.5Z" fill="currentColor" />
      <path
        d="M19.1 11c-2.4 0-4 1.7-4 4.4 0 2.8 1.6 4.4 4.1 4.4 1.9 0 3.3-1 3.7-2.8h-1.8c-.3.8-.9 1.2-1.8 1.2-1.2 0-2-.8-2.1-2.2H23c.1-3-1.3-5-3.9-5Zm-2 3.5c.2-1.1.9-1.9 2-1.9 1.1 0 1.8.6 2 1.9h-4Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Navbar() {
  const [t, setT] = useState(0) // 0..1 scroll intensity

  useEffect(() => {
    const onScroll = () => setT(clamp(window.scrollY / 180, 0, 1))
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /**
   * Important:
   * - backdrop-filter blur applies UNIFORMLY to the whole element.
   * - To make blur/tint fade out toward the bottom, we mask the navbar.
   */
  const style = useMemo(() => {
    const topOpacity = lerp(0.0, 0.75, t) // your preferred settings
    const bottomOpacity = 0.0
    const blurPx = lerp(0, 12, t)

    return {
      // Tint gradient (your look)
      backgroundImage: `linear-gradient(to bottom,
        rgba(0,0,0,${topOpacity}) 0%,
        rgba(0,0,0,${bottomOpacity}) 100%)`,
      backgroundColor: "transparent",

      // Blur
      backdropFilter: `blur(${blurPx}px)`,
      WebkitBackdropFilter: `blur(${blurPx}px)`,

      // ✅ Fade-out the entire navbar effect (blur+tint) toward the bottom
      // Adjust the 60% to control where the fade begins.
      maskImage:
        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
      WebkitMaskImage:
        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
    } as React.CSSProperties
  }, [t])

  const iconClass =
    "text-white/60 hover:text-white transition inline-flex items-center"

  return (
    <nav className="fixed top-0 w-full z-50" style={style}>
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 md:px-12 lg:px-30 py-15 flex justify-between items-center">
        <Link href="/" className="text-xl font-medium">
          SCADUXX ___ Vasilis Chatziantoniou.
        </Link>

        <div className="flex items-center gap-8">
          {/* Nav links */}
          <div className="space-x-10 text-sm uppercase tracking-wider hidden sm:block">
            <Link href="/" className="text-white/70 hover:text-white transition">
              Home
            </Link>
            <Link href="/about" className="text-white/70 hover:text-white transition">
              About
            </Link>
            <Link
              href="/contact"
              className="text-white/70 hover:text-white transition"
            >
              Contact
            </Link>
            <Link href="/lab" className="text-white/70 hover:text-white transition">
              Lab
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              className={iconClass}
              href="https://www.instagram.com/scaduxx/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              className={iconClass}
              href="https://www.linkedin.com/in/vasileioschatz/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              className={iconClass}
              href="https://x.com/billy_xtz"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
            >
              <Twitter size={18} />
            </a>
            <a
              className={iconClass}
              href="https://www.behance.net/scaduxx"
              target="_blank"
              rel="noreferrer"
              aria-label="Behance"
            >
              <BehanceIcon />
            </a>
            <a
              className={iconClass}
              href="mailto:vasilischtz@gmail.com"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
