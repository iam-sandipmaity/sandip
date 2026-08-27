import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import { siteConfig } from '@/lib/config';
import { getOgImageUrl } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'Projects - Fiber Optics, IoT, Circuits & Web Tools',
    description: 'Explore projects by Sandip Maity featuring ECE hardware, Fiber Optics, IoT solutions, circuit design, utility tools, and full-stack web applications.',
    alternates: {
        canonical: `${siteConfig.url}/projects`,
    },
    openGraph: {
        title: 'Projects by Sandip Maity',
        description: 'Explore ECE, Fiber Optics, IoT, circuit design, utility tools, and web applications developed by Sandip Maity.',
        url: `${siteConfig.url}/projects`,
        siteName: siteConfig.name,
        images: [
            {
                url: getOgImageUrl({
                    title: 'Projects Archive',
                    description: 'Explore ECE, Fiber Optics, IoT, circuit design, utility tools, and web projects.',
                    type: 'project',
                }),
                width: 1200,
                height: 630,
                alt: 'Sandip Maity Projects',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects by Sandip Maity',
        description: 'Explore ECE, Fiber Optics, IoT, circuit design, utility tools, and web applications developed by Sandip Maity.',
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: [
            getOgImageUrl({
                title: 'Projects Archive',
                description: 'Explore ECE, Fiber Optics, IoT, circuit design, utility tools, and web projects.',
                type: 'project',
            }),
        ],
    },
};

/**
 * Projects page - minimal, clean design
 */
export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                {
                                    '@type': 'ListItem',
                                    position: 1,
                                    name: 'Home',
                                    item: siteConfig.url,
                                },
                                {
                                    '@type': 'ListItem',
                                    position: 2,
                                    name: 'Projects',
                                    item: `${siteConfig.url}/projects`,
                                },
                            ],
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'ItemList',
                            name: 'Sandip Maity Projects',
                            itemListElement: projects.map((project, index) => ({
                                '@type': 'ListItem',
                                position: index + 1,
                                name: project.title,
                                description: project.description,
                                url: project.link || `${siteConfig.url}/projects`,
                            })),
                        },
                    ]),
                }}
            />

            <section className="mb-12 font-mono">
                <h1 className="mb-6 text-3xl font-semibold leading-tight text-subtle-text md:text-4xl">
                    Projects
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted">
                    A small archive of things I built, shipped, broke, fixed, and learned from.
                </p>
            </section>

            <section className="space-y-6">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </section>

            {projects.length === 0 && (
                <div className="py-16">
                    <p className="font-mono text-muted">No projects yet. Check back soon!</p>
                </div>
            )}
        </div>
    );
}
