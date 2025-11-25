import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
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
    metadataBase: new URL('https://sandipmaity.vercel.app'),
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
    ],
    authors: [{ name: 'Sandip Maity' }],
    creator: 'Sandip Maity',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://sandipmaity.vercel.app',
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
        google: 'your-google-verification-code', // Add this later
    },
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
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Person',
                            name: 'Sandip Maity',
                            url: 'https://sandipmaity.vercel.app',
                            sameAs: [
                                'https://github.com/iam-sandipmaity',
                                'https://twitter.com/iam_sandipmaity',
                                'https://linkedin.com/in/sandipmaity',
                            ],
                            jobTitle: 'Electronics and Communication Engineering Student',
                            worksFor: {
                                '@type': 'Organization',
                                name: 'Self-Employed',
                            },
                        }),
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
