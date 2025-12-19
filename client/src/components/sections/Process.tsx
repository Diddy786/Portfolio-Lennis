import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Lightbulb, Code, Rocket, TestTube, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Lightbulb,
    title: 'Discover',
    description: 'Understanding your vision, goals, and requirements through collaborative discussions',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Code,
    title: 'Design & Develop',
    description: 'Crafting intuitive interfaces and building robust, scalable solutions',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: TestTube,
    title: 'Test & Refine',
    description: 'Rigorous testing and iterative improvements for pixel-perfect results',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Rocket,
    title: 'Launch & Support',
    description: 'Seamless deployment with ongoing maintenance and optimization',
    color: 'from-green-500 to-emerald-500',
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.from('.process-step', {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">How I Work</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" data-testid="heading-process">
            My Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven approach to delivering exceptional results, every time
          </p>
        </div>

        {/* Process steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="process-step relative group">
                <Card 
                  className="h-full p-6 border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden"
                  data-testid={`card-process-${index}`}
                >
                  {/* Step number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-muted/20 group-hover:text-primary/10 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold mb-3" data-testid={`heading-process-step-${index}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>

                {/* Arrow connector (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-muted items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
