'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                type="button"
                className="relative h-9 w-9 rounded-md p-2 ring-zinc-400 transition-all hover:ring-2"
                aria-label="Toggle Dark Mode"
            >
                <div className="h-7 w-7" />
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative h-9 w-9 rounded-md p-2 ring-zinc-400 transition-all hover:ring-2"
            aria-label="Toggle Dark Mode"
        >
            <svg
                className="absolute start-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0"
                aria-hidden="true"
                focusable="false"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 12L23 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2V1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 23V22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 20L19 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 4L19 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 20L5 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 4L5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 12L2 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <svg
                className="absolute start-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100"
                aria-hidden="true"
                focusable="false"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                <path d="M19 11h2m-1 -1v2" />
            </svg>
        </button>
    );
}