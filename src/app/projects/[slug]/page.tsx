import { client, urlFor } from "@/lib/sanity"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import InstagramEmbed from "@/app/components/InstagramEmbed"

type PageProps = {
  params: Promise<{ slug: string }>
}

const MIN_DATE = "1970-01-01T00:00:00Z"

/* ---------------- VIDEO HELPERS START ---------------- */

function isInstagram(url: string) {
  return /instagram\.com\/(p|reel|tv)\//i.test(url)
}

function isYouTube(url: string) {
  return /youtube\.com\/watch\?v=|youtu\.be\//i.test(url)
}

function isVimeo(url: string) {
  return /vimeo\.com\//i.test(url)
}

function isGoogleDrive(url: string) {
  return /drive\.google\.com\/file\/d\//i.test(url) || /drive\.google\.com\/open\?id=|uc\?id=/i.test(url)
}

function youtubeToEmbed(url: string) {
  // youtu.be/<id>
  const short = url.match(/youtu\.be\/([A-Za-z0-9_-]+)/)
  if (short?.[1]) return `https://www.youtube.com/embed/${short[1]}`

  // youtube.com/watch?v=<id>
  const long = url.match(/[?&]v=([A-Za-z0-9_-]+)/)
  if (long?.[1]) return `https://www.youtube.com/embed/${long[1]}`

  return url
}

function vimeoToEmbed(url: string) {
  // Turn vimeo.com/<id> into player.vimeo.com/video/<id>
  return url.replace("vimeo.com", "player.vimeo.com/video")
}

function driveToEmbed(url: string) {
  const fileIdMatch =
    url.match(/\/file\/d\/([^/]+)/) ||
    url.match(/[?&]id=([^&]+)/) ||
    url.match(/uc\?id=([^&]+)/)

  const fileId = fileIdMatch?.[1]
  if (!fileId) return url

  return `https://drive.google.com/file/d/${fileId}/preview`
}

function normalizeInstagramUrl(url: string) {
  // Instagram embed prefers a clean permalink without query junk
  return url.split("?")[0]
}

function getVideoRenderPlan(videoUrl: string) {
  const u = videoUrl.trim()

  if (isInstagram(u)) {
    return { kind: "instagram" as const, src: normalizeInstagramUrl(u) }
  }

  if (isYouTube(u)) {
    return { kind: "iframe" as const, src: youtubeToEmbed(u) }
  }

  if (isVimeo(u)) {
    return { kind: "iframe" as const, src: vimeoToEmbed(u) }
  }

  if (isGoogleDrive(u)) {
    return { kind: "iframe" as const, src: driveToEmbed(u) }
  }

  // fallback: try iframe
  return { kind: "iframe" as const, src: u }
}

/* ---------------- VIDEO HELPERS END ---------------- */

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params

  // 1) Fetch current project first
  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title,
      client,
      date,
      videoUrl,
      mainImage,
      intro,
      labContent,
      role,
      credits,
      links,
      "slug": slug.current,
      order
    }`,
    { slug }
  )

  if (!project) return notFound()

  const orderVal: number = typeof project.order === "number" ? project.order : 0
  const dateVal: string = project.date || MIN_DATE

  // 2) NEXT = newer (disabled on newest)
  const next = await client.fetch(
    `*[
      _type == "project" &&
      defined(slug.current) &&
      slug.current != $slug &&
      (
        coalesce(order, 0) < $order ||
        (coalesce(order, 0) == $order && coalesce(date, $minDate) > $date)
      )
    ] | order(coalesce(order, 0) desc, coalesce(date, $minDate) asc)[0]{
      title,
      "slug": slug.current
    }`,
    { slug, order: orderVal, date: dateVal, minDate: MIN_DATE }
  )

  // 3) PREVIOUS = older (disabled on oldest)
  const prev = await client.fetch(
    `*[
      _type == "project" &&
      defined(slug.current) &&
      slug.current != $slug &&
      (
        coalesce(order, 0) > $order ||
        (coalesce(order, 0) == $order && coalesce(date, $minDate) < $date)
      )
    ] | order(coalesce(order, 0) asc, coalesce(date, $minDate) desc)[0]{
      title,
      "slug": slug.current
    }`,
    { slug, order: orderVal, date: dateVal, minDate: MIN_DATE }
  )

  // 4) Counter (same ordering as your homepage)
  const allSlugs: { slug: string }[] = await client.fetch(
    `*[_type == "project" && defined(slug.current)]
      | order(coalesce(order, 0) asc, coalesce(date, $minDate) desc){
        "slug": slug.current
      }`,
    { minDate: MIN_DATE }
  )

  const currentIndex = Math.max(0, allSlugs.findIndex((p) => p.slug === slug))
  const total = allSlugs.length
  const currentLabel = String(currentIndex + 1).padStart(2, "0")
  const totalLabel = String(total).padStart(2, "0")

  // PortableText: center paragraphs + headings, enforce font stack
  // IMPORTANT: no `types.image` here, because I render images with grid logic below
  const components = {
    block: {
      normal: ({ children }: any) => (
        <p className="text-center text-white/80 leading-relaxed text-base sm:text-lg [font-family:var(--font-geist-sans),Inter,system-ui]">
          {children}
        </p>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-center mt-14 mb-6 text-3xl sm:text-4xl font-medium tracking-wide text-white [font-family:var(--font-geist-sans),Inter,system-ui]">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-center mt-12 mb-5 text-2xl sm:text-3xl font-medium tracking-wide text-white [font-family:var(--font-geist-sans),Inter,system-ui]">
          {children}
        </h3>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="mx-auto max-w-[760px] border-l border-white/15 pl-4 text-white/70 [font-family:var(--font-geist-sans),Inter,system-ui]">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 text-white/90 hover:text-white transition"
        >
          {children}
        </a>
      ),
    },
  }

  const videoPlan =
    typeof project.videoUrl === "string" && project.videoUrl.trim().length > 0
      ? getVideoRenderPlan(project.videoUrl)
      : null


  return (
    <main className="max-w-[1200px] mx-auto px-4 py-0">
      {/* HERO */}
      <div className="w-full aspect-[12/2] bg-neutral-900 overflow-hidden mb-10">
        {project.mainImage && (
          <img
            src={urlFor(project.mainImage).url()}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* TITLE + META */}
      <header className="text-center flex flex-col items-center">
        <h1 className="text-5xl sm:text-5xl font-small tracking-wide [font-family:var(--font-geist-sans),Inter,system-ui]">
          {project.title}
        </h1>

        <p className="mt-4 text-sm uppercase tracking-widest text-white/60 [font-family:var(--font-geist-sans),Inter,system-ui]">
          {project.client ? project.client : ""}
          {project.client && project.date ? " ~ " : ""}
          {project.date ? new Date(project.date).toLocaleDateString() : ""}
        </p>
      </header>

      {/* NAVIGATION (TOP, after title) */}
      <section className="mt-10 border-t border-white/10 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <Link
            href="/"
            className="text-sm uppercase tracking-wider text-white/70 hover:text-white transition"
          >
            ← Back to projects
          </Link>

          <div className="flex items-center gap-6">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="text-sm uppercase tracking-wider text-white/70 hover:text-white transition"
              >
                ← PREVIOUS
              </Link>
            ) : (
              <span className="text-sm uppercase tracking-wider text-white/30 cursor-not-allowed">
                ← PREVIOUS
              </span>
            )}

            <span className="text-sm uppercase tracking-wider text-white/40">
              {currentLabel} / {totalLabel}
            </span>

            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="text-sm uppercase tracking-wider text-white/70 hover:text-white transition"
              >
                NEXT →
              </Link>
            ) : (
              <span className="text-sm uppercase tracking-wider text-white/30 cursor-not-allowed">
                NEXT →
              </span>
            )}
          </div>
        </div>
      </section>

      {/* INTRO */}
      {project.intro && (
        <section className="mt-12">
          <div className="max-w-[720px] mx-auto text-center text-white/60 text-base sm:text-base leading-relaxed font-medium tracking-wide [font-family:var(--font-geist-sans),Inter,system-ui]">
            {project.intro}
          </div>
        </section>
      )}

      {/* VIDEO */}
      {videoPlan && (
        <section className="mt-14">
          {/* Instagram is not an iframe - it is an embed script */}
          {videoPlan.kind === "instagram" ? (
            <div className="w-full bg-neutral-900/20 overflow-hidden rounded-xl border border-white/10 p-4">
              <InstagramEmbed url={videoPlan.src} />
            </div>
          ) : (
            <div className="w-full aspect-video bg-neutral-900 overflow-hidden">
              <iframe
                src={videoPlan.src}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </section>
      )}

      {/* CONTENT (PortableText + 1/2 image grid pattern) */}
      <section className="mt-16 pb-12 [font-family:var(--font-geist-sans),Inter,system-ui]">
        {Array.isArray(project.labContent) && project.labContent.length > 0 ? (
          <ContentWithImageGrid content={project.labContent} components={components} />
        ) : null}
      </section>

      {/* ROLE  */}  
      {project.role && (
        <section>
        <h3 className="text-sm uppercase tracking-widest text-white/50 mb-8">
            My Role
          </h3>
        <p className="mt-6 text-sm uppercase tracking-widest text-white/70">
          {project.role}
        </p>
        </section>
      )}

      {/* CREDITS*/}
      {project.credits?.length > 0 && (
        <section className="mt-6 border-t border-white/10 pt-12">
          <h3 className="text-sm uppercase tracking-widest text-white/50 mb-8">
            Credits
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 max-w-[900px]">
            {project.credits.map((credit: any, i: number) => (
              <div key={i} className="flex gap-4">
                <span className="text-white/40 text-sm min-w-[120px]">
                  {credit.role}
                </span>

                {credit.link ? (
                  <a
                    href={credit.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:underline"
                  >
                    {credit.name}
                  </a>
                ) : (
                  <span className="text-white">{credit.name}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECT LINKS */}
      {project.links && (
        <section className="mt-12 mb-36">
          <h3 className="text-sm uppercase tracking-widest text-white/50 mb-6">
            Project Links
          </h3>
          <div className="flex items-center gap-6 text-white/60">
            {project.links.site && (
              <a href={project.links.site} target="_blank" rel="noreferrer">
                Website
              </a>
            )}
            {project.links.instagram && (
              <a href={project.links.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition">
                Instagram
              </a>
            )}
            {project.links.behance && (
              <a href={project.links.behance} target="_blank" rel="noreferrer" className="hover:text-white transition">
                Behance
              </a>
            )}
            {project.links.artstation && (
              <a
                href={project.links.artstation} target="_blank" rel="noreferrer" className="hover:text-white transition">
                ArtStation
              </a>
            )}
            {project.links.awards && (
              <a
                href={project.links.awards} target="_blank" rel="noreferrer" className="hover:text-white transition">
                Awards
              </a>
            )}
          </div>
        </section>
      )}

    </main>
  )
}

/**
 * Groups Sanity content into:
 * - text runs (rendered by PortableText)
 * - single images (full width)
 * - paired images (2-up grid)
 *
 * Pattern becomes: 1 / 2 / 1 / 2 naturally when you upload images in sequences.
 */
function ContentWithImageGrid({
  content,
  components,
}: {
  content: any[]
  components: any
}) {
  const groups: any[] = []
  let i = 0

  while (i < content.length) {
    const item = content[i]

    // Images: pair consecutive images into a 2-up row
    if (item?._type === "image") {
      const next = content[i + 1]
      if (next?._type === "image") {
        groups.push({ type: "imageRow", images: [item, next] })
        i += 2
      } else {
        groups.push({ type: "imageSingle", image: item })
        i += 1
      }
      continue
    }

    // Text: collect consecutive non-image blocks
    const textBlocks: any[] = []
    while (i < content.length && content[i]?._type !== "image") {
      textBlocks.push(content[i])
      i++
    }
    groups.push({ type: "text", blocks: textBlocks })
  }

  return (
    <div className="space-y-14">
      {groups.map((g, idx) => {
        if (g.type === "text") {
          return (
            <div
              key={`t-${idx}`}
              className="space-y-6 max-w-[760px] mx-auto text-center"
            >
              <PortableText value={g.blocks} components={components} />
            </div>
          )
        }

        if (g.type === "imageSingle") {
          return (
            <div key={`i1-${idx}`} className="w-full">
              <img
                src={urlFor(g.image).url()}
                alt=""
                className="w-full h-auto"
              />
            </div>
          )
        }

        // 2 images side-by-side on md+, stacked on mobile
        return (
          <div key={`i2-${idx}`} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {g.images.map((img: any, j: number) => (
              <img
                key={j}
                src={urlFor(img).url()}
                alt=""
                className="w-full h-auto"
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}
