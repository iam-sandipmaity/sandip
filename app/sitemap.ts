import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/posts';

/**
 * Generate sitemap for SEO
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = 'https://sandipmaity.vercel.app';
    const postSlugs = getAllPostSlugs();

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/projects',
        '/blog',
        '/reads',
        '/contact',
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Blog posts
    const blogPosts = postSlugs.map((slug) => ({
        url: `${siteUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...blogPosts];
}
