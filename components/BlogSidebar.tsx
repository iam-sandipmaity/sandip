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
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (resetTrigger > 0) {
            setSelectedSection('');
        }
    }, [resetTrigger]);

    const handleSectionSelect = (path: string) => {
        setSelectedSection(path);
        if (path === '') {
            setFilteredPosts(allPosts);
            setActiveFilter('');
        } else {
            const filtered = allPosts.filter((post) => post.slug.startsWith(path + '/'));
            setFilteredPosts(filtered);
            setActiveFilter(path);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-mono font-semibold text-subtle-text">
                    Browse
                </h2>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex p-2 rounded transition-colors hover:bg-surface min-[700px]:hidden"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                    {isExpanded ? (
                        <FiMinus className="w-4 h-4 text-accent-teal" />
                    ) : (
                        <FiPlus className="w-4 h-4 text-accent-teal" />
                    )}
                </button>
            </div>

            {/* All Posts - minimal button */}
            <button
                onClick={() => handleSectionSelect('')}
                className={`
                    font-mono w-full text-left px-3 py-2 mb-2 text-base transition-colors border-b border-transparent
                    ${selectedSection === ''
                        ? 'text-accent-teal border-accent-teal'
                        : 'text-muted hover:text-accent-teal'
                    }
                `}
            >
                All Posts <span className="text-xs text-muted">({allPosts.length})</span>
            </button>

            {/* Section tree */}
            <div className={`min-[700px]:block ${isExpanded ? 'block' : 'hidden'}`}>
                <BrowseSection
                    hierarchy={hierarchy}
                    selectedSection={selectedSection}
                    onSectionSelect={handleSectionSelect}
                />
            </div>
        </div>
    );
}
