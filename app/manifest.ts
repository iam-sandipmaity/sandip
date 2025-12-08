import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Sandip Maity - Embedded Systems Developer',
        short_name: 'Sandip Maity',
        description: 'Electronics and Communication Engineering student passionate about embedded systems, circuit design, and IoT solutions.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0f',
        theme_color: '#5eead4',
        icons: [
            {
                src: '/icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'any',
            },
            {
                src: '/icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'maskable',
            },
            // Add these if you create PNG icons
            // {
            //     src: '/icon-192.png',
            //     sizes: '192x192',
            //     type: 'image/png',
            //     purpose: 'any',
            // },
            // {
            //     src: '/icon-512.png',
            //     sizes: '512x512',
            //     type: 'image/png',
            //     purpose: 'any',
            // },
            // {
            //     src: '/icon-512-maskable.png',
            //     sizes: '512x512',
            //     type: 'image/png',
            //     purpose: 'maskable',
            // },
        ],
        categories: ['education', 'technology', 'portfolio', 'developer tools'],
        orientation: 'portrait-primary',
        scope: '/',
        lang: 'en-US',
        dir: 'ltr',
        display_override: ['standalone', 'minimal-ui', 'browser'],
        shortcuts: [
            {
                name: 'Blog',
                short_name: 'Blog',
                description: 'Read latest blog posts',
                url: '/blog',
                icons: [{ src: '/icon.svg', sizes: 'any' }],
            },
            {
                name: 'Projects',
                short_name: 'Projects',
                description: 'View embedded systems projects',
                url: '/projects',
                icons: [{ src: '/icon.svg', sizes: 'any' }],
            },
            {
                name: 'Contact',
                short_name: 'Contact',
                description: 'Get in touch',
                url: '/contact',
                icons: [{ src: '/icon.svg', sizes: 'any' }],
            },
        ],
        screenshots: [
            // Add these if you create screenshots
            // {
            //     src: '/screenshot-wide.png',
            //     sizes: '1280x720',
            //     type: 'image/png',
            //     form_factor: 'wide',
            // },
            // {
            //     src: '/screenshot-narrow.png',
            //     sizes: '750x1334',
            //     type: 'image/png',
            //     form_factor: 'narrow',
            // },
        ],
    };
}
