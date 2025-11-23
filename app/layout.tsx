import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://sandipmaity.vercel.app'),
    title: {
        default: 'Sandip.',
        template: '%s | Sandip.',
    },
    description: 'Electronics and Communication Engineering student passionate about embedded systems, circuit design, and IoT solutions.',
    keywords: ['embedded systems', 'electronics', 'circuit design', 'Arduino', 'STM32', 'IoT', 'PCB design'],
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
            <body className="antialiased" suppressHydrationWarning>
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
