import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Testimonial } from '@shared/schema';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.from('.testimonial-content', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  useEffect(() => {
    if (testimonialRef.current) {
      gsap.fromTo(
        testimonialRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentIndex]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.08),transparent_70%)]" />
      
      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-12 testimonial-content">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" data-testid="heading-testimonials">
            What Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Feedback from people I've had the pleasure of working with
          </p>
        </div>

        <Card className="testimonial-content relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm">
          {/* Decorative quote */}
          <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/5" />
          <Quote className="absolute bottom-8 right-8 w-16 h-16 text-primary/5 rotate-180" />
          
          <div className="p-8 md:p-12">
            <div ref={testimonialRef} className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-foreground/90" data-testid="text-testimonial-quote">
                "{current.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold text-white">
                    {current.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-lg" data-testid="text-testimonial-author">
                    {current.author}
                  </div>
                  <div className="text-muted-foreground" data-testid="text-testimonial-role">
                    {current.role} at {current.company}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <Button 
            size="icon" 
            variant="outline" 
            onClick={prev}
            className="rounded-full w-12 h-12 border-border/50 hover:border-primary/50 hover:bg-primary/5"
            data-testid="button-testimonial-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                data-testid={`button-testimonial-dot-${index}`}
              />
            ))}
          </div>

          <Button 
            size="icon" 
            variant="outline" 
            onClick={next}
            className="rounded-full w-12 h-12 border-border/50 hover:border-primary/50 hover:bg-primary/5"
            data-testid="button-testimonial-next"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
