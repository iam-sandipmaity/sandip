'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from '@/components/PostList';

interface BlogFilterContextType {
    filteredPosts: Post[];
    activeFilter: string;
    resetTrigger: number;
    setFilteredPosts: (posts: Post[]) => void;
    setActiveFilter: (filter: string) => void;
    clearFilter: (allPosts: Post[]) => void;
}

const BlogFilterContext = createContext<BlogFilterContextType | undefined>(undefined);

export function BlogFilterProvider({ children, allPosts }: { children: ReactNode; allPosts: Post[] }) {
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(allPosts);
    const [activeFilter, setActiveFilter] = useState<string>('');
    const [resetTrigger, setResetTrigger] = useState(0);

    const clearFilter = (posts: Post[]) => {
        setFilteredPosts(posts);
        setActiveFilter('');
        setResetTrigger(prev => prev + 1);
    };

    return (
        <BlogFilterContext.Provider
            value={{
                filteredPosts,
                activeFilter,
                resetTrigger,
                setFilteredPosts,
                setActiveFilter,
                clearFilter,
            }}
        >
            {children}
        </BlogFilterContext.Provider>
    );
}

export function useBlogFilter() {
    const context = useContext(BlogFilterContext);
    if (!context) {
        throw new Error('useBlogFilter must be used within BlogFilterProvider');
    }
    return context;
}
