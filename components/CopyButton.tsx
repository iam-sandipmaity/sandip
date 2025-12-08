'use client';

import { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

interface CopyButtonProps {
    text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-lg bg-surface/80 hover:bg-surface border border-accent-teal/30 hover:border-accent-teal/50 transition-all duration-200 group"
            aria-label={copied ? 'Copied!' : 'Copy code'}
            title={copied ? 'Copied!' : 'Copy code'}
        >
            {copied ? (
                <FiCheck className="w-4 h-4 text-accent-teal" />
            ) : (
                <FiCopy className="w-4 h-4 text-muted group-hover:text-accent-teal transition-colors" />
            )}
        </button>
    );
}
