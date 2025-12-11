import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Text reveal animation
  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const name = "Megha Wadhwa";

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ y, opacity, scale }}
      >
        {/* Decorative animated rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[600, 700, 800].map((size, i) => (
            <motion.div
              key={size}
              className="absolute top-1/2 left-1/2 rounded-full border border-primary/10"
              style={{ width: size, height: size }}
              initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
              animate={{ 
                scale: 1, 
                opacity: 0.3,
                rotate: i % 2 === 0 ? 360 : -360,
              }}
              transition={{ 
                scale: { duration: 1.5, delay: 0.5 + i * 0.2 },
                opacity: { duration: 1.5, delay: 0.5 + i * 0.2 },
                rotate: { duration: 50 + i * 10, repeat: Infinity, ease: 'linear' },
              }}
            />
          ))}
        </div>

        {/* Floating sparkles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Sparkles className="w-4 h-4 text-primary/50" />
          </motion.div>
        ))}

        {/* Greeting with typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <motion.span 
            className="inline-block font-body text-primary tracking-[0.3em] uppercase text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦ Welcome to my world ✦
          </motion.span>
        </motion.div>

        {/* Main heading with letter animation */}
        <div className="overflow-hidden mb-4">
          <motion.h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight">
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block text-foreground"
            >
              I'm
            </motion.span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.h1 className="font-display text-5xl md:text-7xl lg:text-8xl">
            <span className="text-gradient flex justify-center flex-wrap">
              {name.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className={letter === ' ' ? 'mx-2' : ''}
                  whileHover={{ 
                    scale: 1.2, 
                    color: 'hsl(270, 30%, 60%)',
                    transition: { duration: 0.2 } 
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </div>

        {/* Subtitle with slide animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-12"
        >
          <motion.p 
            className="font-display text-2xl md:text-3xl text-muted-foreground italic"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              backgroundImage: 'linear-gradient(90deg, hsl(var(--muted-foreground)), hsl(var(--primary)), hsl(var(--muted-foreground)))',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Creative Developer & Designer
          </motion.p>
          
          <motion.p 
            className="font-body text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Crafting elegant digital experiences where artistry meets functionality. 
            I transform ideas into beautiful, intuitive applications.
          </motion.p>
        </motion.div>

        {/* Social Links with stagger and hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          {[
            { icon: Github, href: 'https://github.com/megha-wadhwa12', label: 'GitHub', target: '_blank' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/megha-wadhwa-799bb7283', label: 'LinkedIn', target: '_blank' },
            { icon: Mail, href: 'mailto:meghawadhwa20@gmail.com', label: 'Email', target: '_blank' },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.target}
              className="group relative p-4 rounded-full border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                delay: 1.4 + index * 0.1,
                type: 'spring',
                stiffness: 200,
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-opacity"
              />
              <social.icon className="relative w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              
              {/* Tooltip */}
              <motion.span 
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap"
                initial={{ opacity: 0, y: -5 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                {social.label}
              </motion.span>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator with bounce animation */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <motion.span 
            className="text-xs text-muted-foreground tracking-widest uppercase group-hover:text-primary transition-colors"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Explore
          </motion.span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-primary/30 rounded-full blur-md"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <ArrowDown className="relative w-5 h-5 text-primary" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
