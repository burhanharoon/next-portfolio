import { getBlogPosts } from "@/sanity/queries";
import { SITE_URL } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const blogEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    ...blogEntries,
  ];
}
