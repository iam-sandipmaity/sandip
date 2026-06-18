import type { Metadata } from 'next';
import { makePageMetadata } from '@/lib/metadata';
import PageContainer from '@/components/PageContainer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = makePageMetadata({
    title: 'Reads',
    description: 'Books, articles, and resources I\'ve found valuable for embedded systems and personal development.',
    path: '/reads',
    ogTitle: 'Reads - Sandip Maity',
    ogDescription: 'Books, articles, and resources I\'ve found valuable.',
    canonical: false,
});

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

function ReadSection({ title, items }: { title: string; items: ReadItem[] }) {
    if (items.length === 0) return null;

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-mono font-medium text-subtle-text mb-6">
                {title}
            </h2>
            <div className="space-y-8">
                {items.map((item) => (
                    <article key={item.title} className="group">
                        <h3 className="text-lg font-mono font-medium text-subtle-text mb-1 group-hover:text-accent-teal transition-colors">
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
    );
}

export default function ReadsPage() {
    const books = reads.filter((r) => r.type === 'book');
    const articles = reads.filter((r) => r.type === 'article');
    const resources = reads.filter((r) => r.type === 'resource');

    return (
        <PageContainer>
            <BreadcrumbJsonLd items={[{ name: 'Reads', path: '/reads' }]} />

            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-mono font-semibold text-subtle-text mb-4">
                    Reads
                </h1>
                <p className="font-mono text-lg text-muted leading-relaxed">
                    Books, articles, and resources that have shaped my thinking.
                </p>
            </div>

            <ReadSection title="Books" items={books} />
            <ReadSection title="Articles" items={articles} />
            <ReadSection title="Resources" items={resources} />
        </PageContainer>
    );
}
