'use client';

import { useState } from 'react';

/**
 * Custom code block component with copy-to-clipboard functionality
 * Wraps pre elements in MDX blog posts
 */
export default function CodeBlock({ children, className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        // Extract text content from the code block
        const codeElement = (children as any)?.props?.children;
        const textContent = typeof codeElement === 'string'
            ? codeElement
            : codeElement?.props?.children || '';

        try {
            await navigator.clipboard.writeText(textContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    return (
        <div className="code-block-wrapper group relative">
            <button
                onClick={handleCopy}
                className="copy-button absolute top-3 right-3 p-2 rounded-md bg-surface/80 hover:bg-surface border border-accent-teal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100"
                aria-label="Copy code to clipboard"
                title="Copy code"
            >
                {copied ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-accent-green"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-accent-teal"
                    >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                )}
            </button>
            <pre className={className} {...props}>
                {children}
            </pre>
        </div>
    );
}
