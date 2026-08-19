import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { getOgImageUrl } from '@/lib/utils';
import { getAllTimelineItems, TimelineItem } from '@/lib/timeline';

export const metadata: Metadata = {
    title: 'Timeline',
    description: 'A minimal record of Sandip Maity\'s education and career journey.',
    alternates: {
        canonical: `${siteConfig.url}/timeline`,
    },
    openGraph: {
        title: 'Timeline - Sandip Maity',
        description: 'A minimal record of Sandip Maity\'s education and career journey.',
        url: `${siteConfig.url}/timeline`,
        siteName: siteConfig.name,
        images: [
            {
                url: getOgImageUrl({
                    title: 'Timeline',
                    description: 'A minimal record of education and career milestones.',
                    type: 'page',
                }),
                width: 1200,
                height: 630,
                alt: 'Sandip Maity Timeline',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Timeline - Sandip Maity',
        description: 'A minimal record of Sandip Maity\'s education and career journey.',
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: [
            getOgImageUrl({
                title: 'Timeline',
                description: 'A minimal record of education and career milestones.',
                type: 'page',
            }),
        ],
    },
};

export default function TimelinePage() {
    const items = getAllTimelineItems();

    return (
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 font-mono">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
                            { '@type': 'ListItem', position: 2, name: 'Timeline', item: `${siteConfig.url}/timeline` },
                        ],
                    }),
                }}
            />

            {/* Header */}
            <section className="mb-12">
                <h1 className="mb-4 text-3xl font-semibold leading-tight text-subtle-text md:text-4xl">
                    Timeline
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted">
                    A minimal record of key education and career milestones.
                </p>
            </section>

            {/* Timeline Content */}
            <section className="divide-y divide-dotted divide-surface/70 border-y border-dotted border-surface/70">
                {items.map((item: TimelineItem) => (
                    <article key={item.id} className="py-6 group">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <h2 className="text-lg font-medium text-subtle-text group-hover:text-accent-teal transition-colors">
                                {item.title}
                            </h2>
                            <span className="text-sm font-semibold text-accent-teal shrink-0">
                                {item.date}
                            </span>
                        </div>
                        <p className="mt-2 text-sm text-muted leading-relaxed">
                            {item.description}
                        </p>
                    </article>
                ))}
            </section>
        </div>
    );
}
