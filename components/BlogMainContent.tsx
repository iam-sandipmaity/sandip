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
                <div className="mb-6 flex items-center gap-3">
                    <p className="font-mono text-sm text-muted">
                        Filtering: <span className="text-accent-teal font-mono font-medium capitalize">
                            {activeFilter.replace(/\//g, ' / ')}
                        </span>
                    </p>
                    <button
                        onClick={() => clearFilter(allPosts)}
                        className="text-accent-teal hover:text-accent-teal/70 text-sm font-medium transition-colors underline"
                        aria-label="Clear filter"
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Post List */}
            <PostList posts={filteredPosts} />
        </>
    );
}
