import { describe, it, expect } from 'vitest';
import { getAllProjects, getFeaturedProjects, projects } from '../projects';

describe('getAllProjects', () => {
    it('returns all projects', () => {
        const result = getAllProjects();
        expect(result).toBe(projects);
        expect(result.length).toBeGreaterThan(0);
    });

    it('every project has a title and description', () => {
        getAllProjects().forEach((project) => {
            expect(project.title).toBeTruthy();
            expect(project.description).toBeTruthy();
        });
    });

    it('every project has at least one tag', () => {
        getAllProjects().forEach((project) => {
            expect(project.tags.length).toBeGreaterThan(0);
        });
    });
});

describe('getFeaturedProjects', () => {
    it('returns 2 projects by default', () => {
        expect(getFeaturedProjects().length).toBe(2);
    });

    it('returns requested number of projects', () => {
        expect(getFeaturedProjects(3).length).toBe(3);
    });

    it('returns all projects when count exceeds total', () => {
        const all = getAllProjects();
        expect(getFeaturedProjects(999).length).toBe(all.length);
    });

    it('returns empty array when count is 0', () => {
        expect(getFeaturedProjects(0).length).toBe(0);
    });

    it('returns the first N projects in order', () => {
        const featured = getFeaturedProjects(2);
        expect(featured[0]).toBe(projects[0]);
        expect(featured[1]).toBe(projects[1]);
    });
});
