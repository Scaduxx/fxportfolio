import { client, urlFor } from "@/lib/sanity";
import ProjectGrid from "./components/ProjectGrid";

export default async function HomePage() {
  // Fetch projects and order by 'order' (manual) and 'date' (newest first)
  const projects = await client.fetch(`
    *[_type == "project"] | order(order asc, date desc){
      title,
      "slug": slug.current,
      mainImage,
      aspectRatio,
      weight,
      vimeoLink,
      date
    }
  `);

  // Map Sanity images to URLs
  const projectsWithImages = projects.map((p: any) => ({
    ...p,
    image: p.mainImage ? urlFor(p.mainImage).url() : "/placeholder.png",
  }));

  return (
    <main className="w-full">
  <ProjectGrid projects={projectsWithImages} />
</main>
  );
}
