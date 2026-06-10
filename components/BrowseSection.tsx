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

    return (
        <div>
            <div
                className={`
                    font-mono flex items-center gap-2 py-1.5 cursor-pointer
                    transition-colors
                    ${isSelected
                        ? 'text-accent-teal'
                        : 'text-muted hover:text-accent-teal'
                    }
                `}
                style={{ paddingLeft: `${level * 12}px` }}
            >
                {hasChildren ? (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex h-4 w-4 items-center justify-center font-mono text-xs"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? '-' : '+'}
                    </button>
                ) : (
                    <span className="w-4" />
                )}

                <button
                    onClick={() => onSectionSelect(node.path)}
                    className="flex flex-1 items-center justify-between gap-2 text-left font-mono text-base"
                >
                    <span>{node.name}</span>
                    <span className="text-xs text-muted">({node.postCount})</span>
                </button>
            </div>

            {hasChildren && isExpanded && (
                <div>
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
        <div className="space-y-1">
            {hierarchy.children.length > 0 ? (
                hierarchy.children.map((child) => (
                    <SectionItem
                        key={child.path}
                        node={child}
                        selectedSection={selectedSection}
                        onSectionSelect={onSectionSelect}
                        level={0}
                    />
                ))
            ) : (
                <p className="font-mono text-sm text-muted">No sections.</p>
            )}
        </div>
    );
}
