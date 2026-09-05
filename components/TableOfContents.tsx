import type { Heading } from '@/lib/headings';

interface TocNode {
    heading: Heading;
    children: TocNode[];
}

function buildTocTree(headings: Heading[]): TocNode[] {
    const root: TocNode[] = [];
    const stack: TocNode[] = [];

    for (const heading of headings) {
        const node: TocNode = { heading, children: [] };

        while (stack.length > 0 && stack[stack.length - 1].heading.level >= heading.level) {
            stack.pop();
        }

        if (stack.length > 0) {
            stack[stack.length - 1].children.push(node);
        } else {
            root.push(node);
        }

        stack.push(node);
    }

    return root;
}

function TocList({ nodes, depth }: { nodes: TocNode[]; depth: number }) {
    return (
        <ul className={depth === 0 ? 'mt-4 text-xs' : 'ps-3'}>
            {nodes.map((node) => (
                <li key={node.heading.id} className={depth === 0 ? 'mt-3' : 'mt-1.5'}>
                    <a
                        href={`#${node.heading.id}`}
                        className="block font-mono leading-snug text-muted line-clamp-2 transition-colors hover:text-accent-teal"
                    >
                        <span className="me-0.5 text-accent-teal/60" aria-hidden="true">#</span>
                        {node.heading.text}
                    </a>
                    {node.children.length > 0 && <TocList nodes={node.children} depth={depth + 1} />}
                </li>
            ))}
        </ul>
    );
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
    if (headings.length === 0) return null;

    const tree = buildTocTree(headings);

    return (
        <aside className="order-2 -me-32 sticky top-20 hidden w-64 flex-shrink-0 lg:block">
            <h2 className="font-mono text-sm font-semibold text-subtle-text">
                Table of Contents
            </h2>
            <TocList nodes={tree} depth={0} />
        </aside>
    );
}