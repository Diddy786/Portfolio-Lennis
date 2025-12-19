import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ScrollIndicator } from '@/components/motion/ScrollProgress';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate badge
    tl.from('.hero-badge', {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Animate heading words with 3D effect
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.word');
      tl.from(words, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
      }, '-=0.4');
    }

    // Animate subtitle
    tl.from('.hero-subtitle', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6');

    // Animate CTA buttons
    tl.from('.hero-cta', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');

    // Animate social icons
    tl.from('.hero-social', {
      opacity: 0,
      scale: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: 'back.out(2)',
    }, '-=0.3');

    // Floating animation for orbs
    gsap.to('.hero-orb-1', {
      y: -30,
      x: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero-orb-2', {
      y: 30,
      x: -20,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero-orb-3', {
      y: -20,
      x: -30,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated gradient orbs */}
      <div className="hero-orb-1 absolute top-1/4 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-primary/30 via-purple-500/20 to-transparent rounded-full blur-3xl" />
      <div className="hero-orb-2 absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-pink-500/20 via-purple-600/20 to-transparent rounded-full blur-3xl" />
      <div className="hero-orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 via-transparent to-pink-500/10 rounded-full blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center"
        style={{ y, opacity, scale }}
      >
        {/* Status badge */}
        <motion.div 
          className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-foreground/80">Available for new projects</span>
        </motion.div>

        <h1 
          ref={headingRef} 
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight perspective-1000"
        >
          <span className="word inline-block">I build</span>{' '}
          <span className="word inline-block relative">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              exceptional
            </span>
          </span>
          <br />
          <span className="word inline-block">digital experiences</span>
        </h1>

        <p className="hero-subtitle text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Full-stack developer specializing in crafting performant web applications 
          with modern technologies, stunning animations, and pixel-perfect interfaces.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <MagneticButton className="hero-cta">
            <Button 
              size="lg" 
              onClick={scrollToProjects}
              className="gap-2 px-8 h-14 text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all group"
              data-testid="button-view-work"
            >
              <Sparkles className="w-4 h-4" />
              View My Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </MagneticButton>
          
          <MagneticButton className="hero-cta">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 h-14 text-base font-medium border-2 hover:bg-primary/5"
              data-testid="button-get-in-touch"
            >
              Get In Touch
            </Button>
          </MagneticButton>
        </div>

        <div className="flex items-center justify-center gap-3">
          {[
            { icon: Github, href: 'https://github.com', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <MagneticButton key={label} className="hero-social" strength={0.4}>
              <motion.a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/50 border border-border/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            </MagneticButton>
          ))}
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
