import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/lib/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Only create a real client when a valid projectId is configured
const isConfigured = projectId && /^[a-z0-9-]+$/.test(projectId);

export const client = createClient({
  projectId: isConfigured ? projectId! : "placeholder",
  dataset,
  apiVersion: "2026-04-12",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
