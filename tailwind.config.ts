import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Dark mode colors (default)
                'near-black': 'rgb(var(--color-near-black) / <alpha-value>)',
                'mid-dark': 'rgb(var(--color-mid-dark) / <alpha-value>)',
                'surface': 'rgb(var(--color-surface) / <alpha-value>)',
                'muted': 'rgb(var(--color-muted) / <alpha-value>)',
                'subtle-text': 'rgb(var(--color-subtle-text) / <alpha-value>)',
                'accent-teal': 'rgb(var(--color-accent-teal) / <alpha-value>)',
                'accent-green': 'rgb(var(--color-accent-green) / <alpha-value>)',
                'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-jetbrains)', 'Consolas', 'monospace'],
            },
            typography: (theme: any) => ({
                DEFAULT: {
                    css: {
                        maxWidth: '70ch',
                        color: theme('colors.subtle-text'),
                        a: {
                            color: theme('colors.accent-teal'),
                            '&:hover': {
                                color: theme('colors.accent-hover'),
                            },
                        },
                        h1: {
                            color: theme('colors.subtle-text'),
                        },
                        h2: {
                            color: theme('colors.subtle-text'),
                        },
                        h3: {
                            color: theme('colors.subtle-text'),
                        },
                        h4: {
                            color: theme('colors.subtle-text'),
                        },
                        code: {
                            color: theme('colors.accent-teal'),
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                        strong: {
                            color: theme('colors.subtle-text'),
                        },
                        blockquote: {
                            color: theme('colors.muted'),
                            borderLeftColor: theme('colors.accent-teal'),
                        },
                    },
                },
            }),
        },
    },
    plugins: [require('@tailwindcss/typography')],
};

export default config;
