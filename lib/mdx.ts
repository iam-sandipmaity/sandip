import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import CodeBlock from '@/components/CodeBlock';
import MDXImage from '@/components/MDXImage';

export async function compileBlogMDX(source: string) {
    return compileMDX({
        source,
        options: {
            parseFrontmatter: false,
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeHighlight, rehypeKatex],
            },
        },
        components: {
            pre: CodeBlock,
            img: MDXImage,
            Image: MDXImage,
        },
    });
}
