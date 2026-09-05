'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export interface SearchResult {
    type: 'post' | 'project' | 'page';
    title: string;
    description: string;
    url: string;
    tags?: string[];
}

const FILTER_OPTIONS: { key: SearchResult['type']; label: string }[] = [
    { key: 'post', label: 'Posts' },
    { key: 'project', label: 'Projects' },
    { key: 'page', label: 'Pages' },
];

const ALL_TYPES: SearchResult['type'][] = ['post', 'project', 'page'];

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function Highlight({ text, query }: { text: string; query: string }) {
    const tokens = useMemo(
        () => new Set(query.trim().toLowerCase().split(/\s+/).filter(Boolean)),
        [query]
    );

    if (tokens.size === 0) return <>{text}</>;

    const pattern = query.trim().split(/\s+/).filter(Boolean).map(escapeRegExp).join('|');
    const parts = text.split(new RegExp(`(${pattern})`, 'gi'));

    return (
        <>
            {parts.map((part, index) =>
                tokens.has(part.toLowerCase()) ? (
                    <mark key={index} className="bg-transparent text-accent-teal">
                        {part}
                    </mark>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </>
    );
}

export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<Set<SearchResult['type']>>(
        () => new Set(ALL_TYPES)
    );
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
                const typesParam = Array.from(selectedTypes).join(',');
                const response = await fetch(
                    `/api/search?q=${encodeURIComponent(query)}&types=${encodeURIComponent(typesParam)}`
                );
                if (!response.ok) {
                    throw new Error(`Search request failed: ${response.status}`);
                }
                const data = await response.json();
                setResults(Array.isArray(data?.results) ? data.results : []);
                setSelectedIndex(0);
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 150);

        return () => clearTimeout(searchTimeout);
    }, [query, selectedTypes]);

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

    const toggleType = (type: SearchResult['type']) => {
        setSelectedTypes((prev) => {
            const next = new Set(prev);
            if (next.has(type)) {
                next.delete(type);
            } else {
                next.add(type);
            }
            // If everything is turned off, fall back to all types
            return next.size === 0 ? new Set(ALL_TYPES) : next;
        });
    };

    const handleSelect = (result: SearchResult) => {
        setIsOpen(false);
        setQuery('');
        router.push(result.url);
    };

    const isFiltered = selectedTypes.size < ALL_TYPES.length;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-md p-2 text-muted ring-zinc-400 transition-all hover:text-accent-teal hover:ring-2"
                aria-label="Search"
                title="Search"
            >
                <FiSearch className="h-5 w-5" />
            </button>

            {/* Modal Overlay with blur */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]"
                    onClick={handleClose}
                >
                    {/* Blur backdrop */}
                    <div className="absolute inset-0 bg-near-black/70 backdrop-blur-sm" />

                    <div
                        className="relative w-full max-w-2xl rounded-lg border border-surface/70 bg-near-black shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 border-b border-surface/50 px-4 py-3">
                            <FiSearch className="h-5 w-5 flex-shrink-0 text-muted" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search..."
                                className="flex-1 bg-transparent font-mono text-subtle-text outline-none placeholder:text-muted"
                            />
                            <button
                                onClick={handleClose}
                                className="font-mono text-xs text-muted transition-colors hover:text-accent-teal"
                                aria-label="Close"
                            >
                                ESC
                            </button>
                        </div>

                        {/* Type Filters */}
                        <div className="flex flex-wrap items-center gap-2 border-b border-surface/50 px-4 py-2.5">
                            <span className="font-mono text-xs text-muted/60">Include:</span>
                            {FILTER_OPTIONS.map((option) => {
                                const isActive = selectedTypes.has(option.key);
                                return (
                                    <button
                                        key={option.key}
                                        type="button"
                                        onClick={() => toggleType(option.key)}
                                        aria-pressed={isActive}
                                        className={`
                                            flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs transition-colors
                                            ${isActive
                                                ? 'border-accent-teal/50 bg-accent-teal/10 text-accent-teal'
                                                : 'border-surface text-muted/60 hover:text-subtle-text'
                                            }
                                        `}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`
                                                inline-flex h-3 w-3 items-center justify-center rounded-sm border text-[10px] leading-none
                                                ${isActive
                                                    ? 'border-accent-teal bg-accent-teal text-near-black'
                                                    : 'border-surface'
                                                }
                                            `}
                                        >
                                            {isActive ? '✓' : ''}
                                        </span>
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Results */}
                        <div className="max-h-[50vh] overflow-y-auto p-2">
                            {query && isLoading && (
                                <div className="py-8 text-center font-mono text-base text-muted">
                                    Searching...
                                </div>
                            )}

                            {query && !isLoading && results.length === 0 && (
                                <div className="py-8 text-center font-mono text-base text-muted">
                                    No results for &quot;{query}&quot;
                                    {isFiltered && (
                                        <p className="mt-1 text-sm text-muted/60">
                                            Try enabling more result types above
                                        </p>
                                    )}
                                </div>
                            )}

                            {!query && (
                                <div className="py-8 text-center font-mono text-base text-muted">
                                    <p>Type to search posts, projects, pages...</p>
                                </div>
                            )}

                            {results.length > 0 && (
                                <ul>
                                    {results.map((result, index) => (
                                        <li key={result.url}>
                                            <button
                                                onClick={() => handleSelect(result)}
                                                className={`
                                                    w-full rounded-lg px-3 py-3 text-left font-mono transition-colors
                                                    ${index === selectedIndex
                                                        ? 'bg-surface text-subtle-text'
                                                        : 'text-muted hover:bg-surface/50 hover:text-subtle-text'
                                                    }
                                                `}
                                            >
                                                <span className="flex items-baseline gap-2">
                                                    <span className="truncate text-sm font-medium text-subtle-text">
                                                        <Highlight text={result.title} query={query} />
                                                    </span>
                                                    <span className="ml-auto shrink-0 text-xs capitalize text-muted/70">
                                                        {result.type}
                                                    </span>
                                                </span>
                                                {result.description && (
                                                    <span className="mt-1 block line-clamp-2 text-sm">
                                                        <Highlight text={result.description} query={query} />
                                                    </span>
                                                )}
                                                {result.tags && result.tags.length > 0 && (
                                                    <span className="mt-1 block text-xs text-muted/60">
                                                        {result.tags.slice(0, 3).map((tag, tagIndex) => (
                                                            <span key={tag}>
                                                                {tagIndex > 0 && ' · '}
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </span>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        {query && !isLoading && results.length > 0 && (
                            <div className="flex items-center justify-between border-t border-surface/50 px-4 py-2 font-mono text-xs text-muted">
                                <span>
                                    {results.length} {results.length === 1 ? 'result' : 'results'} for &quot;{query}&quot;
                                </span>
                                <span className="text-muted/60">
                                    ↑↓ to navigate · Enter to open
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}