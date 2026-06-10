# Sandip Maity

A minimal personal site and blog built with Next.js, TypeScript, MDX, and Tailwind CSS. The design is inspired by lrns.me: quiet spacing, mono typography, simple content rails, theme-aware accents, and a blog-first reading experience.

## Features

- Next.js 14 App Router with TypeScript
- MDX blog posts with syntax highlighting, math support, RSS, and sitemap
- Editorial blog index with date, title, and short quoted summaries
- Tag pages at `/tags` and `/tags/[tag]`
- Section browsing and filtering for nested blog folders
- Minimal pages for About, Projects, Reads, and Contact
- Dark/light theme with theme-aware accent colors
- Monospace-first typography across the site
- SEO metadata, Open Graph images, `llms.txt`, manifest, and structured data
- Search modal and service-worker/cache cleanup support

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- MDX
- React Icons

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run Next.js lint
npm run type-check # Run TypeScript type checking
```

## Project Structure

```text
app/
  about/           About page
  api/search/      Search endpoint
  blog/            Blog index, posts, sections, and legacy tag route
  contact/         Contact page
  feed.xml/        RSS feed
  llms.txt/        LLM-readable site summary
  og/              Dynamic Open Graph image route
  projects/        Projects page
  reads/           Reading list
  tags/            Tag index and tag detail pages
components/        Shared UI components
lib/               Site config, posts, projects, dates, utilities
posts/             MDX blog posts
public/            Static assets
```

## Blog Posts

Create posts as `.mdx` files under `posts/`. Nested folders become nested blog routes.

```mdx
---
title: "Your Post Title"
date: "11-06-2026"
summary: "A short summary shown on listing pages."
tags: ["web", "notes"]
---

# Your Post Title

Write here.
```

Dates are stored as Indian-style `dd-mm-yyyy` strings. The app parses old ISO dates too, but new posts should use `dd-mm-yyyy`.

## Tags

- `/tags` lists every tag with post counts.
- `/tags/[tag]` lists posts for a specific tag.
- Blog post headers and listing tags link to the new tag routes.

## Content

- Site metadata and social/profile links live in `lib/config.ts`.
- Blog parsing and sorting live in `lib/posts.ts`.
- Date parsing and display helpers live in `lib/date.ts`.
- Project data lives in `lib/projects.ts`.
- Theme colors and typography are defined in `app/globals.css` and `tailwind.config.ts`.

## Deployment

The site is ready for Vercel or any platform that supports Next.js.

```bash
npm run build
npm run start
```

## Acknowledgments

- Design inspiration: https://lrns.me
- Built with Next.js and Tailwind CSS
- Icons from React Icons
