import Link from 'next/link';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

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
    const projectUrl = project.link || project.github;

    return (
        <article className="group py-6 font-mono">
            <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold leading-7 text-subtle-text transition-colors group-hover:text-accent-teal">
                    {projectUrl ? (
                        <Link
                            href={projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-surface decoration-1 underline-offset-4 transition-colors hover:decoration-accent-teal"
                        >
                            {project.title}
                        </Link>
                    ) : (
                        <span>{project.title}</span>
                    )}
                </h3>

                <div className="flex shrink-0 items-center gap-3 pt-1 text-muted">
                    {project.github && (
                        <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-accent-teal"
                            aria-label="GitHub"
                        >
                            <FiGithub className="h-4 w-4" />
                        </Link>
                    )}
                    {project.link && (
                        <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-accent-teal"
                            aria-label="Visit"
                        >
                            <FiExternalLink className="h-4 w-4" />
                        </Link>
                    )}
                </div>
            </div>

            <p className="mb-4 text-base leading-8 text-muted">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm leading-6 text-muted">
                {project.tags.map((tag, index) => (
                    <span key={tag}>
                        #{tag}
                        {index < project.tags.length - 1 ? ',' : ''}
                    </span>
                ))}
            </div>
        </article>
    );
}
