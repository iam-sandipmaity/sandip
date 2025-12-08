import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { tagToSlug, slugToTag } from '@/lib/utils';
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
        tag: tagToSlug(tag),
    }));
}

/**
 * Generate metadata for tag page
 */
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const tag = slugToTag(params.tag);

    return {
        title: `Posts tagged "${tag}"`,
        description: `Explore all blog posts and articles tagged with ${tag}. Find tutorials, guides, and insights about ${tag} from embedded systems development to technical writing.`,
    };
}

/**
 * Tag page showing all posts with a specific tag
 */
export default function TagPage({ params }: TagPageProps) {
    const tag = slugToTag(params.tag);
    const posts = getPostsByTag(params.tag);

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
