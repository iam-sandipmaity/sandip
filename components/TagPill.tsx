import Link from 'next/link';

interface TagPillProps {
    tag: string;
    href?: string;
    variant?: 'default' | 'small';
}

/**
 * Tag pill component with teal accent
 * Can be used as a link or static display
 */
export default function TagPill({ tag, href, variant = 'default' }: TagPillProps) {
    const baseClasses = `
    inline-block rounded-full bg-surface border border-accent-teal/30 
    text-accent-teal hover:bg-accent-teal/10 hover:border-accent-teal/50
    transition-all duration-200
    ${variant === 'small' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
  `;

    if (href) {
        return (
            <Link href={href} className={baseClasses}>
                {tag}
            </Link>
        );
    }

    return <span className={baseClasses}>{tag}</span>;
}
