import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from './Projects';

gsap.registerPlugin(ScrollTrigger);

export function ProjectDeepDive() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredProjects = projects.slice(0, 3);

  useEffect(() => {
    if (!sectionRef.current) return;

    const deepDives = sectionRef.current.querySelectorAll('.deep-dive');

    deepDives.forEach((dive) => {
      gsap.from(dive.querySelectorAll('.deep-dive-content'), {
        opacity: 0,
        x: -50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: dive,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(dive.querySelector('.deep-dive-image'), {
        opacity: 0,
        x: 50,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: dive,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, []);

  const caseStudyItems = [
    { key: 'challenge', label: 'Challenge', icon: Target, color: 'text-red-500' },
    { key: 'solution', label: 'Solution', icon: Lightbulb, color: 'text-yellow-500' },
    { key: 'outcome', label: 'Outcome', icon: TrendingUp, color: 'text-green-500' },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Case Studies</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Project Deep Dives
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A closer look at the challenges, solutions, and outcomes of featured projects
          </p>
        </div>

        <div className="space-y-32">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="deep-dive"
              data-testid={`section-deep-dive-${project.id}`}
            >
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? '' : ''}`}>
                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="deep-dive-content">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                        {project.year}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{project.role}</span>
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold mb-4" data-testid={`heading-deep-dive-${project.id}`}>
                      {project.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Case study card */}
                  <Card className="deep-dive-content border-border/50 overflow-hidden">
                    <div className="divide-y divide-border/50">
                      {caseStudyItems.map(({ key, label, icon: Icon, color }) => (
                        <div key={key} className="p-5 flex gap-4">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">{label}</h4>
                            <p className="text-foreground">{project[key as keyof typeof project]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Tags */}
                  <div className="deep-dive-content flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1.5 rounded-lg bg-background border border-border/50 text-sm font-medium text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className={`deep-dive-image ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-2xl opacity-50" />
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
