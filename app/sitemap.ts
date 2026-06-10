import { MetadataRoute } from 'next';
import { getAllPostSlugs, getAllTags } from '@/lib/posts';
import { tagToSlug } from '@/lib/utils';

/**
 * Generate sitemap for SEO
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = 'https://sandipmaity.me';
    const postSlugs = getAllPostSlugs();
    const tags = getAllTags();

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/projects',
        '/blog',
        '/tags',
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

    const tagPages = tags.map((tag) => ({
        url: `${siteUrl}/tags/${tagToSlug(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    }));

    return [...staticPages, ...blogPosts, ...tagPages];
}
