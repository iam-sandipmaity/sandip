import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Projects - Arduino, STM32 & IoT Solutions',
    description: 'Explore embedded systems projects featuring Arduino, STM32, ESP32, circuit design, PCB development, and IoT solutions. Practical implementations and technical documentation.',
    alternates: {
        canonical: `${siteConfig.url}/projects`,
    },
    openGraph: {
        title: 'Embedded Systems Projects by Sandip Maity',
        description: 'Explore embedded systems projects featuring Arduino, STM32, ESP32, circuit design, PCB development, and IoT solutions.',
        url: `${siteConfig.url}/projects`,
        siteName: siteConfig.name,
        images: [
            {
                url: '/og?title=My Projects',
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
        title: 'Embedded Systems Projects by Sandip Maity',
        description: 'Explore embedded systems projects featuring Arduino, STM32, ESP32, circuit design, PCB development, and IoT solutions.',
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: ['/og?title=My Projects'],
    },
};

/**
 * Projects page - minimal, clean design
 */
export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            {/* Breadcrumb Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
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
                    }),
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

            <section className="divide-y divide-dotted divide-surface/70 border-y border-dotted border-surface/70">
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
