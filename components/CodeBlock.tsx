'use client';

import { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

/**
 * Custom code block component with copy-to-clipboard functionality
 * Supports both button click and double-click to copy
 */
export default function CodeBlock({ children, className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [copyFailed, setCopyFailed] = useState(false);

    const copyToClipboard = async () => {
        // Extract text content from the code block
        // Handle both plain text and syntax-highlighted code
        const extractText = (node: any): string => {
            if (typeof node === 'string') {
                return node;
            }
            if (Array.isArray(node)) {
                return node.map(extractText).join('');
            }
            if (node?.props?.children) {
                return extractText(node.props.children);
            }
            return '';
        };

        const textContent = extractText(children);

        try {
            await navigator.clipboard.writeText(textContent);
            setCopied(true);
            setCopyFailed(false);
            setShowToast(true);

            setTimeout(() => {
                setCopied(false);
                setShowToast(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
            setCopyFailed(true);
            setShowToast(true);
            setTimeout(() => {
                setCopyFailed(false);
                setShowToast(false);
            }, 2000);
        }
    };

    const handleDoubleClick = () => {
        copyToClipboard();
    };

    return (
        <div className="code-block-wrapper group relative">
            {/* Toast notification */}
            {showToast && (
                <div className={`absolute top-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-20 ${copyFailed ? 'bg-red-500 text-white' : 'bg-accent-teal text-near-black'}`}>
                    {copyFailed ? <FiCopy className="w-4 h-4" /> : <FiCheck className="w-4 h-4" />}
                    <span className="font-medium text-sm">{copyFailed ? 'Failed to copy' : 'Copied to clipboard!'}</span>
                </div>
            )}

            {/* Copy button */}
            <button
                onClick={copyToClipboard}
                className="copy-button absolute top-3 right-3 p-2 rounded-lg bg-surface/90 hover:bg-surface border border-accent-teal/30 hover:border-accent-teal/50 opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 backdrop-blur-sm z-10"
                aria-label={copyFailed ? 'Copy failed' : copied ? 'Copied!' : 'Copy code to clipboard'}
                title={copyFailed ? 'Copy failed' : copied ? 'Copied!' : 'Copy code (or double-click code block)'}
            >
                {copyFailed ? (
                    <FiCopy className="w-4 h-4 text-red-400" />
                ) : copied ? (
                    <FiCheck className="w-4 h-4 text-accent-green" />
                ) : (
                    <FiCopy className="w-4 h-4 text-muted group-hover:text-accent-teal transition-colors" />
                )}
            </button>

            {/* Code block with double-click handler */}
            <pre
                className={`${className} cursor-pointer select-all`}
                onDoubleClick={handleDoubleClick}
                title="Double-click to copy"
                {...props}
            >
                {children}
            </pre>
        </div>
    );
}
