import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Github } from 'lucide-react';
import { AnimatedSection } from '@/components/motion/AnimatedSection';
import { TiltCard, HoverScale } from '@/components/motion/MagneticButton';
import type { Project } from '@shared/schema';

import dashboardImg from '@assets/generated_images/Dashboard_app_project_mockup_8c0ee58f.png';
import ecommerceImg from '@assets/generated_images/E-commerce_website_mockup_9a9c4e56.png';
import socialImg from '@assets/generated_images/Social_media_app_mockup_e828318d.png';
import portfolioImg from '@assets/generated_images/Portfolio_website_mockup_2f8b0d20.png';
import taskImg from '@assets/generated_images/Task_management_app_mockup_4cc06f66.png';
import fitnessImg from '@assets/generated_images/Fitness_app_mockup_ada276f4.png';

const projects: Project[] = [
  {
    id: '1',
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization platform with interactive charts and insights',
    longDescription: 'A comprehensive analytics platform featuring real-time data processing.',
    image: dashboardImg,
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    role: 'Full Stack Developer',
    year: '2024',
    challenge: 'Processing and visualizing large datasets in real-time',
    solution: 'Implemented efficient data streaming with WebSockets',
    outcome: '60% improvement in data processing speed',
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'Modern shopping experience with seamless checkout and product discovery',
    longDescription: 'A feature-rich e-commerce platform with advanced search.',
    image: ecommerceImg,
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
    role: 'Frontend Lead',
    year: '2024',
    challenge: 'Creating a fast, intuitive shopping experience',
    solution: 'Leveraged Next.js incremental static regeneration',
    outcome: '35% increase in conversion rate',
  },
  {
    id: '3',
    title: 'Social Network App',
    description: 'Engaging social platform with real-time messaging and content sharing',
    longDescription: 'A dynamic social networking application.',
    image: socialImg,
    tags: ['React Native', 'Firebase', 'WebRTC', 'MongoDB'],
    role: 'Mobile Developer',
    year: '2023',
    challenge: 'Delivering real-time updates across devices',
    solution: 'Utilized Firebase real-time database',
    outcome: '4.8-star rating on app stores',
  },
  {
    id: '4',
    title: 'Creative Portfolio',
    description: 'Award-winning portfolio site with immersive WebGL experiences',
    longDescription: 'An interactive portfolio showcasing creative work.',
    image: portfolioImg,
    tags: ['Three.js', 'GSAP', 'WebGL', 'React'],
    role: 'Creative Developer',
    year: '2023',
    challenge: 'Balancing visual spectacle with performance',
    solution: 'Progressive enhancement approach',
    outcome: 'Featured on Awwwards',
  },
  {
    id: '5',
    title: 'Task Management System',
    description: 'Collaborative project management tool with drag-and-drop interface',
    longDescription: 'A powerful task management application.',
    image: taskImg,
    tags: ['Vue.js', 'Express', 'WebSocket', 'MySQL'],
    role: 'Full Stack Developer',
    year: '2023',
    challenge: 'Enabling seamless real-time collaboration',
    solution: 'Built custom WebSocket server',
    outcome: '40% productivity increase',
  },
  {
    id: '6',
    title: 'Fitness Tracker',
    description: 'Health and wellness app with personalized workout plans',
    longDescription: 'A comprehensive fitness application.',
    image: fitnessImg,
    tags: ['React Native', 'GraphQL', 'PostgreSQL', 'Chart.js'],
    role: 'Mobile Lead',
    year: '2022',
    challenge: 'Creating intuitive health metric tracking',
    solution: 'Designed adaptive UI with smart visualization',
    outcome: '100,000+ downloads',
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.05),transparent_70%)]"
        style={{ y: backgroundY }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Portfolio</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" data-testid="heading-projects">
              Featured Projects
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of my recent work showcasing diverse skills and creative solutions
            </p>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AnimatedSection 
              key={project.id} 
              delay={0.1 * (index % 3)}
              direction="up"
            >
              <TiltCard maxTilt={5}>
                <Card 
                  className="project-card group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 bg-card/50 backdrop-blur-sm h-full"
                  data-testid={`card-project-${project.id}`}
                >
                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    
                    {/* Overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Action buttons */}
                    <motion.div 
                      className="absolute bottom-4 left-4 right-4 flex gap-2"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HoverScale>
                        <Button size="sm" className="flex-1 gap-2 shadow-lg">
                          <ArrowUpRight className="w-4 h-4" />
                          View Project
                        </Button>
                      </HoverScale>
                      <HoverScale>
                        <Button size="icon" variant="secondary" className="shadow-lg">
                          <Github className="w-4 h-4" />
                        </Button>
                      </HoverScale>
                    </motion.div>

                    {/* Year badge */}
                    <motion.div 
                      className="absolute top-4 right-4"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-0 shadow-sm">
                        {project.year}
                      </Badge>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-3">
                      <motion.h3 
                        className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors" 
                        data-testid={`text-project-title-${project.id}`}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-project-description-${project.id}`}>
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <motion.span 
                          key={tag} 
                          className="px-2.5 py-1 rounded-md bg-muted/50 text-xs font-medium text-muted-foreground"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + tagIndex * 0.05 }}
                          whileHover={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}
                          data-testid={`badge-project-tag-${project.id}-${tag.toLowerCase()}`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2.5 py-1 rounded-md bg-muted/50 text-xs font-medium text-muted-foreground">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export { projects };
