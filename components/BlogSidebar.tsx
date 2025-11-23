'use client';

import { useState, useEffect } from 'react';
import BrowseSection from './BrowseSection';
import { SectionNode } from '@/lib/sections';
import { Post } from '@/components/PostList';
import { useBlogFilter } from '@/components/BlogFilterContext';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface BlogSidebarProps {
    hierarchy: SectionNode;
    allPosts: Post[];
}

export default function BlogSidebar({ hierarchy, allPosts }: BlogSidebarProps) {
    const { setFilteredPosts, setActiveFilter, resetTrigger } = useBlogFilter();
    const [selectedSection, setSelectedSection] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    // Reset selection when resetTrigger changes (e.g., clear filter)
    useEffect(() => {
        if (resetTrigger > 0) {
            setSelectedSection('');
        }
    }, [resetTrigger]);

    const handleSectionSelect = (path: string) => {
        setSelectedSection(path);
        if (path === '') {
            // Show all posts
            setFilteredPosts(allPosts);
            setActiveFilter('');
        } else {
            // Filter posts by section path
            const filtered = allPosts.filter((post) => post.slug.startsWith(path + '/'));
            setFilteredPosts(filtered);
            setActiveFilter(path);
        }
    };

    return (
        <div>
            {/* Header with toggle button for mobile */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-mono font-semibold text-subtle-text">
                    Browse Sections
                </h2>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="max-[469px]:flex hidden p-2 hover:bg-surface rounded-lg transition-colors"
                    aria-label={isExpanded ? 'Collapse sections' : 'Expand sections'}
                >
                    {isExpanded ? (
                        <FiMinus className="w-5 h-5 text-accent-teal" />
                    ) : (
                        <FiPlus className="w-5 h-5 text-accent-teal" />
                    )}
                </button>
            </div>

            {/* All Posts button - always visible */}
            <button
                onClick={() => handleSectionSelect('')}
                className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors ${selectedSection === ''
                    ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/30'
                    : 'bg-surface text-subtle-text hover:bg-accent-teal/10 border border-surface'
                    }`}
            >
                All Posts
            </button>

            {/* Section tree - collapsible on mobile */}
            <div className={`min-[470px]:block ${isExpanded ? 'block' : 'hidden max-[469px]:hidden'}`}>
                <BrowseSection
                    hierarchy={hierarchy}
                    selectedSection={selectedSection}
                    onSectionSelect={handleSectionSelect}
                />
            </div>
        </div>
    );
}
