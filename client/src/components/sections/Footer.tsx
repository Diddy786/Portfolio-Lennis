import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub', testId: 'link-footer-github' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', testId: 'link-footer-linkedin' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email', testId: 'link-footer-email' },
  ];

  return (
    <footer className="py-12 border-t border-border/50 bg-background relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MagneticButton strength={0.2}>
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="font-display text-2xl font-bold tracking-tight inline-block"
              >
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent hover:from-primary hover:to-purple-500 transition-all duration-300">
                  Portfolio
                </span>
                <span className="text-primary">.</span>
              </a>
            </MagneticButton>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Building exceptional digital experiences with modern technologies.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>

          {/* Social links */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {socialLinks.map(({ icon: Icon, href, label, testId }) => (
              <MagneticButton key={label} strength={0.3}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="rounded-full w-10 h-10 hover:bg-primary/10 hover:text-primary"
                    asChild 
                    data-testid={testId}
                  >
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={label}>
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                </motion.div>
              </MagneticButton>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="h-px bg-border/50 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom bar */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </motion.span>
            All rights reserved.
          </p>

          <MagneticButton strength={0.2}>
            <Button 
              size="sm" 
              variant="outline"
              onClick={scrollToTop}
              className="rounded-full gap-2 px-4 border-border/50 hover:border-primary/50 hover:bg-primary/5 group"
              data-testid="button-scroll-to-top"
            >
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
              Back to top
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </footer>
  );
}
