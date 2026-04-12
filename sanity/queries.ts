import { client } from "./client";
import type { Project, BlogPost, Skill, About, Company } from "@/lib/types";

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id, title, "slug": slug.current, description, techStack, url, image, order
    }`
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "blogPost"] | order(date desc) {
      _id, title, "slug": slug.current, excerpt, body, date, tags
    }`
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, excerpt, body, date, tags
    }`,
    { slug }
  );
}

export async function getSkills(): Promise<Skill[]> {
  return client.fetch(
    `*[_type == "skill"] | order(order asc) {
      _id, name, category, highlighted, order
    }`
  );
}

export async function getAbout(): Promise<About | null> {
  return client.fetch(
    `*[_type == "about"][0] {
      _id, headline, body, stats
    }`
  );
}

export async function getCompanies(): Promise<Company[]> {
  return client.fetch(
    `*[_type == "company"] | order(order asc) {
      _id, name, logo, order
    }`
  );
}
