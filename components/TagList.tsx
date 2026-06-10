'use client';

import Link from 'next/link';
import TagPill from './TagPill';
import { tagToSlug } from '@/lib/utils';

export interface TagWithCount {
    tag: string;
    count: number;
}

interface TagListProps {
    tags: TagWithCount[];
    maxVisible?: number;
}

/**
 * Tag list component with expand/collapse functionality
 * Shows most used tags first, with option to show all tags
 */
export default function TagList({ tags, maxVisible = 6 }: TagListProps) {
    if (tags.length === 0) {
        return <p className="font-mono text-muted text-base">No tags yet.</p>;
    }

    const visibleTags = tags.slice(0, maxVisible);
    const hasMore = tags.length > maxVisible;

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2.5">
                {visibleTags.map(({ tag, count }) => (
                    <TagPill
                        key={tag}
                        tag={tag}
                        href={`/tags/${tagToSlug(tag)}`}
                    />
                ))}
            </div>

            {hasMore && (
                <Link
                    href="/tags"
                    className="block w-full pt-1 text-center font-mono text-base font-medium text-subtle-text transition-colors hover:text-[#cf2644]"
                >
                    {'View all ->'}
                </Link>
            )}
        </div>
    );
}
