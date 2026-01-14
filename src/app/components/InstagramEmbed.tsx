"use client"

import { useEffect, useRef } from "react"

type InstagramEmbedProps = {
  url: string
}

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Instagram embed script once
    const scriptSrc = "https://www.instagram.com/embed.js"

    const load = () => {
      // @ts-ignore
      window.instgrm?.Embeds?.process?.()
    }

    const existing = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null

    if (existing) {
      load()
      return
    }

    const s = document.createElement("script")
    s.async = true
    s.defer = true
    s.src = scriptSrc
    s.onload = load
    document.body.appendChild(s)
  }, [url])

  return (
    <div ref={ref} className="w-full h-full">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ width: "100%", margin: 0 }}
      />
    </div>
  )
}
