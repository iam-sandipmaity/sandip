import type { MDXComponents } from 'mdx/types';
import CodeBlock from '@/components/CodeBlock';
import MDXImage from '@/components/MDXImage';

/**
 * Custom MDX components for blog posts
 * Allows customization of how MDX elements are rendered
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        pre: CodeBlock,
        img: MDXImage,
        Image: MDXImage,
    };
}
