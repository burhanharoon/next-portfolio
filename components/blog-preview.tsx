import Link from "next/link";
import { getBlogPosts } from "@/sanity/queries";
import { Badge } from "@/components/ui/badge";
import { BlogCards } from "@/components/blog-cards";

export async function BlogPreview() {
  const posts = await getBlogPosts();

  const displayPosts = posts.length > 0
    ? posts.slice(0, 4).map((p) => ({ title: p.title, slug: p.slug, excerpt: p.excerpt, date: p.date, tags: p.tags }))
    : [
        { title: "Why should you use Tailwind CSS with React/Next JS?", slug: "tailwind-css-react-nextjs", excerpt: "A deep dive into why Tailwind CSS is the perfect companion for React and Next.js projects...", date: "2022-01-01", tags: ["Tailwind CSS"] },
        { title: "How to generate /sitemap.xml route in Remix framework", slug: "sitemap-remix", excerpt: "Step-by-step guide to generating dynamic sitemaps in Remix for better SEO...", date: "2022-01-01", tags: ["Remix"] },
      ];

  return (
    <section id="blog" className="bg-bg-secondary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-end">
          <div>
            <Badge variant="indigo">BLOG</Badge>
            <h2 className="mt-3 text-2xl md:text-3xl font-black tracking-tight">Things I&apos;ve written.</h2>
          </div>
          {posts.length > 4 && (
            <Link href="/blog" className="px-4 py-2 bg-white border-brutal shadow-brutal text-xs font-extrabold hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">VIEW ALL →</Link>
          )}
        </div>
        <BlogCards posts={displayPosts} />
      </div>
    </section>
  );
}
