import { useEffect, useRef } from 'react';
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
  SiVercel
} from 'react-icons/si';
import { Cloud } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Cloud', icon: Cloud, color: '#FF9900' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
];

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.from('.tech-item', {
      opacity: 0,
      y: 30,
      scale: 0.9,
      stagger: 0.05,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Technologies</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" data-testid="heading-tech-stack">
            Tech Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </div>

        {/* Tech grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="tech-item group"
                data-testid={`tech-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col items-center gap-4 group-hover:-translate-y-1">
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{ backgroundColor: `${tech.color}10` }}
                  />
                  
                  <div className="relative">
                    <Icon 
                      className="w-10 h-10 md:w-12 md:h-12 transition-all duration-300 group-hover:scale-110" 
                      style={{ color: tech.color }} 
                    />
                  </div>
                  <span className="relative text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
