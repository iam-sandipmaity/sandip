import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPostSlugs, getPostBySlug, getPostsBySection, getSubsections, getBreadcrumbs, getReadingTimeMinutes } from '@/lib/posts';
import PostList from '@/components/PostList';
import Link from 'next/link';
import { compileBlogMDX } from '@/lib/mdx';
import BlogPostArticle from '@/components/BlogPostArticle';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import PageContainer from '@/components/PageContainer';

interface BlogPostPageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    const allPaths = slugs.map((slug) => ({
        slug: slug.split('/')
    }));

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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const slugString = slug.join('/');

    try {
        const post = getPostBySlug(slugString);
        return {
            title: post.title,
            description: post.summary,
        };
    } catch {
        const sectionName = slug[slug.length - 1];
        return {
            title: `${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} Posts`,
            description: `Blog posts in the ${slugString} section.`,
        };
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const slugString = slug.join('/');

    // Try to load as a post first
    try {
        const post = getPostBySlug(slugString);
        const { content: MDXContent } = await compileBlogMDX(post.content);
        const breadcrumbs = getBreadcrumbs(slugString);
        const readingTime = getReadingTimeMinutes(post.content);

        return (
            <BlogPostArticle
                title={post.title}
                date={post.date}
                readingTime={readingTime}
                tags={post.tags}
                slug={slugString}
                breadcrumb={<BreadcrumbNav crumbs={breadcrumbs} />}
            >
                {MDXContent}
            </BlogPostArticle>
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
            <PageContainer>
                <BreadcrumbNav crumbs={breadcrumbs} textSize="sm" />

                <div className="mb-12">
                    <h1 className="text-4xl font-mono font-semibold text-subtle-text mb-4 capitalize">
                        {breadcrumbs[breadcrumbs.length - 1].name}
                    </h1>
                    <p className="font-mono text-xl text-muted leading-relaxed">
                        Posts in the {slugString} section
                    </p>
                </div>

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

                {posts.length > 0 ? (
                    <PostList posts={posts} />
                ) : (
                    <div className="text-center py-16">
                        <p className="font-mono text-muted">
                            No posts directly in this section. Check the subsections above.
                        </p>
                    </div>
                )}
            </PageContainer>
        );
    }
}
