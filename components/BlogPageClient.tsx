'use client';

import { useState } from 'react';
import PostList from '@/components/PostList';
import BrowseSectionClient from '@/components/BrowseSectionClient';
import { Post } from '@/components/PostList';
import { SectionNode } from '@/lib/sections';

interface BlogPageClientProps {
    posts: Post[];
    hierarchy: SectionNode;
    showSidebarOnly?: boolean;
}

export default function BlogPageClient({ posts, hierarchy, showSidebarOnly = false }: BlogPageClientProps) {
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
    const [activeFilter, setActiveFilter] = useState<string>('');
    const [resetTrigger, setResetTrigger] = useState(0);

    const handleFilterChange = (filtered: Post[], sectionPath: string) => {
        setFilteredPosts(filtered);
        setActiveFilter(sectionPath);
    };

    const clearFilter = () => {
        setFilteredPosts(posts);
        setActiveFilter('');
        setResetTrigger(prev => prev + 1);
    };

    // Render only Browse Section for sidebar
    if (showSidebarOnly) {
        return (
            <BrowseSectionClient
                hierarchy={hierarchy}
                allPosts={posts}
                onFilterChange={handleFilterChange}
                resetTrigger={resetTrigger}
            />
        );
    }

    // Render filter indicator and post list for main content
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
                        onClick={clearFilter}
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
