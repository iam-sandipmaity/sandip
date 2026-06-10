import Link from 'next/link';

interface TagPillProps {
    tag: string;
    href?: string;
    variant?: 'default' | 'small';
}

/**
 * Tag pill component with red accent
 * Can be used as a link or static display
 */
export default function TagPill({ tag, href, variant = 'default' }: TagPillProps) {
    const baseClasses = `
    font-mono inline-flex items-center rounded-md bg-[#cf2644] font-medium text-white
    no-underline transition-colors hover:bg-[#b91f39] hover:text-white
    ${variant === 'small' ? 'px-2 py-0.5 text-xs leading-5' : 'px-2.5 py-1 text-base leading-6'}
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
