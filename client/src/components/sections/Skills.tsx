import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Code2, Server, Palette, Wrench } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Skill } from '@shared/schema';

gsap.registerPlugin(ScrollTrigger);

const skills: Skill[] = [
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Vue.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'GSAP', category: 'frontend' },
  { name: 'Three.js', category: 'frontend' },
  { name: 'WebGL', category: 'frontend' },
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

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.from('.skill-card', {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.skill-item', {
      opacity: 0,
      x: -20,
      stagger: 0.03,
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">What I Do</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" data-testid="heading-skills">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over years of crafting digital experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(categories).map(([key, { label, icon: Icon, gradient, bgGradient }]) => (
            <Card 
              key={key} 
              className="skill-card p-6 border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg group overflow-hidden relative"
              data-testid={`section-skills-${key}`}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{label}</h3>
                </div>
                
                {/* Skills list */}
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((skill) => skill.category === key)
                    .map((skill) => (
                      <span
                        key={skill.name}
                        className="skill-item px-3 py-1.5 rounded-lg bg-background/80 border border-border/50 text-sm font-medium text-foreground/80 hover:text-foreground hover:border-primary/30 transition-colors cursor-default"
                        data-testid={`badge-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
