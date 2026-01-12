import { createClient } from "@sanity/client"
import { createImageUrlBuilder } from "@sanity/image-url"

export const client = createClient({
  projectId: "sjr8w888",
  dataset: "production",
  apiVersion: "2026-01-08",
  useCdn: false,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
