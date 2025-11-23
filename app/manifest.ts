import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Sandip Maity Portfolio',
        short_name: 'Sandip',
        description: 'Electronics and Communication Engineering student passionate about embedded systems, circuit design, and IoT solutions.',
        start_url: '/',
        display: 'standalone',
        background_color: '#19191e',
        theme_color: '#5eead4',
        icons: [
            {
                src: '/icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
    };
}
