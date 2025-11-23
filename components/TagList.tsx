'use client';

import { useState } from 'react';
import TagPill from './TagPill';

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
    const [isExpanded, setIsExpanded] = useState(false);

    if (tags.length === 0) {
        return <p className="text-muted text-sm">No tags yet.</p>;
    }

    const visibleTags = isExpanded ? tags : tags.slice(0, maxVisible);
    const remainingCount = tags.length - maxVisible;
    const hasMore = tags.length > maxVisible;

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                {visibleTags.map(({ tag, count }) => (
                    <TagPill
                        key={tag}
                        tag={tag}
                        href={`/blog/tags/${tag.toLowerCase()}`}
                    />
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm text-accent-teal hover:text-accent-hover transition-colors font-medium"
                >
                    {isExpanded ? 'Hide tags' : `+${remainingCount} tags`}
                </button>
            )}
        </div>
    );
}
