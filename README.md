# Burhan Haroon — Portfolio

My personal developer portfolio.

**Live:** [burhanharoon.dev](https://burhanharoon.dev)

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion 12
- **CMS:** Sanity (headless, build-time fetching via GROQ)
- **Deployment:** Vercel

## Features

- Neubrutalist design with two-tone yellow/indigo palette
- Scroll-triggered animations and spring-physics effects
- Sanity CMS with embedded studio at `/studio`
- Blog with individual post pages (`/blog/[slug]`)
- SEO — JSON-LD structured data, auto-generated sitemap, robots.txt
- Fully responsive (mobile-first)

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## License

MIT
