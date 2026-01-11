"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"

function driveToEmbed(url: string) {
  const fileIdMatch =
    url.match(/\/file\/d\/([^/]+)/) ||
    url.match(/[?&]id=([^&]+)/) ||
    url.match(/uc\?id=([^&]+)/)

  const fileId = fileIdMatch?.[1]
  if (!fileId) return url

  return `https://drive.google.com/file/d/${fileId}/preview`
}

type ClientLogo = {
  name: string
  src: string
}

export default function AboutPage() {
  const REEL_DRIVE_URL =
    "https://drive.google.com/file/d/1CBFOBDN_eScSbP6iZjGjW8VfLXPV6ZBn/view?usp=sharing"
  const reelEmbedUrl = useMemo(() => driveToEmbed(REEL_DRIVE_URL), [])

  const [openReel, setOpenReel] = useState(false)
  const [openMore, setOpenMore] = useState(false)

  const clientLogos: ClientLogo[] = [
    { name: "Nike", src: "/clients/nike.svg" },
    { name: "Nothing Phone", src: "/clients/nothing.svg" },
    { name: "Lancôme", src: "/clients/lancome.svg" },
    { name: "Coca-Cola", src: "/clients/cocacola.svg" },
    { name: "Louis Vuitton", src: "/clients/lv.svg" },
    { name: "New Balance", src: "/clients/new-balance.svg" },
    { name: "NBA", src: "/clients/nba.svg" },
    { name: "ESPN", src: "/clients/espn.svg" },
    { name: "Monster", src: "/clients/monster.svg" },
    { name: "Casio", src: "/clients/casio.svg" },
    { name: "Nixon", src: "/clients/nixon.svg" },
    { name: "Modelo", src: "/clients/modelo.svg" },
    
  ]

  useEffect(() => {
    if (!openReel) return
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpenReel(false)
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [openReel])

  useEffect(() => {
    if (!openReel) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [openReel])

  return (
    <main className="max-w-[1600px] mx-auto px-12 py-0">
      {/* INTRO */}
      <header className="text-center flex flex-col items-center mt-12">
        <h1 className="text-5xl sm:text-4xl font-medium tracking-wide [font-family:var(--font-geist-sans),Inter,system-ui]">
          Let&apos;s meet
        </h1>

        <div className="mt-10 h-px w-24 bg-white/15" />

        <p className="mt-10 max-w-[880px] text-white/80 text-base sm:text-lg leading-relaxed text-center">
          Hi, I’m Vasilis Chatziantoniou (aka Scaduxx), a Senior VFX Artist and Motion
          Designer, based in Greece. I focus on high-end CG, look
          development, R&D, and finishing for brand films and digital campaigns.
        </p>
      </header>

      {/* REEL BUTTON */}
      <section className="mt-10 text-center">
        <button
          onClick={() => setOpenReel(true)}
          className="text-lx uppercase tracking-widest text-white/60 hover:text-white transition"
        >
          ▶ Play Reel
        </button>
      </section>

      {/* FOCUS */}
      <section className="mt-15 max-w-[760px] mx-auto text-center">
        <h2 className="text-lx uppercase tracking-widest text-white/90 mb-6">
          Focus
        </h2>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm uppercase tracking-wider text-white/60">
          <span>FX / Sim</span>
          <span>R&amp;D</span>
          <span>CG / Lookdev</span>
          <span>Motion Design</span>
          <span>Lighting</span>
          <span>Compositing</span>
        </div>
      </section>

      {/* TOOLS */}
      <section className="mt-15 max-w-[600px] mx-auto">
        <h2 className="text-lx uppercase tracking-widest text-white/90 mb-8 text-center">
          Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-white/70">
          <div className="flex gap-4">
            <span className="text-white/40 text-sm min-w-[100px] uppercase tracking-wider">
              3D
            </span>
            <span>Houdini / C4D / Blender</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/40 text-sm min-w-[100px] uppercase tracking-wider">
              Render
            </span>
            <span>Redshift / Karma</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/40 text-sm min-w-[100px] uppercase tracking-wider">
              Comp
            </span>
            <span>After Effects / Nuke</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/40 text-sm min-w-[100px] uppercase tracking-wider">
              Edit
            </span>
            <span>Premiere / Resolve</span>
          </div>
        </div>
      </section>

      {/* CLIENTS — UPDATED */}
      <section className="mt-20 max-w-[1600px] mx-auto text-center">
        <h2 className="text-lx uppercase tracking-widest text-white/90 mb-2">
          Clients
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-x-0 gap-y-0">
          {clientLogos.map((c) => (
            <div
              key={c.name}
              className="relative h-20 w-80 opacity-30 hover:opacity-100 transition
                         invert brightness-200 contrast-125"
              title={c.name}
            >
              <Image
                src={c.src}
                alt={c.name}
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
          ))}
        </div>
      </section>

      {/* MORE INFO */}
      <section className="mt-20 max-w-[760px] mx-auto text-center mb-20">
        <button
          onClick={() => setOpenMore((v) => !v)}
          className="text-sm uppercase tracking-widest text-white/50 hover:text-white transition"
        >
          {openMore ? "Less info" : "More info"}
        </button>

        <div
          className={[
            "overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            openMore ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <p className="text-white/70 text-base leading-relaxed">
            I have a Bachelor in Computer Science, and over
            6 years of experience in the 3D industry.
            
            I worked for 3 years at the Greek studio 3Deers, and another 2 years at
            the motion design studio AlreadyBeenChewed.
            Currently, I focus on freelancing and collaborating with studios and agencies worldwide.
            
            My computer science background allows me to approach visual problems
            with a technical mindset — blending procedural workflows, simulation,
            and design-driven decisions to deliver refined, efficient results.
          </p>
        </div>
      </section>

      {/* REEL MODAL */}
      {openReel && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpenReel(false)}
            aria-label="Close reel"
          />

          <div className="relative w-[92vw] max-w-[1100px] rounded-2xl bg-black overflow-hidden border border-white/10">
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
              <span className="text-sm uppercase tracking-widest text-white/50">
                Reel
              </span>
              <button
                onClick={() => setOpenReel(false)}
                className="text-sm uppercase tracking-wider text-white/60 hover:text-white transition"
              >
                Close ✕
              </button>
            </div>

            <div className="w-full aspect-video bg-neutral-900">
              <iframe
                src={reelEmbedUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Reel Video"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
