import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { tagToSlug, slugToTag } from '@/lib/utils';
import { makePageMetadata } from '@/lib/metadata';
import PostList from '@/components/PostList';
import PageContainer from '@/components/PageContainer';

interface TagPageProps {
    params: Promise<{
        tag: string;
    }>;
}

export async function generateStaticParams() {
    return getAllTags().map((tag) => ({ tag: tagToSlug(tag) }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { tag: tagSlug } = await params;
    const tag = slugToTag(tagSlug);

    return makePageMetadata({
        title: `#${tag}`,
        description: `Posts tagged with ${tag}.`,
        path: `/tags/${tagSlug}`,
        ogTitle: `#${tag} - Sandip Maity`,
    });
}

export default async function TagPage({ params }: TagPageProps) {
    const { tag: tagSlug } = await params;
    const tag = slugToTag(tagSlug);
    const posts = getPostsByTag(tagSlug);

    if (posts.length === 0) {
        notFound();
    }

    return (
        <PageContainer>
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
        </PageContainer>
    );
}
