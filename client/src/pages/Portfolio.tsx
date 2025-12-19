import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@/hooks/useLenis';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { ProjectDeepDive } from '@/components/sections/ProjectDeepDive';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { TechStack } from '@/components/sections/TechStack';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { ParticleField } from '@/components/three/ParticleField';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { CustomCursor } from '@/components/motion/Cursor';

// Loading screen component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="text-center">
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated logo */}
          <motion.div
            className="text-6xl font-bold font-display"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Portfolio
            </span>
            <motion.span
              className="text-primary"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              .
            </motion.span>
          </motion.div>
          
          {/* Loading bar */}
          <motion.div
            className="mt-8 h-1 bg-muted rounded-full overflow-hidden w-48 mx-auto"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </motion.div>
          
          {/* Loading text */}
          <motion.p
            className="mt-4 text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading experience...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  useLenis();

  return (
    <div className="min-h-screen bg-background dark">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Three.js particle background */}
      <ParticleField count={1500} speed={0.0002} />
      
      {/* Custom cursor (desktop only) */}
      <CustomCursor />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      <Navigation />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ProjectDeepDive />
        <Process />
        <Testimonials />
        <TechStack />
        <Contact />
      </motion.main>
      
      <Footer />
    </div>
  );
}
