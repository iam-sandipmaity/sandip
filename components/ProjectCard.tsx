import Link from 'next/link';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
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
 * Project card - minimal, borderless design with subtle hover
 * No boxes, just clean typography
 */
export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="group">
            <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-xl font-mono font-semibold text-subtle-text group-hover:text-accent-teal transition-colors relative inline-block">
                    {project.link || project.github ? (
                        <Link href={project.link || project.github} className="after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:border-b after:border-dotted after:border-accent-teal after:opacity-0 group-hover:after:opacity-100">
                            {project.title}
                        </Link>
                    ) : (
                        <span>{project.title}</span>
                    )}
                </h3>
                
                {/* External links */}
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.github && (
                        <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-accent-teal transition-colors"
                            aria-label="GitHub"
                        >
                            <FiGithub className="w-4 h-4" />
                        </Link>
                    )}
                    {project.link && (
                        <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-accent-teal transition-colors"
                            aria-label="Visit"
                        >
                            <FiExternalLink className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>

            <p className="font-mono text-muted text-base leading-relaxed mb-3">
                {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <TagPill key={tag} tag={tag} variant="small" />
                ))}
            </div>

            {/* Subtle divider */}
            <div className="mt-8 border-b border-surface/50 group-last:border-transparent" />
        </article>
    );
}