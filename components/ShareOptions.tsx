"use client";

import { useState, useEffect } from 'react';
import { FaXTwitter, FaWhatsapp, FaLinkedinIn, FaLink, FaShareNodes } from 'react-icons/fa6';

interface ShareOptionsProps {
    title: string;
    url: string;
}

export default function ShareOptions({ title, url }: ShareOptionsProps) {
    const [copied, setCopied] = useState(false);
    const [canNativeShare, setCanNativeShare] = useState(false);

    useEffect(() => {
        if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
            setCanNativeShare(true);
        }
    }, []);

    const handleCopyLink = async () => {
        const fullUrl = `${window.location.origin}${url}`;
        
        try {
            // Try modern clipboard API first (Requires HTTPS or localhost)
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(fullUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                return;
            }
        } catch (err) {
            console.error('Clipboard API failed', err);
        }

        // Fallback for non-secure contexts (like testing on local network HTTP)
        try {
            const textArea = document.createElement("textarea");
            textArea.value = fullUrl;
            
            // Prevent scrolling to bottom of page in MS Edge
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            if (successful) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
            document.body.removeChild(textArea);
        } catch (e) {
            console.error('Fallback copy failed', e);
        }
    };

    const handleNativeShare = async () => {
        try {
            await navigator.share({
                title,
                url,
            });
        } catch (err) {
            console.error('Failed to share:', err);
        }
    };

    const encodedUrl = encodeURIComponent(`https://sandipmaity.me${url}`);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    };

    return (
        <div className="mt-16 pt-8 border-t border-[#222]">
            <h3 className="text-xl font-mono font-bold text-subtle-text mb-6">Share this post</h3>
            <div className="flex flex-wrap gap-4">
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-[#e7e9ea] hover:bg-[#1DA1F2]/10 rounded-md transition-colors font-mono text-sm border border-[#333] hover:border-[#1DA1F2]/50"
                    aria-label="Share on X (Twitter)"
                >
                    <FaXTwitter size={16} />
                    <span>Post</span>
                </a>
                
                <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-[#25D366] hover:bg-[#25D366]/10 rounded-md transition-colors font-mono text-sm border border-[#333] hover:border-[#25D366]/50"
                    aria-label="Share on WhatsApp"
                >
                    <FaWhatsapp size={16} />
                    <span>WhatsApp</span>
                </a>

                <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-[#0A66C2] hover:bg-[#0A66C2]/10 rounded-md transition-colors font-mono text-sm border border-[#333] hover:border-[#0A66C2]/50"
                    aria-label="Share on LinkedIn"
                >
                    <FaLinkedinIn size={16} />
                    <span>LinkedIn</span>
                </a>

                <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2 text-muted hover:text-subtle-text hover:bg-white/5 rounded-md transition-colors font-mono text-sm border border-[#333] hover:border-[#666]"
                    aria-label="Copy Link"
                >
                    <FaLink size={16} />
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>

                {canNativeShare && (
                    <button
                        onClick={handleNativeShare}
                        className="flex items-center gap-2 px-4 py-2 text-muted hover:text-subtle-text hover:bg-white/5 rounded-md transition-colors font-mono text-sm border border-[#333] hover:border-[#666]"
                        aria-label="Share via device"
                    >
                        <FaShareNodes size={16} />
                        <span>Share...</span>
                    </button>
                )}
            </div>
        </div>
    );
}
