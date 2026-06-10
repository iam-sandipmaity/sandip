import type { Metadata } from 'next';
import { getAllPosts, getAllTagsWithCounts } from '@/lib/posts';
import { getFolderHierarchy } from '@/lib/sections';
import { BlogFilterProvider } from '@/components/BlogFilterContext';
import BlogSidebar from '@/components/BlogSidebar';
import BlogMainContent from '@/components/BlogMainContent';
import TagList from '@/components/TagList';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Thoughts on embedded systems, electronics, circuit design, and technology.',
    alternates: { canonical: `${siteConfig.url}/blog` },
    openGraph: {
        title: 'Blog - Sandip Maity',
        description: 'Thoughts on embedded systems, electronics, and technology.',
        url: `${siteConfig.url}/blog`,
        siteName: siteConfig.name,
        images: [{ url: '/og?title=Blog', width: 1200, height: 630, alt: 'Sandip Maity Blog' }],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog - Sandip Maity',
        description: 'Thoughts on embedded systems and technology.',
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: ['/og?title=Blog'],
    },
};

export default function BlogPage() {
    const posts = getAllPosts();
    const tagsWithCounts = getAllTagsWithCounts();
    const hierarchy = getFolderHierarchy();

    return (
        <BlogFilterProvider allPosts={posts}>
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 gap-12 min-[700px]:grid-cols-[1fr_18rem]">
                    <aside className="min-[700px]:order-2">
                        <div className="space-y-12 min-[700px]:sticky min-[700px]:top-12">
                            <BlogSidebar hierarchy={hierarchy} allPosts={posts} />

                            <div>
                                <h2 className="mb-6 flex items-center gap-1.5 font-mono text-2xl font-semibold leading-none text-subtle-text">
                                    <svg
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
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
                                    Tags
                                </h2>
                                <TagList tags={tagsWithCounts} maxVisible={6} />
                            </div>
                        </div>
                    </aside>

                    <section className="min-[700px]:order-1">
                        <h1 className="mb-7 font-mono text-2xl font-semibold text-subtle-text">
                            Posts
                        </h1>

                        <BlogMainContent allPosts={posts} />
                    </section>
                </div>
            </div>
        </BlogFilterProvider>
    );
}
