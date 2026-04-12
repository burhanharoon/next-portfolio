import Link from "next/link";
import { getBlogPosts } from "@/sanity/queries";
import { Badge } from "@/components/ui/badge";
import { BlogCards } from "@/components/blog-cards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Burhan Haroon",
  description: "Articles about web development, AI, and building for the modern web.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const displayPosts = posts.map((p) => ({ title: p.title, slug: p.slug, excerpt: p.excerpt, date: p.date, tags: p.tags }));

  return (
    <section className="bg-bg-primary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Link href="/#blog" className="text-xs font-bold text-text-secondary hover:text-text-primary">← BACK HOME</Link>
        <div className="mt-6">
          <Badge variant="indigo">BLOG</Badge>
          <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">All articles.</h1>
        </div>
        <BlogCards posts={displayPosts} />
      </div>
    </section>
  );
}
