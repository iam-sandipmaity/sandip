import type { Metadata } from 'next';
import { makePageMetadata } from '@/lib/metadata';
import { socialLinks } from '@/lib/social-links';
import PageContainer from '@/components/PageContainer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = makePageMetadata({
    title: 'Contact',
    description: 'Ways to reach Sandip Maity.',
    path: '/contact',
    ogTitle: 'Contact Sandip Maity',
    canonical: false,
});

export default function ContactPage() {
    return (
        <PageContainer>
            <BreadcrumbJsonLd items={[{ name: 'Contact', path: '/contact' }]} />

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
                    {socialLinks.map(({ href, label, value, icon: Icon }) => (
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
        </PageContainer>
    );
}
