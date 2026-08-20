'use client';

import { useState } from 'react';
import { FiCheck, FiCopy, FiFileText } from 'react-icons/fi';

/**
 * Custom code block component with copy-to-clipboard functionality and code title headers
 * Supports title="filename.ext", language tags, and double-click to copy
 */
export default function CodeBlock({ children, className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Extract title, filename, or language from children props or pre props
    const childProps = (children as any)?.props || {};
    const codeClassName = childProps.className || className || '';
    const matchLang = codeClassName.match(/language-([^\s]+)/);
    const rawLanguage = matchLang ? matchLang[1] : '';

    const title = childProps.title || childProps.filename || childProps['data-filename'] || (props as any).title || (props as any).filename || '';
    const displayLanguage = rawLanguage ? rawLanguage.toUpperCase() : '';
    const hasHeader = Boolean(title || displayLanguage);

    const copyToClipboard = async () => {
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
            setShowToast(true);

            setTimeout(() => {
                setCopied(false);
                setShowToast(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    const handleDoubleClick = () => {
        copyToClipboard();
    };

    return (
        <div className="code-block-wrapper group relative my-6 rounded-lg border border-surface/70 bg-surface/30 overflow-hidden font-mono text-sm">
            {/* Header bar showing snippet title or language */}
            {hasHeader && (
                <div className="flex items-center justify-between border-b border-surface/70 bg-surface/50 px-4 py-2 text-xs font-mono text-muted">
                    <span className="flex items-center gap-2 truncate">
                        <FiFileText className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                        <span className="text-subtle-text font-medium truncate">
                            {title || (displayLanguage ? `${displayLanguage} Snippet` : 'Code')}
                        </span>
                    </span>
                    {displayLanguage && (
                        <span className="text-[10px] uppercase font-semibold text-accent-teal/80 tracking-wider shrink-0 ml-2">
                            {displayLanguage}
                        </span>
                    )}
                </div>
            )}

            {/* Toast notification */}
            {showToast && (
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 bg-accent-teal text-near-black px-3 py-1 rounded shadow-lg flex items-center gap-1.5 z-20 font-mono text-xs font-medium">
                    <FiCheck className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                </div>
            )}

            {/* Copy button */}
            <button
                onClick={copyToClipboard}
                className={`copy-button absolute ${hasHeader ? 'top-10' : 'top-3'} right-3 p-1.5 rounded bg-surface/90 hover:bg-surface border border-accent-teal/30 hover:border-accent-teal/50 opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 backdrop-blur-sm z-10`}
                aria-label={copied ? 'Copied!' : 'Copy code to clipboard'}
                title={copied ? 'Copied!' : 'Copy code (or double-click)'}
            >
                {copied ? (
                    <FiCheck className="w-4 h-4 text-accent-teal" />
                ) : (
                    <FiCopy className="w-4 h-4 text-muted group-hover:text-accent-teal transition-colors" />
                )}
            </button>

            {/* Code block with double-click handler */}
            <pre
                className={`${className || ''} cursor-pointer select-all p-4 overflow-x-auto`}
                onDoubleClick={handleDoubleClick}
                title="Double-click to copy"
                {...props}
            >
                {children}
            </pre>
        </div>
    );
}
