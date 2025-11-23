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
 * Search modal component with keyboard shortcuts and fuzzy search
 * Opens with Cmd/Ctrl + K or clicking the search button
 */
export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Load recent searches from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            try {
                setRecentSearches(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load recent searches:', e);
            }
        }
    }, []);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open search with Cmd/Ctrl + K
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            // Close with Escape
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

    // Search functionality with API call
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
        }, 150); // Debounce search by 150ms

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
            handleResultClick(results[selectedIndex].url);
        }
    };

    const handleResultClick = (url: string) => {
        // Save to recent searches if there's a query
        if (query.trim()) {
            const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
            setRecentSearches(updated);
            localStorage.setItem('recentSearches', JSON.stringify(updated));
        }

        setIsOpen(false);
        setQuery('');
        router.push(url);
    };

    const handleRecentSearchClick = (search: string) => {
        setQuery(search);
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    const handleClose = () => {
        setIsOpen(false);
        setQuery('');
    };

    // Detect OS for keyboard shortcut display
    const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const shortcutKey = isMac ? '⌘' : 'Ctrl';

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group relative flex items-center gap-2 px-3 py-2 rounded-lg bg-surface hover:bg-accent-teal/10 border border-surface hover:border-accent-teal/30 transition-all duration-200"
                aria-label="Search"
                title={`Search (${shortcutKey}+K)`}
            >
                <FiSearch className="w-4 h-4 text-muted group-hover:text-accent-teal transition-colors" />
                <span className="hidden lg:inline-block text-sm text-muted group-hover:text-accent-teal transition-colors">
                    Search
                </span>
                <kbd className="hidden lg:flex items-center gap-0.5 px-2 py-0.5 text-xs font-mono bg-mid-dark border border-surface rounded group-hover:border-accent-teal/30 text-muted group-hover:text-accent-teal transition-all">
                    <span key="shortcut-key">{shortcutKey}</span>
                    <span key="k-key">K</span>
                </kbd>
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-near-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh] px-4"
                    onClick={handleClose}
                >
                    {/* Search Modal */}
                    <div
                        className="w-full max-w-2xl bg-mid-dark border border-surface rounded-lg shadow-2xl shadow-accent-teal/10 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-surface">
                            <FiSearch className="w-5 h-5 text-muted flex-shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search pages, posts, projects, tags..."
                                className="flex-1 bg-transparent text-subtle-text placeholder:text-muted outline-none text-lg"
                            />
                            <button
                                onClick={handleClose}
                                className="p-1 hover:bg-surface rounded transition-colors"
                                aria-label="Close search"
                            >
                                <FiX className="w-5 h-5 text-muted" />
                            </button>
                        </div>

                        {/* Search Results */}
                        <div className="max-h-[60vh] overflow-y-auto">
                            {query && isLoading && (
                                <div className="px-4 py-8 text-center text-muted">
                                    <div className="inline-block w-6 h-6 border-2 border-accent-teal border-t-transparent rounded-full animate-spin mb-2"></div>
                                    <p>Searching...</p>
                                </div>
                            )}

                            {query && !isLoading && results.length === 0 && (
                                <div className="px-4 py-8 text-center text-muted">
                                    No results found for &quot;{query}&quot;
                                </div>
                            )}

                            {!query && (
                                <div className="px-4 py-8 text-center text-muted text-sm">
                                    <p className="mb-2">Start typing to search...</p>
                                    <p className="text-xs">
                                        Use <kbd className="px-2 py-1 bg-surface rounded text-accent-teal">↑</kbd>{' '}
                                        <kbd className="px-2 py-1 bg-surface rounded text-accent-teal">↓</kbd> to navigate,{' '}
                                        <kbd className="px-2 py-1 bg-surface rounded text-accent-teal">Enter</kbd> to select,{' '}
                                        <kbd className="px-2 py-1 bg-surface rounded text-accent-teal">Esc</kbd> to close
                                    </p>
                                </div>
                            )}

                            {results.length > 0 && (
                                <div className="py-2">
                                    {results.map((result, index) => (
                                        <button
                                            key={result.url}
                                            onClick={() => handleResultClick(result.url)}
                                            className={`w-full px-4 py-3 flex items-start gap-3 transition-colors text-left ${index === selectedIndex
                                                ? 'bg-surface border-l-2 border-accent-teal'
                                                : 'hover:bg-surface/50'
                                                }`}
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span
                                                        className={`text-xs px-2 py-0.5 rounded-full ${result.type === 'post'
                                                            ? 'bg-accent-teal/20 text-accent-teal'
                                                            : result.type === 'project'
                                                                ? 'bg-purple-500/20 text-purple-400'
                                                                : 'bg-surface text-muted'
                                                            }`}
                                                    >
                                                        {result.type}
                                                    </span>
                                                    <h4 className="font-medium text-subtle-text">
                                                        {result.title}
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-muted line-clamp-1">
                                                    {result.description}
                                                </p>
                                                {result.tags && result.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {result.tags.slice(0, 5).map((tag, tagIndex) => (
                                                            <span
                                                                key={tagIndex}
                                                                className="text-xs px-2 py-0.5 rounded bg-accent-teal/10 text-accent-teal/80 border border-accent-teal/20"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {result.tags.length > 5 && (
                                                            <span className="text-xs text-muted">
                                                                +{result.tags.length - 5} more
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
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
