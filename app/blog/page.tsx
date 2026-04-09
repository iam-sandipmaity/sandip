import type { Metadata } from 'next';
import { getAllPosts, getAllTagsWithCounts } from '@/lib/posts';
import { getFolderHierarchy } from '@/lib/sections';
import { BlogFilterProvider } from '@/components/BlogFilterContext';
import BlogSidebar from '../../components/BlogSidebar';
import BlogMainContent from '../../components/BlogMainContent';
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
            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl font-mono font-bold text-subtle-text mb-4">
                        Blog
                    </h1>
                    <p className="font-mono text-2xl text-muted leading-relaxed">
                        My thinking and learnings.
                    </p>
                </div>

                <div className="grid grid-cols-1 min-[470px]:grid-cols-3 gap-12">
                    <aside className="min-[470px]:col-span-1 min-[470px]:order-2 order-1">
                        <div className="min-[470px]:sticky top-24 space-y-8">
                            <BlogSidebar hierarchy={hierarchy} allPosts={posts} />
                            <div>
                                <h2 className="text-lg font-mono font-semibold text-subtle-text mb-4">
                                    Tags
                                </h2>
                                <TagList tags={tagsWithCounts} maxVisible={6} />
                            </div>
                        </div>
                    </aside>

                    <div className="min-[470px]:col-span-2 min-[470px]:order-1 order-2">
                        <BlogMainContent allPosts={posts} />
                    </div>
                </div>
            </div>
        </BlogFilterProvider>
    );
}