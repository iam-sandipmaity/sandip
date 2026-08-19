// Site configuration
// Use NEXT_PUBLIC_SITE_URL env var or default to localhost

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sandipmaity.me',
  name: 'Sandip Maity Portfolio',
  title: 'Sandip Maity - ECE & Fiber Optics Engineer | IoT, Circuits & Web Tools',
  description: 'Portfolio and blog of Sandip Maity. Electronics & Communication Engineer specializing in Fiber Optics, Utility Engineering, IoT, STM32, ESP32, Arduino, Circuit Design, and web tools.',
  author: 'Sandip Maity',
  email: 'maitysandip@proton.me',
  social: {
    github: 'https://github.com/iam-sandipmaity',
    twitter: 'https://x.com/iam_sandipmaity',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'your-google-verification-code',
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
  },
} as const;
