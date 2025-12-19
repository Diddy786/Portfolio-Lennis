import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormInput } from '@shared/schema';
import { Mail, MapPin, Send, ArrowUpRight, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnimatedSection } from '@/components/motion/AnimatedSection';
import { MagneticButton, TiltCard } from '@/components/motion/MagneticButton';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (data: ContactFormInput) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Message Sent!', description: result.message });
        form.reset();
      } else {
        toast({ title: 'Error', description: result.message, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to send message.', variant: 'destructive' });
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.1),transparent_50%)]" />
      <motion.div 
        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-pink-500/10 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Contact</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" data-testid="heading-contact">
              Let's Work Together
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's create something amazing together.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatedSection delay={0.3}>
              <h3 className="font-display text-2xl font-semibold mb-6">Get in touch</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always interested in hearing about new projects and opportunities.
              </p>
            </AnimatedSection>

            <div className="space-y-4">
              <AnimatedSection delay={0.4} direction="left">
                <MagneticButton strength={0.2}>
                  <motion.a 
                    href="mailto:hello@example.com" 
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all group"
                    whileHover={{ x: 5 }}
                    data-testid="contact-info-email"
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Mail className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">hello@example.com</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                </MagneticButton>
              </AnimatedSection>

              <AnimatedSection delay={0.5} direction="left">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50" data-testid="contact-info-location">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium">San Francisco, CA</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Contact form */}
          <AnimatedSection delay={0.4} direction="right" className="lg:col-span-3">
            <TiltCard maxTilt={2}>
              <Card className="p-6 md:p-8 border-border/50 bg-background/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-xl font-semibold">Send a message</h3>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Name</FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.01 }}>
                                <Input 
                                  placeholder="John Doe" 
                                  className="h-12 bg-muted/30 border-border/50 focus:border-primary/50 transition-all"
                                  {...field} 
                                  data-testid="input-contact-name"
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john@example.com" 
                                className="h-12 bg-muted/30 border-border/50 focus:border-primary/50 transition-all"
                                {...field} 
                                data-testid="input-contact-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell me about your project..." 
                              rows={5}
                              className="bg-muted/30 border-border/50 focus:border-primary/50 resize-none transition-all"
                              {...field} 
                              data-testid="input-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <MagneticButton className="w-full" strength={0.1}>
                      <Button 
                        type="submit" 
                        size="lg"
                        className="w-full gap-2 h-12 shadow-lg shadow-primary/20 group"
                        disabled={form.formState.isSubmitting}
                        data-testid="button-contact-submit"
                      >
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </MagneticButton>
                  </form>
                </Form>
              </Card>
            </TiltCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
