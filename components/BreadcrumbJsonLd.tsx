import { siteConfig } from '@/lib/config';

interface BreadcrumbItem {
    name: string;
    path: string;
}

interface BreadcrumbJsonLdProps {
    items: BreadcrumbItem[];
}

export default function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
    const itemListElement = [
        { '@type': 'ListItem' as const, position: 1, name: 'Home', item: siteConfig.url },
        ...items.map((item, index) => ({
            '@type': 'ListItem' as const,
            position: index + 2,
            name: item.name,
            item: `${siteConfig.url}${item.path}`,
        })),
    ];

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement,
                }),
            }}
        />
    );
}
