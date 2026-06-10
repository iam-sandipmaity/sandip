import Link from 'next/link';

const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-24 pb-8" suppressHydrationWarning>
            <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 font-mono text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                <p>Copyright © {currentYear} Sandip Maity</p>

                <nav className="flex flex-wrap items-center">
                    {footerLinks.map((link, index) => (
                        <span key={link.href} className="flex items-center">
                            {index > 0 && (
                                <span className="mx-2 h-4 border-l border-surface" aria-hidden="true" />
                            )}
                            <Link href={link.href} className="hover:text-accent-teal">
                                {link.label}
                            </Link>
                        </span>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
