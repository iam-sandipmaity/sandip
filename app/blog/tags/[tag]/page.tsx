import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { tagToSlug, slugToTag } from '@/lib/utils';
import PostList from '@/components/PostList';

import { siteConfig } from '@/lib/config';

interface TagPageProps {
    params: Promise<{
        tag: string;
    }>;
}

/**
 * Generate static params for all tags
 */
export async function generateStaticParams() {
    const tags = getAllTags();
    return tags.map((tag) => ({
        tag: tagToSlug(tag),
    }));
}

/**
 * Generate metadata for tag page
 */
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { tag: tagSlug } = await params;
    const allTags = getAllTags();
    const tag = slugToTag(tagSlug, allTags);
    const url = `${siteConfig.url}/blog/tags/${tagSlug}`;
    const description = `Explore all blog posts and articles tagged with ${tag}. Find tutorials, guides, and insights about ${tag}.`;

    return {
        title: `Posts tagged "${tag}"`,
        description: description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `Posts tagged "${tag}" - Sandip Maity`,
            description: description,
            url: url,
            siteName: siteConfig.name,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `Posts tagged "${tag}" - Sandip Maity`,
            description: description,
            creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        },
    };
}

/**
 * Tag page showing all posts with a specific tag
 */
export default async function TagPage({ params }: TagPageProps) {
    const { tag: tagSlug } = await params;
    const allTags = getAllTags();
    const tag = slugToTag(tagSlug, allTags);
    const posts = getPostsByTag(tagSlug);

    if (posts.length === 0) {
        notFound();
    }

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
                            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
                            { '@type': 'ListItem', position: 3, name: 'Tags', item: `${siteConfig.url}/tags` },
                            { '@type': 'ListItem', position: 4, name: tag, item: `${siteConfig.url}/blog/tags/${tagSlug}` },
                        ],
                    }),
                }}
            />

            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-mono font-semibold text-subtle-text mb-4">
                    Posts tagged <span className="text-accent-teal">&quot;{tag}&quot;</span>
                </h1>
                <p className="font-mono text-xl text-muted">
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
                </p>
            </div>

            <PostList posts={posts} showTags={false} />
        </div>
    );
}
