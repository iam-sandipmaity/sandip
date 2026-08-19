import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import BrowserCacheCleanup from '@/components/BrowserCacheCleanup';
import { siteConfig } from '@/lib/config';
import { getOgImageUrl } from '@/lib/utils';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    preload: true,
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
    preload: true,
});

export const metadata: Metadata = {
    metadataBase: new URL('https://sandipmaity.me'),
    title: {
        default: 'Sandip Maity - ECE & Fiber Optics Engineer | IoT, Circuits & Web Tools',
        template: '%s | Sandip Maity',
    },
    description: 'Electronics & Communication Engineer specializing in Fiber Optics, Utility Engineering, IoT solutions, Circuit Design, and web tools.',
    keywords: [
        'Sandip Maity',
        'Sandip',
        'Maity Sandip',
        'Maity',
        'iam_sandipmaity',
        'iam-sandipmaity',
        'sandipmaity',
        'sandip maity portfolio',
        'sandip maity website',
        'sandip maity blog',
        'ECE Engineer',
        'Fiber Optics Engineer',
        'Utility Engineer',
        'Electronics and Communication Engineering',
        'IoT',
        'IoT solutions',
        'STM32',
        'ESP32',
        'Arduino',
        'Circuit Design',
        'Hardware Projects',
        'Web Applications',
        'Web Tools',
        'Vibe Coding',
        'Tech Blog',
    ],
    authors: [{ name: 'Sandip Maity', url: 'https://sandipmaity.me' }],
    creator: 'Sandip Maity',
    publisher: 'Sandip Maity',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: 'https://sandipmaity.me',
        types: {
            'application/rss+xml': 'https://sandipmaity.me/feed.xml',
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://sandipmaity.me',
        title: 'Sandip Maity - ECE & Fiber Optics Engineer',
        description: 'Electronics & Communication Engineer specializing in Fiber Optics, Utility Engineering, IoT solutions, Circuit Design, and web tools.',
        siteName: 'Sandip Maity Portfolio',
        images: [
            {
                url: getOgImageUrl({
                    title: 'Sandip Maity',
                    description: 'ECE & Fiber Optics Engineer | IoT & Circuit Design',
                    type: 'home',
                }),
                width: 1200,
                height: 630,
                alt: 'Sandip Maity Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sandip Maity - ECE & Fiber Optics Engineer',
        description: 'Electronics & Communication Engineer specializing in Fiber Optics, Utility Engineering, IoT solutions, Circuit Design, and web tools.',
        creator: '@iam_sandipmaity',
        images: [
            getOgImageUrl({
                title: 'Sandip Maity',
                description: 'ECE & Fiber Optics Engineer | IoT & Circuit Design',
                type: 'home',
            }),
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: siteConfig.verification.google,
        yandex: siteConfig.verification.yandex || undefined,
        other: {
            ...(siteConfig.verification.bing ? { 'msvalidate.01': siteConfig.verification.bing } : {}),
        },
    },
    category: 'technology',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var key = 'sandip-prehydrate-cache-reset-v1';
                                    if (sessionStorage.getItem(key)) return;
                                    sessionStorage.setItem(key, 'true');

                                    var jobs = [];
                                    if ('serviceWorker' in navigator) {
                                        jobs.push(
                                            navigator.serviceWorker.getRegistrations()
                                                .then(function(registrations) {
                                                    return Promise.all(registrations.map(function(registration) {
                                                        return registration.unregister();
                                                    }));
                                                })
                                        );
                                    }
                                    if ('caches' in window) {
                                        jobs.push(
                                            caches.keys().then(function(keys) {
                                                return Promise.all(keys.map(function(key) {
                                                    return caches.delete(key);
                                                }));
                                            })
                                        );
                                    }

                                    if (jobs.length) {
                                        Promise.all(jobs).then(function() {
                                            window.location.reload();
                                        });
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
                {/* Theme script - must be before any React code to prevent hydration mismatch */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem('theme');
                                    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                        document.documentElement.classList.add('dark');
                                    } else {
                                        document.documentElement.classList.remove('dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
                {/* Font script - must be before React code to prevent hydration flicker */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    if (localStorage.getItem('sandip-font') === 'system') {
                                        document.documentElement.classList.add('font-system');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
                {/* Preconnect to external domains for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* RSS Feed Autodiscovery */}
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="Sandip Maity Blog RSS Feed"
                    href="/feed.xml"
                />
            </head>
            <body className="antialiased" suppressHydrationWarning>
                {/* Google Analytics 4 - Using Next.js Script component */}
                {/* Google tag (gtag.js) */}
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-70GDEV7YDZ"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-70GDEV7YDZ');
                    `}
                </Script>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                '@context': 'https://schema.org',
                                '@type': 'Person',
                                name: siteConfig.author,
                                alternateName: ['Sandip', 'Maity Sandip', 'Maity', 'iam_sandipmaity', 'iam-sandipmaity', 'sandipmaity'],
                                url: siteConfig.url,
                                sameAs: [
                                    siteConfig.social.github,
                                    siteConfig.social.twitter,
                                    'https://profile.sandipmaity.me',
                                    ...(siteConfig.social.linkedin ? [siteConfig.social.linkedin] : []),
                                ],
                                jobTitle: 'Electronics and Communication Engineer (Fiber Optics & Utility Engineering)',
                                description: siteConfig.description,
                                knowsAbout: ['Electronics and Communication Engineering', 'Fiber Optics', 'Utility Engineering', 'IoT', 'STM32', 'ESP32', 'Arduino', 'Circuit Design', 'Web Tools', 'Software Projects'],
                            },
                            {
                                '@context': 'https://schema.org',
                                '@type': 'WebSite',
                                name: 'Sandip Maity Portfolio',
                                url: 'https://sandipmaity.me',
                                description: 'Personal portfolio and blog of Sandip Maity, ECE & Fiber Optics Engineer.',
                                author: {
                                    '@type': 'Person',
                                    name: 'Sandip Maity',
                                },
                                inLanguage: 'en-US',
                            },
                        ]),
                    }}
                />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <BrowserCacheCleanup />
                    <div className="min-h-screen flex flex-col">
                        <SiteHeader />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
