import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Code2, Server, Palette, Wrench } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/motion/AnimatedSection';
import { TiltCard } from '@/components/motion/MagneticButton';
import type { Skill } from '@shared/schema';

const skills: Skill[] = [
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Vue.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'GSAP', category: 'frontend' },
  { name: 'Three.js', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Figma', category: 'design' },
  { name: 'Adobe XD', category: 'design' },
  { name: 'Photoshop', category: 'design' },
  { name: 'Git', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'AWS', category: 'tools' },
  { name: 'Vercel', category: 'tools' },
];

const categories = {
  frontend: { 
    label: 'Frontend', 
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
  },
  backend: { 
    label: 'Backend', 
    icon: Server,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
  },
  design: { 
    label: 'Design', 
    icon: Palette,
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-500/10 to-red-500/10',
  },
  tools: { 
    label: 'Tools & DevOps', 
    icon: Wrench,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
  },
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.08),transparent_50%)]" />
      <motion.div 
        className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl"
        animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">What I Do</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" data-testid="heading-skills">
              Skills & Expertise
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit built over years of crafting digital experiences
            </p>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(categories).map(([key, { label, icon: Icon, gradient, bgGradient }], categoryIndex) => (
            <AnimatedSection key={key} delay={0.1 * categoryIndex} direction={categoryIndex % 2 === 0 ? 'left' : 'right'}>
              <TiltCard maxTilt={3}>
                <Card 
                  className="p-6 border-border/50 hover:border-border transition-all duration-500 hover:shadow-2xl group overflow-hidden relative h-full"
                  data-testid={`section-skills-${key}`}
                >
                  {/* Gradient background on hover */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="font-display text-xl font-semibold">{label}</h3>
                    </div>
                    
                    {/* Skills list */}
                    <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.03}>
                      {skills
                        .filter((skill) => skill.category === key)
                        .map((skill) => (
                          <StaggerItem key={skill.name}>
                            <motion.span
                              className="px-3 py-1.5 rounded-lg bg-background/80 border border-border/50 text-sm font-medium text-foreground/80 cursor-default"
                              whileHover={{ 
                                scale: 1.08,
                                backgroundColor: 'hsl(var(--primary) / 0.15)',
                                borderColor: 'hsl(var(--primary) / 0.4)',
                                color: 'hsl(var(--primary))',
                              }}
                              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                              data-testid={`badge-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {skill.name}
                            </motion.span>
                          </StaggerItem>
                        ))}
                    </StaggerContainer>
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
