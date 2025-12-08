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
                        color: 'rgb(var(--color-subtle-text))',
                        a: {
                            color: 'rgb(var(--color-accent-teal))',
                            '&:hover': {
                                color: 'rgb(var(--color-accent-hover))',
                            },
                        },
                        h1: {
                            color: 'rgb(var(--color-subtle-text))',
                        },
                        h2: {
                            color: 'rgb(var(--color-subtle-text))',
                        },
                        h3: {
                            color: 'rgb(var(--color-subtle-text))',
                        },
                        h4: {
                            color: 'rgb(var(--color-subtle-text))',
                        },
                        code: {
                            color: 'rgb(var(--color-accent-teal))',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                        strong: {
                            color: 'rgb(var(--color-subtle-text))',
                        },
                        blockquote: {
                            color: 'rgb(var(--color-muted))',
                            borderLeftColor: 'rgb(var(--color-accent-teal))',
                        },
                        table: {
                            width: '100%',
                            borderCollapse: 'collapse',
                            marginTop: '2em',
                            marginBottom: '2em',
                        },
                        thead: {
                            borderBottomWidth: '2px',
                            borderBottomColor: 'rgb(var(--color-accent-teal))',
                        },
                        'thead th': {
                            color: 'rgb(var(--color-subtle-text))',
                            fontWeight: '600',
                            verticalAlign: 'bottom',
                            paddingBottom: '0.75em',
                            paddingLeft: '0.75em',
                            paddingRight: '0.75em',
                        },
                        'tbody tr': {
                            borderBottomWidth: '1px',
                            borderBottomColor: 'rgb(var(--color-surface))',
                        },
                        'tbody tr:last-child': {
                            borderBottomWidth: '0',
                        },
                        'tbody td': {
                            verticalAlign: 'top',
                            paddingTop: '0.75em',
                            paddingBottom: '0.75em',
                            paddingLeft: '0.75em',
                            paddingRight: '0.75em',
                        },
                    },
                },
            }),
        },
    },
    plugins: [require('@tailwindcss/typography')],
};

export default config;
