import type { Metadata } from 'next';
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch for project collaborations, technical discussions, or to connect about embedded systems.',
    openGraph: {
        title: 'Contact Sandip Maity',
        description: 'Get in touch for project collaborations or technical discussions.',
        url: `${siteConfig.url}/contact`,
        siteName: siteConfig.name,
        images: [{ url: '/og?title=Contact Me', width: 1200, height: 630, alt: 'Contact Sandip Maity' }],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Sandip Maity',
        description: 'Get in touch for project collaborations or technical discussions.',
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: ['/og?title=Contact Me'],
    },
};

export default function ContactPage() {
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
                            { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteConfig.url}/contact` },
                        ],
                    }),
                }}
            />

            <div className="mb-12 text-center">
                <h1 className="text-4xl font-mono font-bold text-subtle-text mb-4">
                    Get in Touch
                </h1>
                <p className="font-mono text-lg text-muted leading-relaxed max-w-2xl mx-auto">
                    Have a question or want to work together? Feel free to reach out.
                </p>
            </div>

            {/* Social Links - inline, no boxes */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
                <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-mono flex items-center gap-3 text-muted hover:text-accent-teal transition-colors"
                    aria-label="Email"
                >
                    <FiMail className="w-5 h-5" />
                    <span>Email</span>
                </a>

                <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono flex items-center gap-3 text-muted hover:text-accent-teal transition-colors"
                    aria-label="GitHub"
                >
                    <FiGithub className="w-5 h-5" />
                    <span>GitHub</span>
                </a>

                <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono flex items-center gap-3 text-muted hover:text-accent-teal transition-colors"
                    aria-label="LinkedIn"
                >
                    <FiLinkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                </a>

                <a
                    href={siteConfig.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono flex items-center gap-3 text-muted hover:text-accent-teal transition-colors"
                    aria-label="Twitter/X"
                >
                    <FiTwitter className="w-5 h-5" />
                    <span>Twitter</span>
                </a>
            </div>

            <p className="font-mono text-muted text-sm text-center">
                I typically respond within 24-48 hours.
            </p>
        </div>
    );
}