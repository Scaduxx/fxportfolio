import ProjectCard from "./ProjectCard"

type Project = {
  title: string
  image: string
  slug: string
}

type ProjectGridProps = {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 ">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          title={project.title}
          image={project.image}
          slug={project.slug}
        />
      ))}
    </div>
  )
}
