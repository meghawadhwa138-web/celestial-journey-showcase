import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Heart, Code2, Palette } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    { icon: Code2, label: 'Clean Code', description: 'Writing elegant, maintainable solutions' },
    { icon: Palette, label: 'Design Eye', description: 'Creating beautiful user experiences' },
    { icon: Heart, label: 'Passion', description: 'Loving every pixel I craft' },
    { icon: Sparkles, label: 'Innovation', description: 'Embracing new technologies' },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Glowing background */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent blur-2xl" />
              
              {/* Main frame */}
              <div className="relative h-full rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
                {/* Abstract art pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 opacity-80">
                    {/* Constellation lines */}
                    <motion.path
                      d="M100,20 L150,80 L120,150 L50,130 L80,60 Z"
                      fill="none"
                      stroke="hsl(350, 45%, 70%)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    {/* Circles at points */}
                    {[[100, 20], [150, 80], [120, 150], [50, 130], [80, 60]].map(([cx, cy], i) => (
                      <motion.circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="4"
                        fill="hsl(350, 45%, 70%)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
                      />
                    ))}
                  </svg>
                </div>

                {/* Floating decorative elements */}
                <motion.div
                  className="absolute top-10 right-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-secondary/10 blur-xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
              </div>

              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 border-primary/40 rounded-tl-3xl" />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-r-2 border-b-2 border-secondary/40 rounded-br-3xl" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="text-primary tracking-[0.3em] uppercase text-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              About Me
            </motion.p>

            <motion.h2
              className="font-display text-4xl md:text-5xl mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Turning Ideas Into <span className="text-gradient">Elegant</span> Reality
            </motion.h2>

            <motion.div
              className="space-y-4 text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p>
                Hello! I'm a passionate developer who believes that code is an art form. 
                With over 5 years of experience, I specialize in creating web applications 
                that are not just functional, but truly beautiful.
              </p>
              <p>
                My approach combines technical expertise with an eye for design, ensuring 
                every project I touch becomes a seamless blend of form and function. 
                I find joy in the details — the perfect animation, the ideal color palette, 
                the interaction that delights users.
              </p>
            </motion.div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="group p-4 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-300"
                >
                  <item.icon className="w-5 h-5 text-primary mb-2" />
                  <h3 className="font-display text-foreground mb-1">{item.label}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
