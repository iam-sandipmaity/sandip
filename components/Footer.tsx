import Link from 'next/link';

const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/reads', label: 'Reads' },
];

/**
 * Footer component with copyright and navigation links
 * Minimal, centered layout
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-surface mt-20">
            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="flex flex-col items-center gap-4">
                    {/* Footer Navigation */}
                    <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-muted hover:text-accent-teal transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Copyright */}
                    <p className="text-sm text-muted text-center">
                        © 2025 - {currentYear} Sandip Maity. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
