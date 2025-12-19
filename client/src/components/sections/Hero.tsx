import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    if (badgeRef.current) {
      tl.from(badgeRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.word');
      tl.from(words, {
        opacity: 0,
        y: 60,
        rotationX: -90,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.3');
    }

    if (subtitleRef.current) {
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.6'
      );
    }

    if (ctaRef.current) {
      tl.from(
        ctaRef.current.children,
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    }

    if (socialsRef.current) {
      tl.from(
        socialsRef.current.children,
        {
          opacity: 0,
          scale: 0.8,
          stagger: 0.08,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      );
    }
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Gradient orbs for visual interest */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-50" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        {/* Status badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-foreground/80">Available for new projects</span>
        </div>

        <h1 ref={headingRef} className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight">
          <span className="word inline-block">I build</span>{' '}
          <span className="word inline-block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">exceptional</span>
          <br />
          <span className="word inline-block">digital experiences</span>
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Full-stack developer specializing in crafting performant web applications with modern technologies, stunning animations, and pixel-perfect interfaces.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            onClick={scrollToProjects}
            className="gap-2 px-8 h-12 text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
            data-testid="button-view-work"
          >
            <Sparkles className="w-4 h-4" />
            View My Work
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 h-12 text-base font-medium"
            data-testid="button-get-in-touch"
          >
            Get In Touch
          </Button>
        </div>

        <div ref={socialsRef} className="flex items-center justify-center gap-2">
          <Button size="icon" variant="ghost" className="rounded-full w-11 h-11 hover:bg-primary/10 hover:text-primary transition-colors" asChild data-testid="link-github">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full w-11 h-11 hover:bg-primary/10 hover:text-primary transition-colors" asChild data-testid="link-linkedin">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full w-11 h-11 hover:bg-primary/10 hover:text-primary transition-colors" asChild data-testid="link-email">
            <a href="mailto:hello@example.com" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
