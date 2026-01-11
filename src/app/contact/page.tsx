"use client"

import { useMemo, useState } from "react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const mailtoHref = useMemo(() => {
    const to = "vasilischtz@gmail.com"
    const s = encodeURIComponent(subject || "Project inquiry")
    const body = encodeURIComponent(
      `Name: ${name || "-"}\n\n${message || ""}`
    )
    return `mailto:${to}?subject=${s}&body=${body}`
  }, [name, subject, message])

  return (
    <main className="max-w-[1200px] mx-auto px-12 py-0">
      <header className="text-center flex flex-col items-center mt-12">
        <h1 className="text-5xl sm:text-4xl font-medium tracking-wide [font-family:var(--font-geist-sans),Inter,system-ui]">
          Let's Create
        </h1>

        <div className="mt-10 h-px w-24 bg-white/15" />

        <p className="mt-10 max-w-[760px] text-white/80 text-base sm:text-lg leading-relaxed text-center">
          For bookings, collaborations, or inquiries — feel free to contact me.
        </p>
      </header>

      <section className="mt-16 max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-white/50 mb-3">
              Email
            </h2>
            <a
              className="text-white/80 hover:text-white transition"
              href="mailto:vasilischtz@gmail.com"
            >
              vasilischtz@gmail.com
            </a>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-widest text-white/50 mb-3">
              Location
            </h2>
            <p className="text-white/70">Thessaloniki, Greece (Remote / On-site)</p>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-widest text-white/50 mb-3">
              Links
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm uppercase tracking-wider text-white/60">
              <a
                className="hover:text-white transition"
                href="https://www.instagram.com/scaduxx/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                className="hover:text-white transition"
                href="https://www.linkedin.com/in/vasileioschatz/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="hover:text-white transition"
                href="https://www.behance.net/scaduxx"
                target="_blank"
                rel="noreferrer"
              >
                Behance
              </a>
              <a
                className="hover:text-white transition"
                href="https://x.com/billy_xtz"
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-sm uppercase tracking-widest text-white/50 mb-6">
            Send a message
          </h2>

          <div className="space-y-4">
            <input
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
              className="w-full min-h-[160px] bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition resize-none"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center w-full bg-white text-black rounded-xl px-4 py-3 font-medium hover:bg-white/90 transition"
            >
              Open email client →
            </a>

            <p className="text-xs text-white/40 mt-3">
              *This opens your default mail app.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
