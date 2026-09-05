const noStoreHeaders = [
  {
    key: 'Cache-Control',
    value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS
    ? process.env.ALLOWED_DEV_ORIGINS.split(',').map(o => o.trim())
    : [],

  // Image optimization
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },

  // Headers for security, CDN caching and performance
  async headers() {
    const headers = [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://static.cloudflareinsights.com https://app.posthog.com`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https://images.unsplash.com",
              "connect-src 'self' https://www.googletagmanager.com https://region1.google-analytics.com https://static.cloudflareinsights.com https://app.posthog.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-src 'none'",
              "object-src 'none'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/sw.js',
        headers: noStoreHeaders,
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];

    if (process.env.NODE_ENV === 'development') {
      headers.push({
        source: '/_next/static/:path*',
        headers: noStoreHeaders,
      });
    }

    return headers;
  },
};

export default nextConfig;
