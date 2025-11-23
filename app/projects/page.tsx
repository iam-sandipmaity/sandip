import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'A collection of projects I\'ve built and contributed to.',
    openGraph: {
        title: 'Projects by Sandip Maity',
        description: 'A collection of projects I\'ve built and contributed to.',
        images: ['/og?title=My Projects'],
    },
};

/**
 * Projects page displaying all projects
 */
export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="mb-12">
                <h1 className="text-4xl font-mono font-bold text-subtle-text mb-4">
                    Projects
                </h1>
                <p className="text-lg text-muted leading-relaxed">
                    A selection of things I&apos;ve built. Each project represents a learning journey
                    and an opportunity to solve interesting problems.
                </p>
            </div>

            {/* Projects List */}
            <div className="space-y-6">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-muted">No projects yet. Check back soon!</p>
                </div>
            )}

            {/* More Projects Coming Soon Section */}
            <div className="mt-16 p-8 bg-mid-dark border border-surface rounded-lg text-center">
                <h2 className="text-2xl font-mono font-semibold text-accent-teal mb-4">
                    More Projects Coming Soon!
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                    Stay tuned for exciting updates as I continue building and learning.
                </p>

                <div className="space-y-4">
                    <p className="text-subtle-text">
                        Have any questions or want to collaborate?
                    </p>
                    <a
                        href="mailto:contact.sandipmaity@gmail.com"
                        className="inline-block px-6 py-3 bg-accent-teal text-gray-900 font-medium rounded-lg hover:bg-accent-teal/10 transition-colors"
                    >
                        Get in Touch
                    </a>

                    <div className="pt-4 text-sm text-muted">
                        <p className="mb-2">Connect with me:</p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <a href="https://github.com/iam-sandipmaity" target="_blank" rel="noopener noreferrer" className="hover:text-accent-teal transition-colors">
                                GitHub
                            </a>
                            <span>•</span>
                            <a href="https://www.linkedin.com/in/iam-sandipmaity/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-teal transition-colors">
                                LinkedIn
                            </a>
                            <span>•</span>
                            <a href="https://x.com/iam_sandipmaity" target="_blank" rel="noopener noreferrer" className="hover:text-accent-teal transition-colors">
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
