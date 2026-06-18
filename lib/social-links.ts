import { FiGithub, FiGlobe, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { siteConfig } from './config';
import type { IconType } from 'react-icons';

export interface SocialLink {
    href: string;
    label: string;
    icon: IconType;
    value?: string;
}

export const socialLinks: SocialLink[] = [
    {
        href: siteConfig.social.github,
        label: 'GitHub',
        icon: FiGithub,
        value: '@iam-sandipmaity',
    },
    {
        href: siteConfig.social.twitter,
        label: 'X',
        icon: FaXTwitter,
        value: '@iam_sandipmaity',
    },
    {
        href: `mailto:${siteConfig.email}`,
        label: 'Email',
        icon: FiMail,
        value: siteConfig.email,
    },
    {
        href: 'https://profile.sandipmaity.me',
        label: 'Profile',
        icon: FiGlobe,
        value: 'profile.sandipmaity.me',
    },
];
