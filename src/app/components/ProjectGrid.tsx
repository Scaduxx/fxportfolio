"use client"

import { useEffect, useState } from "react"
import ProjectCard from "./ProjectCard"

// Use require() for justified-layout with TypeScript
const justifiedLayout = require("justified-layout")

type Project = {
  title: string
  image: string
  slug: string
  aspectRatio?: number // 3/2, 4/3, etc.
  createdAt?: string
}

type ProjectGridProps = {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [layoutBoxes, setLayoutBoxes] = useState<any[]>([])
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]) // ✅ added
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  useEffect(() => {
    function updateLayout() {
      const width = Math.min(window.innerWidth, 1600)
      setContainerWidth(width)

      // Sort projects by createdAt descending (newest first)
      const sorted = [...projects].sort((a, b) =>
        (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
      )
      setSortedProjects(sorted) // ✅ added

      // 🔒 FORCE 3/2 ON VERY SMALL SCREENS ONLY
      const isSmallScreen = width <= 720

      const aspectRatios = sorted.map(p =>
        isSmallScreen ? 1.5 : (p.aspectRatio || 1.0)
      )

      const layout = justifiedLayout(aspectRatios, {
        containerWidth: width,
        targetRowHeight: 340,
        boxSpacing: 10,
        containerPadding: 0,
      })

      setLayoutBoxes(layout.boxes)
      setContainerHeight(layout.containerHeight)
    }

    updateLayout()
    window.addEventListener("resize", updateLayout)
    return () => window.removeEventListener("resize", updateLayout)
  }, [projects])

  if (!layoutBoxes || layoutBoxes.length === 0) return null

  return (
    <div
      className="relative mx-auto"
      style={{ width: containerWidth, height: containerHeight }}
    >
      {layoutBoxes.map((box, i) => {
        const project = sortedProjects[i] // ✅ changed (was projects[i])
        if (!project) return null

        return (
          <div
            key={`${project.slug}-${i}`} // ✅ safer unique key
            style={{
              position: "absolute",
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height,
            }}
          >
            <ProjectCard {...project} />
          </div>
        )
      })}
    </div>
  )
}
