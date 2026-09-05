import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { getAllProjects } from '@/lib/projects';

const MAX_QUERY_LENGTH = 100;
const MAX_COMPARISON_LENGTH = 64;

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 30;
const ipBuckets = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const bucket = ipBuckets.get(ip);
    if (!bucket || bucket.resetAt <= now) {
        ipBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }
    bucket.count += 1;
    return bucket.count > RATE_LIMIT_MAX;
}

// Periodically clear stale buckets to avoid unbounded memory growth
setInterval(() => {
    const now = Date.now();
    for (const [ip, bucket] of ipBuckets) {
        if (bucket.resetAt <= now) {
            ipBuckets.delete(ip);
        }
    }
}, RATE_LIMIT_WINDOW_MS * 2);

export interface SearchResult {
    type: 'post' | 'project' | 'page';
    title: string;
    description: string;
    url: string;
    tags?: string[];
    score?: number;
}

// Static pages
const staticPages: SearchResult[] = [
    { type: 'page', title: 'Home', description: 'Main landing page', url: '/' },
    { type: 'page', title: 'About', description: 'Learn more about me', url: '/about' },
    { type: 'page', title: 'Projects', description: 'View all my projects', url: '/projects' },
    { type: 'page', title: 'Blog', description: 'Read my blog posts', url: '/blog' },
    { type: 'page', title: 'Tags', description: 'Browse blog posts by tag', url: '/tags' },
    { type: 'page', title: 'Reads', description: 'My reading list and recommendations', url: '/reads' },
    { type: 'page', title: 'Contact', description: 'Get in touch with me', url: '/contact' },
];

/**
 * Calculate similarity between two strings using Levenshtein distance
 */
function calculateSimilarity(str1: string, str2: string): number {
    const a = str1.slice(0, MAX_COMPARISON_LENGTH);
    const b = str2.slice(0, MAX_COMPARISON_LENGTH);
    const len1 = a.length;
    const len2 = b.length;
    const matrix: number[][] = [];

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    const distance = matrix[len1][len2];
    const maxLen = Math.max(len1, len2);
    return maxLen === 0 ? 1 : 1 - distance / maxLen;
}

/**
 * Tokenize text into searchable words
 */
function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 0 && word.length <= MAX_COMPARISON_LENGTH);
}

/**
 * Calculate search score for an item
 */
function calculateScore(item: SearchResult, queryWords: string[]): number {
    const titleWords = tokenize(item.title);
    const descWords = tokenize(item.description);
    const tagWords = item.tags ? item.tags.flatMap(tag => tokenize(tag)) : [];

    let score = 0;

    for (const queryWord of queryWords) {
        let bestMatch = 0;

        // Check exact matches in title first (highest score)
        for (const word of titleWords) {
            if (word === queryWord) {
                bestMatch = Math.max(bestMatch, 10);
            } else if (word.includes(queryWord) || queryWord.includes(word)) {
                bestMatch = Math.max(bestMatch, 7);
            } else {
                const similarity = calculateSimilarity(queryWord, word);
                if (similarity > 0.7) {
                    bestMatch = Math.max(bestMatch, similarity * 6);
                }
            }
        }

        // Check description words (medium score)
        for (const word of descWords) {
            if (word === queryWord) {
                bestMatch = Math.max(bestMatch, 5);
            } else if (word.includes(queryWord) || queryWord.includes(word)) {
                bestMatch = Math.max(bestMatch, 3);
            } else {
                const similarity = calculateSimilarity(queryWord, word);
                if (similarity > 0.7) {
                    bestMatch = Math.max(bestMatch, similarity * 3);
                }
            }
        }

        // Check tag words (medium-high score)
        for (const word of tagWords) {
            if (word === queryWord) {
                bestMatch = Math.max(bestMatch, 8);
            } else if (word.includes(queryWord) || queryWord.includes(word)) {
                bestMatch = Math.max(bestMatch, 5);
            } else {
                const similarity = calculateSimilarity(queryWord, word);
                if (similarity > 0.7) {
                    bestMatch = Math.max(bestMatch, similarity * 4);
                }
            }
        }

        score += bestMatch;
    }

    return score;
}

/**
 * Get all searchable content (posts, projects, and pages)
 */
function getAllSearchableContent(): SearchResult[] {
    const posts = getAllPosts();
    const projects = getAllProjects();

    const postResults: SearchResult[] = posts.map((post) => {
        // Extract section path from slug for better display
        const slugParts = post.slug.split('/');
        const sectionPath = slugParts.length > 1 ? slugParts.slice(0, -1).join(' › ') : '';

        return {
            type: 'post',
            title: post.title,
            description: sectionPath ? `${sectionPath} • ${post.summary}` : post.summary,
            url: `/blog/${post.slug}`,
            tags: post.tags,
        };
    });

    const projectResults: SearchResult[] = projects
        .filter((project) => project.link) // Only include projects with valid links
        .map((project) => ({
            type: 'project',
            title: project.title,
            description: project.description,
            url: project.link!,
            tags: project.tags,
        }));

    return [...staticPages, ...postResults, ...projectResults];
}

/**
 * Search through all content with fuzzy matching
 */
function searchContent(query: string): SearchResult[] {
    if (!query.trim()) {
        return [];
    }

    const queryWords = tokenize(query);
    const allContent = getAllSearchableContent();

    // Calculate scores for all items
    const scoredResults = allContent
        .map(item => ({
            ...item,
            score: calculateScore(item, queryWords)
        }))
        .filter(item => item.score && item.score > 0)
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 20); // Limit to top 20 results for performance

    return scoredResults;
}

export async function GET(request: Request) {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429, headers: { 'Retry-After': '60' } }
        );
    }

    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get('q') || '';
    const query = rawQuery.slice(0, MAX_QUERY_LENGTH);

    try {
        const results = searchContent(query);
        return NextResponse.json({ results });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ results: [] }, { status: 500 });
    }
}
