import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';

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

  return (
    <footer className="py-12 border-t border-border/50 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-display text-2xl font-bold tracking-tight inline-block"
            >
              Portfolio<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Building exceptional digital experiences with modern technologies.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full w-10 h-10 hover:bg-primary/10 hover:text-primary"
              asChild 
              data-testid="link-footer-github"
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full w-10 h-10 hover:bg-primary/10 hover:text-primary"
              asChild 
              data-testid="link-footer-linkedin"
            >
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full w-10 h-10 hover:bg-primary/10 hover:text-primary"
              asChild 
              data-testid="link-footer-email"
            >
              <a href="mailto:hello@example.com" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/50 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> All rights reserved.
          </p>

          <Button 
            size="sm" 
            variant="outline"
            onClick={scrollToTop}
            className="rounded-full gap-2 px-4 border-border/50 hover:border-primary/50 hover:bg-primary/5"
            data-testid="button-scroll-to-top"
          >
            <ArrowUp className="w-4 h-4" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
}
