"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Instagram, Linkedin, Twitter, Mail, Menu, X, Youtube } from "lucide-react"

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// Behance icon (inline svg)
// Doesn't exist in lucide library, need to create it 
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
  const [t, setT] = useState(0) // 0..1 scroll intensity (0 top of page, 1 after ~180px)
  const [openMenu, setOpenMenu] = useState(false) // mobile burger menu state

  // 1) Scroll → controls the navbar tint/blur intensity
  useEffect(() => {
    const onScroll = () => setT(clamp(window.scrollY / 180, 0, 1))
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // 2) Close burger menu on ESC (small quality-of-life)
  useEffect(() => {
    if (!openMenu) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [openMenu])

  // 3) Lock body scroll when menu is open (prevents “scroll behind the menu”)
  useEffect(() => {
    if (!openMenu) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [openMenu])

  /**
   * Important reminder for future-me:
   * - backdrop-filter blur applies UNIFORMLY to the whole element.
   * - To make blur/tint fade out toward the bottom, we mask the navbar.
   */
  const style = useMemo(() => {
    const topOpacity = lerp(0.0, 0.75, t) // preferred settings
    const bottomOpacity = 0.0
    const blurPx = lerp(0, 12, t)

    return {
      // Tint gradient
      backgroundImage: `linear-gradient(to bottom,
        rgba(0,0,0,${topOpacity}) 0%,
        rgba(0,0,0,${bottomOpacity}) 100%)`,
      backgroundColor: "transparent",

      // Blur
      backdropFilter: `blur(${blurPx}px)`,
      WebkitBackdropFilter: `blur(${blurPx}px)`,

      // Fade out the entire effect (blur+tint) toward the bottom
      // 60% = where fade begins
      maskImage:
        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
      WebkitMaskImage:
        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
    } as React.CSSProperties
  }, [t])

  const iconClass =
    "text-white/60 hover:text-white transition inline-flex items-center"

  return (
    <>
      <nav className="fixed top-0 w-full z-50" style={style}>
        {/* NOTE: I changed px-6 -> px-4 on mobile to give more “field view” */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-30 py-15 flex justify-between items-center">
          <Link href="/" className="text-xl font-medium">
            Scaduxx __ Vasilis Chatziantoniou.
          </Link>

          <div className="flex items-center gap-8">
            {/* Desktop nav links (hidden on mobile) */}
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

            {/* Top-right icons (keep ONLY Instagram + Email for now) */}
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
                href="https://www.youtube.com/@VasilisChatziantoniou" // 🔧 replace with your real channel
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                >
                <Youtube size={18} />
              </a>


              {/*
              // Moved to footer for now (kept for later)
              <a 
                className={iconClass} 
                href="https://www.linkedin.com/in/vasileioschatz/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>

              <a 
                className={iconClass} 
                href="https://x.com/billy_xtz" 
                target="_blank" rel="noreferrer" 
                aria-label="X">
                <Twitter size={18} />
              </a>

              <a 
                className={iconClass} 
                href="https://www.behance.net/scaduxx" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Behance">
                <BehanceIcon />
              </a>
              */}

              <a
                className={iconClass}
                href="mailto:vasilischtz@gmail.com"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>

              {/* Mobile burger button (only shows <sm) */}
              <button
                className="sm:hidden text-white/60 hover:text-white transition inline-flex items-center"
                onClick={() => setOpenMenu(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay (only when burger is open) */}
      {openMenu && (
        <div className="fixed inset-0 z-[9999]">
          {/* Clicking outside closes the menu */}
          <button
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpenMenu(false)}
            aria-label="Close menu"
          />

          {/* Slide-in panel */}
          <div className="absolute top-0 right-0 h-full w-[82vw] max-w-[360px] bg-black/90 backdrop-blur-md border-l border-white/10">
            <div className="flex items-center justify-between px-6 py-6">
              <span className="text-sm uppercase tracking-widest text-white/60">
                Menu
              </span>

              <button
                className="text-white/60 hover:text-white transition"
                onClick={() => setOpenMenu(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-2 flex flex-col gap-5">
              {/* On mobile we show the same links that are hidden on desktop */}
              <Link
                href="/"
                onClick={() => setOpenMenu(false)}
                className="text-2xl font-medium tracking-wide text-white/90 hover:text-white transition"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setOpenMenu(false)}
                className="text-2xl font-medium tracking-wide text-white/90 hover:text-white transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpenMenu(false)}
                className="text-2xl font-medium tracking-wide text-white/90 hover:text-white transition"
              >
                Contact
              </Link>
              <Link
                href="/lab"
                onClick={() => setOpenMenu(false)}
                className="text-2xl font-medium tracking-wide text-white/90 hover:text-white transition"
              >
                Lab
              </Link>

              <div className="mt-10 h-px w-full bg-white/10" />

              {/* Keep the important quick actions even inside the menu */}
              <div className="flex items-center gap-5 pt-2">
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
                  href="mailto:vasilischtz@gmail.com"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>

                {/*
                // Optional: if you ever want them back in the mobile menu too:
                <a className={iconClass} href="https://www.linkedin.com/in/vasileioschatz/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a className={iconClass} href="https://x.com/billy_xtz" target="_blank" rel="noreferrer" aria-label="X">
                  <Twitter size={18} />
                </a>
                <a className={iconClass} href="https://www.behance.net/scaduxx" target="_blank" rel="noreferrer" aria-label="Behance">
                  <BehanceIcon />
                </a>
                */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
