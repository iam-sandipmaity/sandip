import type { Metadata } from 'next';
import Link from 'next/link';
import { FiGithub, FiGlobe, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { getRecentPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/config';
import PostList from '@/components/PostList';

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [
            {
                url: '/og?title=Sandip Maity',
                width: 1200,
                height: 630,
                alt: siteConfig.author,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: ['/og?title=Sandip Maity'],
    },
};

const contactLinks = [
    {
        href: siteConfig.social.github,
        label: 'GitHub',
        icon: FiGithub,
    },
    {
        href: `mailto:${siteConfig.email}`,
        label: 'Email',
        icon: FiMail,
    },
    {
        href: siteConfig.social.twitter,
        label: 'X',
        icon: FaXTwitter,
    },
    {
        href: 'https://profile.sandipmaity.me',
        label: 'Profile',
        icon: FiGlobe,
    },
];

export default function Home() {
    const recentPosts = getRecentPosts(7);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ProfilePage',
                        mainEntity: {
                            '@type': 'Person',
                            name: siteConfig.author,
                            url: siteConfig.url,
                            image: `${siteConfig.url}/og?title=Sandip Maity`,
                            jobTitle: 'Embedded Systems Developer',
                            description: siteConfig.description,
                            knowsAbout: ['Embedded Systems', 'Circuit Design', 'IoT', 'Arduino', 'STM32', 'ESP32', 'PCB Design', 'Firmware Development'],
                            sameAs: [
                                siteConfig.social.github,
                                siteConfig.social.twitter,
                                'https://profile.sandipmaity.me',
                            ],
                        },
                    }),
                }}
            />

            <div className="mx-auto max-w-3xl px-6 py-24 md:py-28">
                <section className="mb-20 font-mono">
                    <h1 className="mb-8 text-3xl font-semibold text-subtle-text md:text-4xl">
                        Hello World!
                    </h1>

                    <p className="mb-7 max-w-2xl text-base leading-8 text-subtle-text">
                        I build tiny systems from code and circuits.
                    </p>

                    <div className="flex items-center gap-5 text-muted">
                        {contactLinks.map(({ href, label, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('mailto:') ? undefined : '_blank'}
                                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                                className="transition-colors hover:text-accent-teal"
                                aria-label={label}
                            >
                                <Icon className="h-6 w-6" />
                            </a>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="mb-9 flex items-baseline justify-between gap-4">
                        <h2 className="font-mono text-2xl font-normal text-subtle-text md:text-3xl">
                            Posts
                        </h2>
                        <Link href="/blog" className="font-mono text-base text-muted transition-colors hover:text-accent-teal">
                            All posts
                        </Link>
                    </div>

                    <PostList posts={recentPosts} variant="home" />
                </section>
            </div>
        </>
    );
}
