# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Burhan Haroon's portfolio as a neubrutalist, AI-first developer showcase with Sanity CMS, targeting international clients.

**Architecture:** Single-page scroll site built with Next.js 16 App Router + TypeScript. Content managed in Sanity CMS, fetched at build time via GROQ. Blog posts get individual `/blog/[slug]` pages. Framer Motion handles scroll-triggered animations and hover effects. Two-tone yellow/indigo neubrutalist design system.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, Sanity 5, next-sanity 12, @portabletext/react 6, Vercel

Never mention claude in any commits

---

## File Structure

```
app/
├── layout.tsx                    # Root layout: Inter font, metadata, navbar, footer
├── page.tsx                      # Main scroll page: assembles all sections
├── globals.css                   # Tailwind v4 @theme tokens, neubrutalist utilities
├── blog/
│   ├── page.tsx                  # Blog listing page
│   └── [slug]/
│       └── page.tsx              # Blog detail page
└── studio/
    └── [[...tool]]/
        └── page.tsx              # Embedded Sanity Studio

components/
├── navbar.tsx                    # Sticky nav with mobile hamburger menu
├── hero.tsx                      # Two-column hero with animations
├── companies.tsx                 # Trust bar with company logos
├── about.tsx                     # About section with stats
├── projects.tsx                  # 2x2 project cards grid
├── skills.tsx                    # Categorized skill pills
├── blog-preview.tsx              # Blog cards for main page
├── contact.tsx                   # Dark contact CTA section
├── footer.tsx                    # Minimal dark footer
└── ui/
    ├── badge.tsx                 # Neubrutalist label badge
    ├── brutal-button.tsx         # Neubrutalist button with shadow
    └── motion-wrapper.tsx        # Framer Motion scroll/stagger wrapper

sanity/
├── client.ts                     # Sanity client + image URL builder
├── queries.ts                    # All GROQ queries
├── schema.ts                     # Schema registry (all types)
└── schemas/
    ├── project.ts                # Project document type
    ├── blog-post.ts              # Blog post document type
    ├── skill.ts                  # Skill document type
    ├── about.ts                  # About singleton type
    └── company.ts                # Company document type

lib/
├── constants.ts                  # Social URLs, email, nav links
└── types.ts                      # Shared TypeScript types

public/
├── images/
│   └── burhan.jpg                # Profile photo (copy from existing)
└── robots.txt                    # Robots file
```

---

### Task 1: Project Bootstrap

**Files:**
- Delete: all files in `pages/`, `components/`, `styles/`, `assets/`, `utils/` directories
- Delete: `jsconfig.json`, `postcss.config.js`, `next.config.js`, `tailwind.config.js`, `.prettierrc`, `.eslintrc.json`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Create: `next.config.ts`, `tsconfig.json`
- Create: `lib/constants.ts`, `lib/types.ts`
- Modify: `package.json` (complete replacement)
- Create: `.env.local` (placeholder for Sanity env vars)

- [ ] **Step 1: Create a new branch for the rebuild**

```bash
git checkout -b rebuild/portfolio-v2
```

- [ ] **Step 2: Remove old source files**

```bash
rm -rf pages/ components/ styles/ assets/ utils/
rm -f jsconfig.json postcss.config.js next.config.js tailwind.config.js .prettierrc .eslintrc.json yarn.lock
```

- [ ] **Step 3: Initialize fresh Next.js 16 project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=false --import-alias="@/*" --use-npm --yes
```

If create-next-app refuses to run in a non-empty directory, initialize in a temp folder and move files:

```bash
cd /tmp && npx create-next-app@latest portfolio-fresh --typescript --tailwind --eslint --app --src=false --import-alias="@/*" --use-npm --yes
cp -r /tmp/portfolio-fresh/{app,public,next.config.*,tsconfig.json,package.json,postcss.config.*,.eslintrc*,next-env.d.ts} /Users/burhan/Documents/burhanharoon/next-portfolio/
rm -rf /tmp/portfolio-fresh
cd /Users/burhan/Documents/burhanharoon/next-portfolio
```

- [ ] **Step 4: Install additional dependencies**

```bash
npm install framer-motion sanity next-sanity @portabletext/react @sanity/image-url
npm install -D @types/node
```

- [ ] **Step 5: Create `lib/constants.ts`**

```typescript
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/burhanharoon",
  github: "https://github.com/burhanharoon",
  devto: "https://dev.to/burhanharoon",
  email: "burhanharoon@outlook.com",
} as const;

export const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "BLOG", href: "#blog" },
] as const;
```

- [ ] **Step 6: Create `lib/types.ts`**

```typescript
export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  url: string | null;
  image: SanityImage | null;
  order: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: any[];  // Portable Text blocks
  date: string;
  tags: string[];
}

export interface Skill {
  _id: string;
  name: string;
  category: "frontend" | "backend" | "database-cloud" | "ai-testing";
  highlighted: boolean;
  order: number;
}

export interface About {
  _id: string;
  headline: string;
  body: any[];  // Portable Text blocks
  stats: { label: string; value: string }[];
}

export interface Company {
  _id: string;
  name: string;
  logo: SanityImage | null;
  order: number;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}
```

- [ ] **Step 7: Create `.env.local` placeholder**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

- [ ] **Step 8: Verify the app runs**

```bash
npm run dev
```

Open `http://localhost:3000` — should see the default Next.js welcome page.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: bootstrap Next.js 16 project with fresh dependencies"
```

---

### Task 2: Tailwind v4 Design System + Neubrutalist Utilities

**Files:**
- Modify: `app/globals.css`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/brutal-button.tsx`

- [ ] **Step 1: Configure Tailwind v4 theme in `app/globals.css`**

Replace the contents of `app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-primary: #facc15;
  --color-secondary: #6366f1;
  --color-bg-primary: #fafafa;
  --color-bg-secondary: #f0f0f0;
  --color-bg-dark: #111111;
  --color-text-primary: #111111;
  --color-text-secondary: #555555;
  --color-text-muted: #999999;
  --color-border: #111111;

  --font-family-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --shadow-brutal-sm: 2px 2px 0 var(--color-border);
  --shadow-brutal: 4px 4px 0 var(--color-border);
  --shadow-brutal-lg: 6px 6px 0 var(--color-border);
  --shadow-brutal-yellow: 4px 4px 0 var(--color-primary);
  --shadow-brutal-indigo: 4px 4px 0 var(--color-secondary);
}

@layer base {
  body {
    font-family: var(--font-family-sans);
    color: var(--color-text-primary);
    background-color: var(--color-bg-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .border-brutal {
    border: 2.5px solid var(--color-border);
  }

  .border-brutal-thin {
    border: 2px solid var(--color-border);
  }
}
```

- [ ] **Step 2: Create `components/ui/badge.tsx`**

```tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: "yellow" | "indigo";
}

export function Badge({ children, variant = "yellow" }: BadgeProps) {
  const bg = variant === "yellow" ? "bg-primary" : "bg-secondary text-white";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 ${bg} border-brutal text-xs font-extrabold uppercase tracking-wider shadow-brutal-sm`}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create `components/ui/brutal-button.tsx`**

```tsx
import Link from "next/link";

interface BrutalButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  shadow?: "yellow" | "indigo" | "black";
  className?: string;
}

export function BrutalButton({
  children,
  href,
  onClick,
  variant = "primary",
  shadow = "black",
  className = "",
}: BrutalButtonProps) {
  const base =
    "inline-flex items-center px-6 py-3 border-brutal text-sm font-extrabold transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

  const variants = {
    primary: "bg-text-primary text-white",
    secondary: "bg-white text-text-primary",
    ghost: "bg-transparent text-white border-[#444]",
  };

  const shadows = {
    yellow: "shadow-brutal-yellow",
    indigo: "shadow-brutal-indigo",
    black: "shadow-brutal",
  };

  const classes = `${base} ${variants[variant]} ${shadows[shadow]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Verify styles compile**

```bash
npm run dev
```

Check the browser — page should load without CSS errors. The default Next.js content will now use Inter font and the custom background color.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/ui/badge.tsx components/ui/brutal-button.tsx
git commit -m "feat: add neubrutalist design system with Tailwind v4 theme"
```

---

### Task 3: Framer Motion Wrappers

**Files:**
- Create: `components/ui/motion-wrapper.tsx`

- [ ] **Step 1: Create `components/ui/motion-wrapper.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

const directionOffset = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function Stagger({
  children,
  staggerDelay = 0.1,
  className = "",
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SpringIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/motion-wrapper.tsx
git commit -m "feat: add Framer Motion animation wrappers"
```

---

### Task 4: Sanity CMS Setup

**Files:**
- Create: `sanity/client.ts`
- Create: `sanity/queries.ts`
- Create: `sanity/schema.ts`
- Create: `sanity/schemas/project.ts`
- Create: `sanity/schemas/blog-post.ts`
- Create: `sanity/schemas/skill.ts`
- Create: `sanity/schemas/about.ts`
- Create: `sanity/schemas/company.ts`
- Create: `app/studio/[[...tool]]/page.tsx`
- Modify: `next.config.ts` (add Sanity image hostname)

- [ ] **Step 1: Create a Sanity project**

Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project. Copy the project ID. Update `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_actual_project_id>
NEXT_PUBLIC_SANITY_DATASET=production
```

- [ ] **Step 2: Create `sanity/schemas/project.ts`**

```typescript
import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "url",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Screenshot",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
```

- [ ] **Step 3: Create `sanity/schemas/blog-post.ts`**

```typescript
import { defineType, defineField } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "date",
      title: "Published Date",
      type: "datetime",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  orderings: [
    { title: "Date Desc", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
});
```

- [ ] **Step 4: Create `sanity/schemas/skill.ts`**

```typescript
import { defineType, defineField } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Database & Cloud", value: "database-cloud" },
          { title: "AI & Testing", value: "ai-testing" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "highlighted",
      title: "Highlighted",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
```

- [ ] **Step 5: Create `sanity/schemas/about.ts`**

```typescript
import { defineType, defineField } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", title: "Value" }),
            defineField({ name: "label", type: "string", title: "Label" }),
          ],
        },
      ],
    }),
  ],
});
```

- [ ] **Step 6: Create `sanity/schemas/company.ts`**

```typescript
import { defineType, defineField } from "sanity";

export const company = defineType({
  name: "company",
  title: "Company",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
```

- [ ] **Step 7: Create `sanity/schema.ts`**

```typescript
import { project } from "./schemas/project";
import { blogPost } from "./schemas/blog-post";
import { skill } from "./schemas/skill";
import { about } from "./schemas/about";
import { company } from "./schemas/company";

export const schemaTypes = [project, blogPost, skill, about, company];
```

- [ ] **Step 8: Create `sanity/client.ts`**

```typescript
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/lib/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-04-12",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
```

- [ ] **Step 9: Create `sanity/queries.ts`**

```typescript
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
```

- [ ] **Step 10: Create embedded Sanity Studio at `app/studio/[[...tool]]/page.tsx`**

```tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

Create the root-level `sanity.config.ts`:

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "portfolio",
  title: "Portfolio CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
```

- [ ] **Step 11: Update `next.config.ts` for Sanity images**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 12: Verify Sanity Studio loads**

```bash
npm run dev
```

Open `http://localhost:3000/studio` — should see the Sanity Studio with the 5 document types listed.

- [ ] **Step 13: Commit**

```bash
git add sanity/ sanity.config.ts app/studio/ lib/ .env.local next.config.ts
git commit -m "feat: add Sanity CMS schemas, client, queries, and embedded studio"
```

---

### Task 5: Root Layout + Navbar

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/navbar.tsx`

- [ ] **Step 1: Create `components/navbar.tsx`**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { BrutalButton } from "@/components/ui/brutal-button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-bg-primary border-b-[2.5px] border-border transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="#home" className="text-xl font-black">
          BH<span className="text-secondary">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-bold text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <BrutalButton href="#contact" variant="secondary" shadow="black">
            CONTACT
          </BrutalButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-text-primary transition-transform ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-primary transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-primary transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t-[2.5px] border-border bg-bg-primary px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <BrutalButton
            href="#contact"
            variant="secondary"
            shadow="black"
            className="w-fit"
          >
            CONTACT
          </BrutalButton>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Update `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Burhan Haroon — AI-First Full-Stack Developer",
  description:
    "Full-stack developer with 7+ years of experience. I use AI to ship faster, think bigger, and build smarter. Available for remote work worldwide.",
  openGraph: {
    title: "Burhan Haroon — AI-First Full-Stack Developer",
    description:
      "Full-stack developer helping global teams ship faster with AI-enhanced workflows.",
    url: "https://burhanharoon.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main className="pt-[73px]">{children}</main>
        {/* Footer will be added in Task 12 */}
      </body>
    </html>
  );
}
```

Note: The `pt-[73px]` accounts for the fixed navbar height. Adjust if the navbar height changes.

- [ ] **Step 3: Create a placeholder footer so layout doesn't error**

Create `components/footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="bg-bg-dark text-text-muted border-t-[2.5px] border-[#333] px-6 py-5">
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        <div className="text-xs">
          <span className="font-black text-[#888]">
            BH<span className="text-secondary">.</span>
          </span>
          <span className="ml-3">© 2026 Burhan Haroon. Built with Next.js & Sanity.</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Verify navbar renders**

```bash
npm run dev
```

Open `http://localhost:3000` — should see the sticky navbar with logo, nav links, and yellow CONTACT button. Test the mobile hamburger by resizing to a narrow viewport.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/navbar.tsx components/footer.tsx
git commit -m "feat: add root layout with sticky neubrutalist navbar and footer"
```

---

### Task 6: Hero Section

**Files:**
- Create: `components/hero.tsx`
- Modify: `app/page.tsx`
- Copy: existing profile photo to `public/images/burhan.jpg`

- [ ] **Step 1: Copy profile photo**

```bash
cp public/burhan.jpg public/images/burhan.jpg 2>/dev/null || echo "Add a profile photo to public/images/burhan.jpg"
```

- [ ] **Step 2: Create `components/hero.tsx`**

```tsx
"use client";

import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { BrutalButton } from "@/components/ui/brutal-button";
import { FadeIn, SpringIn, Stagger, StaggerItem } from "@/components/ui/motion-wrapper";

export function Hero() {
  return (
    <section id="home" className="bg-bg-primary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start gap-12 md:gap-8">
        {/* Left column */}
        <div className="flex-[3]">
          <FadeIn direction="left">
            <Badge variant="indigo">⚡ AI-FIRST DEVELOPER</Badge>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-black leading-[1.0] tracking-tight">
              Hi, I&apos;m{" "}
              <span className="bg-primary px-1.5">Burhan</span>
              <br />I build for the web.
            </h1>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <p className="mt-5 text-text-secondary text-base md:text-lg leading-relaxed max-w-lg">
              Full-stack developer helping global teams ship faster with
              AI-enhanced workflows.
            </p>
          </FadeIn>

          <FadeIn direction="left" delay={0.25}>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-text-secondary font-medium">
                Available for remote work
              </span>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.3}>
            <div className="mt-7 flex flex-wrap gap-3">
              <BrutalButton href="#projects" variant="primary" shadow="yellow">
                VIEW MY WORK →
              </BrutalButton>
              <BrutalButton href="#contact" variant="secondary" shadow="black">
                LET&apos;S TALK
              </BrutalButton>
            </div>
          </FadeIn>

          <Stagger staggerDelay={0.1} className="mt-7 flex gap-3">
            {[
              { label: "in", href: SOCIAL_LINKS.linkedin },
              { label: "gh", href: SOCIAL_LINKS.github },
              { label: "dev", href: SOCIAL_LINKS.devto },
            ].map((social) => (
              <StaggerItem key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-brutal bg-white shadow-brutal-sm flex items-center justify-center text-sm font-extrabold hover:shadow-brutal transition-shadow"
                >
                  {social.label}
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Right column */}
        <div className="flex-[2] relative w-full md:w-auto">
          <FadeIn direction="right">
            <div className="border-brutal bg-white shadow-brutal-lg p-5 w-full max-w-[280px] mx-auto md:mx-0">
              <div className="relative w-full aspect-[4/5] border-brutal-thin overflow-hidden bg-bg-secondary">
                <Image
                  src="/images/burhan.jpg"
                  alt="Burhan Haroon"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <p className="mt-3 text-sm font-black">Burhan Haroon</p>
              <p className="text-xs text-text-muted">
                Based in Pakistan · Working globally
              </p>
            </div>
          </FadeIn>

          {/* Floating stat badges */}
          <SpringIn delay={0.5} className="absolute -bottom-4 -left-4 md:left-auto md:-left-8">
            <div className="bg-primary border-brutal shadow-brutal-sm px-4 py-2.5">
              <div className="text-2xl font-black">7+</div>
              <div className="text-[9px] font-bold tracking-wider">YEARS EXP</div>
            </div>
          </SpringIn>

          <SpringIn delay={0.7} className="absolute -bottom-4 right-4 md:right-8">
            <div className="bg-secondary text-white border-brutal shadow-brutal-sm px-4 py-2.5">
              <div className="text-2xl font-black">10+</div>
              <div className="text-[9px] font-bold tracking-wider">PROJECTS</div>
            </div>
          </SpringIn>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 4: Verify hero renders**

```bash
npm run dev
```

Open `http://localhost:3000` — hero should render with the two-column layout, badge, headline with yellow highlight, CTAs, social icons, profile card, and floating stat badges. Test responsive behavior.

- [ ] **Step 5: Commit**

```bash
git add components/hero.tsx app/page.tsx public/images/
git commit -m "feat: add hero section with animations and profile card"
```

---

### Task 7: Companies Trust Bar

**Files:**
- Create: `components/companies.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/companies.tsx`**

```tsx
import { getCompanies } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";
import type { Company } from "@/lib/types";

export async function Companies() {
  const companies = await getCompanies();

  // Fallback data if Sanity is empty
  const displayCompanies: { name: string; logoUrl?: string }[] =
    companies.length > 0
      ? companies.map((c) => ({
          name: c.name,
          logoUrl: c.logo ? urlFor(c.logo).height(40).url() : undefined,
        }))
      : [
          { name: "TURING" },
          { name: "MEGAVERSE" },
          { name: "FREELANCE" },
        ];

  return (
    <section className="bg-bg-secondary border-t-[2.5px] border-border px-6 py-5">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <span className="text-[10px] font-extrabold text-text-muted tracking-[1.5px] whitespace-nowrap">
          WORKED WITH
        </span>
        <div className="flex flex-wrap items-center gap-5">
          {displayCompanies.map((company) => (
            <div
              key={company.name}
              className="px-4 py-2 bg-white border-[2px] border-[#ddd] text-xs font-extrabold text-text-muted"
            >
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="h-5 object-contain"
                />
              ) : (
                company.name
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Companies to `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
    </>
  );
}
```

- [ ] **Step 3: Verify it renders**

```bash
npm run dev
```

Should see the trust bar below the hero with "WORKED WITH" label and company names.

- [ ] **Step 4: Commit**

```bash
git add components/companies.tsx app/page.tsx
git commit -m "feat: add companies trust bar section"
```

---

### Task 8: About Section

**Files:**
- Create: `components/about.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/about.tsx`**

```tsx
import { getAbout } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import { Badge } from "@/components/ui/badge";
import { AboutAnimations } from "@/components/about-animations";

export async function About() {
  const about = await getAbout();

  const headline =
    about?.headline ??
    "I'm a full-stack developer who treats AI as a superpower, not a buzzword.";

  const stats = about?.stats ?? [
    { value: "7+", label: "YEARS" },
    { value: "10+", label: "PROJECTS" },
    { value: "5+", label: "COUNTRIES" },
    { value: "AI", label: "ENHANCED" },
  ];

  const fallbackBody = [
    "With 7+ years of building web applications, I've evolved from writing every line by hand to leveraging AI tools that let me ship 3x faster. I've trained LLMs at Turing, built full-stack products from scratch for global clients, and I bring that same AI-enhanced mindset to every project.",
    "I'm not just a developer who uses ChatGPT — I understand how these models work, how to prompt effectively, and how to integrate AI into development workflows for real productivity gains.",
  ];

  return (
    <section id="about" className="bg-bg-primary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Left: Section label */}
        <div className="md:min-w-[180px]">
          <Badge variant="yellow">ABOUT ME</Badge>
        </div>

        {/* Right: Content */}
        <AboutAnimations headline={headline} stats={stats}>
          {about?.body ? (
            <div className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl space-y-4">
              <PortableText value={about.body} />
            </div>
          ) : (
            <div className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl space-y-4">
              {fallbackBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </AboutAnimations>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/about-animations.tsx`**

This is a client component wrapper for the animated parts:

```tsx
"use client";

import type { ReactNode } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion-wrapper";

interface AboutAnimationsProps {
  headline: string;
  stats: { value: string; label: string }[];
  children: ReactNode; // The body content (server-rendered)
}

const shadowVariants = ["shadow-brutal", "shadow-brutal-indigo", "shadow-brutal-yellow", "shadow-brutal"];

export function AboutAnimations({ headline, stats, children }: AboutAnimationsProps) {
  return (
    <div className="flex-1">
      <FadeIn direction="up">
        <h2 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">
          {headline.split("AI as a superpower").map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span className="bg-primary px-1">AI as a superpower</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </h2>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <div className="mt-4">{children}</div>
      </FadeIn>

      <Stagger staggerDelay={0.1} className="mt-6 flex flex-wrap gap-3">
        {stats.map((stat, i) => (
          <StaggerItem key={stat.label}>
            <div
              className={`bg-white border-brutal px-5 py-3.5 text-center ${shadowVariants[i % shadowVariants.length]}`}
            >
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-[9px] font-bold text-text-muted tracking-wider">
                {stat.label}
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
```

- [ ] **Step 3: Add About to `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { About } from "@/components/about";

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <About />
    </>
  );
}
```

- [ ] **Step 4: Verify and commit**

```bash
npm run dev
```

Check the about section renders with headline, body text, and stat cards.

```bash
git add components/about.tsx components/about-animations.tsx app/page.tsx
git commit -m "feat: add about section with stats and Sanity content"
```

---

### Task 9: Projects Section

**Files:**
- Create: `components/projects.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/projects.tsx`**

```tsx
import { getProjects } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";
import { Badge } from "@/components/ui/badge";
import { ProjectCards } from "@/components/project-cards";

export async function Projects() {
  const projects = await getProjects();

  const displayProjects =
    projects.length > 0
      ? projects.map((p) => ({
          title: p.title,
          description: p.description,
          techStack: p.techStack,
          url: p.url,
          imageUrl: p.image ? urlFor(p.image).width(600).height(340).url() : null,
        }))
      : [
          {
            title: "Aires",
            description: "Property booking platform for users, brokers, buyers & sellers.",
            techStack: ["React", "Next.js", "Node.js", "MongoDB"],
            url: null,
            imageUrl: null,
          },
          {
            title: "Festful",
            description: "Event management app for planning, hiring, and sharing events.",
            techStack: ["React Native", "Node.js", "WebRTC", "GCP"],
            url: "https://festfulweb.netlify.app/",
            imageUrl: null,
          },
          {
            title: "Blocksight",
            description: "Crypto analytics platform to discover profitable opportunities early.",
            techStack: ["React", "TypeScript", "Node.js", "Blockchain"],
            url: "https://blocksight.com/",
            imageUrl: null,
          },
          {
            title: "SellGauge",
            description: "Car selling platform with competitive bidding & real-time analytics.",
            techStack: ["React", "Python", "Django", "Playwright"],
            url: "https://www.sellgauge.com/",
            imageUrl: null,
          },
        ];

  return (
    <section id="projects" className="bg-bg-secondary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Badge variant="indigo">MY WORK</Badge>
        <h2 className="mt-3 text-2xl md:text-3xl font-black tracking-tight">
          Projects I&apos;ve shipped.
        </h2>
        <ProjectCards projects={displayProjects} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/project-cards.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/ui/motion-wrapper";

interface ProjectDisplay {
  title: string;
  description: string;
  techStack: string[];
  url: string | null;
  imageUrl: string | null;
}

const gradients = [
  "from-yellow-100 to-yellow-200",
  "from-indigo-100 to-indigo-200",
  "from-indigo-100 to-indigo-200",
  "from-yellow-100 to-yellow-200",
];

const shadows = [
  "shadow-brutal",
  "shadow-brutal-indigo",
  "shadow-brutal-indigo",
  "shadow-brutal",
];

export function ProjectCards({ projects }: { projects: ProjectDisplay[] }) {
  return (
    <Stagger staggerDelay={0.15} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      {projects.map((project, i) => (
        <StaggerItem key={project.title}>
          <motion.div
            whileHover={{ y: -4, boxShadow: "8px 8px 0 var(--color-border)" }}
            transition={{ duration: 0.2 }}
            className={`bg-white border-brutal ${shadows[i % shadows.length]} overflow-hidden cursor-pointer`}
          >
            {/* Image / gradient header */}
            <div
              className={`h-36 md:h-40 border-b-[2.5px] border-border flex items-center justify-center overflow-hidden ${
                project.imageUrl
                  ? ""
                  : `bg-gradient-to-br ${gradients[i % gradients.length]}`
              }`}
            >
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-black text-text-primary opacity-10 tracking-tight">
                  {project.title.toUpperCase()}
                </span>
              )}
            </div>

            {/* Card body */}
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-black">{project.title}</h3>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-primary border-brutal-thin text-[9px] font-extrabold shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    LIVE ↗
                  </a>
                )}
              </div>
              <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-bg-secondary border-[1.5px] border-border text-[8px] font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
```

- [ ] **Step 3: Add Projects to `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <About />
      <Projects />
    </>
  );
}
```

- [ ] **Step 4: Verify and commit**

```bash
npm run dev
```

Check 2x2 project grid renders with gradient headers, alternating shadows, hover effects.

```bash
git add components/projects.tsx components/project-cards.tsx app/page.tsx
git commit -m "feat: add projects section with animated cards and Sanity fallback"
```

---

### Task 10: Skills Section

**Files:**
- Create: `components/skills.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/skills.tsx`**

```tsx
import { getSkills } from "@/sanity/queries";
import { Badge } from "@/components/ui/badge";
import { SkillPills } from "@/components/skill-pills";
import type { Skill } from "@/lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  frontend: "FRONTEND",
  backend: "BACKEND",
  "database-cloud": "DATABASE & CLOUD",
  "ai-testing": "AI & TESTING",
};

const CATEGORY_ORDER = ["frontend", "backend", "database-cloud", "ai-testing"];

const FALLBACK_SKILLS: Skill[] = [
  { _id: "1", name: "React", category: "frontend", highlighted: false, order: 1 },
  { _id: "2", name: "Next.js", category: "frontend", highlighted: false, order: 2 },
  { _id: "3", name: "React Native", category: "frontend", highlighted: false, order: 3 },
  { _id: "4", name: "TypeScript", category: "frontend", highlighted: true, order: 4 },
  { _id: "5", name: "Tailwind CSS", category: "frontend", highlighted: false, order: 5 },
  { _id: "6", name: "Redux", category: "frontend", highlighted: false, order: 6 },
  { _id: "7", name: "Node.js", category: "backend", highlighted: false, order: 1 },
  { _id: "8", name: "Express.js", category: "backend", highlighted: false, order: 2 },
  { _id: "9", name: "Python", category: "backend", highlighted: true, order: 3 },
  { _id: "10", name: "GraphQL", category: "backend", highlighted: false, order: 4 },
  { _id: "11", name: "Django", category: "backend", highlighted: false, order: 5 },
  { _id: "12", name: "PostgreSQL", category: "database-cloud", highlighted: false, order: 1 },
  { _id: "13", name: "MongoDB", category: "database-cloud", highlighted: false, order: 2 },
  { _id: "14", name: "AWS", category: "database-cloud", highlighted: false, order: 3 },
  { _id: "15", name: "GCP", category: "database-cloud", highlighted: false, order: 4 },
  { _id: "16", name: "LLM / AI Tools", category: "ai-testing", highlighted: true, order: 1 },
  { _id: "17", name: "Cypress", category: "ai-testing", highlighted: false, order: 2 },
  { _id: "18", name: "Playwright", category: "ai-testing", highlighted: false, order: 3 },
  { _id: "19", name: "CI/CD", category: "ai-testing", highlighted: false, order: 4 },
];

export async function Skills() {
  const skills = await getSkills();
  const displaySkills = skills.length > 0 ? skills : FALLBACK_SKILLS;

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    skills: displaySkills.filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" className="bg-bg-primary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Badge variant="yellow">TECH STACK</Badge>
        <h2 className="mt-3 text-2xl md:text-3xl font-black tracking-tight">
          Tools I work with.
        </h2>
        <SkillPills groups={grouped} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/skill-pills.tsx`**

```tsx
"use client";

import { Stagger, StaggerItem } from "@/components/ui/motion-wrapper";
import { FadeIn } from "@/components/ui/motion-wrapper";
import { motion } from "framer-motion";

interface SkillGroup {
  category: string;
  label: string;
  skills: { _id: string; name: string; highlighted: boolean }[];
}

const categoryShadow: Record<string, string> = {
  frontend: "shadow-brutal",
  backend: "shadow-brutal-indigo",
  "database-cloud": "shadow-brutal",
  "ai-testing": "shadow-brutal",
};

export function SkillPills({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="mt-8 space-y-6">
      {groups.map((group) => (
        <FadeIn key={group.category} direction="up">
          <div className="text-[10px] font-extrabold text-text-muted tracking-[1.5px] mb-3">
            {group.label}
          </div>
          <Stagger staggerDelay={0.05} className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <StaggerItem key={skill._id}>
                <motion.span
                  whileHover={{ y: -2 }}
                  className={`inline-block px-4 py-2 border-brutal text-xs font-extrabold ${
                    categoryShadow[group.category]
                  } ${
                    skill.highlighted
                      ? group.category === "backend"
                        ? "bg-secondary text-white"
                        : "bg-primary"
                      : "bg-white"
                  }`}
                >
                  {skill.name}
                </motion.span>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeIn>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Add Skills to `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <About />
      <Projects />
      <Skills />
    </>
  );
}
```

- [ ] **Step 4: Verify and commit**

```bash
npm run dev
```

Check skills render in categories with pill styling, highlighted items, and hover effects.

```bash
git add components/skills.tsx components/skill-pills.tsx app/page.tsx
git commit -m "feat: add skills section with categorized animated pills"
```

---

### Task 11: Blog Section + Blog Pages

**Files:**
- Create: `components/blog-preview.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/blog-preview.tsx`**

```tsx
import Link from "next/link";
import { getBlogPosts } from "@/sanity/queries";
import { Badge } from "@/components/ui/badge";
import { BlogCards } from "@/components/blog-cards";

export async function BlogPreview() {
  const posts = await getBlogPosts();

  const displayPosts =
    posts.length > 0
      ? posts.slice(0, 4).map((p) => ({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          date: p.date,
          tags: p.tags,
        }))
      : [
          {
            title: "Why should you use Tailwind CSS with React/Next JS?",
            slug: "tailwind-css-react-nextjs",
            excerpt: "A deep dive into why Tailwind CSS is the perfect companion for React and Next.js projects...",
            date: "2022-01-01",
            tags: ["Tailwind CSS"],
          },
          {
            title: "How to generate /sitemap.xml route in Remix framework",
            slug: "sitemap-remix",
            excerpt: "Step-by-step guide to generating dynamic sitemaps in Remix for better SEO...",
            date: "2022-01-01",
            tags: ["Remix"],
          },
        ];

  return (
    <section id="blog" className="bg-bg-secondary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-end">
          <div>
            <Badge variant="indigo">BLOG</Badge>
            <h2 className="mt-3 text-2xl md:text-3xl font-black tracking-tight">
              Things I&apos;ve written.
            </h2>
          </div>
          {posts.length > 4 && (
            <Link
              href="/blog"
              className="px-4 py-2 bg-white border-brutal shadow-brutal text-xs font-extrabold hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              VIEW ALL →
            </Link>
          )}
        </div>
        <BlogCards posts={displayPosts} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/blog-cards.tsx`**

```tsx
"use client";

import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/ui/motion-wrapper";

interface PostDisplay {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
}

const shadows = ["shadow-brutal-yellow", "shadow-brutal-indigo"];

export function BlogCards({ posts }: { posts: PostDisplay[] }) {
  return (
    <Stagger staggerDelay={0.15} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((post, i) => (
        <StaggerItem key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className={`block bg-white border-brutal ${shadows[i % shadows.length]} p-6 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all`}
          >
            <div className="text-[9px] font-extrabold text-text-muted tracking-wider">
              {new Date(post.date).getFullYear()} ·{" "}
              {post.tags?.[0]?.toUpperCase() ?? "ARTICLE"}
            </div>
            <h3 className="mt-2 text-base font-black leading-snug">
              {post.title}
            </h3>
            <p className="mt-2 text-xs text-text-secondary leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
            <span className="mt-3 inline-block text-xs font-extrabold text-secondary">
              READ MORE →
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
```

- [ ] **Step 3: Create `app/blog/page.tsx`**

```tsx
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

  const displayPosts = posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    date: p.date,
    tags: p.tags,
  }));

  return (
    <section className="bg-bg-primary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/#blog"
          className="text-xs font-bold text-text-secondary hover:text-text-primary"
        >
          ← BACK HOME
        </Link>
        <div className="mt-6">
          <Badge variant="indigo">BLOG</Badge>
          <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
            All articles.
          </h1>
        </div>
        <BlogCards posts={displayPosts} />
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `app/blog/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import { Badge } from "@/components/ui/badge";
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
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return (
    <article className="bg-bg-primary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-xs font-bold text-text-secondary hover:text-text-primary"
        >
          ← ALL POSTS
        </Link>

        <div className="mt-8">
          <div className="flex gap-2 flex-wrap">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="indigo">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-black tracking-tight leading-tight">
            {post.title}
          </h1>
          <time className="mt-3 block text-xs font-bold text-text-muted">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <div className="mt-10 prose prose-sm max-w-none prose-headings:font-black prose-a:text-secondary prose-a:font-bold">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 5: Add BlogPreview to `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { BlogPreview } from "@/components/blog-preview";

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <About />
      <Projects />
      <Skills />
      <BlogPreview />
    </>
  );
}
```

- [ ] **Step 6: Verify and commit**

```bash
npm run dev
```

Check blog cards render on main page, `/blog` listing page, and `/blog/[slug]` detail page.

```bash
git add components/blog-preview.tsx components/blog-cards.tsx app/blog/ app/page.tsx
git commit -m "feat: add blog section with listing and detail pages"
```

---

### Task 12: Contact Section + Footer

**Files:**
- Create: `components/contact.tsx`
- Modify: `components/footer.tsx`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx` (uncomment footer)

- [ ] **Step 1: Create `components/contact.tsx`**

```tsx
"use client";

import { SOCIAL_LINKS } from "@/lib/constants";
import { BrutalButton } from "@/components/ui/brutal-button";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion-wrapper";

export function Contact() {
  return (
    <section id="contact" className="bg-bg-dark px-6 py-20 md:py-28 text-center">
      <div className="mx-auto max-w-2xl">
        <FadeIn direction="up">
          <span className="inline-block px-3.5 py-1.5 bg-primary border-[2.5px] border-primary text-xs font-extrabold shadow-[3px_3px_0_var(--color-secondary)]">
            LET&apos;S WORK TOGETHER
          </span>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <h2 className="mt-5 text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Got a project in mind?
            <br />
            <span className="text-primary">Let&apos;s talk.</span>
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p className="mt-4 text-sm text-[#888] leading-relaxed">
            Available for freelance work and full-time remote roles worldwide.
            <br />
            GMT+5 · Typically responds within 24 hours.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <BrutalButton
              href={`mailto:${SOCIAL_LINKS.email}`}
              variant="secondary"
              shadow="indigo"
              className="bg-primary text-text-primary border-primary"
            >
              EMAIL ME →
            </BrutalButton>
            <BrutalButton href={`mailto:${SOCIAL_LINKS.email}`} variant="ghost" shadow="black">
              SCHEDULE A CALL
            </BrutalButton>
          </div>
        </FadeIn>

        <Stagger staggerDelay={0.1} className="mt-7 flex gap-3 justify-center">
          {[
            { label: "in", href: SOCIAL_LINKS.linkedin },
            { label: "gh", href: SOCIAL_LINKS.github },
            { label: "dev", href: SOCIAL_LINKS.devto },
            { label: "✉", href: `mailto:${SOCIAL_LINKS.email}` },
          ].map((social) => (
            <StaggerItem key={social.label}>
              <a
                href={social.href}
                target={social.label === "✉" ? undefined : "_blank"}
                rel={social.label === "✉" ? undefined : "noopener noreferrer"}
                className="w-11 h-11 bg-[#222] border-[2px] border-[#444] flex items-center justify-center text-sm font-extrabold text-[#888] hover:text-white hover:border-[#666] transition-colors"
              >
                {social.label}
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `components/footer.tsx` with full nav links**

```tsx
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-bg-dark text-text-muted border-t-[2.5px] border-[#333] px-6 py-5">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="text-xs">
          <span className="font-black text-[#888]">
            BH<span className="text-secondary">.</span>
          </span>
          <span className="ml-3">
            © {new Date().getFullYear()} Burhan Haroon. Built with Next.js &
            Sanity.
          </span>
        </div>
        <div className="flex gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-bold text-[#666] hover:text-[#999] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="text-[11px] font-bold text-primary hover:text-primary/80 transition-colors"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Add Contact to `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { BlogPreview } from "@/components/blog-preview";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <About />
      <Projects />
      <Skills />
      <BlogPreview />
      <Contact />
    </>
  );
}
```

- [ ] **Step 4: Ensure footer is in `app/layout.tsx`**

The footer import was added in Task 5. Verify `app/layout.tsx` includes `<Footer />` after `{children}`:

```tsx
<body>
  <Navbar />
  <main className="pt-[73px]">{children}</main>
  <Footer />
</body>
```

- [ ] **Step 5: Verify and commit**

```bash
npm run dev
```

Check contact section (dark bg, yellow CTAs, social icons) and footer render correctly.

```bash
git add components/contact.tsx components/footer.tsx app/page.tsx app/layout.tsx
git commit -m "feat: add contact section and complete footer"
```

---

### Task 13: SEO + Performance

**Files:**
- Modify: `app/layout.tsx` (JSON-LD)
- Create: `public/robots.txt`
- Modify: `app/page.tsx` (add JSON-LD script)
- Verify: `next.config.ts` already handles images

- [ ] **Step 1: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://burhanharoon.dev/sitemap.xml
```

- [ ] **Step 2: Add JSON-LD structured data to `app/page.tsx`**

Add at the top of the Home component return:

```tsx
import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { BlogPreview } from "@/components/blog-preview";
import { Contact } from "@/components/contact";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Burhan Haroon",
  url: "https://burhanharoon.dev",
  jobTitle: "Full-Stack Developer",
  description:
    "AI-first full-stack developer with 7+ years of experience, available for remote work worldwide.",
  sameAs: [
    "https://www.linkedin.com/in/burhanharoon",
    "https://github.com/burhanharoon",
    "https://dev.to/burhanharoon",
  ],
  knowsAbout: [
    "React", "Next.js", "Node.js", "TypeScript", "Python",
    "AI", "LLM", "Full-Stack Development",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Companies />
      <About />
      <Projects />
      <Skills />
      <BlogPreview />
      <Contact />
    </>
  );
}
```

- [ ] **Step 3: Add sitemap generation**

Next.js 16 App Router supports `app/sitemap.ts` natively:

Create `app/sitemap.ts`:

```typescript
import { getBlogPosts } from "@/sanity/queries";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const blogEntries = posts.map((post) => ({
    url: `https://burhanharoon.dev/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: "https://burhanharoon.dev",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: "https://burhanharoon.dev/blog",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
```

- [ ] **Step 4: Verify and commit**

```bash
npm run dev
```

Check:
- `http://localhost:3000/robots.txt` returns robots file
- `http://localhost:3000/sitemap.xml` returns XML sitemap
- View page source — JSON-LD script tag should be present

```bash
git add public/robots.txt app/sitemap.ts app/page.tsx
git commit -m "feat: add SEO — JSON-LD, sitemap, robots.txt"
```

---

### Task 14: Seed Sanity with Initial Content

This is a manual step done in the Sanity Studio UI.

- [ ] **Step 1: Open Sanity Studio**

```bash
npm run dev
```

Go to `http://localhost:3000/studio`

- [ ] **Step 2: Create About document**

- Headline: `I'm a full-stack developer who treats AI as a superpower, not a buzzword.`
- Body: Add two paragraphs about your journey (the fallback text can be used as a starting point)
- Stats:
  - { value: "7+", label: "YEARS" }
  - { value: "10+", label: "PROJECTS" }
  - { value: "5+", label: "COUNTRIES" }
  - { value: "AI", label: "ENHANCED" }

- [ ] **Step 3: Create Company documents**

1. Name: "Turing", Order: 1 (upload logo if available)
2. Name: "Megaverse IT", Order: 2
3. Name: "Freelance", Order: 3

- [ ] **Step 4: Create Project documents**

1. Title: "Aires", Slug: aires, Description: "Property booking platform for users, brokers, buyers & sellers.", Tech Stack: ["React", "Next.js", "Node.js", "MongoDB"], Order: 1
2. Title: "Festful", Slug: festful, Description: "Event management app for planning, hiring, and sharing events.", Tech Stack: ["React Native", "Node.js", "WebRTC", "GCP"], URL: https://festfulweb.netlify.app/, Order: 2
3. Title: "Blocksight", Slug: blocksight, Description: "Crypto analytics platform to discover profitable opportunities early.", Tech Stack: ["React", "TypeScript", "Node.js", "Blockchain"], URL: https://blocksight.com/, Order: 3
4. Title: "SellGauge", Slug: sellgauge, Description: "Car selling platform with competitive bidding & real-time analytics.", Tech Stack: ["React", "Python", "Django", "Playwright"], URL: https://www.sellgauge.com/, Order: 4

- [ ] **Step 5: Create Skill documents**

Create all 19 skills from the fallback data in Task 10 Step 1, with correct categories, highlight flags, and order values.

- [ ] **Step 6: Create Blog Post documents**

1. Title: "Why should you use Tailwind CSS with React/Next JS?", Slug: tailwind-css-react-nextjs, Excerpt: "A deep dive into why Tailwind CSS is the perfect companion...", Date: 2022-01-01, Tags: ["Tailwind CSS"], Body: (copy content from your dev.to article)
2. Title: "How to generate /sitemap.xml route in Remix framework", Slug: sitemap-remix, Excerpt: "Step-by-step guide to generating dynamic sitemaps in Remix...", Date: 2022-01-01, Tags: ["Remix"], Body: (copy content from your dev.to article)

- [ ] **Step 7: Verify the full site uses Sanity data**

```bash
npm run dev
```

Navigate through the entire site. All sections should now pull from Sanity instead of falling back to hardcoded data. Verify:
- Companies trust bar shows logos/names from Sanity
- About section shows Sanity headline and body
- Projects show Sanity data
- Skills show Sanity data
- Blog shows Sanity posts
- Blog detail pages render Sanity body content

- [ ] **Step 8: Run production build**

```bash
npm run build && npm run start
```

Verify the production build succeeds and the site works at `http://localhost:3000`.

- [ ] **Step 9: Commit .env.local note and any fixes**

```bash
git add -A
git commit -m "chore: finalize site with Sanity content seeding notes"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Project Bootstrap | `package.json`, `app/layout.tsx`, `lib/` |
| 2 | Design System | `globals.css`, `ui/badge.tsx`, `ui/brutal-button.tsx` |
| 3 | Motion Wrappers | `ui/motion-wrapper.tsx` |
| 4 | Sanity CMS | `sanity/`, `sanity.config.ts`, `app/studio/` |
| 5 | Navbar + Layout | `navbar.tsx`, `footer.tsx`, `app/layout.tsx` |
| 6 | Hero Section | `hero.tsx` |
| 7 | Companies Bar | `companies.tsx` |
| 8 | About Section | `about.tsx`, `about-animations.tsx` |
| 9 | Projects Section | `projects.tsx`, `project-cards.tsx` |
| 10 | Skills Section | `skills.tsx`, `skill-pills.tsx` |
| 11 | Blog Section + Pages | `blog-preview.tsx`, `blog-cards.tsx`, `app/blog/` |
| 12 | Contact + Footer | `contact.tsx`, `footer.tsx` |
| 13 | SEO + Performance | `sitemap.ts`, `robots.txt`, JSON-LD |
| 14 | Seed Content | Sanity Studio (manual) |
