import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Reads',
    description: 'Books, articles, and resources I\'ve found valuable for embedded systems and personal development.',
    openGraph: {
        title: 'Reads - Sandip Maity',
        description: 'Books, articles, and resources I\'ve found valuable.',
        url: `${siteConfig.url}/reads`,
        siteName: siteConfig.name,
        images: [{ url: '/og?title=Reads', width: 1200, height: 630, alt: 'Sandip Maity Reads' }],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Reads - Sandip Maity',
        description: 'Books, articles, and resources I\'ve found valuable.',
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: ['/og?title=Reads'],
    },
};

interface ReadItem {
    title: string;
    author?: string;
    type: 'book' | 'article' | 'resource';
    url?: string;
    note: string;
}

const reads: ReadItem[] = [
    {
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        type: 'book',
        note: 'Eye-opening perspective on money, assets, and financial literacy. Changed how I think about building wealth.',
    },
    {
        title: 'Coffee Can Investing',
        author: 'Saurabh Mukherjea',
        type: 'book',
        note: 'Great insights into long-term investing in quality businesses. Reinforced patience and discipline.',
    },
];

export default function ReadsPage() {
    const books = reads.filter((r) => r.type === 'book');
    const articles = reads.filter((r) => r.type === 'article');
    const resources = reads.filter((r) => r.type === 'resource');

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
                            { '@type': 'ListItem', position: 2, name: 'Reads', item: `${siteConfig.url}/reads` },
                        ],
                    }),
                }}
            />

            <div className="mb-12">
                <h1 className="text-4xl font-mono font-bold text-subtle-text mb-4">
                    Reads
                </h1>
                <p className="font-mono text-lg text-muted leading-relaxed">
                    Books, articles, and resources that have shaped my thinking.
                </p>
            </div>

            {/* Books */}
            {books.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-mono font-semibold text-subtle-text mb-6">
                        Books
                    </h2>
                    <div className="space-y-8">
                        {books.map((item) => (
                            <article key={item.title} className="group">
                                <h3 className="text-lg font-mono font-semibold text-subtle-text mb-1 group-hover:text-accent-teal transition-colors">
                                    {item.url ? (
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-teal">
                                            {item.title} ↗
                                        </a>
                                    ) : item.title}
                                </h3>
                                {item.author && <p className="font-mono text-sm text-muted mb-2">by {item.author}</p>}
                                <p className="font-mono text-muted leading-relaxed">{item.note}</p>
                                <div className="mt-6 border-b border-dotted border-surface/30" />
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* Articles */}
            {articles.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-mono font-semibold text-subtle-text mb-6">
                        Articles
                    </h2>
                    <div className="space-y-8">
                        {articles.map((item) => (
                            <article key={item.title} className="group">
                                <h3 className="text-lg font-mono font-semibold text-subtle-text mb-1 group-hover:text-accent-teal transition-colors">
                                    {item.url ? (
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-teal">
                                            {item.title} ↗
                                        </a>
                                    ) : item.title}
                                </h3>
                                <p className="font-mono text-muted leading-relaxed">{item.note}</p>
                                <div className="mt-6 border-b border-dotted border-surface/30" />
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* Resources */}
            {resources.length > 0 && (
                <section>
                    <h2 className="text-2xl font-mono font-semibold text-subtle-text mb-6">
                        Resources
                    </h2>
                    <div className="space-y-8">
                        {resources.map((item) => (
                            <article key={item.title} className="group">
                                <h3 className="text-lg font-mono font-semibold text-subtle-text mb-1 group-hover:text-accent-teal transition-colors">
                                    {item.url ? (
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-teal">
                                            {item.title} ↗
                                        </a>
                                    ) : item.title}
                                </h3>
                                <p className="font-mono text-muted leading-relaxed">{item.note}</p>
                                <div className="mt-6 border-b border-dotted border-surface/30" />
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}