import Link from 'next/link';
import { tagToSlug } from '@/lib/utils';

interface BlogPostTagsProps {
    tags: string[];
}

export default function BlogPostTags({ tags }: BlogPostTagsProps) {
    if (tags.length === 0) {
        return null;
    }

    return (
        <div className="mt-5 flex items-start gap-2 font-mono text-base leading-6 text-subtle-text">
            <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0 translate-y-[2px]"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7.859 6h-2.834a2.025 2.025 0 0 0 -2.025 2.025v2.834c0 .537 .213 1.052 .593 1.432l6.116 6.116a2.025 2.025 0 0 0 2.864 0l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-6.117 -6.116a2.025 2.025 0 0 0 -1.431 -.593z" />
                <path d="M17.573 18.407l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-7.117 -7.116" />
                <path d="M6 9h-.01" />
            </svg>

            <div className="flex flex-wrap gap-x-1.5 gap-y-1">
                {tags.map((tag, index) => (
                    <span key={tag}>
                        <Link
                            href={`/tags/${tagToSlug(tag)}`}
                            className="underline decoration-current decoration-1 underline-offset-2 transition-colors hover:text-[#cf2644]"
                        >
                            #{tag}
                        </Link>
                        {index < tags.length - 1 ? ',' : ''}
                    </span>
                ))}
            </div>
        </div>
    );
}
