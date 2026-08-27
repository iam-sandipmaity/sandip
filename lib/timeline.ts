export interface TimelineItem {
    id: string;
    year: string;
    date: string;
    title: string;
    roleOrContext: string;
    category: 'career' | 'education' | 'project' | 'milestone';
    description: string;
    link?: string;
    highlights?: string[];
}

export const timelineItems: TimelineItem[] = [
    {
        id: 'career-start',
        year: '2026',
        date: 'Aug 2026',
        title: 'Started Career as Fiber Optics & Utility Engineer',
        roleOrContext: 'Career',
        category: 'career',
        description: 'Working on fiber optic network infrastructure and utility engineering.',
    },
    {
        id: 'btech-end',
        year: '2026',
        date: 'Jul 2026',
        title: 'Completed B.Tech in ECE',
        roleOrContext: 'Education',
        category: 'education',
        description: 'Graduated in Electronics & Communication Engineering.',
    },
    {
        id: 'btech-start',
        year: '2022',
        date: 'Sep 2022',
        title: 'Started B.Tech in ECE',
        roleOrContext: 'Education',
        category: 'education',
        description: 'Began undergraduate studies in Electronics & Communication Engineering.',
    },
    {
        id: 'higher-secondary',
        year: '2022',
        date: '2022',
        title: 'Passed Higher Secondary',
        roleOrContext: 'Education',
        category: 'education',
        description: 'Completed higher secondary school education.',
    },
    {
        id: 'secondary',
        year: '2020',
        date: '2020',
        title: 'Passed Secondary School',
        roleOrContext: 'Education',
        category: 'education',
        description: 'Completed secondary school education.',
    },
    {
        id: 'born',
        year: '2004',
        date: '19 Jan 2004',
        title: 'Born',
        roleOrContext: 'Milestone',
        category: 'milestone',
        description: 'Began my journey on January 19, 2004.',
    },
];

export function getAllTimelineItems(): TimelineItem[] {
    return timelineItems;
}
