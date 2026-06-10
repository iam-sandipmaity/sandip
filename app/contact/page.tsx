import type { Metadata } from 'next';
import { FiGithub, FiGlobe, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Ways to reach Sandip Maity.',
    openGraph: {
        title: 'Contact Sandip Maity',
        description: 'Ways to reach Sandip Maity.',
        url: `${siteConfig.url}/contact`,
        siteName: siteConfig.name,
        images: [{ url: '/og?title=Contact Me', width: 1200, height: 630, alt: 'Contact Sandip Maity' }],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Sandip Maity',
        description: 'Ways to reach Sandip Maity.',
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: ['/og?title=Contact Me'],
    },
};

export default function ContactPage() {
    const links = [
        {
            href: `mailto:${siteConfig.email}`,
            label: 'Email',
            value: siteConfig.email,
            icon: FiMail,
        },
        {
            href: siteConfig.social.github,
            label: 'GitHub',
            value: '@iam-sandipmaity',
            icon: FiGithub,
        },
        {
            href: siteConfig.social.twitter,
            label: 'X',
            value: '@iam_sandipmaity',
            icon: FaXTwitter,
        },
        {
            href: 'https://profile.sandipmaity.me',
            label: 'Profile',
            value: 'profile.sandipmaity.me',
            icon: FiGlobe,
        },
    ];

    return (
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
                            { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteConfig.url}/contact` },
                        ],
                    }),
                }}
            />

            <section className="mb-12 font-mono">
                <h1 className="mb-6 text-3xl font-semibold leading-tight text-subtle-text md:text-4xl">
                    Contact
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted">
                    The easiest way to reach me is email. I am also around on the usual places,
                    mostly reading, learning, and occasionally posting something.
                </p>
            </section>

            <section className="font-mono">
                <div className="divide-y divide-dotted divide-surface/70 border-y border-dotted border-surface/70">
                    {links.map(({ href, label, value, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                            className="group flex items-center justify-between gap-4 py-4 text-muted transition-colors hover:text-accent-teal"
                            aria-label={label}
                        >
                            <span className="flex items-center gap-3 text-subtle-text transition-colors group-hover:text-accent-teal">
                                <Icon className="h-5 w-5 text-muted transition-colors group-hover:text-accent-teal" />
                                <span>{label}</span>
                            </span>
                            <span className="min-w-0 truncate text-right text-sm">{value}</span>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
