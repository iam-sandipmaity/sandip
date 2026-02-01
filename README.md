# Minimal Dark Portfolio

A moody, minimal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Inspired by [lrns.me](https://lrns.me), this portfolio features a dark aesthetic, restrained motion, and strong typographic hierarchy.

## ✨ Features

- **Modern Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Dark Theme**: Moody color palette with teal/green accents
- **MDX Blog**: Write blog posts in MDX with syntax highlighting
- **Type-Safe**: Strict TypeScript configuration throughout
- **Responsive**: Mobile-first design with elegant breakpoints
- **Accessible**: Semantic HTML, keyboard navigation, ARIA labels
- **SEO Optimized**: Meta tags, sitemap, RSS feed
- **Theme Toggle**: Dark/light mode with localStorage persistence
- **Tag System**: Filter blog posts by tags
- **Minimal JS**: Server components by default, client components only where needed

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd RetroPortfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
RetroPortfolio/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   │   ├── [slug]/        # Individual blog post
│   │   └── tags/[tag]/    # Tag filter pages
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   ├── reads/             # Reads page
│   ├── feed.xml/          # RSS feed route
│   ├── sitemap.ts         # Sitemap generation
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer
│   ├── ThemeToggle.tsx    # Theme switcher
│   ├── ThemeProvider.tsx  # Theme context
│   ├── ProjectCard.tsx    # Project display
│   ├── PostList.tsx       # Blog post list
│   └── TagPill.tsx        # Tag component
├── lib/                   # Utility functions
│   ├── posts.ts           # MDX post utilities
│   └── projects.ts        # Project data
├── posts/                 # MDX blog posts
│   ├── hello-world.mdx
│   └── type-safe-api-client.mdx
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind configuration
├── next.config.mjs        # Next.js configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎨 Customization

### Update Personal Information

1. **Site Metadata** (`app/layout.tsx`):
   - Update title, description, author
   - Add your social media handles
   - Set your site URL

2. **Header Logo** (`components/Header.tsx`):
   - Replace "Your Name" with your name
   - Customize the geometric logo SVG

3. **Home Page** (`app/page.tsx`):
   - Update tagline and description
   - Change social media links

4. **Projects** (`lib/projects.ts`):
   - Replace sample projects with your own
   - Add GitHub links and live demos

5. **About Page** (`app/about/page.tsx`):
   - Write your bio
   - Update skills list
   - Add your current activities

### Color Scheme

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  'near-black': '#0f1112',    // Background
  'mid-dark': '#1b1e1f',      // Surface
  'accent-teal': '#5eead4',   // Primary accent
  // ... more colors
}
```

### Fonts

The site uses:
- **Inter** for body text
- **JetBrains Mono** for headings and code

Change fonts in `app/layout.tsx` by importing different Google Fonts.

## 📝 Writing Blog Posts

Create a new `.mdx` file in the `posts/` directory:

```mdx
---
title: "Your Post Title"
date: "2024-01-15"
summary: "A brief summary of your post"
tags: ["typescript", "web", "tutorial"]
---

# Your Post Title

Your content here with full MDX support...

```typescript
// Code blocks with syntax highlighting
const example = "Hello, World!";
```
```

The post will automatically appear in the blog index and be available at `/blog/your-file-name`.

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

```bash
# Build for production
npm run build

# The output will be in the `.next` directory
# Deploy the entire project directory
```

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 🙏 Acknowledgments

- Design inspiration: [lrns.me](https://lrns.me)
- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

---

**Made with ❤️ and TypeScript **

