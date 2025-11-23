'use client';

import PostList from '@/components/PostList';
import { Post } from '@/components/PostList';
import { useBlogFilter } from './BlogFilterContext';

interface BlogMainContentProps {
    allPosts: Post[];
}

export default function BlogMainContent({ allPosts }: BlogMainContentProps) {
    const { filteredPosts, activeFilter, clearFilter } = useBlogFilter();

    return (
        <>
            {/* Active Filter Indicator */}
            {activeFilter && (
                <div className="mb-6 flex items-center gap-3 p-4 bg-accent-teal/10 border border-accent-teal/30 rounded-lg">
                    <div className="flex-1">
                        <p className="text-sm text-muted">Filtered by section:</p>
                        <p className="text-accent-teal font-mono font-medium capitalize">
                            {activeFilter.replace(/\//g, ' / ')}
                        </p>
                    </div>
                    <button
                        onClick={() => clearFilter(allPosts)}
                        className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-accent-teal/20 border border-accent-teal/30 text-accent-teal rounded-lg text-sm font-medium transition-colors"
                        aria-label="Clear filter"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear Filter
                    </button>
                </div>
            )}

            {/* Post List */}
            <PostList posts={filteredPosts} />
        </>
    );
}
