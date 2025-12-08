/**
 * Convert tag to URL-friendly slug (replaces spaces with hyphens)
 */
export function tagToSlug(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Convert URL slug back to tag (replaces hyphens with spaces)
 */
export function slugToTag(slug: string): string {
    return slug.replace(/-/g, ' ');
}
