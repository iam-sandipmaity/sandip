'use client';

import { useState, useEffect } from 'react';
import BrowseSection from './BrowseSection';
import { SectionNode } from '@/lib/sections';
import { Post } from '@/components/PostList';

interface BrowseSectionClientProps {
    hierarchy: SectionNode;
    allPosts: Post[];
    onFilterChange: (filteredPosts: Post[], sectionPath: string) => void;
    resetTrigger?: number;
}

export default function BrowseSectionClient({ hierarchy, allPosts, onFilterChange, resetTrigger }: BrowseSectionClientProps) {
    const [selectedSection, setSelectedSection] = useState('');

    // Reset selection when resetTrigger changes
    useEffect(() => {
        if (resetTrigger !== undefined) {
            setSelectedSection('');
        }
    }, [resetTrigger]);

    const handleSectionSelect = (path: string) => {
        setSelectedSection(path);

        if (path === '') {
            // Show all posts
            onFilterChange(allPosts, '');
        } else {
            // Filter posts by section path
            const filtered = allPosts.filter((post) => post.slug.startsWith(path + '/'));
            onFilterChange(filtered, path);
        }
    };

    return (
        <BrowseSection
            hierarchy={hierarchy}
            selectedSection={selectedSection}
            onSectionSelect={handleSectionSelect}
        />
    );
}
