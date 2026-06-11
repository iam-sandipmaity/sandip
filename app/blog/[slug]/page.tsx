import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPostSlugs, getPostBySlug, getReadingTimeMinutes } from '@/lib/posts';
import { siteConfig } from '@/lib/config';
import BlogPostTags from '@/components/BlogPostTags';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import CodeBlock from '@/components/CodeBlock';
import MDXImage from '@/components/MDXImage';
import ShareOptions from '@/components/ShareOptions';
import { formatPostDate, toIsoDateString } from '@/lib/date';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

/**
 * Generate static params for all blog posts
 */
export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for blog post
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const post = getPostBySlug(slug);
        const ogImage = `/og?title=${encodeURIComponent(post.title)}`;
        const url = `${siteConfig.url}/blog/${slug}`;

        return {
            title: post.title,
            description: post.summary,
            openGraph: {
                title: post.title,
                description: post.summary,
                url: url,
                siteName: siteConfig.name,
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ],
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
                creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
                images: [ogImage],
            },
        };
    } catch {
        return {
            title: 'Post Not Found',
        };
    }
}

/**
 * Individual blog post page with MDX rendering
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    let post;

    try {
        post = getPostBySlug(slug);
    } catch (error) {
        notFound();
    }

    const readingTime = getReadingTimeMinutes(post.content);

    // Compile MDX content with custom components and plugins
    const { content: MDXContent } = await compileMDX({
        source: post.content,
        options: {
            parseFrontmatter: false, // We already parsed it
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeHighlight, rehypeKatex],
            },
        },
        components: {
            pre: CodeBlock,
            img: MDXImage,
            Image: MDXImage,
        },
    });

    return (
        <article className="max-w-3xl mx-auto px-6 py-16">
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
                        {
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                {
                                    '@type': 'ListItem',
                                    position: 1,
                                    name: 'Home',
                                    item: siteConfig.url,
                                },
                                {
                                    '@type': 'ListItem',
                                    position: 2,
                                    name: 'Blog',
                                    item: `${siteConfig.url}/blog`,
                                },
                                {
                                    '@type': 'ListItem',
                                    position: 3,
                                    name: post.title,
                                    item: `${siteConfig.url}/blog/${slug}`,
                                },
                            ],
                        }
                    ]),
                }}
            />
            {/* Post Header */}
            <header className="mb-16">
                <h1 className="mb-3 font-mono text-3xl font-semibold leading-tight text-subtle-text md:text-4xl">
                    {post.title}
                </h1>

                <div className="font-mono text-base font-medium leading-6 text-subtle-text">
                    <time suppressHydrationWarning>
                        {formatPostDate(post.date, 'long')}
                    </time>
                    <span aria-hidden="true"> / </span>
                    <span>{readingTime} min read</span>
                </div>

                <BlogPostTags tags={post.tags} />
            </header>

            {/* MDX Content */}
            <div className="prose prose-invert font-mono max-w-none">
                {MDXContent}
            </div>

            {/* Share Options */}
            <ShareOptions title={post.title} url={`/blog/${slug}`} />
        </article>
    );
}
