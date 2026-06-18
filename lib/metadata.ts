import type { Metadata } from 'next';
import { siteConfig } from './config';

export function getTwitterHandle(): string {
    return siteConfig.social.twitter.replace('https://x.com/', '@');
}

export function makeOgImage(title: string, alt?: string): {
    url: string;
    width: number;
    height: number;
    alt: string;
} {
    return {
        url: `/og?title=${encodeURIComponent(title)}`,
        width: 1200,
        height: 630,
        alt: alt ?? title,
    };
}

interface PageMetadataOptions {
    title: string;
    description: string;
    path: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: 'website' | 'article' | 'profile';
    canonical?: boolean;
}

export function makePageMetadata({
    title,
    description,
    path,
    ogTitle,
    ogDescription,
    ogType = 'website',
    canonical = true,
}: PageMetadataOptions): Metadata {
    const url = `${siteConfig.url}${path}`;
    const displayTitle = ogTitle ?? title;
    const displayDescription = ogDescription ?? description;

    return {
        title,
        description,
        ...(canonical && { alternates: { canonical: url } }),
        openGraph: {
            title: displayTitle,
            description: displayDescription,
            url,
            siteName: siteConfig.name,
            images: [makeOgImage(displayTitle)],
            locale: 'en_US',
            type: ogType,
        },
        twitter: {
            card: 'summary_large_image',
            title: displayTitle,
            description: displayDescription,
            creator: getTwitterHandle(),
            images: [makeOgImage(displayTitle).url],
        },
    };
}
