import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import PostList from '@/components/PostList';

interface TagPageProps {
    params: {
        tag: string;
    };
}

/**
 * Generate static params for all tags
 */
export async function generateStaticParams() {
    const tags = getAllTags();
    return tags.map((tag) => ({
        tag: tag.toLowerCase(),
    }));
}

/**
 * Generate metadata for tag page
 */
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const tag = decodeURIComponent(params.tag);

    return {
        title: `Posts tagged "${tag}"`,
        description: `All blog posts tagged with ${tag}`,
    };
}

/**
 * Tag page showing all posts with a specific tag
 */
export default function TagPage({ params }: TagPageProps) {
    const tag = decodeURIComponent(params.tag);
    const posts = getPostsByTag(tag);

    if (posts.length === 0) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="mb-12">
                <h1 className="text-4xl font-mono font-bold text-subtle-text mb-4">
                    Posts tagged <span className="text-accent-teal">&quot;{tag}&quot;</span>
                </h1>
                <p className="text-lg text-muted">
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
                </p>
            </div>

            <PostList posts={posts} showTags={false} />
        </div>
    );
}
