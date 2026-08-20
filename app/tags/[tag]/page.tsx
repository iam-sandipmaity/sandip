import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { tagToSlug, slugToTag, getOgImageUrl } from '@/lib/utils';
import PostList from '@/components/PostList';
import { siteConfig } from '@/lib/config';

interface TagPageProps {
    params: Promise<{
        tag: string;
    }>;
}

export async function generateStaticParams() {
    const tags = getAllTags();

    return tags.map((tag) => ({
        tag: tagToSlug(tag),
    }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { tag: tagSlug } = await params;
    const allTags = getAllTags();
    const tag = slugToTag(tagSlug, allTags);
    const ogImage = getOgImageUrl({
        title: `#${tag}`,
        description: `Browse all technical blog posts tagged with #${tag}.`,
        type: 'tag',
        tags: [tag],
    });

    return {
        title: `#${tag}`,
        description: `Posts tagged with ${tag}.`,
        alternates: {
            canonical: `${siteConfig.url}/tags/${tagSlug}`,
        },
        openGraph: {
            title: `#${tag} - Sandip Maity`,
            description: `Posts tagged with ${tag}.`,
            url: `${siteConfig.url}/tags/${tagSlug}`,
            siteName: siteConfig.name,
            images: [{ url: ogImage, width: 1200, height: 630, alt: `#${tag}` }],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `#${tag} - Sandip Maity`,
            description: `Posts tagged with ${tag}.`,
            creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
            images: [ogImage],
        },
    };
}

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
                            { '@type': 'ListItem', position: 2, name: 'Tags', item: `${siteConfig.url}/tags` },
                            { '@type': 'ListItem', position: 3, name: tag, item: `${siteConfig.url}/tags/${tagSlug}` },
                        ],
                    }),
                }}
            />

            <section className="mb-10 font-mono">
                <Link href="/tags" className="mb-6 inline-block text-sm text-muted transition-colors hover:text-accent-teal">
                    {'<- Tags'}
                </Link>

                <h1 className="mb-4 text-3xl font-semibold leading-tight text-subtle-text md:text-4xl">
                    #{tag}
                </h1>
                <p className="text-base leading-8 text-muted">
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                </p>
            </section>

            <PostList posts={posts} showTags={false} variant="compact" />
        </div>
    );
}
