'use client';

import { useEffect, useState } from 'react';
import { FiType } from 'react-icons/fi';

const storageKey = 'sandip-font';
const systemClass = 'font-system';

export default function FontToggle() {
    const [mounted, setMounted] = useState(false);
    const [isSystemFont, setIsSystemFont] = useState(false);

    useEffect(() => {
        const enabled = localStorage.getItem(storageKey) === 'system';
        document.documentElement.classList.toggle(systemClass, enabled);
        setIsSystemFont(enabled);
        setMounted(true);
    }, []);

    const toggleFont = () => {
        const nextValue = !isSystemFont;
        document.documentElement.classList.toggle(systemClass, nextValue);

        if (nextValue) {
            localStorage.setItem(storageKey, 'system');
        } else {
            localStorage.removeItem(storageKey);
        }

        setIsSystemFont(nextValue);
    };

    if (!mounted) {
        return (
            <button
                className="p-1.5 text-muted transition-colors hover:text-accent-teal"
                aria-label="Toggle font"
            >
                <div className="h-5 w-5" />
            </button>
        );
    }

    return (
        <button
            onClick={toggleFont}
            className={isSystemFont
                ? 'p-1.5 text-muted transition-colors hover:text-accent-teal'
                : 'p-1.5 text-accent-teal transition-colors hover:text-accent-hover'
            }
            aria-label={isSystemFont ? 'Switch to Departure Mono' : 'Switch to system font'}
            title={isSystemFont ? 'Departure Mono' : 'System font'}
            aria-pressed={!isSystemFont}
        >
            <FiType className="h-5 w-5" />
        </button>
    );
}
