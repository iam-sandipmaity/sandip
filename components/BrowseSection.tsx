'use client';

import { useState } from 'react';
import { SectionNode } from '@/lib/sections';

interface BrowseSectionProps {
    hierarchy: SectionNode;
    selectedSection: string;
    onSectionSelect: (path: string) => void;
}

interface SectionItemProps {
    node: SectionNode;
    selectedSection: string;
    onSectionSelect: (path: string) => void;
    level: number;
}

function SectionItem({ node, selectedSection, onSectionSelect, level }: SectionItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = node.children.length > 0;
    const isSelected = selectedSection === node.path;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const handleSelect = () => {
        onSectionSelect(node.path);
    };

    return (
        <div className="select-none">
            <div
                className={`
                    flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer
                    transition-all duration-200
                    ${isSelected
                        ? 'bg-accent/20 text-accent border-l-2 border-accent'
                        : 'hover:bg-subtle-bg/50 text-subtle-text hover:text-accent'
                    }
                `}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
            >
                {hasChildren && (
                    <button
                        onClick={handleToggle}
                        className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-xs font-mono hover:text-accent transition-colors"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? '−' : '+'}
                    </button>
                )}
                {!hasChildren && <span className="w-4" />}

                <button
                    onClick={handleSelect}
                    className="flex-1 text-left font-mono text-sm flex items-center justify-between gap-2"
                >
                    <span className="truncate">{node.name}</span>
                    <span className="flex-shrink-0 text-xs text-muted">
                        ({node.postCount})
                    </span>
                </button>
            </div>

            {hasChildren && isExpanded && (
                <div className="mt-0.5">
                    {node.children.map((child) => (
                        <SectionItem
                            key={child.path}
                            node={child}
                            selectedSection={selectedSection}
                            onSectionSelect={onSectionSelect}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function BrowseSection({ hierarchy, selectedSection, onSectionSelect }: BrowseSectionProps) {
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-mono font-semibold text-subtle-text mb-4">
                Browse Sections
            </h2>

            <div className="bg-subtle-bg/30 backdrop-blur-sm rounded-lg p-3 border border-subtle-bg">
                {/* All Posts option */}
                <div
                    className={`
                        flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer mb-2
                        transition-all duration-200
                        ${selectedSection === ''
                            ? 'bg-accent/20 text-accent border-l-2 border-accent'
                            : 'hover:bg-subtle-bg/50 text-subtle-text hover:text-accent'
                        }
                    `}
                    onClick={() => onSectionSelect('')}
                >
                    <span className="w-4" />
                    <button className="flex-1 text-left font-mono text-sm flex items-center justify-between gap-2">
                        <span>All Posts</span>
                        <span className="flex-shrink-0 text-xs text-muted">
                            ({hierarchy.postCount})
                        </span>
                    </button>
                </div>

                {/* Section tree */}
                {hierarchy.children.length > 0 ? (
                    <div className="space-y-0.5">
                        {hierarchy.children.map((child) => (
                            <SectionItem
                                key={child.path}
                                node={child}
                                selectedSection={selectedSection}
                                onSectionSelect={onSectionSelect}
                                level={0}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted text-sm px-2 py-4 text-center">
                        No sections yet.
                    </p>
                )}
            </div>
        </div>
    );
}
