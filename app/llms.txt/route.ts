import { getAllPosts } from '@/lib/posts';
import { getAllProjects } from '@/lib/projects';

/**
 * Generate llms.txt file dynamically
 * This file helps LLMs understand your website structure
 * Accessible at: https://sandipmaity.me/llms.txt
 */
export async function GET() {
    const baseUrl = 'https://sandipmaity.me';
    
    // Get all blog posts
    const posts = getAllPosts();
    
    // Get all projects
    const projects = getAllProjects();
    
    // Navigation links (from Header component)
    const navLinks = [
        { href: '/', label: 'Home', description: 'Homepage and introduction to Sandip Maity' },
        { href: '/about', label: 'About', description: 'About me, my skills, and background in embedded systems' },
        { href: '/projects', label: 'Projects', description: 'Portfolio of embedded systems, IoT, and web development projects' },
        { href: '/blog', label: 'Blog', description: 'Technical articles and tutorials on embedded systems, web development, and more' },
        { href: '/reads', label: 'Reads', description: 'Curated reading list and resources' },
        { href: '/contact', label: 'Contact', description: 'Get in touch with me' },
    ];
    
    // Build the llms.txt content
    let content = `# sandipmaity.me

> Electronics and Communication Engineering student passionate about embedded systems, circuit design, IoT solutions, and web development. This portfolio showcases my projects, technical blog posts, and professional journey.

## Navigation

`;
    
    // Add navigation links
    navLinks.forEach(link => {
        content += `- [${link.label}](${baseUrl}${link.href}): ${link.description}\n`;
    });
    
    // Add projects section
    content += `\n## Projects\n\n`;
    projects.forEach(project => {
        const projectUrl = project.link || `${baseUrl}/projects#${project.title.toLowerCase().replace(/\s+/g, '-')}`;
        content += `- [${project.title}](${projectUrl}): ${project.description}\n`;
    });
    
    // Add blog posts section
    content += `\n## Blog Posts\n\n`;
    posts.forEach(post => {
        content += `- [${post.title}](${baseUrl}/blog/${post.slug}): ${post.summary}\n`;
    });
    
    // Add metadata section
    content += `\n## Additional Information

- **RSS Feed**: [${baseUrl}/feed.xml](${baseUrl}/feed.xml)
- **Sitemap**: [${baseUrl}/sitemap.xml](${baseUrl}/sitemap.xml)
- **GitHub**: [github.com/iam-sandipmaity](https://github.com/iam-sandipmaity)
- **Twitter**: [@iam_sandipmaity](https://twitter.com/iam_sandipmaity)
- **LinkedIn**: [linkedin.com/in/sandipmaity](https://linkedin.com/in/sandipmaity)
`;
    
    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
