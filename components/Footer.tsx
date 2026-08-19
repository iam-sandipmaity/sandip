import Link from 'next/link';

const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/reads', label: 'Reads' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/contact', label: 'Contact' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-24 border-t border-dotted border-surface/50 py-10" suppressHydrationWarning>
            <div className="mx-auto max-w-3xl px-6 font-mono text-sm text-muted">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-center">
                    <p className="text-center sm:text-left text-muted">
                        © {currentYear} Sandip Maity
                    </p>

                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-end">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="transition-colors hover:text-accent-teal whitespace-nowrap"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
