import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { AnimatedSection } from '@/components/motion/AnimatedSection';
import { MagneticButton } from '@/components/motion/MagneticButton';
import type { Testimonial } from '@shared/schema';

const testimonials: Testimonial[] = [
  {
    quote: 'Working with this developer was an absolute pleasure. The attention to detail and creative solutions exceeded our expectations. They truly understood our vision and brought it to life.',
    author: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechCorp',
  },
  {
    quote: 'The project was delivered on time with exceptional quality. Their expertise in modern web technologies is truly impressive. I highly recommend them for any complex web project.',
    author: 'Michael Chen',
    role: 'Product Manager',
    company: 'InnovateLabs',
  },
  {
    quote: 'A rare combination of technical excellence and design sensibility. Our users love the seamless experience they created. The performance improvements were beyond what we expected.',
    author: 'Emily Rodriguez',
    role: 'Design Director',
    company: 'CreativeStudios',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.08),transparent_70%)]" />
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <AnimatedSection>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonials</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" data-testid="heading-testimonials">
              What Clients Say
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-muted-foreground">
              Feedback from people I've had the pleasure of working with
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3}>
          <Card className="relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm">
            {/* Decorative quotes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/10" />
              <Quote className="absolute bottom-8 right-8 w-16 h-16 text-primary/10 rotate-180" />
            </motion.div>
            
            <div className="p-8 md:p-12 min-h-[350px] flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="relative z-10"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-foreground/90" data-testid="text-testimonial-quote">
                    "{current.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-xl font-bold text-white">
                        {current.author.charAt(0)}
                      </span>
                    </motion.div>
                    <div>
                      <div className="font-semibold text-lg" data-testid="text-testimonial-author">
                        {current.author}
                      </div>
                      <div className="text-muted-foreground" data-testid="text-testimonial-role">
                        {current.role} at {current.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
        </AnimatedSection>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <MagneticButton strength={0.3}>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={prev}
              className="rounded-full w-12 h-12 border-border/50 hover:border-primary/50 hover:bg-primary/5"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </MagneticButton>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
                data-testid={`button-testimonial-dot-${index}`}
              />
            ))}
          </div>

          <MagneticButton strength={0.3}>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={next}
              className="rounded-full w-12 h-12 border-border/50 hover:border-primary/50 hover:bg-primary/5"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
