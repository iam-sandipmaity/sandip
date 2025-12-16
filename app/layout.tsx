import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import 'katex/dist/katex.min.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
        default: 'Sandip Maity - Embedded Systems Developer | IoT & Circuit Design',
        template: '%s | Sandip Maity',
    },
    description: 'Electronics and Communication Engineering student passionate about embedded systems, circuit design, and IoT solutions.',
    keywords: [
        'embedded systems',
        'electronics',
        'circuit design',
        'Arduino',
        'STM32',
        'ESP32',
        'IoT',
        'IoT solutions',
        'PCB design',
        'microcontrollers',
        'embedded developer',
        'circuit designer',
        'hardware engineer',
        'firmware development',
        'C programming',
        'C++ programming',
        'embedded C',
        'Sandip Maity',
        'electronics portfolio',
        'embedded projects',
        'IoT developer',
        'hardware projects',
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
        title: 'Sandip Maity - ECE Student & Embedded Systems Developer',
        description: 'Electronics and Communication Engineering student passionate about embedded systems, circuit design, and IoT solutions.',
        siteName: 'Sandip Maity Portfolio',
        images: [
            {
                url: '/og?title=Sandip Maity',
                width: 1200,
                height: 630,
                alt: 'Sandip Maity Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sandip Maity - ECE Student & Embedded Systems Developer',
        description: 'Electronics and Communication Engineering student passionate about embedded systems, circuit design, and IoT solutions.',
        creator: '@iam_sandipmaity',
        images: ['/og?title=Sandip Maity'],
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
        google: 'your-google-verification-code', // Replace with actual Google Search Console verification code
        // yandex: 'your-yandex-verification-code',
        // bing: 'your-bing-verification-code',
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
                                name: 'Sandip Maity',
                                url: 'https://sandipmaity.me',
                                sameAs: [
                                    'https://github.com/iam-sandipmaity',
                                    'https://twitter.com/iam_sandipmaity',
                                    'https://linkedin.com/in/sandipmaity',
                                ],
                                jobTitle: 'Electronics and Communication Engineering Student',
                                description: 'Embedded systems developer specializing in Arduino, STM32, ESP32, IoT solutions, circuit design, and PCB development.',
                                knowsAbout: ['Embedded Systems', 'Circuit Design', 'IoT', 'Arduino', 'STM32', 'ESP32', 'PCB Design'],
                                alumniOf: {
                                    '@type': 'EducationalOrganization',
                                    name: 'Electronics and Communication Engineering',
                                },
                            },
                            {
                                '@context': 'https://schema.org',
                                '@type': 'WebSite',
                                name: 'Sandip Maity Portfolio',
                                url: 'https://sandipmaity.me',
                                description: 'Personal portfolio and blog of Sandip Maity, embedded systems developer.',
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
                    <div className="min-h-screen flex flex-col">
                        <Header />
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
