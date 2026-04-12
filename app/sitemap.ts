import { getBlogPosts } from "@/sanity/queries";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const blogEntries = posts.map((post) => ({
    url: `https://burhanharoon.dev/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: "https://burhanharoon.dev", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
    { url: "https://burhanharoon.dev/blog", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    ...blogEntries,
  ];
}
