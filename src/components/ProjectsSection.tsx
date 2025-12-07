import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Lumière',
    description: 'An elegant e-commerce platform for artisanal candles and home fragrances with immersive shopping experience.',
    tags: ['React', 'Next.js', 'Stripe', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Bloom Studio',
    description: 'A creative agency website with interactive 3D elements and parallax scrolling for portfolio showcase.',
    tags: ['React', 'Three.js', 'GSAP', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Serene',
    description: 'A mindfulness and meditation app with calming aesthetics and guided sessions for mental wellness.',
    tags: ['React Native', 'TypeScript', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Atelier',
    description: 'A digital portfolio builder for artists with customizable templates and drag-and-drop functionality.',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'AWS'],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Velvet',
    description: 'A luxury fashion rental platform with AI-powered styling recommendations and virtual try-on features.',
    tags: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Harmony',
    description: 'A music collaboration platform for remote artists with real-time audio mixing and session recording.',
    tags: ['Next.js', 'WebRTC', 'Node.js', 'Redis'],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: '#',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);
  const contentX = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? -30 : 30, 0, isEven ? 30 : -30]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center mb-32 last:mb-0`}
    >
      {/* Image container with unique reveal */}
      <motion.div 
        className="relative w-full lg:w-1/2 aspect-[4/3] group"
        style={{ y: isEven ? y : undefined, rotate: imageRotate }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated corner accents */}
        <motion.div
          className="absolute -top-2 -left-2 w-12 h-12 border-l-2 border-t-2 border-primary/40 rounded-tl-xl"
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute -bottom-2 -right-2 w-12 h-12 border-r-2 border-b-2 border-secondary/40 rounded-br-xl"
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-xl"
          animate={{ 
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Main image */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/20">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Shimmer overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            animate={{ x: isHovered ? '200%' : '-100%' }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
            animate={{ opacity: isHovered ? 0.7 : 0.4 }}
          />

          {/* Floating number with glow */}
          <motion.div
            className="absolute top-6 left-6 font-display text-7xl"
            animate={{ 
              opacity: isHovered ? 1 : 0.3,
              scale: isHovered ? 1.1 : 1,
              textShadow: isHovered ? '0 0 30px hsl(var(--primary))' : 'none',
            }}
            style={{ color: 'hsl(var(--primary) / 0.4)' }}
          >
            0{project.id}
          </motion.div>

          {/* Sparkle decoration */}
          <motion.div
            className="absolute top-4 right-4"
            animate={{ 
              opacity: isHovered ? 1 : 0,
              rotate: isHovered ? 180 : 0,
              scale: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>

          {/* Action buttons on hover */}
          <motion.div
            className="absolute bottom-6 right-6 flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={project.liveUrl}
              className="p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              className="p-3 rounded-full bg-card/90 border border-border text-foreground backdrop-blur-sm"
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="w-full lg:w-1/2 space-y-6"
        style={{ x: contentX }}
      >
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <span className="text-primary text-sm tracking-widest uppercase">Project</span>
        </motion.div>

        <motion.h3 
          className="font-display text-4xl md:text-5xl text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {project.title}
        </motion.h3>

        <motion.p 
          className="text-muted-foreground text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {project.description}
        </motion.p>

        {/* Tags with staggered animation */}
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              className="px-4 py-2 text-sm rounded-full bg-card/60 text-muted-foreground border border-border/30 hover:border-primary/40 hover:text-foreground hover:bg-primary/5 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
              whileHover={{ scale: 1.08, y: -2 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* View project link with enhanced animation */}
        <motion.a
          href={project.liveUrl}
          className="inline-flex items-center gap-3 text-primary group cursor-pointer pt-4 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ x: 5 }}
        >
          <span className="text-sm tracking-wide uppercase">View Project</span>
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
          <motion.div 
            className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);
  
  const visibleProjects = showAll ? projects : projects.slice(0, 4);
  const hasMoreProjects = projects.length > 4;

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ x: [-50, 50, -50], y: [-30, 30, -30] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
          animate={{ x: [50, -50, 50], y: [30, -30, 30] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        
        {/* Additional floating orbs */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-accent/3 blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header with enhanced animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mb-24"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <motion.div 
              className="w-8 h-px bg-gradient-to-r from-transparent to-primary"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="text-primary tracking-[0.3em] uppercase text-sm">Selected Work</span>
            <motion.div 
              className="w-8 h-px bg-gradient-to-l from-transparent to-primary"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          
          <motion.h2 
            className="font-display text-4xl md:text-6xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            A curated collection of projects showcasing elegant digital experiences
          </motion.p>
        </motion.div>

        {/* Projects list with AnimatePresence for smooth transitions */}
        <div className="space-y-8">
          <AnimatePresence mode="sync">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* View All Projects button */}
        {hasMoreProjects && (
          <motion.div
            className="flex justify-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-8 py-4 rounded-full bg-card/60 border border-border/30 text-foreground overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ x: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Border glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.3), hsl(var(--primary) / 0.3))',
                  padding: '1px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
              
              <span className="relative flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm tracking-wide">
                  {showAll ? 'Show Less' : `View All Projects (${projects.length - 4} more)`}
                </span>
                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-primary" />
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;