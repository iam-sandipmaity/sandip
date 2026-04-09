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

export default function PostList({ posts, showTags = true }: PostListProps) {
    return (
        <div className="space-y-8">
            {posts.map((post) => (
                <article key={post.slug} className="group">
                    <div className="flex flex-col gap-1">
                        <time className="text-xs text-muted font-mono">
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </time>

                        <Link href={`/blog/${post.slug}`}>
                            <h3 className="text-lg font-mono font-semibold text-subtle-text group-hover:text-accent-teal transition-colors relative inline-block after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:border-b after:border-dotted after:border-accent-teal after:opacity-0 group-hover:after:opacity-100">
                                {post.title}
                            </h3>
                        </Link>

                        <p className="font-mono text-muted text-base leading-relaxed">
                            {post.summary}
                        </p>

                        {showTags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-1">
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
                    <div className="mt-6 border-b border-surface/30 group-last:border-transparent" />
                </article>
            ))}

            {posts.length === 0 && (
                <p className="font-mono text-muted text-center py-8">No posts found.</p>
            )}
        </div>
    );
}