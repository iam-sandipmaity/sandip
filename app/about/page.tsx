import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about me, my background, and what I do.',
    openGraph: {
        title: 'About Sandip Maity',
        description: 'Learn more about me, my background, and what I do.',
        images: ['/og?title=About Me'],
    },
};

/**
 * About page with bio and skills
 */
export default function AboutPage() {
    const skills = [
        'C/C++',
        'Embedded C',
        'Arduino',
        'STM32',
        'ESP32',
        'Circuit Design',
        'PCB Design',
        'MATLAB',
        'Python',
        'IoT Systems',
        'LT Spice',
    ];

    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-mono font-bold text-subtle-text mb-8">
                About Me
            </h1>

            <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted leading-relaxed mb-6">
                    Hi, I&apos;m <span className="text-accent-teal font-semibold">Sandip Maity</span>.
                    I&apos;m an Electronics and Communication Engineering student passionate about building smart,
                    efficient, and reliable hardware–software systems.
                </p>

                {/* <p className="text-muted leading-relaxed mb-6">
                    I specialize in full-stack development with a focus on TypeScript, React, and Node.js.
                    I love working on challenging problems that require both technical depth and creative
                    thinking. When I&apos;m not coding, you&apos;ll find me reading about system design, exploring
                    new technologies, or contributing to open source.
                </p> */}

                <p className="text-lg text-muted leading-relaxed mb-8">
                    Currently, I&apos;m working on improving my embedded system skills, building impactful electronics
                    projects, and sharing my learning journey through my work. I believe in clean design, thoughtful
                    engineering, and constantly pushing my boundaries as I grow.
                </p>

                {/* Skills Section */}
                <h2 className="text-2xl font-mono font-semibold text-subtle-text mb-6 mt-12">
                    Core Skills
                </h2>
                <div className="flex flex-wrap gap-3 mb-12">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-4 py-2 bg-surface border border-accent-teal/30 text-accent-teal rounded-lg text-sm font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Optional: Add an abstract image or portrait here */}
                <div className="my-12 p-8 bg-mid-dark border border-surface rounded-lg">
                    <p className="text-muted text-center italic">
                        {/* &quot;Code is like humor. When you have to explain it, it&apos;s bad.&quot; — Cory House
                        <br /> */}
                        &quot;Engineering is the closest thing to magic that exists in the world.&quot; — Elon Musk
                    </p>
                </div>

                <h2 className="text-2xl font-mono font-semibold text-subtle-text mb-6">
                    What I&apos;m Up To
                </h2>
                <ul className="space-y-3 text-muted">
                    <li className="flex items-start gap-3">
                        <span className="text-accent-teal mt-1">→</span>
                        <span>Building embedded systems with Arduino, STM32, and real-time C/C++</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-accent-teal mt-1">→</span>
                        <span>Designing and testing circuits, PCBs, and IoT-based hardware solutions</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-accent-teal mt-1">→</span>
                        <span>Exploring microcontrollers, sensors, and communication protocols</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-accent-teal mt-1">→</span>
                        <span>Working on web projects to expand into full-stack development</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-accent-teal mt-1">→</span>
                        <span>Learning and documenting my journey across electronics and engineering</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
