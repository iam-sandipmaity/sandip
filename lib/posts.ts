import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/components/PostList';
import { tagToSlug, slugToTag } from './utils';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMetadata {
    title: string;
    date: string;
    summary: string;
    tags: string[];
}

export interface PostData extends PostMetadata {
    slug: string;
    content: string;
}

/**
 * Recursively get all .mdx files from a directory
 */
function getAllMdxFiles(dir: string, baseDir: string = dir): string[] {
    const files: string[] = [];

    if (!fs.existsSync(dir)) {
        return files;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            // Recursively scan subdirectories
            files.push(...getAllMdxFiles(fullPath, baseDir));
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
            // Get relative path from base posts directory
            const relativePath = path.relative(baseDir, fullPath);
            // Convert to slug format (remove .mdx and use forward slashes)
            const slug = relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/');
            files.push(slug);
        }
    }

    return files;
}

/**
 * Get all post slugs (supports nested folders)
 */
export function getAllPostSlugs(): string[] {
    return getAllMdxFiles(postsDirectory);
}

/**
 * Get post data by slug (supports nested paths like 'program/hello-world')
 */
export function getPostBySlug(slug: string): PostData {
    // Convert slug to file path (handle both / and \ separators)
    const filePath = slug.replace(/\//g, path.sep);
    const fullPath = path.join(postsDirectory, `${filePath}.mdx`);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        content,
        title: data.title,
        date: data.date,
        summary: data.summary,
        tags: data.tags || [],
    };
}

/**
 * Get all posts sorted by date (newest first)
 */
export function getAllPosts(): Post[] {
    const slugs = getAllPostSlugs();
    const posts = slugs
        .map((slug) => {
            const { title, date, summary, tags } = getPostBySlug(slug);
            return {
                slug,
                title,
                date,
                summary,
                tags,
            };
        })
        .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    return posts;
}

/**
 * Get recent posts (first N posts)
 */
export function getRecentPosts(count: number = 3): Post[] {
    return getAllPosts().slice(0, count);
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tagSet = new Set<string>();

    posts.forEach((post) => {
        post.tags.forEach((tag) => tagSet.add(tag));
    });

    return Array.from(tagSet).sort();
}

/**
 * Get all tags with their usage counts, sorted by frequency (most used first)
 */
export function getAllTagsWithCounts(): Array<{ tag: string; count: number }> {
    const posts = getAllPosts();
    const tagCounts = new Map<string, number>();

    posts.forEach((post) => {
        post.tags.forEach((tag) => {
            tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
    });

    return Array.from(tagCounts.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count); // Sort by count descending
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): Post[] {
    const allPosts = getAllPosts();
    // Convert slug back to tag for comparison
    const searchTag = slugToTag(tag);
    return allPosts.filter((post) =>
        post.tags.some((t) => t.toLowerCase() === searchTag.toLowerCase())
    );
}

/**
 * Get all unique top-level sections from post slugs
 */
export function getAllSections(): string[] {
    const slugs = getAllPostSlugs();
    const sectionSet = new Set<string>();

    slugs.forEach((slug) => {
        // Extract the first segment of the slug (e.g., "product" from "product/hello-world")
        const firstSegment = slug.split('/')[0];
        if (firstSegment) {
            sectionSet.add(firstSegment);
        }
    });

    return Array.from(sectionSet).sort();
}

/**
 * Get posts by section path (e.g., "product" or "product/reviews")
 * Returns posts that are directly in this section or in any subsection
 */
export function getPostsBySection(sectionPath: string): Post[] {
    const allPosts = getAllPosts();
    return allPosts.filter((post) => post.slug.startsWith(sectionPath + '/'));
}

/**
 * Get immediate subsections of a given section path
 * For example, if sectionPath is "product", it might return ["reviews", "guides"]
 * If sectionPath is empty, returns top-level sections
 */
export function getSubsections(sectionPath: string = ''): string[] {
    const slugs = getAllPostSlugs();
    const subsectionSet = new Set<string>();

    slugs.forEach((slug) => {
        if (sectionPath === '') {
            // Get top-level sections
            const firstSegment = slug.split('/')[0];
            if (firstSegment) {
                subsectionSet.add(firstSegment);
            }
        } else {
            // Get subsections of the given path
            if (slug.startsWith(sectionPath + '/')) {
                const remainder = slug.substring(sectionPath.length + 1);
                const nextSegment = remainder.split('/')[0];
                // Add the immediate next segment (subsection)
                if (nextSegment) {
                    subsectionSet.add(nextSegment);
                }
            }
        }
    });

    return Array.from(subsectionSet).sort();
}

/**
 * Generate breadcrumbs for a section path
 * For example, "product/reviews/best" returns:
 * [{ name: "product", path: "product" }, { name: "reviews", path: "product/reviews" }, { name: "best", path: "product/reviews/best" }]
 */
export function getBreadcrumbs(sectionPath: string): Array<{ name: string; path: string }> {
    const segments = sectionPath.split('/');
    const breadcrumbs: Array<{ name: string; path: string }> = [];

    segments.forEach((segment, index) => {
        const path = segments.slice(0, index + 1).join('/');
        breadcrumbs.push({
            name: segment,
            path: path,
        });
    });

    return breadcrumbs;
}
