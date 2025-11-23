import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { getAllProjects } from '@/lib/projects';

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
    { type: 'page', title: 'Reads', description: 'My reading list and recommendations', url: '/reads' },
    { type: 'page', title: 'Contact', description: 'Get in touch with me', url: '/contact' },
];

/**
 * Calculate similarity between two strings using Levenshtein distance
 */
function calculateSimilarity(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix: number[][] = [];

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
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
        .filter(word => word.length > 0);
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
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    try {
        const results = searchContent(query);
        return NextResponse.json({ results });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ results: [] }, { status: 500 });
    }
}
