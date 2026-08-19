import { getAllPosts } from '@/lib/posts';
import { toRssDateString } from '@/lib/date';

/**
 * Generate RSS feed for blog posts
 */
export async function GET() {
    const posts = getAllPosts();
    const siteUrl = 'https://sandipmaity.me';
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sandip Maity - Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Electronics &amp; Communication Engineer specializing in Fiber Optics, Utility Engineering, IoT solutions, and Circuit Design.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
            .map(
                (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <description>${escapeXml(post.summary)}</description>
      <pubDate>${toRssDateString(post.date)}</pubDate>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
            )
            .join('')}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
