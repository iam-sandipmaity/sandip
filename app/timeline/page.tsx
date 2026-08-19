import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { getOgImageUrl } from '@/lib/utils';
import { getAllTimelineItems, TimelineItem } from '@/lib/timeline';
import { FiExternalLink, FiBriefcase, FiBookOpen, FiCode, FiAward } from 'react-icons/fi';

export const metadata: Metadata = {
    title: 'Timeline & Life Journey',
    description: 'A chronological view of Sandip Maity\'s career, education, key milestones, projects, and engineering journey.',
    alternates: {
        canonical: `${siteConfig.url}/timeline`,
    },
    openGraph: {
        title: 'Timeline & Life Journey - Sandip Maity',
        description: 'A chronological view of Sandip Maity\'s career, education, key milestones, projects, and engineering journey.',
        url: `${siteConfig.url}/timeline`,
        siteName: siteConfig.name,
        images: [
            {
                url: getOgImageUrl({
                    title: 'Timeline & Life Journey',
                    description: 'Career milestones, education, projects, and engineering journey of Sandip Maity.',
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
        title: 'Timeline & Life Journey - Sandip Maity',
        description: 'A chronological view of Sandip Maity\'s career, education, key milestones, projects, and engineering journey.',
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: [
            getOgImageUrl({
                title: 'Timeline & Life Journey',
                description: 'Career milestones, education, projects, and engineering journey of Sandip Maity.',
                type: 'page',
            }),
        ],
    },
};

const categoryIcons = {
    career: FiBriefcase,
    education: FiBookOpen,
    project: FiCode,
    milestone: FiAward,
};

const categoryBadgeColors = {
    career: 'text-accent-teal border-accent-teal/30 bg-accent-teal/10',
    education: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    project: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    milestone: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
};

export default function TimelinePage() {
    const items = getAllTimelineItems();

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
                            { '@type': 'ListItem', position: 2, name: 'Timeline', item: `${siteConfig.url}/timeline` },
                        ],
                    }),
                }}
            />

            {/* Header */}
            <section className="mb-14 font-mono">
                <h1 className="mb-4 text-3xl font-semibold leading-tight text-subtle-text md:text-4xl">
                    Life Journey & Timeline
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted">
                    A minimal timeline of key education and career milestones.
                </p>
                <div className="mt-6 h-px w-24 bg-surface" />
            </section>

            {/* Timeline Stream */}
            <section className="font-mono">
                <div className="relative border-l border-dotted border-surface/70 pl-6 md:pl-8 space-y-12">
                    {items.map((item: TimelineItem) => {
                        const Icon = categoryIcons[item.category] || FiAward;
                        const badgeColor = categoryBadgeColors[item.category];

                        return (
                            <div key={item.id} className="relative group">
                                {/* Dot on timeline rail */}
                                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-background group-hover:border-accent-teal group-hover:bg-accent-teal transition-colors" />

                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className="text-sm font-semibold text-accent-teal">
                                        {item.date}
                                    </span>
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs rounded border ${badgeColor}`}>
                                        <Icon className="w-3 h-3" />
                                        <span className="capitalize">{item.category}</span>
                                    </span>
                                </div>

                                <h2 className="text-xl font-medium text-subtle-text group-hover:text-accent-teal transition-colors flex items-center gap-2">
                                    {item.link ? (
                                        <Link
                                            href={item.link}
                                            target={item.link.startsWith('http') ? '_blank' : undefined}
                                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="hover:underline flex items-center gap-1.5"
                                        >
                                            <span>{item.title}</span>
                                            <FiExternalLink className="w-4 h-4 text-muted shrink-0" />
                                        </Link>
                                    ) : (
                                        item.title
                                    )}
                                </h2>

                                {item.roleOrContext && (
                                    <p className="text-sm text-muted/80 mt-1 font-medium">
                                        {item.roleOrContext}
                                    </p>
                                )}

                                <p className="text-muted leading-relaxed mt-3 text-sm md:text-base">
                                    {item.description}
                                </p>

                                {item.highlights && item.highlights.length > 0 && (
                                    <ul className="mt-3 space-y-1 text-sm text-muted list-disc list-inside">
                                        {item.highlights.map((highlight, idx) => (
                                            <li key={idx}>{highlight}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
