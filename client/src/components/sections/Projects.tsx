import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@shared/schema';

import dashboardImg from '@assets/generated_images/Dashboard_app_project_mockup_8c0ee58f.png';
import ecommerceImg from '@assets/generated_images/E-commerce_website_mockup_9a9c4e56.png';
import socialImg from '@assets/generated_images/Social_media_app_mockup_e828318d.png';
import portfolioImg from '@assets/generated_images/Portfolio_website_mockup_2f8b0d20.png';
import taskImg from '@assets/generated_images/Task_management_app_mockup_4cc06f66.png';
import fitnessImg from '@assets/generated_images/Fitness_app_mockup_ada276f4.png';

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    id: '1',
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization platform with interactive charts and insights',
    longDescription: 'A comprehensive analytics platform featuring real-time data processing, interactive visualizations, and customizable dashboards.',
    image: dashboardImg,
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    role: 'Full Stack Developer',
    year: '2024',
    challenge: 'Processing and visualizing large datasets in real-time without performance degradation',
    solution: 'Implemented efficient data streaming with WebSockets and optimized rendering with virtual scrolling',
    outcome: '60% improvement in data processing speed and seamless user experience for 10,000+ data points',
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'Modern shopping experience with seamless checkout and product discovery',
    longDescription: 'A feature-rich e-commerce platform with advanced search, personalized recommendations, and secure payment processing.',
    image: ecommerceImg,
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
    role: 'Frontend Lead',
    year: '2024',
    challenge: 'Creating a fast, intuitive shopping experience while managing complex product catalogs',
    solution: 'Leveraged Next.js incremental static regeneration and implemented smart caching strategies',
    outcome: 'Page load times under 2 seconds and 35% increase in conversion rate',
  },
  {
    id: '3',
    title: 'Social Network App',
    description: 'Engaging social platform with real-time messaging and content sharing',
    longDescription: 'A dynamic social networking application featuring instant messaging, media sharing, and activity feeds.',
    image: socialImg,
    tags: ['React Native', 'Firebase', 'WebRTC', 'MongoDB'],
    role: 'Mobile Developer',
    year: '2023',
    challenge: 'Delivering real-time updates and maintaining app performance across devices',
    solution: 'Utilized Firebase real-time database with optimistic UI updates and efficient state management',
    outcome: 'Sub-second message delivery and 4.8-star rating on app stores',
  },
  {
    id: '4',
    title: 'Creative Portfolio',
    description: 'Award-winning portfolio site with immersive WebGL experiences',
    longDescription: 'An interactive portfolio showcasing creative work through engaging 3D graphics and smooth animations.',
    image: portfolioImg,
    tags: ['Three.js', 'GSAP', 'WebGL', 'React'],
    role: 'Creative Developer',
    year: '2023',
    challenge: 'Balancing visual spectacle with performance and accessibility',
    solution: 'Progressive enhancement approach with fallbacks and performance monitoring',
    outcome: 'Featured on Awwwards and 95+ Lighthouse performance score',
  },
  {
    id: '5',
    title: 'Task Management System',
    description: 'Collaborative project management tool with drag-and-drop interface',
    longDescription: 'A powerful task management application with team collaboration features, kanban boards, and time tracking.',
    image: taskImg,
    tags: ['Vue.js', 'Express', 'WebSocket', 'MySQL'],
    role: 'Full Stack Developer',
    year: '2023',
    challenge: 'Enabling seamless real-time collaboration for distributed teams',
    solution: 'Built custom WebSocket server with conflict resolution and operational transforms',
    outcome: 'Zero data conflicts across 50+ concurrent users and 40% productivity increase',
  },
  {
    id: '6',
    title: 'Fitness Tracker',
    description: 'Health and wellness app with personalized workout plans and progress tracking',
    longDescription: 'A comprehensive fitness application offering workout tracking, nutrition planning, and progress analytics.',
    image: fitnessImg,
    tags: ['React Native', 'GraphQL', 'PostgreSQL', 'Chart.js'],
    role: 'Mobile Lead',
    year: '2022',
    challenge: 'Creating an intuitive experience for tracking complex health metrics',
    solution: 'Designed adaptive UI with smart data visualization and predictive analytics',
    outcome: '100,000+ downloads and 4.7-star average rating',
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.project-card');
    
    gsap.set(cards, { opacity: 1 });
    
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" data-testid="heading-projects">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing diverse skills and creative solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="project-card group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 bg-card/50 backdrop-blur-sm"
              data-testid={`card-project-${project.id}`}
            >
              {/* Image container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Action buttons */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <Button size="sm" className="flex-1 gap-2 shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                    View Project
                  </Button>
                  <Button size="icon" variant="secondary" className="shadow-lg">
                    <Github className="w-4 h-4" />
                  </Button>
                </div>

                {/* Year badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-0 shadow-sm">
                    {project.year}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.id}`}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-project-description-${project.id}`}>
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-1 rounded-md bg-muted/50 text-xs font-medium text-muted-foreground"
                      data-testid={`badge-project-tag-${project.id}-${tag.toLowerCase()}`}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2.5 py-1 rounded-md bg-muted/50 text-xs font-medium text-muted-foreground">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { projects };
