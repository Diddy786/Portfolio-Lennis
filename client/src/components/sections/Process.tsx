import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Lightbulb, Code, Rocket, TestTube, ArrowRight } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/motion/AnimatedSection';
import { TiltCard } from '@/components/motion/MagneticButton';

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

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5 rounded-full blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">How I Work</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" data-testid="heading-process">
              My Process
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven approach to delivering exceptional results, every time
            </p>
          </AnimatedSection>
        </div>

        {/* Process steps */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={index}>
                <div className="relative group h-full">
                  <TiltCard maxTilt={5} className="h-full">
                    <Card 
                      className="h-full p-6 border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden"
                      data-testid={`card-process-${index}`}
                    >
                      {/* Step number */}
                      <motion.div 
                        className="absolute top-4 right-4 text-6xl font-bold text-muted/20 group-hover:text-primary/10 transition-colors"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.div>
                      
                      {/* Icon */}
                      <motion.div 
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      
                      {/* Content */}
                      <h3 className="font-display text-xl font-semibold mb-3" data-testid={`heading-process-step-${index}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </Card>
                  </TiltCard>

                  {/* Arrow connector */}
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-muted items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    </motion.div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
