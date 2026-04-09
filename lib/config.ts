// Site configuration
// Use NEXT_PUBLIC_SITE_URL env var or default to localhost

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sandipmaity.me',
  name: 'Sandip Maity Portfolio',
  title: 'Sandip Maity - Embedded System IOT Circuit design and Vibe coder',
  description: 'Embedded systems developer specializing in Arduino, STM32, ESP32, IoT solutions, circuit design, and PCB development. Explore projects and technical blog posts.',
  author: 'Sandip Maity',
  email: 'maitysandip@proton.me',
  social: {
    github: 'https://github.com/iam-sandipmaity',
    twitter: 'https://x.com/iam_sandipmaity',
    linkedin: 'https://www.linkedin.com/in/iam-sandipmaity',
  },
} as const;