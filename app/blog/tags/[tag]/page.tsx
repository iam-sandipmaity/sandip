import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { tagToSlug, slugToTag } from '@/lib/utils';
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

    return {
        title: `Posts tagged "${tag}"`,
        description: `Explore all blog posts and articles tagged with ${tag}. Find tutorials, guides, and insights about ${tag} from embedded systems development to technical writing.`,
    };
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
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-mono font-semibold text-subtle-text mb-4">
                    Posts tagged <span className="text-accent-teal">&quot;{tag}&quot;</span>
                </h1>
                <p className="font-mono text-xl text-muted">
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
                </p>
            </div>

            <PostList posts={posts} showTags={false} />
        </PageContainer>
    );
}
