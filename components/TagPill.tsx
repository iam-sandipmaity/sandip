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
    font-mono inline-block text-accent-teal hover:text-accent-hover
    transition-colors text-xs underline decoration-accent-teal/30 underline-offset-2
    ${variant === 'small' ? '' : 'text-sm'}
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
