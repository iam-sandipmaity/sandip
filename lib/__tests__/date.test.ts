import { describe, it, expect } from 'vitest';
import {
    parsePostDate,
    formatPostDate,
    toIndianDateString,
    toIsoDateString,
    toRssDateString,
} from '../date';

describe('parsePostDate', () => {
    it('parses Indian-style dd-mm-yyyy string', () => {
        const result = parsePostDate('15-08-2024');
        expect(result).not.toBeNull();
        expect(result!.getUTCFullYear()).toBe(2024);
        expect(result!.getUTCMonth()).toBe(7); // August = 7
        expect(result!.getUTCDate()).toBe(15);
    });

    it('parses Indian-style with slash separators', () => {
        const result = parsePostDate('01/12/2023');
        expect(result).not.toBeNull();
        expect(result!.getUTCFullYear()).toBe(2023);
        expect(result!.getUTCMonth()).toBe(11);
        expect(result!.getUTCDate()).toBe(1);
    });

    it('parses single-digit day and month', () => {
        const result = parsePostDate('5-3-2025');
        expect(result).not.toBeNull();
        expect(result!.getUTCMonth()).toBe(2); // March
        expect(result!.getUTCDate()).toBe(5);
    });

    it('parses ISO yyyy-mm-dd string', () => {
        const result = parsePostDate('2024-08-15');
        expect(result).not.toBeNull();
        expect(result!.getUTCFullYear()).toBe(2024);
        expect(result!.getUTCMonth()).toBe(7);
        expect(result!.getUTCDate()).toBe(15);
    });

    it('accepts a valid Date object', () => {
        const input = new Date(2024, 0, 1); // Jan 1 2024 local
        const result = parsePostDate(input);
        expect(result).not.toBeNull();
        expect(result!.getUTCFullYear()).toBe(2024);
        expect(result!.getUTCMonth()).toBe(0);
        expect(result!.getUTCDate()).toBe(1);
    });

    it('returns null for an invalid Date object', () => {
        expect(parsePostDate(new Date('not-a-date'))).toBeNull();
    });

    it('returns null for an empty string', () => {
        expect(parsePostDate('')).toBeNull();
    });

    it('returns null for garbage text', () => {
        expect(parsePostDate('hello world')).toBeNull();
    });

    it('returns null for invalid calendar date (month 13)', () => {
        expect(parsePostDate('01-13-2024')).toBeNull();
    });

    it('returns null for day 0', () => {
        expect(parsePostDate('00-01-2024')).toBeNull();
    });

    it('handles leap-year Feb 29', () => {
        const result = parsePostDate('29-02-2024');
        expect(result).not.toBeNull();
        expect(result!.getUTCDate()).toBe(29);
    });

    it('returns null for Feb 29 on non-leap year', () => {
        expect(parsePostDate('29-02-2023')).toBeNull();
    });

    it('trims surrounding whitespace', () => {
        const result = parsePostDate('  11-06-2026  ');
        expect(result).not.toBeNull();
        expect(result!.getUTCFullYear()).toBe(2026);
    });

    it('falls back to Date constructor for other formats', () => {
        const result = parsePostDate('June 15, 2024');
        expect(result).not.toBeNull();
        expect(result!.getUTCFullYear()).toBe(2024);
        expect(result!.getUTCMonth()).toBe(5);
        expect(result!.getUTCDate()).toBe(15);
    });
});

describe('formatPostDate', () => {
    it('formats with short month by default', () => {
        const result = formatPostDate('15-08-2024');
        expect(result).toBe('15 Aug 2024');
    });

    it('formats with long month when specified', () => {
        const result = formatPostDate('15-08-2024', 'long');
        expect(result).toBe('15 August 2024');
    });

    it('returns "Invalid Date" for unparseable input', () => {
        expect(formatPostDate('nonsense')).toBe('Invalid Date');
    });

    it('formats ISO date correctly', () => {
        const result = formatPostDate('2023-12-25');
        expect(result).toBe('25 Dec 2023');
    });
});

describe('toIndianDateString', () => {
    it('converts ISO to dd-mm-yyyy', () => {
        expect(toIndianDateString('2024-01-05')).toBe('05-01-2024');
    });

    it('normalises Indian-style input', () => {
        expect(toIndianDateString('5-1-2024')).toBe('05-01-2024');
    });

    it('returns original string for invalid input', () => {
        expect(toIndianDateString('invalid')).toBe('invalid');
    });
});

describe('toIsoDateString', () => {
    it('converts Indian date to ISO', () => {
        expect(toIsoDateString('15-08-2024')).toBe('2024-08-15');
    });

    it('passes through already-ISO dates', () => {
        expect(toIsoDateString('2024-08-15')).toBe('2024-08-15');
    });

    it('returns original string for invalid input', () => {
        expect(toIsoDateString('bad')).toBe('bad');
    });
});

describe('toRssDateString', () => {
    it('returns a valid UTC date string', () => {
        const result = toRssDateString('15-08-2024');
        expect(result).toContain('15 Aug 2024');
        expect(result).toContain('GMT');
    });

    it('returns epoch UTC string for invalid input', () => {
        const result = toRssDateString('nope');
        expect(result).toBe(new Date(0).toUTCString());
    });
});
