import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPostSlugs, getPostBySlug, getPostsBySection, getSubsections, getBreadcrumbs } from '@/lib/posts';
import { tagToSlug } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import TagPill from '@/components/TagPill';
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

interface BlogPostPageProps {
    params: {
        slug: string[];
    };
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
    const slugString = params.slug.join('/');

    try {
        const post = getPostBySlug(slugString);
        return {
            title: post.title,
            description: post.summary,
        };
    } catch {
        // It's a section, not a post
        const sectionName = params.slug[params.slug.length - 1];
        return {
            title: `${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} Posts`,
            description: `Blog posts in the ${slugString} section.`,
        };
    }
}

/**
 * Blog page that handles both individual posts and section listings
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const slugString = params.slug.join('/');

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

        return (
            <article className="max-w-3xl mx-auto px-6 py-16">
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
                <ShareOptions title={post.title} url={`/blog/${slugString}`} />
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
            <div className="max-w-5xl mx-auto px-6 py-16">
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
                    <h1 className="text-4xl font-mono font-bold text-subtle-text mb-4 capitalize">
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
