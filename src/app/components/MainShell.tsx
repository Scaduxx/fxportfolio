"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { consumeNavDir, NavDir } from "./navDirection"

export default function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isProjectPage = pathname?.startsWith("/projects/")
  const isHome = pathname === "/"

  // ✅ NEW: detect About / Contact
  const isAbout = pathname === "/about"
  const isContact = pathname === "/contact"

  // ✅ UPDATED: keep old behavior, just add About/Contact
  const topPad =
    isHome
      ? "pt-80"
      : isProjectPage
      ? "pt-32"
      : isAbout || isContact
      ? "pt-20"
      : "pt-32"

  // direction used for the NEXT/PREV transitions
  const [dir, setDir] = useState<NavDir>("none")

  useEffect(() => {
    setDir(consumeNavDir())
  }, [pathname])

  const variants = useMemo(() => {
    const enterY = 6
    const exitY = -6

    const enterX = dir === "forward" ? 10 : dir === "back" ? -10 : 0
    const exitX = dir === "forward" ? -10 : dir === "back" ? 10 : 0

    return {
      initial: { opacity: 0, x: enterX, y: enterY },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: exitX, y: exitY },
    }
  }, [dir])

  // Home: keep instant (no AnimatePresence / motion)
  if (isHome) {
    return <main className={topPad}>{children}</main>
  }

  return (
    <main className={topPad}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          //exit="exit"
          variants={variants}
          transition={{
            duration: 2.0,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
