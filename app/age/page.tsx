'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AgeClockPage() {
    const birthDate = new Date('2004-01-19T16:15:00');
    const [age, setAge] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const calculateAge = () => {
            const now = new Date();
            let diffMs = now.getTime() - birthDate.getTime();

            // Calculate precise years first
            let birthYear = birthDate.getFullYear();
            let currentYear = now.getFullYear();
            let years = currentYear - birthYear;

            // Adjust years if birthday hasn't occurred yet this year
            const birthMonth = birthDate.getMonth();
            const birthDay = birthDate.getDate();
            const currentMonth = now.getMonth();
            const currentDay = now.getDate();

            if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
                years--;
            }

            // Get the date of the most recent birthday
            const lastBirthday = new Date(birthDate);
            lastBirthday.setFullYear(birthDate.getFullYear() + years);

            // Calculate remaining milliseconds after subtracting the full years
            let remainingMs = now.getTime() - lastBirthday.getTime();

            const msPerDay = 24 * 60 * 60 * 1000;
            const msPerHour = 60 * 60 * 1000;
            const msPerMinute = 60 * 1000;
            const msPerSecond = 1000;

            const days = Math.floor(remainingMs / msPerDay);
            remainingMs %= msPerDay;

            const hours = Math.floor(remainingMs / msPerHour);
            remainingMs %= msPerHour;

            const minutes = Math.floor(remainingMs / msPerMinute);
            remainingMs %= msPerMinute;

            const seconds = Math.floor(remainingMs / msPerSecond);
            const milliseconds = remainingMs % msPerSecond;

            setAge({ years, days, hours, minutes, seconds, milliseconds });
        };

        calculateAge();
        const interval = setInterval(calculateAge, 50);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) {
        return (
            <div className="mx-auto max-w-3xl px-6 py-32 md:py-40 font-mono text-center text-muted">
                Connecting to birth clock...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-6 py-32 md:py-40 font-mono flex flex-col items-center text-center">
            <h1 className="text-sm font-semibold text-muted mb-8 tracking-widest uppercase">
                Time Elapsed Since Launch
            </h1>

            {/* The Clock Display */}
            <div className="bg-mid-dark border border-surface rounded-lg p-8 md:p-12 mb-12 shadow-sm w-full max-w-xl">
                <div className="grid grid-cols-3 gap-y-8 md:grid-cols-6 md:gap-x-4 text-center">
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-accent-teal">
                            {age.years}
                        </div>
                        <div className="text-xs text-muted mt-2 uppercase">Years</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-accent-teal">
                            {age.days}
                        </div>
                        <div className="text-xs text-muted mt-2 uppercase">Days</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-subtle-text">
                            {String(age.hours).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-muted mt-2 uppercase">Hours</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-subtle-text">
                            {String(age.minutes).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-muted mt-2 uppercase">Mins</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-subtle-text">
                            {String(age.seconds).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-muted mt-2 uppercase">Secs</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-muted/70">
                            {String(age.milliseconds).padStart(3, '0')}
                        </div>
                        <div className="text-xs text-muted mt-2 uppercase">Ms</div>
                    </div>
                </div>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-muted mb-10">
                A digital counter tracking the time since January 19, 2004. Ticking at 20 frames per second.
            </p>

            <Link
                href="/"
                className="text-xs text-muted hover:text-accent-teal underline decoration-surface transition-colors"
            >
                ← Back to main orbit
            </Link>
        </div>
    );
}
