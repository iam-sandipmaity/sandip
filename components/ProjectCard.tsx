import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import TagPill from './TagPill';

export interface Project {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
}

interface ProjectCardProps {
    project: Project;
}

/**
 * Project card component with title, description, tech tags, and external link
 * Vertical layout with generous spacing and hover elevation
 */
export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="group p-6 rounded-lg border border-surface bg-mid-dark hover:border-accent-teal/30 hover:shadow-lg hover:shadow-accent-teal/5 transition-all duration-300">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h3 className="text-xl font-mono font-semibold text-subtle-text mb-2 group-hover:text-accent-teal transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-4">
                        {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <TagPill key={tag} tag={tag} variant="small" />
                        ))}
                    </div>
                </div>

                {/* External link icon */}
                {project.link && (
                    <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-surface hover:bg-accent-teal/10 transition-colors flex-shrink-0"
                        aria-label={`View ${project.title}`}
                    >
                        <FiExternalLink className="w-5 h-5 text-accent-teal" />
                    </Link>
                )}
            </div>

            {/* Optional GitHub link */}
            {project.github && (
                <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm text-muted hover:text-accent-teal transition-colors"
                >
                    <span>View on GitHub</span>
                    <FiExternalLink className="w-4 h-4" />
                </Link>
            )}
        </article>
    );
}
