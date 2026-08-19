import { MetadataRoute } from 'next';
import { getAllPostSlugs, getAllTags, getSubsections } from '@/lib/posts';
import { tagToSlug } from '@/lib/utils';

/**
 * Generate sitemap for SEO
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = 'https://sandipmaity.me';
    const postSlugs = getAllPostSlugs();
    const tags = getAllTags();

    // Get all section paths recursively
    const sectionPaths: string[] = [];
    const getPathsRecursive = (parentPath: string = '') => {
        const subsections = getSubsections(parentPath);
        subsections.forEach((subsection) => {
            const fullPath = parentPath ? `${parentPath}/${subsection}` : subsection;
            sectionPaths.push(fullPath);
            getPathsRecursive(fullPath);
        });
    };
    getPathsRecursive();

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/projects',
        '/blog',
        '/timeline',
        '/tags',
        '/reads',
        '/contact',
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Section pages
    const sectionPages = sectionPaths.map((sectionPath) => ({
        url: `${siteUrl}/blog/${sectionPath}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Blog posts
    const blogPosts = postSlugs.map((slug) => ({
        url: `${siteUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const tagPages = tags.map((tag) => ({
        url: `${siteUrl}/tags/${tagToSlug(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    }));

    return [...staticPages, ...sectionPages, ...blogPosts, ...tagPages];
}
