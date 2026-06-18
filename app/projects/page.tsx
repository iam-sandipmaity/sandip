import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import { makePageMetadata } from '@/lib/metadata';
import PageContainer from '@/components/PageContainer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = makePageMetadata({
    title: 'Projects - Arduino, STM32 & IoT Solutions',
    description: 'Explore embedded systems projects featuring Arduino, STM32, ESP32, circuit design, PCB development, and IoT solutions. Practical implementations and technical documentation.',
    path: '/projects',
    ogTitle: 'Embedded Systems Projects by Sandip Maity',
    ogDescription: 'Explore embedded systems projects featuring Arduino, STM32, ESP32, circuit design, PCB development, and IoT solutions.',
});

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <PageContainer>
            <BreadcrumbJsonLd items={[{ name: 'Projects', path: '/projects' }]} />

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
        </PageContainer>
    );
}
