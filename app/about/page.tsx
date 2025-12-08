import type { Metadata } from 'next';
import { FiCode, FiCpu, FiZap, FiTool, FiBookOpen, FiTarget } from 'react-icons/fi';

export const metadata: Metadata = {
    title: 'About - Embedded Developer & Engineer',
    description: 'Electronics and Communication Engineering student passionate about embedded systems, Arduino, STM32, circuit design, PCB development, and IoT solutions. Learn about my skills and journey.',
    alternates: {
        canonical: 'https://sandipmaity.me/about',
    },
    openGraph: {
        title: 'About Sandip Maity - Embedded Developer',
        description: 'Electronics and Communication Engineering student passionate about embedded systems, Arduino, STM32, circuit design, PCB development, and IoT solutions.',
        url: 'https://sandipmaity.me/about',
        siteName: 'Sandip Maity Portfolio',
        images: [
            {
                url: '/og?title=About Me',
                width: 1200,
                height: 630,
                alt: 'About Sandip Maity',
            },
        ],
        locale: 'en_US',
        type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Sandip Maity - Embedded Developer',
        description: 'Electronics and Communication Engineering student passionate about embedded systems, Arduino, STM32, circuit design, PCB development, and IoT solutions.',
        creator: '@iam_sandipmaity',
        images: ['/og?title=About Me'],
    },
};

/**
 * About page with bio and skills
 */
export default function AboutPage() {
    const skillCategories = [
        {
            title: 'Programming',
            icon: FiCode,
            skills: ['C/C++', 'Embedded C', 'Python', 'MATLAB'],
        },
        {
            title: 'Microcontrollers',
            icon: FiCpu,
            skills: ['Arduino', 'STM32', 'ESP32'],
        },
        {
            title: 'Hardware Design',
            icon: FiTool,
            skills: ['Circuit Design', 'PCB Design', 'LT Spice'],
        },
        {
            title: 'Systems',
            icon: FiZap,
            skills: ['IoT Systems', 'Real-time Systems'],
        },
    ];

    const currentActivities = [
        {
            icon: FiCpu,
            title: 'Embedded Systems Development',
            description: 'Building projects with Arduino, STM32, and real-time C/C++',
        },
        {
            icon: FiTool,
            title: 'Circuit & PCB Design',
            description: 'Designing and testing circuits, PCBs, and IoT-based hardware solutions',
        },
        {
            icon: FiZap,
            title: 'Microcontroller Exploration',
            description: 'Exploring sensors, communication protocols, and embedded systems',
        },
        {
            icon: FiCode,
            title: 'Full-Stack Development',
            description: 'Expanding skills into web development and modern frameworks',
        },
        {
            icon: FiBookOpen,
            title: 'Learning & Documenting',
            description: 'Sharing my journey across electronics and engineering',
        },
    ];

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
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
                                item: 'https://sandipmaity.me',
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'About',
                                item: 'https://sandipmaity.me/about',
                            },
                        ],
                    }),
                }}
            />

            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-subtle-text mb-4">
                    About Me
                </h1>
                <div className="h-1 w-20 bg-accent-teal rounded-full"></div>
            </div>

            {/* Introduction Card */}
            <div className="mb-12 p-8 bg-mid-dark border border-surface rounded-xl hover:border-accent-teal/30 transition-colors">
                <p className="text-lg text-subtle-text leading-relaxed mb-4">
                    Hi, I&apos;m <span className="text-accent-teal font-semibold">Sandip Maity</span>.
                </p>
                <p className="text-muted leading-relaxed mb-4">
                    I&apos;m an Electronics and Communication Engineering student passionate about building smart,
                    efficient, and reliable hardware–software systems.
                </p>
                <p className="text-muted leading-relaxed">
                    Currently, I&apos;m working on improving my embedded system skills, building impactful electronics
                    projects, and sharing my learning journey through my work. I believe in clean design, thoughtful
                    engineering, and constantly pushing my boundaries as I grow.
                </p>
            </div>

            {/* Skills Section */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                    <FiTarget className="w-7 h-7 text-accent-teal flex-shrink-0 self-center" />
                    <h2 className="text-2xl md:text-3xl font-mono font-semibold text-subtle-text">
                        Core Skills
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={category.title}
                                className="p-6 bg-mid-dark border border-surface rounded-xl hover:border-accent-teal/30 transition-all hover:shadow-lg hover:shadow-accent-teal/5"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-surface rounded-lg">
                                        <Icon className="w-5 h-5 text-accent-teal" />
                                    </div>
                                    <h3 className="text-lg font-mono font-semibold text-subtle-text">
                                        {category.title}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-surface border border-accent-teal/20 text-accent-teal rounded-lg text-sm font-medium hover:border-accent-teal/40 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quote */}
            <div className="mb-16 p-8 bg-gradient-to-br from-mid-dark to-surface border border-accent-teal/20 rounded-xl">
                <p className="text-muted text-center italic text-lg">
                    &quot;Engineering is the closest thing to magic that exists in the world.&quot;
                </p>
                <p className="text-accent-teal text-center mt-2 font-medium">— Elon Musk</p>
            </div>

            {/* Current Activities */}
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <FiZap className="w-7 h-7 text-accent-teal flex-shrink-0 self-center" />
                    <h2 className="text-2xl md:text-3xl font-mono font-semibold text-subtle-text">
                        What I&apos;m Up To
                    </h2>
                </div>

                <div className="space-y-4">
                    {currentActivities.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                            <div
                                key={index}
                                className="group p-6 bg-mid-dark border border-surface rounded-xl hover:border-accent-teal/30 transition-all hover:shadow-lg hover:shadow-accent-teal/5"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-surface rounded-lg group-hover:bg-accent-teal/10 transition-colors">
                                        <Icon className="w-5 h-5 text-accent-teal" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-subtle-text mb-2">
                                            {activity.title}
                                        </h3>
                                        <p className="text-muted leading-relaxed">
                                            {activity.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
