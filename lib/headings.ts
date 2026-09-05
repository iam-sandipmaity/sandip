import GithubSlugger from 'github-slugger';

export interface Heading {
    level: number;
    text: string;
    id: string;
}

const HEADING_RE = /^(#{1,6})\s+(.+)$/;

function cleanHeadingText(raw: string): string {
    return raw
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[`*_]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Extract markdown headings from post content, generating the same
 * slugs that rehype-slug produces at render time (github-slugger).
 */
export function getPostHeadings(content: string): Heading[] {
    const slugger = new GithubSlugger();
    const headings: Heading[] = [];
    let inFence = false;

    for (const line of content.split('\n')) {
        if (/^(```|~~~)/.test(line)) {
            inFence = !inFence;
            continue;
        }
        if (inFence) continue;

        const match = HEADING_RE.exec(line);
        if (!match) continue;

        const level = match[1].length;
        const text = cleanHeadingText(match[2]);
        if (!text) continue;

        headings.push({ level, text, id: slugger.slug(text) });
    }

    return headings;
}