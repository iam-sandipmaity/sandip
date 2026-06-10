import Link from 'next/link';

const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/reads', label: 'Reads' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-24 border-t border-dotted border-surface/50 py-8" suppressHydrationWarning>
            <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 font-mono text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                <p className="leading-6">Copyright (c) {currentYear} Sandip Maity</p>

                <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 leading-6 sm:gap-x-0">
                    {footerLinks.map((link, index) => (
                        <span key={link.href} className="flex items-center">
                            {index > 0 && (
                                <span className="mx-3 hidden h-4 border-l border-dotted border-surface sm:block" aria-hidden="true" />
                            )}
                            <Link href={link.href} className="transition-colors hover:text-accent-teal">
                                {link.label}
                            </Link>
                        </span>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
