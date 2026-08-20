'use client';

import { useEffect, useState } from 'react';

/**
 * Reading progress bar for long-form blog articles
 * Displays a thin, theme-aware accent-teal progress bar at the top of the viewport
 */
export default function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const currentProgress = (window.scrollY / totalHeight) * 100;
                setProgress(Math.min(100, Math.max(0, currentProgress)));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-transparent pointer-events-none"
            aria-hidden="true"
        >
            <div
                className="h-full bg-accent-teal transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
