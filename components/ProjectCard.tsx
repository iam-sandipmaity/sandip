import Link from 'next/link';

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
 * Project card - minimal, beautifully aligned two-row list layout
 */
export default function ProjectCard({ project }: ProjectCardProps) {
    const mainUrl = project.link || project.github;

    return (
        <article className="py-3 font-mono group">
            <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base font-semibold text-subtle-text transition-colors group-hover:text-accent-teal">
                    {mainUrl ? (
                        <Link
                            href={mainUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-surface/50 decoration-1 underline-offset-4 transition-colors hover:decoration-accent-teal"
                        >
                            {project.title}
                        </Link>
                    ) : (
                        <span>{project.title}</span>
                    )}
                </h3>

                <div className="flex items-center gap-3 text-xs text-muted shrink-0">
                    {project.link && (
                        <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-surface/60 hover:text-accent-teal hover:decoration-accent-teal transition-colors"
                        >
                            live
                        </Link>
                    )}
                    {project.github && (
                        <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-surface/60 hover:text-accent-teal hover:decoration-accent-teal transition-colors"
                        >
                            source
                        </Link>
                    )}
                </div>
            </div>

            <p className="mt-1 text-sm leading-relaxed text-muted line-clamp-1">
                {project.description}
            </p>
        </article>
    );
}
