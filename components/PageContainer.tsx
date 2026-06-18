import type { ReactNode } from 'react';

interface PageContainerProps {
    children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
    return (
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            {children}
        </div>
    );
}
