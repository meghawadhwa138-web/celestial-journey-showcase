import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Heart, Code2, Palette, Zap, Coffee } from 'lucide-react';
import Megha_Profile from './../../assets/Megha_Profile.jpeg'
import Megha2 from './../../assets/Megha2.png'

const AboutSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const highlights = [
    { icon: Code2, label: 'Clean Code', description: 'Writing elegant, maintainable solutions', delay: 0 },
    { icon: Palette, label: 'Design Eye', description: 'Creating beautiful user experiences', delay: 0.1 },
    { icon: Heart, label: 'Passion', description: 'Loving every pixel I craft', delay: 0.2 },
    { icon: Sparkles, label: 'Innovation', description: 'Embracing new technologies', delay: 0.3 },
  ];

  const stats = [
    { value: '5+', label: 'Years Experience', icon: Coffee },
    { value: '50+', label: 'Projects Completed', icon: Zap },
    { value: '30+', label: 'Happy Clients', icon: Heart },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual Side with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Parallax background elements */}
              <motion.div
                style={{ y: y1 }}
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl"
              />
              <motion.div
                style={{ y: y2 }}
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-secondary/10 blur-2xl"
              />

              {/* Main frame with floating animation */}
              <motion.div
                className="relative h-full rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Abstract constellation art */}
                <div className="absolute inset-0 aspect-4/5 flex items-center justify-center">
                  <img
                    src={Megha_Profile}
                    alt="Megha Profile"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>

                {/* Floating orbs */}
                <motion.div
                  className="absolute top-10 right-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [0, 10, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-secondary/10 blur-xl"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.7, 0.3],
                    x: [0, -10, 0],
                    y: [0, 10, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
              </motion.div>

              {/* Animated corner accents */}
              <motion.div
                className="absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 border-primary/40 rounded-tl-3xl"
                style={{ rotate }}
              />
              <motion.div
                className="absolute -bottom-2 -right-2 w-16 h-16 border-r-2 border-b-2 border-secondary/40 rounded-br-3xl"
                style={{ rotate: useTransform(rotate, v => -v) }}
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Section label with reveal */}
            <div className="overflow-hidden mb-4">
              <motion.p
                className="text-primary tracking-[0.3em] uppercase text-sm"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                About Me
              </motion.p>
            </div>

            {/* Heading with word reveal */}
            <div className="overflow-hidden mb-6">
              <motion.h2
                className="font-display text-4xl md:text-5xl text-foreground"
                initial={{ y: 60 }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Turning Real-World Problems Into <span className="text-gradient">Elegant</span> Solutions
              </motion.h2>
            </div>

            {/* Description with fade */}
            <motion.div
              className="space-y-4 text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p>
                I’m a Software Product Engineering student with a strong foundation in full-stack development and UI/UX design. My core strengths include the MERN stack, Next.js, and data structures & algorithms in C++.
              </p>
              <p>
                During my internship at MediaKind, I contributed to building performant, user-focused features that improved both efficiency and overall product experience. I thrive in environments where innovation meets execution—whether it's solving real-world challenges or collaborating during high-pressure hackathons, where I’ve sharpened my problem-solving, teamwork, and rapid-development skills.
              </p>
              <p>
                I’m currently seeking an internship opportunity where I can apply my technical expertise, learn from industry professionals, and contribute to meaningful, scalable products—while growing into a well-rounded software engineer.
              </p>
            </motion.div>

            {/* Stats row */}
            {/* <motion.div
              className="flex gap-8 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <motion.p
                    className="text-3xl font-display text-gradient"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div> */}

            {/* Highlights Grid with stagger */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: '0 10px 30px -10px hsl(350, 45%, 70%, 0.2)',
                  }}
                  className="group relative p-4 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />

                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="relative w-5 h-5 text-primary mb-2" />
                  </motion.div>
                  <h3 className="relative font-display text-foreground mb-1">{item.label}</h3>
                  <p className="relative text-xs text-muted-foreground">{item.description}</p>
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
