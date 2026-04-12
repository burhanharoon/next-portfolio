# Portfolio Redesign — Design Spec

## Overview

Complete rebuild of Burhan Haroon's developer portfolio from scratch. The new portfolio positions Burhan as an **AI-first full-stack developer** available for international remote work. It replaces the existing Next.js 12 single-page site with a modern, bold, neubrutalist design backed by a headless CMS.

## Target Audience

International clients, recruiters, and teams looking for a senior full-stack developer who leverages AI to enhance productivity. The messaging signals global availability, professional experience, and modern tooling.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion (scroll-triggered, hover effects, section transitions)
- **CMS:** Sanity (headless, content fetched at build time)
- **Hosting:** Vercel (static deployment, Sanity webhook triggers rebuild on content change)
- **Package manager:** npm

## Design System

### Style: Neubrutalism

- Thick borders (2.5px solid #111)
- Hard box shadows (3-5px offset, no blur)
- Bold typography (900 weight headings, 700-800 weight UI elements)
- Flat colors, no gradients except in project card image areas
- Rounded corners: none or minimal (0-2px)
- Font: Inter (system-ui fallback)

### Color Palette: Two-Tone (Yellow + Indigo)

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#facc15` (Yellow) | Primary accent, CTA buttons, highlights, badges |
| `secondary` | `#6366f1` (Indigo) | Secondary accent, alternating shadows, secondary badges |
| `bg-primary` | `#fafafa` | Main background (light sections) |
| `bg-secondary` | `#f0f0f0` | Alternating section background |
| `bg-dark` | `#111111` | Contact section, footer |
| `text-primary` | `#111111` | Headings, primary text |
| `text-secondary` | `#555555` | Body text, descriptions |
| `text-muted` | `#999999` | Labels, category headers |
| `border` | `#111111` | All borders |

### Shadow Pattern

Shadows alternate between yellow and indigo throughout the page to create visual rhythm without adding more colors:
- Yellow shadows: `box-shadow: 4px 4px 0 #facc15`
- Indigo shadows: `box-shadow: 4px 4px 0 #6366f1`
- Black shadows: `box-shadow: 4px 4px 0 #111` (for secondary elements)

### Typography

- Headings: Inter, 900 weight, tight letter-spacing (-1px to -2px)
- Section labels: 10-12px, 800 weight, uppercase, letter-spacing 1.5px
- Body: 14-16px, 400 weight, line-height 1.7-1.8
- UI elements (tags, buttons): 11-13px, 700-800 weight

## Page Structure

Single-page scroll layout with smooth scroll navigation. Sections alternate between `bg-primary` and `bg-secondary` backgrounds.

### Section 1: Navbar (Sticky)

- **Position:** Fixed top, full width
- **Left:** Logo "BH." with indigo dot
- **Right:** Nav links (HOME, ABOUT, PROJECTS, BLOG, SKILLS) + yellow CONTACT button with hard shadow
- **Border:** 2.5px bottom border
- **Behavior:** Scroll-aware — subtle shadow appears on scroll. Smooth scroll to sections on click.
- **Mobile:** Hamburger menu with slide-in panel
- **Animation:** None (instant render, always visible)

### Section 2: Hero

- **Background:** `bg-primary` (#fafafa)
- **Layout:** Two-column (60/40 split)
- **Left column:**
  - Indigo "AI-FIRST DEVELOPER" badge with hard shadow
  - Headline: "Hi, I'm **Burhan**" (yellow highlight on name) + "I build for the web."
  - Subtitle: "Full-stack developer helping global teams ship faster with AI-enhanced workflows."
  - Green dot + "Available for remote work" indicator
  - Two CTAs: "VIEW MY WORK" (black bg, yellow shadow) + "LET'S TALK" (white bg, black shadow)
  - Social icons row: LinkedIn, GitHub, Dev.to (square buttons with hard shadows)
- **Right column:**
  - Profile card (white, bordered, hard shadow) with photo and "Based in Pakistan · Working globally"
  - Floating stat badges: "7+" years (yellow), "10+" projects (indigo)
- **Animation:** Text slides in from left (staggered), profile card slides from right, stat badges pop in with spring bounce, social icons stagger in

### Section 3: Companies Trust Bar

- **Background:** `bg-secondary` (#f5f5f5)
- **Border:** Top border 2.5px
- **Layout:** Horizontal strip with "WORKED WITH" label + company logos (Turing, Megaverse IT, Freelance clients)
- **Content from:** Sanity (company name + logo image)
- **Animation:** Logos fade in on scroll

### Section 4: About

- **Background:** `bg-primary`
- **Layout:** Two-column (sidebar label + content)
- **Left:** Yellow "ABOUT ME" badge
- **Right:**
  - Bold headline: "I'm a full-stack developer who treats **AI as a superpower**, not a buzzword."
  - Two paragraphs about journey, LLM training at Turing, AI-enhanced workflow philosophy
  - Stat cards row: 7+ Years, 10+ Projects, 5+ Countries, AI Enhanced (alternating yellow/indigo shadows)
- **Content from:** Sanity (about text, stats)
- **Animation:** Slide in from bottom on scroll, stat cards stagger in

### Section 5: Projects

- **Background:** `bg-secondary`
- **Layout:** 2x2 grid
- **Section header:** Indigo "MY WORK" badge + "Projects I've shipped." heading
- **Each project card:**
  - Image header area: if Sanity image exists, show project screenshot; otherwise show gradient (yellow tones or indigo tones, alternating) with project name as faded watermark
  - Project name (bold), description (1-2 lines), tech stack tags, "LIVE" badge linking to URL
  - Hard shadow alternating yellow/indigo
  - Hover: shadow grows, slight translate, cursor pointer
- **Projects:** Aires, Festful, Blocksight, SellGauge
- **Content from:** Sanity (title, description, tech stack array, URL, image)
- **Animation:** Cards stagger in from bottom on scroll, hover effects via Framer Motion

### Section 6: Skills / Tech Stack

- **Background:** `bg-primary`
- **Layout:** Grouped by category with pill-style tags
- **Section header:** Yellow "TECH STACK" badge + "Tools I work with." heading
- **Categories:**
  - Frontend: React, Next.js, React Native, TypeScript, Tailwind CSS, Redux
  - Backend: Node.js, Express.js, Python, GraphQL, Django
  - Database & Cloud: PostgreSQL, MongoDB, AWS, GCP
  - AI & Testing: LLM / AI Tools, Cypress, Playwright, CI/CD
- **Styling:** White pills with black border + hard shadow. Key skills highlighted with yellow or indigo fill.
- **Content from:** Sanity (skill name, category, highlighted boolean)
- **Animation:** Pills stagger in per category on scroll. Hover: shadow shifts, slight bounce.

### Section 7: Blog / Writing

- **Background:** `bg-secondary`
- **Layout:** 2-column grid of article cards
- **Section header:** Indigo "BLOG" badge + "Things I've written." heading + "VIEW ALL →" button (links to `/blog` listing page)
- **Each blog card:**
  - Date + tag label (top)
  - Title (bold, 16px)
  - Excerpt (2-3 lines)
  - "READ MORE →" link in indigo (links to `/blog/[slug]` detail page)
  - Hard shadow alternating yellow/indigo
- **Blog detail pages:** Individual pages at `/blog/[slug]` with full article content rendered from Sanity block content. These are the only multi-page routes beyond the main scroll page.
- **Content from:** Sanity (title, excerpt, date, tags, slug, body)
- **Animation:** Cards fade in on scroll

### Section 8: Contact

- **Background:** `bg-dark` (#111) — inverted section for contrast
- **Layout:** Centered text
- **Content:**
  - Yellow "LET'S WORK TOGETHER" badge
  - Headline: "Got a project in mind? **Let's talk.**" (yellow on "Let's talk.")
  - Subtitle: "Available for freelance work and full-time remote roles worldwide. GMT+5 · Typically responds within 24 hours."
  - Two CTAs: "EMAIL ME →" (yellow bg, indigo shadow, opens mailto:burhanharoon@outlook.com) + "SCHEDULE A CALL" (ghost button, links to Calendly or Cal.com — Burhan to provide link, fallback to mailto)
  - Social icons row (dark variant)
- **Animation:** Text fades in on scroll, CTAs slide up

### Section 9: Footer

- **Background:** `bg-dark`
- **Border:** Top border 2.5px #333
- **Layout:** Flex row — logo + copyright left, nav links right
- **Content:** "© 2026 Burhan Haroon. Built with Next.js & Sanity."

## Sanity CMS Schema

### Document Types

**Project:**
```
- title: string (required)
- slug: slug (auto-generated from title)
- description: text
- techStack: array of strings
- url: url (live project link)
- image: image (project screenshot/thumbnail)
- order: number (display order)
```

**BlogPost:**
```
- title: string (required)
- slug: slug (auto-generated from title)
- excerpt: text
- body: block content (rich text)
- date: datetime
- tags: array of strings
```

**Skill:**
```
- name: string (required)
- category: string (enum: frontend, backend, database-cloud, ai-testing)
- highlighted: boolean (yellow/indigo fill vs white)
- order: number (display order within category)
```

**About:**
```
- headline: string
- body: block content (rich text)
- stats: array of { label: string, value: string }
```

**Company:**
```
- name: string (required)
- logo: image
- order: number (display order)
```

## Responsive Design

- **Desktop (1280px+):** Full layout as described above
- **Tablet (768px-1279px):** Hero goes single column (text on top, profile card below). Projects grid becomes 2x1. Skills remain grouped.
- **Mobile (<768px):** Single column throughout. Hamburger nav. Projects stack vertically. Contact section remains centered. Font sizes scale down proportionally. Shadows reduce to 3px offset for tighter feel.

## Animations (Framer Motion)

All animations respect `prefers-reduced-motion`. If the user has motion reduction enabled, all animations are disabled.

- **Scroll-triggered:** Sections fade/slide in using `whileInView` with `viewport={{ once: true }}`
- **Stagger:** Children within sections stagger with 0.1s delay between items
- **Hover effects:** Buttons shift shadow on press (shadow reduces, element translates toward shadow). Project cards grow shadow + slight scale.
- **Spring physics:** Stat badges use spring animation (stiffness: 260, damping: 20)
- **Page load:** Hero content animates in on initial load (not on scroll)

## Data Flow

1. Content is created/edited in Sanity Studio (hosted at `/studio` route or separate Sanity-managed URL)
2. Next.js fetches content at build time using Sanity client + GROQ queries
3. Pages are statically generated (SSG) and deployed to Vercel
4. Sanity webhook triggers Vercel rebuild on publish
5. Visitors see static HTML — zero runtime API calls

## SEO

- Proper meta tags (title, description, og:image)
- Semantic HTML (header, main, section, footer, h1-h3 hierarchy)
- JSON-LD structured data (Person schema)
- Sitemap generation via Next.js
- robots.txt
- Open Graph image (auto-generated or static)

## Performance Targets

- Lighthouse score: 95+ across all categories
- First Contentful Paint: < 1s
- Total Bundle Size: < 200KB (excluding images)
- Images: WebP/AVIF via Next.js Image component + Sanity image CDN
