'use client';

import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export interface SearchResult {
    type: 'post' | 'project' | 'page';
    title: string;
    description: string;
    url: string;
    tags?: string[];
}

/**
 * Search modal - clean design with blur backdrop
 */
export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Search functionality
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setSelectedIndex(0);
            return;
        }

        const searchTimeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data.results || []);
                setSelectedIndex(0);
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 150);

        return () => clearTimeout(searchTimeout);
    }, [query]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            e.preventDefault();
            setIsOpen(false);
            setQuery('');
            router.push(results[selectedIndex].url);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setQuery('');
    };

    return (
        <>
            {/* Search Button - minimal, text style */}
            <button
                onClick={() => setIsOpen(true)}
                className="font-mono flex items-center gap-2 text-base text-muted hover:text-accent-teal transition-colors"
                aria-label="Search"
                title="Search"
            >
                <FiSearch className="w-5 h-5" />
            </button>

            {/* Modal Overlay with blur */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
                    onClick={handleClose}
                >
                    {/* Blur backdrop */}
                    <div className="absolute inset-0 bg-near-black/60 backdrop-blur-md" />

                    {/* Search Modal with box */}
                    <div
                        className="relative w-full max-w-xl bg-near-black border border-surface rounded-lg shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-surface/50">
                            <FiSearch className="w-5 h-5 text-muted flex-shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search..."
                                className="flex-1 bg-transparent text-subtle-text placeholder:text-muted outline-none"
                            />
                            <button
                                onClick={handleClose}
                                className="text-xs text-muted hover:text-accent-teal transition-colors font-mono"
                                aria-label="Close"
                            >
                                ESC
                            </button>
                        </div>

                        {/* Results */}
                        <div className="max-h-[50vh] overflow-y-auto">
                            {query && isLoading && (
                                <div className="font-mono text-center text-muted text-base py-6">
                                    Searching...
                                </div>
                            )}

                            {query && !isLoading && results.length === 0 && (
                                <div className="font-mono text-center text-muted text-base py-6">
                                    No results for &quot;{query}&quot;
                                </div>
                            )}

                            {!query && (
                                <div className="font-mono text-center text-muted text-base py-6">
                                    <p>Type to search posts, projects, pages...</p>
                                </div>
                            )}

                            {results.length > 0 && (
                                <div className="py-2">
                                    {results.map((result, index) => (
                                        <button
                                            key={result.url}
                                            onClick={() => {
                                                setIsOpen(false);
                                                setQuery('');
                                                router.push(result.url);
                                            }}
                                            className={`
                                                w-full px-4 py-2.5 text-left transition-colors flex items-center gap-3
                                                ${index === selectedIndex
                                                    ? 'bg-surface text-subtle-text'
                                                    : 'text-muted hover:text-subtle-text hover:bg-surface/50'
                                                }
                                            `}
                                        >
                                            <span className="text-base">{result.title}</span>
                                            <span className="text-xs opacity-50 ml-auto capitalize">{result.type}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}