import BlogPostTags from './BlogPostTags';
import ShareOptions from './ShareOptions';
import { formatPostDate } from '@/lib/date';
import type { ReactNode } from 'react';

interface BlogPostArticleProps {
    title: string;
    date: string;
    readingTime: number;
    tags: string[];
    slug: string;
    breadcrumb?: ReactNode;
    children: ReactNode;
}

export default function BlogPostArticle({
    title,
    date,
    readingTime,
    tags,
    slug,
    breadcrumb,
    children,
}: BlogPostArticleProps) {
    return (
        <article className="max-w-3xl mx-auto px-6 py-16">
            {breadcrumb}

            <header className="mb-16">
                <h1 className="mb-3 font-mono text-3xl font-semibold leading-tight text-subtle-text md:text-4xl">
                    {title}
                </h1>

                <div className="font-mono text-base font-medium leading-6 text-subtle-text">
                    <time suppressHydrationWarning>
                        {formatPostDate(date, 'long')}
                    </time>
                    <span aria-hidden="true"> / </span>
                    <span>{readingTime} min read</span>
                </div>

                <BlogPostTags tags={tags} />
            </header>

            <div className="prose prose-invert font-mono max-w-none">
                {children}
            </div>

            <ShareOptions title={title} url={`/blog/${slug}`} />
        </article>
    );
}
