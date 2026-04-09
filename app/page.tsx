import type { Metadata } from 'next';
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiArrowRight } from 'react-icons/fi';
import { getRecentPosts } from '@/lib/posts';
import { getFeaturedProjects } from '@/lib/projects';
import { siteConfig } from '@/lib/config';
import PostList from '@/components/PostList';
import ProjectCard from '@/components/ProjectCard';

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [
            {
                url: '/og?title=Sandip Maity',
                width: 1200,
                height: 630,
                alt: siteConfig.author,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
        creator: siteConfig.social.twitter.replace('https://x.com/', '@'),
        images: ['/og?title=Sandip Maity'],
    },
};

export default function Home() {
    const recentPosts = getRecentPosts(2);
    const featuredProjects = getFeaturedProjects(2);

    return (
        <>
            {/* Schema.org structured data for homepage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ProfilePage',
                        mainEntity: {
                            '@type': 'Person',
                            name: siteConfig.author,
                            url: siteConfig.url,
                            image: `${siteConfig.url}/og?title=Sandip Maity`,
                            jobTitle: 'Embedded Systems Developer',
                            description: siteConfig.description,
                            knowsAbout: ['Embedded Systems', 'Circuit Design', 'IoT', 'Arduino', 'STM32', 'ESP32', 'PCB Design', 'Firmware Development'],
                            sameAs: [
                                siteConfig.social.github,
                                siteConfig.social.twitter,
                                siteConfig.social.linkedin,
                            ],
                        },
                    }),
                }}
            />
            <div className="max-w-4xl mx-auto px-6 py-16">
            {/* Hero Section */}
            <section className="mb-20">
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-subtle-text mb-6 leading-tight">
                    Building elegant solutions<br />
                    {/* <span className="text-accent-teal">one line at a time.</span> */}
                    <span className="text-accent-teal">from code to circuits.</span>
                </h1>
                <p className="font-mono text-lg text-muted leading-relaxed mb-8 max-w-2xl">
                    Embedded developer, circuit designer, and occasional maker. I create practical
                    IoT solutions and document the process as I grow.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-6 mb-8">
                    <Link
                        href="/projects"
                        className="font-mono inline-flex items-center gap-2 text-lg text-muted hover:text-accent-teal transition-colors group"
                    >
                        View Projects
                        <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/blog"
                        className="font-mono inline-flex items-center gap-2 text-lg text-muted hover:text-accent-teal transition-colors"
                    >
                        Read Blog
                    </Link>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                    <a
                        href={siteConfig.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted hover:text-accent-teal transition-colors"
                        aria-label="GitHub"
                    >
                        <FiGithub className="w-6 h-6" />
                    </a>
                    <a
                        href={siteConfig.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted hover:text-accent-teal transition-colors"
                        aria-label="LinkedIn"
                    >
                        <FiLinkedin className="w-6 h-6" />
                    </a>
                    <a
                        href={`mailto:${siteConfig.email}`}
                        className="p-2 text-muted hover:text-accent-teal transition-colors"
                        aria-label="Email"
                    >
                        <FiMail className="w-6 h-6" />
                    </a>
                    <a
                        href={siteConfig.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted hover:text-accent-teal transition-colors"
                        aria-label="Twitter/X"
                    >
                        <FiTwitter className="w-6 h-6" />
                    </a>
                </div>
            </section>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-mono font-semibold text-subtle-text">
                            Featured Projects
                        </h2>
                        <Link href="/projects" className="font-mono text-sm text-accent-teal hover:text-accent-hover transition-colors">
                            View all →
                        </Link>
                    </div>
                    <div className="space-y-6">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.title} project={project} />
                        ))}
                    </div>
                </section>
            )}

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-mono font-semibold text-subtle-text">
                            Recent Posts
                        </h2>
                        <Link href="/blog" className="font-mono text-sm text-accent-teal hover:text-accent-hover transition-colors">
                            View all →
                        </Link>
                    </div>
                    <PostList posts={recentPosts} showTags={false} />
                </section>
            )}
        </div>
        </>
    );
}
