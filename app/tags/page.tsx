import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllTagsWithCounts } from '@/lib/posts';
import { tagToSlug } from '@/lib/utils';
import { makePageMetadata } from '@/lib/metadata';
import PageContainer from '@/components/PageContainer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = makePageMetadata({
    title: 'Tags',
    description: 'Browse all blog tags and post counts.',
    path: '/tags',
    ogTitle: 'Tags - Sandip Maity',
});

export default function TagsPage() {
    const tags = getAllTagsWithCounts();
    const postCount = getAllPosts().length;

    return (
        <PageContainer>
            <BreadcrumbJsonLd items={[{ name: 'Tags', path: '/tags' }]} />

            <section className="mb-10 font-mono">
                <h1 className="mb-6 text-3xl font-semibold leading-tight text-subtle-text md:text-4xl">
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
                                className="underline decoration-current decoration-1 underline-offset-2 transition-colors hover:text-accent-teal"
                            >
                                #{tag}
                            </Link>
                            <span className="text-muted"> - {count} {count === 1 ? 'Post' : 'Posts'}</span>
                        </p>
                    ))}
                </div>
            </section>
        </PageContainer>
    );
}
