import { client } from "./client";
import type { Project, BlogPost, Skill, About, Company } from "@/lib/types";

const isConfigured =
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  /^[a-z0-9-]+$/.test(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

async function safeFetch<T>(query: string, params?: Record<string, string>, fallback: T = [] as unknown as T): Promise<T> {
  if (!isConfigured) return fallback;
  try {
    if (params) {
      return await client.fetch<T>(query, params);
    }
    return await client.fetch<T>(query);
  } catch {
    return fallback;
  }
}

export async function getProjects(): Promise<Project[]> {
  return safeFetch(
    `*[_type == "project"] | order(order asc) {
      _id, title, "slug": slug.current, description, techStack, url, image, order
    }`
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return safeFetch(
    `*[_type == "blogPost"] | order(date desc) {
      _id, title, "slug": slug.current, excerpt, body, date, tags
    }`
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return safeFetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, excerpt, body, date, tags
    }`,
    { slug },
    null
  );
}

export async function getSkills(): Promise<Skill[]> {
  return safeFetch(
    `*[_type == "skill"] | order(order asc) {
      _id, name, category, highlighted, order
    }`
  );
}

export async function getAbout(): Promise<About | null> {
  return safeFetch(
    `*[_type == "about"][0] {
      _id, headline, body, stats
    }`,
    undefined,
    null
  );
}

export async function getCompanies(): Promise<Company[]> {
  return safeFetch(
    `*[_type == "company"] | order(order asc) {
      _id, name, logo, order
    }`
  );
}
