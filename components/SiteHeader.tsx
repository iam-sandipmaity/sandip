'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchModal from './SearchModal';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
];

export default function SiteHeader() {
    const pathname = usePathname() || '/';

    return (
        <header className="pt-10 md:pt-16">
            <div className="mx-auto flex max-w-3xl items-start justify-between gap-6 px-6">
                <div className="flex min-w-0 items-start gap-4">
                    <Link
                        href="/"
                        className="mt-1 h-12 w-12 shrink-0"
                        aria-label="Sandip Maity home"
                    >
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="h-12 w-12"
                        >
                            <path
                                d="M16 4C10.477 4 6 8.477 6 14c0 2.5 1 4.5 2.5 6 1.5 1.5 3.5 2.5 6 2.5 2.5 0 4.5-1 6-2.5S23 16.5 23 14M16 28c5.523 0 10-4.477 10-10 0-2.5-1-4.5-2.5-6-1.5-1.5-3.5-2.5-6-2.5-2.5 0-4.5 1-6 2.5S9 15.5 9 18"
                                stroke="#5eead4"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </Link>

                    <div>
                        <Link href="/" className="font-mono text-2xl font-bold tracking-normal text-subtle-text hover:text-subtle-text">
                            Sandip Maity
                        </Link>

                        <nav className="mt-1 flex flex-wrap items-center font-mono text-sm">
                            {navLinks.map((link, index) => {
                                const isActive = pathname === link.href ||
                                    (link.href !== '/' && pathname.startsWith(link.href));

                                return (
                                    <span key={link.href} className="flex items-center">
                                        {index > 0 && (
                                            <span className="mx-3 h-5 border-l border-dotted border-accent-teal/70" aria-hidden="true" />
                                        )}
                                        <Link
                                            href={link.href}
                                            className={isActive
                                                ? 'text-accent-teal'
                                                : 'text-muted hover:text-accent-teal'
                                            }
                                        >
                                            {link.label}
                                        </Link>
                                    </span>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-4 pt-2 text-muted">
                    <SearchModal />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
