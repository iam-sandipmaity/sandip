import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { makePageMetadata } from '@/lib/metadata';
import { socialLinks } from '@/lib/social-links';
import PageContainer from '@/components/PageContainer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = makePageMetadata({
    title: 'About - Embedded Developer & Engineer',
    description: 'Electronics and Communication Engineering student passionate about embedded systems, Arduino, STM32, circuit design, PCB development, and IoT solutions.',
    path: '/about',
    ogTitle: 'About Sandip Maity - Embedded Developer',
    ogDescription: 'Electronics and Communication Engineering student passionate about embedded systems.',
    ogType: 'profile',
});

export default function AboutPage() {
    return (
        <PageContainer>
            <BreadcrumbJsonLd items={[{ name: 'About', path: '/about' }]} />

            {/* Header */}
            <section className="mb-16">
                <h1 className="text-3xl md:text-4xl font-mono font-semibold text-subtle-text mb-4">
                    About Me
                </h1>
                <div className="h-px bg-surface w-24" />
            </section>

            {/* Introduction */}
            <section className="mb-12">
                <p className="text-lg md:text-xl font-mono text-subtle-text leading-relaxed">
                    Hi, I&apos;m <span className="text-accent-teal">{siteConfig.author}</span>.
                </p>
                <p className="font-mono text-lg text-muted leading-relaxed mt-4">
                    An Electronics and Communication Engineering student building the future with code and circuits.
                </p>
            </section>

            {/* What I do */}
            <section className="mb-12">
                <h2 className="text-lg font-mono font-medium text-subtle-text mb-4">
                    What I do
                </h2>
                <div className="font-mono text-muted leading-relaxed space-y-4">
                    <p>
                        I don&apos;t know what I am doing at all.
                    </p>
                    <p>
                        Most days I am just trying things, breaking things, learning a little, and
                        pretending the confusing parts are part of the plan.
                    </p>
                    <p>
                        That is the whole method for now.
                    </p>
                </div>
            </section>

            {/* Connect */}
            <section className="mb-12">
                <h2 className="text-lg font-mono font-medium text-subtle-text mb-4">
                    Connect
                </h2>
                <div className="flex flex-wrap gap-6">
                    {socialLinks.map(({ href, label, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                            className="flex items-center gap-2 text-muted hover:text-accent-teal transition-colors"
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-mono">{label}</span>
                        </a>
                    ))}
                </div>
            </section>

            {/* Quote */}
            <section className="py-8 border-t border-b border-dotted border-surface/30">
                <p className="text-muted italic text-lg font-mono text-center">
                    &ldquo;Engineering is the closest thing to magic that exists in the world.&rdquo;
                </p>
                <p className="text-accent-teal text-center mt-3 font-mono font-medium">— Elon Musk</p>
            </section>
        </PageContainer>
    );
}
