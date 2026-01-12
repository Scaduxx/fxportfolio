"use client"

import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

// Behance icon (inline SVG – same as navbar)
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

export default function Footer() {
  const year = new Date().getFullYear()

  const iconClass =
    "text-white/40 hover:text-white transition inline-flex items-center"

  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm">
        {/* Left — identity */}
        <div className="flex flex-col gap-1 text-white/50">
          <span>© {year} Vasilis Chatziantoniou. All rights reserved.</span>
          <span className="text-white/40">
            Senior FX Artist · Motion Designer
          </span>
        </div>

        {/* Right — socials */}
        <div className="flex items-center gap-5">
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
            href="https://www.youtube.com/@VasilisChatziantoniou"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            <Youtube size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
