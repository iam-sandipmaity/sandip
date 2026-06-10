import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllTagsWithCounts } from '@/lib/posts';
import { tagToSlug } from '@/lib/utils';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Tags',
    description: 'Browse all blog tags and post counts.',
    alternates: {
        canonical: `${siteConfig.url}/tags`,
    },
    openGraph: {
        title: 'Tags - Sandip Maity',
        description: 'Browse all blog tags and post counts.',
        url: `${siteConfig.url}/tags`,
        siteName: siteConfig.name,
        images: [{ url: '/og?title=Tags', width: 1200, height: 630, alt: 'Sandip Maity Tags' }],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tags - Sandip Maity',
        description: 'Browse all blog tags and post counts.',
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: ['/og?title=Tags'],
    },
};

export default function TagsPage() {
    const tags = getAllTagsWithCounts();
    const postCount = getAllPosts().length;

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
                            { '@type': 'ListItem', position: 2, name: 'Tags', item: `${siteConfig.url}/tags` },
                        ],
                    }),
                }}
            />

            <section className="mb-10 font-mono">
                <h1 className="mb-6 text-3xl font-bold leading-tight text-subtle-text md:text-4xl">
                    Tags
                </h1>
                <p className="text-base leading-8 text-muted">
                    {tags.length} {tags.length === 1 ? 'tag' : 'tags'} across {postCount} {postCount === 1 ? 'post' : 'posts'}.
                </p>
            </section>

            <section className="font-mono">
                <div className="space-y-4">
                    {tags.map(({ tag, count }) => (
                        <p key={tag} className="text-base leading-7 text-subtle-text">
                            <Link
                                href={`/tags/${tagToSlug(tag)}`}
                                className="underline decoration-current decoration-1 underline-offset-2 transition-colors hover:text-[#cf2644]"
                            >
                                #{tag}
                            </Link>
                            <span className="text-muted"> - {count} {count === 1 ? 'Post' : 'Posts'}</span>
                        </p>
                    ))}
                </div>
            </section>
        </div>
    );
}
