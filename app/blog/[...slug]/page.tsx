import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPostSlugs, getPostBySlug, getPostsBySection, getSubsections, getBreadcrumbs, getReadingTimeMinutes, getRelatedPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/config';
import BlogPostTags from '@/components/BlogPostTags';
import { compileMDX } from 'next-mdx-remote/rsc';
import PostList from '@/components/PostList';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import MDXImage from '@/components/MDXImage';
import ShareOptions from '@/components/ShareOptions';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import { formatPostDate, toIsoDateString } from '@/lib/date';
import { getOgImageUrl } from '@/lib/utils';

interface BlogPostPageProps {
    params: Promise<{
        slug: string[];
    }>;
}

/**
 * Generate static params for all blog posts AND sections
 */
export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    const allPaths = slugs.map((slug) => ({
        slug: slug.split('/')
    }));

    // Also generate params for sections
    const allSectionPaths: string[] = [];
    const getAllPaths = (parentPath: string = '') => {
        const subsections = getSubsections(parentPath);
        subsections.forEach((subsection) => {
            const fullPath = parentPath ? `${parentPath}/${subsection}` : subsection;
            allSectionPaths.push(fullPath);
            getAllPaths(fullPath);
        });
    };
    getAllPaths();

    const sectionParams = allSectionPaths.map((sectionPath) => ({
        slug: sectionPath.split('/')
    }));

    return [...allPaths, ...sectionParams];
}

/**
 * Generate metadata for blog post or section
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const slugString = slug.join('/');
    const url = `${siteConfig.url}/blog/${slugString}`;

    try {
        const post = getPostBySlug(slugString);
        const readingTime = getReadingTimeMinutes(post.content);
        const ogImage = getOgImageUrl({
            title: post.title,
            description: post.summary,
            date: post.date,
            tags: post.tags,
            readingTime: readingTime,
            type: 'blog',
        });
        return {
            title: post.title,
            description: post.summary,
            alternates: {
                canonical: url,
            },
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
        // It's a section, not a post
        const sectionName = slug[slug.length - 1];
        const sectionTitle = `${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} Posts`;
        const sectionDesc = `Blog posts in the ${slugString} section.`;
        const ogImage = getOgImageUrl({
            title: sectionTitle,
            description: sectionDesc,
            type: 'blog',
        });
        return {
            title: sectionTitle,
            description: sectionDesc,
            alternates: {
                canonical: url,
            },
            openGraph: {
                title: sectionTitle,
                description: sectionDesc,
                url: url,
                siteName: siteConfig.name,
                type: 'website',
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: sectionTitle,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: sectionTitle,
                description: sectionDesc,
                creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
                images: [ogImage],
            },
        };
    }
}

/**
 * Blog page that handles both individual posts and section listings
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const slugString = slug.join('/');

    // Try to load as a post first
    try {
        const post = getPostBySlug(slugString);

        // Compile MDX content with custom components
        const { content: MDXContent } = await compileMDX({
            source: post.content,
            options: {
                parseFrontmatter: false,
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

        // Get breadcrumbs for the post
        const breadcrumbs = getBreadcrumbs(slugString);
        const readingTime = getReadingTimeMinutes(post.content);
        const postUrl = `${siteConfig.url}/blog/${slugString}`;
        const ogImage = getOgImageUrl({
            title: post.title,
            description: post.summary,
            date: post.date,
            tags: post.tags,
            readingTime: readingTime,
            type: 'blog',
        });

        return (
            <article className="max-w-3xl mx-auto px-6 py-16">
                <ReadingProgressBar />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                '@context': 'https://schema.org',
                                '@type': 'BlogPosting',
                                headline: post.title,
                                description: post.summary,
                                datePublished: toIsoDateString(post.date),
                                author: {
                                    '@type': 'Person',
                                    name: siteConfig.author,
                                    url: siteConfig.url,
                                },
                                publisher: {
                                    '@type': 'Person',
                                    name: siteConfig.author,
                                    url: siteConfig.url,
                                },
                                mainEntityOfPage: {
                                    '@type': 'WebPage',
                                    '@id': postUrl,
                                },
                                image: ogImage,
                                keywords: post.tags.join(', '),
                            },
                            {
                                '@context': 'https://schema.org',
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
                                    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
                                    ...breadcrumbs.map((crumb, idx) => ({
                                        '@type': 'ListItem',
                                        position: idx + 3,
                                        name: crumb.name,
                                        item: `${siteConfig.url}/blog/${crumb.path}`,
                                    })),
                                ],
                            },
                        ]),
                    }}
                />
                {/* Breadcrumb Navigation */}
                <div className="mb-6">
                    <div className="font-mono flex items-center gap-2 text-base text-muted">
                        <Link
                            href="/blog"
                            className="hover:text-accent-teal transition-colors"
                        >
                            Blog
                        </Link>
                        {breadcrumbs.map((crumb, index) => (
                            <div key={crumb.path} className="flex items-center gap-2">
                                <span>/</span>
                                {index === breadcrumbs.length - 1 ? (
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
                <ShareOptions title={post.title} url={`/blog/${slugString}`} />

                {/* Related Articles */}
                {(() => {
                    const relatedPosts = getRelatedPosts(slugString, 3);
                    if (relatedPosts.length === 0) return null;

                    return (
                        <section className="mt-16 border-t border-dotted border-surface/70 pt-10 font-mono">
                            <h2 className="mb-6 text-xl font-semibold text-subtle-text">
                                Related Articles
                            </h2>
                            <PostList posts={relatedPosts} variant="compact" />
                        </section>
                    );
                })()}
            </article>
        );
    } catch {
        // It's a section, not a post - render section view
        const posts = getPostsBySection(slugString);
        const subsections = getSubsections(slugString);
        const breadcrumbs = getBreadcrumbs(slugString);

        if (posts.length === 0 && subsections.length === 0) {
            notFound();
        }

        return (
            <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
                {/* Breadcrumb Navigation */}
                <div className="mb-6">
                    <div className="font-mono flex items-center gap-2 text-sm text-muted">
                        <Link
                            href="/blog"
                            className="hover:text-accent-teal transition-colors"
                        >
                            Blog
                        </Link>
                        {breadcrumbs.map((crumb, index) => (
                            <div key={crumb.path} className="flex items-center gap-2">
                                <span>/</span>
                                {index === breadcrumbs.length - 1 ? (
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

                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-mono font-semibold text-subtle-text mb-4 capitalize">
                        {breadcrumbs[breadcrumbs.length - 1].name}
                    </h1>
                    <p className="font-mono text-xl text-muted leading-relaxed">
                        Posts in the {slugString} section
                    </p>
                </div>

                {/* Subsections Navigation (if any) */}
                {subsections.length > 0 && (
                    <div className="mb-8">
                        <h2 className="font-mono text-sm text-muted mb-3">
                            Subsections in {breadcrumbs[breadcrumbs.length - 1].name}
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {subsections.map((subsection) => (
                                <Link
                                    key={subsection}
                                    href={`/blog/${slugString}/${subsection}`}
                                    className="font-mono text-sm text-muted hover:text-accent-teal transition-colors capitalize"
                                >
                                    {subsection}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Posts List */}
                {posts.length > 0 ? (
                    <PostList posts={posts} />
                ) : (
                    <div className="text-center py-16">
                        <p className="font-mono text-muted">
                            No posts directly in this section. Check the subsections above.
                        </p>
                    </div>
                )}
            </div>
        );
    }
}
