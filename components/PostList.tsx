import Link from 'next/link';
import TagPill from './TagPill';
import { tagToSlug } from '@/lib/utils';

export interface Post {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
}

interface PostListProps {
    posts: Post[];
    showTags?: boolean;
}

/**
 * Post list component displaying blog posts with date, title, summary, and tags
 * Chronological ordering
 */
export default function PostList({ posts, showTags = true }: PostListProps) {
    return (
        <div className="space-y-8">
            {posts.map((post) => (
                <article key={post.slug} className="group">
                    <div className="flex flex-col gap-2">
                        {/* Date */}
                        <time className="text-sm text-muted font-mono">
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </time>

                        {/* Title */}
                        <Link href={`/blog/${post.slug}`}>
                            <h3 className="text-xl font-mono font-semibold text-subtle-text group-hover:text-accent-teal transition-colors">
                                {post.title}
                            </h3>
                        </Link>

                        {/* Summary */}
                        <p className="text-muted leading-relaxed">
                            {post.summary}
                        </p>

                        {/* Tags */}
                        {showTags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {post.tags.map((tag) => (
                                    <TagPill
                                        key={tag}
                                        tag={tag}
                                        href={`/blog/tags/${tagToSlug(tag)}`}
                                        variant="small"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </article>
            ))}

            {posts.length === 0 && (
                <p className="text-muted text-center py-8">No posts found.</p>
            )}
        </div>
    );
}
