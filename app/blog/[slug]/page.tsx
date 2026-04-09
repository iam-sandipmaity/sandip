import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import { tagToSlug } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import TagPill from '@/components/TagPill';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import CodeBlock from '@/components/CodeBlock';
import MDXImage from '@/components/MDXImage';
import ShareOptions from '@/components/ShareOptions';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
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
    try {
        const post = getPostBySlug(params.slug);
        const ogImage = `/og?title=${encodeURIComponent(post.title)}`;
        const url = `${siteConfig.url}/blog/${params.slug}`;

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
                publishedTime: post.date,
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
    let post;

    try {
        post = getPostBySlug(params.slug);
    } catch (error) {
        notFound();
    }

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
                            datePublished: post.date,
                            dateModified: post.date,
                            description: post.summary,
                            image: [`${siteConfig.url}/og?title=${encodeURIComponent(post.title)}`],
                            url: `${siteConfig.url}/blog/${params.slug}`,
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
                                    item: `${siteConfig.url}/blog/${params.slug}`,
                                },
                            ],
                        }
                    ]),
                }}
            />
            {/* Post Header */}
            <header className="mb-12">
                <time className="text-base text-muted font-mono mb-4 block" suppressHydrationWarning>
                    {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </time>

                <h1 className="text-4xl font-mono font-bold text-subtle-text mb-6">
                    {post.title}
                </h1>

                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <TagPill
                                key={tag}
                                tag={tag}
                                href={`/blog/tags/${tagToSlug(tag)}`}
                            />
                        ))}
                    </div>
                )}
            </header>

            {/* MDX Content */}
            <div className="prose prose-invert font-mono max-w-none">
                {MDXContent}
            </div>

            {/* Share Options */}
            <ShareOptions title={post.title} url={`/blog/${params.slug}`} />
        </article>
    );
}
