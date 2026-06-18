import Link from 'next/link';

interface Crumb {
    name: string;
    path: string;
}

interface BreadcrumbNavProps {
    crumbs: Crumb[];
    textSize?: 'sm' | 'base';
}

export default function BreadcrumbNav({ crumbs, textSize = 'base' }: BreadcrumbNavProps) {
    return (
        <div className="mb-6">
            <div className={`font-mono flex items-center gap-2 text-${textSize} text-muted`}>
                <Link
                    href="/blog"
                    className="hover:text-accent-teal transition-colors"
                >
                    Blog
                </Link>
                {crumbs.map((crumb, index) => (
                    <div key={crumb.path} className="flex items-center gap-2">
                        <span>/</span>
                        {index === crumbs.length - 1 ? (
                            <span className="text-accent-teal capitalize">{crumb.name}</span>
                        ) : (
                            <Link
                                href={`/blog/${crumb.path}`}
                                className="hover:text-accent-teal transition-colors capitalize"
                            >
                                {crumb.name}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
