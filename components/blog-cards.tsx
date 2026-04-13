"use client";

import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/ui/motion-wrapper";

interface PostDisplay {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  externalUrl?: string | null;
}

const shadows = ["shadow-brutal-yellow", "shadow-brutal-indigo"];

export function BlogCards({ posts }: { posts: PostDisplay[] }) {
  return (
    <Stagger staggerDelay={0.15} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((post, i) => {
        const href = post.externalUrl || `/blog/${post.slug}`;
        const isExternal = !!post.externalUrl;
        const cardClasses = `block bg-white border-brutal ${shadows[i % shadows.length]} p-6 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all`;

        return (
          <StaggerItem key={post.slug}>
            {isExternal ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={cardClasses} data-umami-event={`blog-${post.slug}`}>
                <CardContent post={post} isExternal />
              </a>
            ) : (
              <Link href={href} className={cardClasses} data-umami-event={`blog-${post.slug}`}>
                <CardContent post={post} />
              </Link>
            )}
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

function CardContent({ post, isExternal = false }: { post: PostDisplay; isExternal?: boolean }) {
  return (
    <>
      <div className="text-[9px] font-extrabold text-text-muted tracking-wider">
        {new Date(post.date).getFullYear()} · {post.tags?.[0]?.toUpperCase() ?? "ARTICLE"}
      </div>
      <h3 className="mt-2 text-base font-black leading-snug">{post.title}</h3>
      <p className="mt-2 text-xs text-text-secondary leading-relaxed line-clamp-3">{post.excerpt}</p>
      <span className="mt-3 inline-block text-xs font-extrabold text-secondary">
        READ{isExternal ? " ON DEV.TO" : " MORE"} →
      </span>
    </>
  );
}
