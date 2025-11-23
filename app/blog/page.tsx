import type { Metadata } from 'next';
import { getAllPosts, getAllTagsWithCounts } from '@/lib/posts';
import { getFolderHierarchy } from '@/lib/sections';
import { BlogFilterProvider } from '@/components/BlogFilterContext';
import BlogSidebar from '../../components/BlogSidebar';
import BlogMainContent from '../../components/BlogMainContent';
import TagList from '@/components/TagList';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Thoughts on web development, system design, and technology.',
};

/**
 * Blog index page with all posts and tag cloud
 */
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
                    <p className="text-lg text-muted leading-relaxed">
                        My thinking and my learnings.
                    </p>
                </div>

                <div className="grid grid-cols-1 min-[470px]:grid-cols-3 gap-12">
                    {/* Sidebar - appears first on mobile, right on desktop */}
                    <aside className="min-[470px]:col-span-1 min-[470px]:order-2 order-1">
                        <div className="min-[470px]:sticky top-24 space-y-8">
                            {/* Browse Sections */}
                            <BlogSidebar hierarchy={hierarchy} allPosts={posts} />

                            {/* Tags */}
                            <div>
                                <h2 className="text-xl font-mono font-semibold text-subtle-text mb-4">
                                    Tags
                                </h2>
                                <TagList tags={tagsWithCounts} maxVisible={6} />
                            </div>
                        </div>
                    </aside>

                    {/* Main Content - appears second on mobile, left on desktop */}
                    <div className="min-[470px]:col-span-2 min-[470px]:order-1 order-2">
                        <BlogMainContent allPosts={posts} />
                    </div>
                </div>
            </div>
        </BlogFilterProvider>
    );
}
