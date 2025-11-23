

import type { Metadata } from 'next';
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch with me for collaborations, questions, or just to say hi.',
    openGraph: {
        title: 'Contact Sandip Maity',
        description: 'Get in touch with me for collaborations, questions, or just to say hi.',
        images: ['/og?title=Contact Me'],
    },
};

/**
 * Contact page with social links
 */
export default function ContactPage() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-mono font-bold text-subtle-text mb-4">
                    Get in Touch
                </h1>
                <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
                    Have a question or want to work together? Feel free to reach out.
                </p>
            </div>

            {/* Contact Info & Social Links */}
            <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
                <h2 className="text-xl font-mono font-semibold text-subtle-text mb-6 text-center">
                    Connect With Me
                </h2>

                {/* Social Icons */}
                <div className="flex items-center gap-6 mb-8">
                    <a
                        href="mailto:contact.sandipmaity@gmail.com"
                        className="group flex flex-col items-center gap-2"
                        aria-label="Email"
                    >
                        <div className="p-4 bg-mid-dark border border-surface rounded-full hover:border-accent-teal hover:bg-accent-teal/10 transition-all duration-300 group-hover:scale-110">
                            <FiMail className="w-6 h-6 text-accent-teal" />
                        </div>
                        <span className="text-xs text-muted group-hover:text-accent-teal transition-colors">Email</span>
                    </a>

                    <a
                        href="https://github.com/iam-sandipmaity"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2"
                        aria-label="GitHub"
                    >
                        <div className="p-4 bg-mid-dark border border-surface rounded-full hover:border-accent-teal hover:bg-accent-teal/10 transition-all duration-300 group-hover:scale-110">
                            <FiGithub className="w-6 h-6 text-accent-teal" />
                        </div>
                        <span className="text-xs text-muted group-hover:text-accent-teal transition-colors">GitHub</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/iam-sandipmaity/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2"
                        aria-label="LinkedIn"
                    >
                        <div className="p-4 bg-mid-dark border border-surface rounded-full hover:border-accent-teal hover:bg-accent-teal/10 transition-all duration-300 group-hover:scale-110">
                            <FiLinkedin className="w-6 h-6 text-accent-teal" />
                        </div>
                        <span className="text-xs text-muted group-hover:text-accent-teal transition-colors">LinkedIn</span>
                    </a>

                    <a
                        href="https://x.com/iam_sandipmaity"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2"
                        aria-label="Twitter/X"
                    >
                        <div className="p-4 bg-mid-dark border border-surface rounded-full hover:border-accent-teal hover:bg-accent-teal/10 transition-all duration-300 group-hover:scale-110">
                            <FiTwitter className="w-6 h-6 text-accent-teal" />
                        </div>
                        <span className="text-xs text-muted group-hover:text-accent-teal transition-colors">Twitter</span>
                    </a>
                </div>

                {/* Response Time Note */}
                <div className="text-center">
                    <p className="text-muted text-sm leading-relaxed max-w-md">
                        I typically respond within 24-48 hours. For urgent matters,
                        please reach out via email directly.
                    </p>
                </div>
            </div>
        </div>
    );
}
