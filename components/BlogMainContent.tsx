'use client';

import { useState, useMemo } from 'react';
import PostList from '@/components/PostList';
import { Post } from '@/components/PostList';
import { useBlogFilter } from './BlogFilterContext';

const POSTS_PER_PAGE = 10;

interface BlogMainContentProps {
    allPosts: Post[];
}

export default function BlogMainContent({ allPosts }: BlogMainContentProps) {
    const { filteredPosts, activeFilter, clearFilter } = useBlogFilter();
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(start, start + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* Active Filter Indicator */}
            {activeFilter && (
                <div className="mb-6 flex items-center gap-3">
                    <p className="font-mono text-base text-muted">
                        Filtering: <span className="text-accent-teal font-mono font-medium capitalize">
                            {activeFilter.replace(/\//g, ' / ')}
                        </span>
                    </p>
                    <button
                        onClick={() => { clearFilter(allPosts); setCurrentPage(1); }}
                        className="text-accent-teal hover:text-accent-teal/70 text-base font-medium transition-colors underline"
                        aria-label="Clear filter"
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Post List */}
            <PostList posts={paginatedPosts} />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-12 pt-6 border-t border-dotted border-surface/30">
                    <nav className="flex items-center justify-center gap-2">
                        {/* Previous */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="font-mono px-3 py-2 text-base text-muted hover:text-accent-teal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            ← Prev
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`font-mono w-10 h-10 text-base rounded-lg transition-colors ${
                                    page === currentPage
                                        ? 'bg-accent-teal text-gray-900 font-medium'
                                        : 'text-muted hover:text-accent-teal hover:bg-surface'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="font-mono px-3 py-2 text-base text-muted hover:text-accent-teal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Next →
                        </button>
                    </nav>

                    {/* Page indicator */}
                    <p className="font-mono text-base text-muted text-center mt-4">
                        Page {currentPage} of {totalPages}
                    </p>
                </div>
            )}
        </>
    );
}
