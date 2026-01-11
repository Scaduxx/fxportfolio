import Image from "next/image"
import Link from "next/link"

type ProjectCardProps = {
    title: string
    image: string
    slug: string
}

export default function ProjectCard({ title, image, slug }: ProjectCardProps) {
    return (
        <Link href={`/projects/${slug}`} className="block">
            <div className="cursor-pointer">
                <div className="relative aspect-[3/2] mb-0 overflow-hidden group cursor-pointer">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        loading="lazy" // ensures lazy load
                        fetchPriority="low"
                        //placeholder="blur"
                        //blurDataURL="/placeholder-icon.svg" // small gray icon or loading svg
                    />

                    {/* Project title overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg font-semibold">{title}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}