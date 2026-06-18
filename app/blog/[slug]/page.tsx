import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPostSlugs, getPostBySlug, getReadingTimeMinutes } from '@/lib/posts';
import { siteConfig } from '@/lib/config';
import { getTwitterHandle, makeOgImage } from '@/lib/metadata';
import { compileBlogMDX } from '@/lib/mdx';
import { toIsoDateString } from '@/lib/date';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import BlogPostArticle from '@/components/BlogPostArticle';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const post = getPostBySlug(slug);
        const ogImage = makeOgImage(post.title);
        const url = `${siteConfig.url}/blog/${slug}`;

        return {
            title: post.title,
            description: post.summary,
            openGraph: {
                title: post.title,
                description: post.summary,
                url,
                siteName: siteConfig.name,
                images: [ogImage],
                locale: 'en_US',
                type: 'article',
                publishedTime: toIsoDateString(post.date),
                authors: [siteConfig.author],
                tags: post.tags,
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.summary,
                creator: getTwitterHandle(),
                images: [ogImage.url],
            },
        };
    } catch {
        return {
            title: 'Post Not Found',
        };
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    let post;

    try {
        post = getPostBySlug(slug);
    } catch {
        notFound();
    }

    const readingTime = getReadingTimeMinutes(post.content);
    const { content: MDXContent } = await compileBlogMDX(post.content);

    return (
        <BlogPostArticle
            title={post.title}
            date={post.date}
            readingTime={readingTime}
            tags={post.tags}
            slug={slug}
            breadcrumb={
                <>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify([
                                {
                                    '@context': 'https://schema.org',
                                    '@type': 'BlogPosting',
                                    headline: post.title,
                                    datePublished: toIsoDateString(post.date),
                                    dateModified: toIsoDateString(post.date),
                                    description: post.summary,
                                    image: [`${siteConfig.url}/og?title=${encodeURIComponent(post.title)}`],
                                    url: `${siteConfig.url}/blog/${slug}`,
                                    author: {
                                        '@type': 'Person',
                                        name: siteConfig.author,
                                    },
                                },
                            ]),
                        }}
                    />
                    <BreadcrumbJsonLd items={[
                        { name: 'Blog', path: '/blog' },
                        { name: post.title, path: `/blog/${slug}` },
                    ]} />
                </>
            }
        >
            {MDXContent}
        </BlogPostArticle>
    );
}
