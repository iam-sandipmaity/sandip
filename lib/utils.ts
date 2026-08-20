/**
 * Convert tag to URL-friendly slug (replaces spaces with hyphens)
 */
export function tagToSlug(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Convert URL slug back to display tag name
 */
export function slugToTag(slug: string, existingTags: string[] = []): string {
    const normalized = slug.toLowerCase();
    const exactMatch = existingTags.find((t) => tagToSlug(t) === normalized);
    if (exactMatch) {
        return exactMatch;
    }
    return slug.replace(/-/g, ' ');
}

export interface OgImageParams {
    title: string;
    description?: string;
    date?: string;
    tags?: string[];
    readingTime?: number;
    type?: 'blog' | 'project' | 'page' | 'tag' | 'home';
}

/**
 * Construct Open Graph image URL with custom parameters
 */
export function getOgImageUrl(params: OgImageParams): string {
    const searchParams = new URLSearchParams();
    searchParams.set('title', params.title);
    if (params.description) {
        // Keep descriptions reasonably short for the OG layout
        const cleanedDesc = params.description.length > 150 
            ? `${params.description.slice(0, 147)}...` 
            : params.description;
        searchParams.set('description', cleanedDesc);
    }
    if (params.date) searchParams.set('date', params.date);
    if (params.tags && params.tags.length > 0) searchParams.set('tags', params.tags.slice(0, 4).join(','));
    if (params.readingTime) searchParams.set('readingTime', `${params.readingTime} min read`);
    if (params.type) searchParams.set('type', params.type);
    
    return `/og?${searchParams.toString()}`;
}

