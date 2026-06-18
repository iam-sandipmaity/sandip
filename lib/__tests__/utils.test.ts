import { describe, it, expect } from 'vitest';
import { tagToSlug, slugToTag } from '../utils';

describe('tagToSlug', () => {
    it('lowercases the tag', () => {
        expect(tagToSlug('React')).toBe('react');
    });

    it('replaces spaces with hyphens', () => {
        expect(tagToSlug('embedded systems')).toBe('embedded-systems');
    });

    it('replaces multiple consecutive spaces with a single hyphen', () => {
        expect(tagToSlug('a   b')).toBe('a-b');
    });

    it('handles already-slugged input', () => {
        expect(tagToSlug('web-dev')).toBe('web-dev');
    });

    it('handles empty string', () => {
        expect(tagToSlug('')).toBe('');
    });

    it('handles mixed case with spaces', () => {
        expect(tagToSlug('Full Stack')).toBe('full-stack');
    });
});

describe('slugToTag', () => {
    it('replaces hyphens with spaces', () => {
        expect(slugToTag('embedded-systems')).toBe('embedded systems');
    });

    it('handles slug with no hyphens', () => {
        expect(slugToTag('react')).toBe('react');
    });

    it('handles multiple hyphens', () => {
        expect(slugToTag('a-b-c')).toBe('a b c');
    });

    it('handles empty string', () => {
        expect(slugToTag('')).toBe('');
    });
});

describe('tagToSlug and slugToTag roundtrip', () => {
    it('roundtrips a simple lowercase tag', () => {
        const tag = 'data visualization';
        expect(slugToTag(tagToSlug(tag))).toBe(tag);
    });
});
