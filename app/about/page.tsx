import type { Metadata } from 'next';
import { FiGithub, FiGlobe, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: 'About - Embedded Developer & Engineer',
    description: 'Electronics and Communication Engineering student passionate about embedded systems, Arduino, STM32, circuit design, PCB development, and IoT solutions.',
    alternates: {
        canonical: `${siteConfig.url}/about`,
    },
    openGraph: {
        title: 'About Sandip Maity - Embedded Developer',
        description: 'Electronics and Communication Engineering student passionate about embedded systems.',
        url: `${siteConfig.url}/about`,
        siteName: siteConfig.name,
        images: [{ url: '/og?title=About Me', width: 1200, height: 630, alt: 'About Sandip Maity' }],
        locale: 'en_US',
        type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Sandip Maity - Embedded Developer',
        description: 'Electronics and Communication Engineering student passionate about embedded systems.',
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: ['/og?title=About Me'],
    },
};

export default function AboutPage() {
    const connectLinks = [
        {
            href: siteConfig.social.github,
            label: 'GitHub',
            icon: FiGithub,
        },
        {
            href: siteConfig.social.twitter,
            label: 'X',
            icon: FaXTwitter,
        },
        {
            href: `mailto:${siteConfig.email}`,
            label: 'Email',
            icon: FiMail,
        },
        {
            href: 'https://profile.sandipmaity.me',
            label: 'Profile',
            icon: FiGlobe,
        },
    ];

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
                            { '@type': 'ListItem', position: 2, name: 'About', item: `${siteConfig.url}/about` },
                        ],
                    }),
                }}
            />

            {/* Header */}
            <section className="mb-16">
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-subtle-text mb-4">
                    About Me
                </h1>
                <div className="h-px bg-surface w-24" />
            </section>

            {/* Introduction */}
            <section className="mb-12">
                <p className="text-xl md:text-2xl font-mono text-subtle-text leading-relaxed">
                    Hi, I&apos;m <span className="text-accent-teal">{siteConfig.author}</span>.
                </p>
                <p className="font-mono text-lg text-muted leading-relaxed mt-4">
                    An Electronics and Communication Engineering student building the future with code and circuits.
                </p>
            </section>

            {/* What I do */}
            <section className="mb-12">
                <h2 className="text-lg font-mono font-semibold text-subtle-text mb-4">
                    What I do
                </h2>
                <div className="font-mono text-muted leading-relaxed space-y-4">
                    <p>
                        I don&apos;t know what I am doing at all.
                    </p>
                    <p>
                        Most days I am just trying things, breaking things, learning a little, and
                        pretending the confusing parts are part of the plan.
                    </p>
                    <p>
                        That is the whole method for now.
                    </p>
                </div>
            </section>

            {/* Connect */}
            <section className="mb-12">
                <h2 className="text-lg font-mono font-semibold text-subtle-text mb-4">
                    Connect
                </h2>
                <div className="flex flex-wrap gap-6">
                    {connectLinks.map(({ href, label, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                            className="flex items-center gap-2 text-muted hover:text-accent-teal transition-colors"
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-mono">{label}</span>
                        </a>
                    ))}
                </div>
            </section>

            {/* Quote */}
            <section className="py-8 border-t border-b border-dotted border-surface/30">
                <p className="text-muted italic text-lg font-mono text-center">
                    &ldquo;Engineering is the closest thing to magic that exists in the world.&rdquo;
                </p>
                <p className="text-accent-teal text-center mt-3 font-mono font-medium">— Elon Musk</p>
            </section>
        </div>
    );
}
