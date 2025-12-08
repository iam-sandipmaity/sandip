import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reads',
    description: 'Books, articles, and resources I\'ve found valuable for embedded systems, electronics, and personal development.',
    openGraph: {
        title: 'Reads - Sandip Maity',
        description: 'Books, articles, and resources I\'ve found valuable for embedded systems, electronics, and personal development.',
        url: 'https://sandipmaity.me/reads',
        siteName: 'Sandip Maity Portfolio',
        images: [
            {
                url: '/og?title=Reads',
                width: 1200,
                height: 630,
                alt: 'Sandip Maity Reads',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Reads - Sandip Maity',
        description: 'Books, articles, and resources I\'ve found valuable for embedded systems, electronics, and personal development.',
        creator: '@iam_sandipmaity',
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
        note: 'Eye-opening perspective on money, assets, and financial literacy. Changed how I think about building wealth and making money work for me.',
    },
    {
        title: 'The Art of Electronics',
        author: 'Paul Horowitz & Winfield Hill',
        type: 'book',
        note: 'The bible of electronics design. Comprehensive guide covering everything from basic circuits to advanced analog and digital design.',
    },
    {
        title: 'Atomic Habits',
        author: 'James Clear',
        type: 'book',
        note: 'Practical framework for building good habits and breaking bad ones. Small changes compound into remarkable results over time.',
    },
    {
        title: 'Make: Electronics',
        author: 'Charles Platt',
        type: 'book',
        note: 'Hands-on approach to learning electronics through experiments. Perfect for understanding circuits by actually building them.',
    },
    {
        title: 'Getting Started with Arduino',
        author: 'Massimo Banzi',
        type: 'article',
        url: 'https://www.arduino.cc/en/Guide',
        note: 'Official Arduino guide that helped me start my embedded systems journey. Clear explanations and practical examples.',
    },
    {
        title: 'Understanding Microcontroller Interrupts',
        author: 'Embedded Systems Community',
        type: 'article',
        url: 'https://www.embedded.com/introduction-to-interrupts/',
        note: 'Excellent breakdown of how interrupts work in microcontrollers. Essential knowledge for real-time embedded programming.',
    },
    {
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        type: 'article',
        url: 'https://www.collaborativefund.com/blog/the-psychology-of-money/',
        note: 'Insightful essay on how behavior and mindset matter more than intelligence when it comes to money. Complements Rich Dad Poor Dad perfectly.',
    },
    {
        title: 'STM32 HAL Documentation',
        author: 'STMicroelectronics',
        type: 'resource',
        url: 'https://www.st.com/en/embedded-software/stm32cube-mcu-mpu-packages.html',
        note: 'Comprehensive documentation for STM32 microcontrollers. Invaluable reference for working with ARM Cortex-M based systems.',
    },
    {
        title: 'CircuitJS Simulator',
        author: 'Paul Falstad',
        type: 'resource',
        url: 'https://www.falstad.com/circuit/',
        note: 'Interactive circuit simulator that runs in the browser. Great for quickly testing circuit ideas and understanding behavior.',
    },
    {
        title: 'Embedded Systems Programming',
        author: 'Various Authors',
        type: 'resource',
        url: 'https://www.embedded.com/',
        note: 'Excellent resource for embedded systems articles, tutorials, and industry insights. Regularly updated with practical content.',
    },
];

/**
 * Reads page - simple list of books, articles, and resources
 */
export default function ReadsPage() {
    const books = reads.filter((r) => r.type === 'book');
    const articles = reads.filter((r) => r.type === 'article');
    const resources = reads.filter((r) => r.type === 'resource');

    const renderReadItem = (item: ReadItem) => (
        <div key={item.title} className="p-6 bg-mid-dark border border-surface rounded-lg hover:border-accent-teal/30 transition-colors">
            <h3 className="text-lg font-mono font-semibold text-subtle-text mb-2">
                {item.url ? (
                    <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-teal transition-colors"
                    >
                        {item.title} ↗
                    </a>
                ) : (
                    item.title
                )}
            </h3>
            {item.author && (
                <p className="text-sm text-muted mb-3">by {item.author}</p>
            )}
            <p className="text-muted leading-relaxed">{item.note}</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            {/* Breadcrumb Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://sandipmaity.me',
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Reads',
                                item: 'https://sandipmaity.me/reads',
                            },
                        ],
                    }),
                }}
            />

            <div className="mb-12">
                <h1 className="text-4xl font-mono font-bold text-subtle-text mb-4">
                    Reads
                </h1>
                <p className="text-lg text-muted leading-relaxed">
                    Books, articles, and resources that have shaped my personal and mental
                    development and beyond.
                </p>
            </div>

            {/* Books */}
            {books.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-mono font-semibold text-subtle-text mb-6">
                        Books
                    </h2>
                    <div className="space-y-4">
                        {books.map(renderReadItem)}
                    </div>
                </section>
            )}

            {/* Articles */}
            {articles.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-mono font-semibold text-subtle-text mb-6">
                        Articles
                    </h2>
                    <div className="space-y-4">
                        {articles.map(renderReadItem)}
                    </div>
                </section>
            )}

            {/* Resources */}
            {resources.length > 0 && (
                <section>
                    <h2 className="text-2xl font-mono font-semibold text-subtle-text mb-6">
                        Resources
                    </h2>
                    <div className="space-y-4">
                        {resources.map(renderReadItem)}
                    </div>
                </section>
            )}
        </div>
    );
}
