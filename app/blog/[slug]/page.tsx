import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import { Badge } from "@/components/ui/badge";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Burhan Haroon`,
    description: post.excerpt,
    openGraph: {
      url: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${SITE_URL}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: "Burhan Haroon",
      url: SITE_URL,
    },
  };

  return (
    <article className="bg-bg-primary px-6 py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-xs font-bold text-text-secondary hover:text-text-primary">← ALL POSTS</Link>
        <div className="mt-8">
          <div className="flex gap-2 flex-wrap">
            {post.tags?.map((tag) => (<Badge key={tag} variant="indigo">{tag}</Badge>))}
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-black tracking-tight leading-tight">{post.title}</h1>
          <time className="mt-3 block text-xs font-bold text-text-muted">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </div>
        <div className="mt-10 prose prose-sm max-w-none prose-headings:font-black prose-a:text-secondary prose-a:font-bold">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  );
}
