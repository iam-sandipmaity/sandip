import { getAllPosts } from './posts';
import { Post } from '@/components/PostList';

export interface SectionNode {
    name: string;
    path: string;
    children: SectionNode[];
    postCount: number;
}

/**
 * Build a hierarchical tree structure from post slugs
 */
export function getFolderHierarchy(): SectionNode {
    const posts = getAllPosts();
    const root: SectionNode = {
        name: 'All Posts',
        path: '',
        children: [],
        postCount: posts.length,
    };

    posts.forEach((post) => {
        const parts = post.slug.split('/');

        // Only process if there are folders (not root-level posts)
        if (parts.length > 1) {
            let currentNode = root;
            let currentPath = '';

            // Process all parts except the last one (which is the post filename)
            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                currentPath = currentPath ? `${currentPath}/${part}` : part;

                // Find or create child node
                let childNode = currentNode.children.find(
                    (child) => child.name === part
                );

                if (!childNode) {
                    childNode = {
                        name: part,
                        path: currentPath,
                        children: [],
                        postCount: 0,
                    };
                    currentNode.children.push(childNode);
                }

                childNode.postCount++;
                currentNode = childNode;
            }
        }
    });

    // Sort children alphabetically at each level
    const sortChildren = (node: SectionNode) => {
        node.children.sort((a, b) => a.name.localeCompare(b.name));
        node.children.forEach(sortChildren);
    };
    sortChildren(root);

    return root;
}

/**
 * Get posts filtered by section path
 */
export function getPostsBySection(sectionPath: string): Post[] {
    const allPosts = getAllPosts();

    if (!sectionPath) {
        return allPosts;
    }

    return allPosts.filter((post) => {
        return post.slug.startsWith(sectionPath + '/');
    });
}

/**
 * Get all section paths as a flat array
 */
export function getAllSectionPaths(): string[] {
    const hierarchy = getFolderHierarchy();
    const paths: string[] = [];

    const collectPaths = (node: SectionNode) => {
        if (node.path) {
            paths.push(node.path);
        }
        node.children.forEach(collectPaths);
    };

    collectPaths(hierarchy);
    return paths;
}
