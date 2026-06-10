'use client';

import { useEffect } from 'react';

const cleanupFlag = 'sandip-cache-cleaned-v1';

export default function BrowserCacheCleanup() {
    useEffect(() => {
        if (sessionStorage.getItem(cleanupFlag)) {
            return;
        }

        async function cleanup() {
            let changed = false;

            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                await Promise.all(registrations.map((registration) => registration.unregister()));
                changed = changed || registrations.length > 0;
            }

            if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map((key) => caches.delete(key)));
                changed = changed || keys.length > 0;
            }

            sessionStorage.setItem(cleanupFlag, 'true');

            if (changed) {
                window.location.reload();
            }
        }

        cleanup().catch(() => {
            sessionStorage.setItem(cleanupFlag, 'true');
        });
    }, []);

    return null;
}
