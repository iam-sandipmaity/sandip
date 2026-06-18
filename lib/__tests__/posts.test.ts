import { describe, it, expect } from 'vitest';
import { getReadingTimeMinutes, getBreadcrumbs } from '../posts';

describe('getReadingTimeMinutes', () => {
    it('returns 1 for very short content', () => {
        expect(getReadingTimeMinutes('hello')).toBe(1);
    });

    it('returns 1 for empty string', () => {
        expect(getReadingTimeMinutes('')).toBe(1);
    });

    it('returns 1 for whitespace-only content', () => {
        expect(getReadingTimeMinutes('   \n  ')).toBe(1);
    });

    it('returns 1 for under 200 words', () => {
        const words = Array(150).fill('word').join(' ');
        expect(getReadingTimeMinutes(words)).toBe(1);
    });

    it('returns 1 for exactly 200 words', () => {
        const words = Array(200).fill('word').join(' ');
        expect(getReadingTimeMinutes(words)).toBe(1);
    });

    it('returns 2 for 201-400 words', () => {
        const words = Array(250).fill('word').join(' ');
        expect(getReadingTimeMinutes(words)).toBe(2);
    });

    it('returns 3 for 401-600 words', () => {
        const words = Array(500).fill('word').join(' ');
        expect(getReadingTimeMinutes(words)).toBe(3);
    });

    it('returns 5 for ~1000 words', () => {
        const words = Array(1000).fill('word').join(' ');
        expect(getReadingTimeMinutes(words)).toBe(5);
    });

    it('handles content with mixed whitespace', () => {
        const content = 'word\n\nword\tword   word';
        expect(getReadingTimeMinutes(content)).toBe(1);
    });
});

describe('getBreadcrumbs', () => {
    it('returns single breadcrumb for top-level section', () => {
        const result = getBreadcrumbs('product');
        expect(result).toEqual([{ name: 'product', path: 'product' }]);
    });

    it('returns nested breadcrumbs for deep path', () => {
        const result = getBreadcrumbs('product/reviews/best');
        expect(result).toEqual([
            { name: 'product', path: 'product' },
            { name: 'reviews', path: 'product/reviews' },
            { name: 'best', path: 'product/reviews/best' },
        ]);
    });

    it('returns two breadcrumbs for two-level path', () => {
        const result = getBreadcrumbs('blog/tech');
        expect(result).toEqual([
            { name: 'blog', path: 'blog' },
            { name: 'tech', path: 'blog/tech' },
        ]);
    });
});
