import { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiTypescript, 
  SiNodedotjs, 
  SiTailwindcss, 
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiDocker,
  SiFigma,
  SiGit,
  SiVercel,
  SiThreedotjs
} from 'react-icons/si';
import { Cloud } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/motion/AnimatedSection';

const technologies = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#ffffff' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
];

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.05),transparent_70%)]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Technologies</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" data-testid="heading-tech-stack">
              Tech Stack
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The tools and technologies I use to bring ideas to life
            </p>
          </AnimatedSection>
        </div>

        {/* Tech grid */}
        <StaggerContainer className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6" staggerDelay={0.05}>
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <StaggerItem key={tech.name}>
                <motion.div
                  className="group"
                  data-testid={`tech-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <div className="relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col items-center gap-4">
                    {/* Glow effect on hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                      style={{ backgroundColor: `${tech.color}20` }}
                    />
                    
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon 
                        className="w-10 h-10 md:w-12 md:h-12 transition-all duration-300" 
                        style={{ color: tech.color }} 
                      />
                    </motion.div>
                    <span className="relative text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
