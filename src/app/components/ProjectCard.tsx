"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

type ProjectCardProps = {
  title: string
  image: string
  slug: string
}

// Placeholder SVG while loading
const PlaceholderSVG = () => (
  <svg
    className="animate-pulse"
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="25" cy="25" r="20" stroke="#999" strokeWidth="4" />
    <circle cx="25" cy="25" r="10" fill="#999" />
  </svg>
)

export default function ProjectCard({ title, image, slug }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !loadedSrc) {
          setTimeout(() => {
            setLoadedSrc(image)
          }, 600) // 600ms delay
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [image, loadedSrc])

  return (
    <Link href={`/projects/${slug}`} className="block w-full h-full">
      <div ref={ref} className="relative w-full h-full overflow-hidden bg-neutral-900 group">
        {showPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <PlaceholderSVG />
          </div>
        )}

        {loadedSrc && (
          <img
            src={loadedSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            onLoad={() => setShowPlaceholder(false)}
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-lg font-semibold text-center px-4">
            {title}
          </span>
        </div>
      </div>
    </Link>
  )
}
