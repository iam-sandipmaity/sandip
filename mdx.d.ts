declare module '*.mdx' {
    import { MDXProps } from 'mdx/types';

    export default function MDXContent(props: MDXProps): JSX.Element;
    export const metadata: {
        title: string;
        date: string;
        summary: string;
        tags: string[];
    };
}
