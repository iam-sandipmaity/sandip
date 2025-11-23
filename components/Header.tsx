'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/reads', label: 'Reads' },
    { href: '/contact', label: 'Contact' },
];

/**
 * Header component with logo, navigation, search, and theme toggle
 * Responsive with mobile menu
 */
export default function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-near-black/95 backdrop-blur-sm border-b border-surface">
            <div className="max-w-5xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Name */}
                    <Link href="/" className="flex items-center gap-3 group">
                        {/* Elegant 'S' monogram logo */}
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-transform duration-200 group-hover:scale-105"
                        >
                            {/* Elegant 'S' monogram with modern curves */}
                            <path
                                d="M16 4C10.477 4 6 8.477 6 14c0 2.5 1 4.5 2.5 6 1.5 1.5 3.5 2.5 6 2.5 2.5 0 4.5-1 6-2.5S23 16.5 23 14M16 28c5.523 0 10-4.477 10-10 0-2.5-1-4.5-2.5-6-1.5-1.5-3.5-2.5-6-2.5-2.5 0-4.5 1-6 2.5S9 15.5 9 18"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                className="text-accent-teal"
                            />
                        </svg>

                        <span className="font-mono text-lg font-semibold text-subtle-text">
                            Sandip.
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                    px-3 py-2 text-sm font-medium transition-colors relative
                    ${isActive
                                            ? 'text-accent-teal'
                                            : 'text-subtle-text hover:text-accent-teal'
                                        }
                  `}
                                >
                                    {link.label}
                                    {/* Dotted underline for active link (lrns.me style) */}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 border-b-2 border-dotted border-accent-teal" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right side: Search and Theme Toggle (Desktop) */}
                    <div className="hidden md:flex items-center gap-2">
                        <SearchModal />
                        <ThemeToggle />
                    </div>

                    {/* Mobile: Search, Theme Toggle, and Menu Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <SearchModal />
                        <ThemeToggle />
                        <button
                            className="p-2 rounded-lg bg-surface hover:bg-mid-dark transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <FiX className="w-6 h-6 text-subtle-text" />
                            ) : (
                                <FiMenu className="w-6 h-6 text-subtle-text" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden mt-4 pt-4 border-t border-surface">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`
                      px-3 py-2 text-sm font-medium transition-colors rounded-lg
                      ${isActive
                                                ? 'text-accent-teal bg-surface'
                                                : 'text-subtle-text hover:text-accent-teal hover:bg-surface'
                                            }
                    `}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
