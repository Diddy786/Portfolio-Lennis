import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Briefcase, Users, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [yearsExperience] = useState(5);
  const [projectsCompleted] = useState(50);
  const [clientsSatisfied] = useState(30);

  useEffect(() => {
    if (!sectionRef.current) return;

    const counters = sectionRef.current.querySelectorAll('.counter');

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0');

      gsap.from(counter, {
        textContent: 0,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
        onUpdate: function () {
          counter.textContent = String(Math.ceil(this.targets()[0].textContent));
        },
      });
    });

    gsap.from('.about-text', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'top 40%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  const stats = [
    { value: yearsExperience, label: 'Years Experience', icon: Briefcase, suffix: '+' },
    { value: projectsCompleted, label: 'Projects Completed', icon: Award, suffix: '+' },
    { value: clientsSatisfied, label: 'Happy Clients', icon: Users, suffix: '+' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="about-text mb-4">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">About Me</span>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="about-text font-display text-4xl md:text-5xl font-bold leading-tight" data-testid="heading-about">
              Passionate about creating{' '}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                impactful
              </span>{' '}
              digital solutions
            </h2>
            
            <div className="space-y-4">
              <p className="about-text text-lg text-muted-foreground leading-relaxed" data-testid="text-about-description">
                I'm a full-stack developer with a passion for building beautiful, functional, and user-centered digital experiences. With expertise in modern JavaScript frameworks, I bring ideas to life through clean code and thoughtful design.
              </p>
              <p className="about-text text-lg text-muted-foreground leading-relaxed">
                My approach combines technical excellence with creative problem-solving, ensuring every project not only meets but exceeds expectations. I believe in writing maintainable code and creating interfaces that users love.
              </p>
            </div>

            {/* Highlights */}
            <div className="about-text flex flex-wrap gap-3 pt-4">
              {['React', 'TypeScript', 'Node.js', 'UI/UX', 'Performance'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 rounded-full bg-muted/50 text-sm font-medium text-foreground/80 border border-border/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 hover-elevate transition-all duration-300 group border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5" 
                  data-testid={`card-stat-${index}`}
                >
                  <div className="flex items-center gap-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-purple-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span 
                          className="counter text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent" 
                          data-target={stat.value}
                        >
                          0
                        </span>
                        <span className="text-2xl font-bold text-primary">{stat.suffix}</span>
                      </div>
                      <div className="text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
