import { Project } from '@/components/ProjectCard';

/**
 * My actual projects
 */
export const projects: Project[] = [

    {
        title: 'Multi-Utility Web Platform',
        description: 'Built and deployed a web platform offering 100+ tools (image processing, PDF utilities, calculators, converters, encryption, SEO tools, etc.) under Vibe Coding. Developed using React (TSX), TypeScript, and Vercel, ensuring responsive UI and smooth performance.',
        tags: ['React', 'TypeScript', 'Vercel', 'Full-Stack'],
        link: 'https://snaptools.sandipmaity.me',
        github: 'https://github.com/iam-sandipmaity/SnapTools',
    },
    {
        title: 'Video Downloader - Android App',
        description: 'Developed a comprehensive Android video downloading application with full APK deployment. Built using native Android development tools for seamless video processing, multiple format support, and user-friendly download management. Includes efficient background processing and storage optimization for smooth user experience.',
        tags: ['Android', 'Mobile App', 'Video Processing', 'APK'],
        link: 'https://video.sandipmaity.me',
        github: 'https://github.com/iam-sandipmaity/video-downloader',
    },
    {
        title: 'SeriesRating – TV Series Rating Visualizer',
        description: 'Built an interactive web app to explore IMDb TV series ratings in a clean, visual format. Fetches real-time data from the OMDb API and displays episode-wise ratings using heatmap-style visualizations for quick pattern recognition. Includes fast search, detailed breakdowns, and a responsive UI optimized for performance.',
        tags: ['HTML', 'CSS', 'JavaScript', 'OMDb API', 'Data Visualization'],
        link: 'https://seriesrating.sandipmaity.me/',
        github: 'https://github.com/iam-sandipmaity/seriesrating',
    },
    {
        title: 'AuctionMaker – Online Auction Platform',
        description: 'Developed a full-stack online auction platform that allows users to create auctions, place real-time bids, and track auction activity. Focused on clean UX, secure bid handling, and smooth state updates. Built with modern web technologies and deployed for public use.',
        tags: ['React', 'TypeScript', 'Full-Stack', 'Web App'],
        link: 'https://auction.sandipmaity.me',
        github: 'https://github.com/iam-sandipmaity/AuctionMaker',
    },
    {
        title: 'WeatherWise – Advanced Weather Forecast App',
        description: 'Designed and deployed a full-featured weather application delivering real-time and 15-day forecasts using Open-Meteo APIs. Includes dynamic charts, AQI insights, comfort index, UV tracking, hourly & daily breakdowns, and an interactive 3D globe for location visualization. Built with html5, Tailwind CSS and JavaScript, optimized for responsiveness and smooth performance.',
        tags: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
        link: 'https://weather.sandipmaity.me',
        github: 'https://github.com/iam-sandipmaity/WeatherWise',
    },

    {
        title: 'Crypto Info Dashboard',
        description: 'Created and deployed a cryptocurrency dashboard that displays real-time market data, price tracking, charts, and coin details using coingecko APIs. Focused on performance and interactive UI for a seamless financial data viewing experience.',
        tags: ['React', 'API Integration', 'Real-Time Data', 'Vercel'],
        link: 'https://crypto.sandipmaity.me',
        github: 'https://github.com/iam-sandipmaity/CryptoTracker',
    },
    {
        title: 'DevLog – Automated GitHub Activity Tracker',
        description: 'Developed and deployed an automated development log platform that aggregates commits, PR merges, releases, issues, and updates from all repositories into a unified timeline. Powered by Supabase for real-time event storage and GitHub Webhooks for automatic syncing. Built with Next.js and TypeScript for optimized performance, API routing, and a secure admin panel with password-based access. Features a clean, responsive UI with Tailwind CSS.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'GitHub Webhooks'],
        link: 'https://log.sandipmaity.me',
        github: 'https://github.com/iam-sandipmaity/log',
    },

    {
        title: 'Arduino Obstacle Avoiding Car',
        description: 'Built an autonomous car using Arduino Uno, ultrasonic sensors, and motor drivers to detect and avoid obstacles. Gained hands-on experience in C programming by implementing real-time control logic for sensor integration and navigation.',
        tags: ['Arduino', 'C Programming', 'Embedded Systems', 'Sensors'],
        link: 'https://x.com/iam_sandipmaity/status/1776746344415465719?s=20',
    },
    {
        title: 'MF Tracker – Mutual Fund Portfolio Analyzer',
        description: 'Developed a smart portfolio analysis tool that categorizes mutual funds, tracks allocation across different fund types, and highlights potential red flags in asset distribution. Built with React (TSX), TypeScript, and modern UI principles to offer fast insights and clean data visualization.',
        tags: ['React', 'TypeScript', 'Finance Tools', 'Frontend'],
        link: 'https://mftracker.sandipmaity.me',
        github: 'https://github.com/iam-sandipmaity/mftracker', // If repo exists—else remove
    },
    {
        title: 'Online Code Runner',
        description: 'Developed and deployed an online code execution platform supporting multiple programming languages with instant output preview. Designed with a secure sandboxed environment for running code in-browser. Ensures smooth performance and modern UI for developers.',
        tags: ['React', 'JavaScript', 'Web Compiler', 'Deployment'],
        link: 'https://runr.sandipmaity.me/',
        github: 'https://github.com/iam-sandipmaity/Runr',
    },


    {
        title: 'PN Sequence Generator Device',
        description: 'Collaborated with faculty to design and assemble 4 hardware circuit boards for generating pseudo-noise (PN) sequences. Gained hands-on experience in circuit design, PCB assembly, and functional testing under lab supervision.',
        tags: ['Circuit Design', 'PCB Assembly', 'Hardware', 'PN Sequence'],
    },

];

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
    return projects;
}

/**
 * Get featured projects (first N projects)
 */
export function getFeaturedProjects(count: number = 2): Project[] {
    return projects.slice(0, count);
}
