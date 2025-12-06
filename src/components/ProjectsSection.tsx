import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  stats: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Lumière',
    description: 'An elegant e-commerce platform for artisanal candles and home fragrances. Features a minimalist design with smooth animations and an immersive shopping experience.',
    tags: ['React', 'Next.js', 'Stripe', 'Tailwind'],
    gradient: 'from-rose-gold/20 via-primary/10 to-lavender/20',
    accentColor: 'primary',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    stats: [{ label: 'Users', value: '10K+' }, { label: 'Revenue', value: '$50K' }],
  },
  {
    id: 2,
    title: 'Bloom Studio',
    description: 'A creative agency website with interactive 3D elements and parallax scrolling. Showcases portfolio work with elegant transitions.',
    tags: ['React', 'Three.js', 'GSAP', 'Framer Motion'],
    gradient: 'from-secondary/20 via-lavender/10 to-primary/20',
    accentColor: 'secondary',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    stats: [{ label: 'Projects', value: '25+' }, { label: 'Clients', value: '15' }],
  },
  {
    id: 3,
    title: 'Serene',
    description: 'A mindfulness and meditation app with calming aesthetics, guided sessions, and progress tracking for mental wellness.',
    tags: ['React Native', 'TypeScript', 'Firebase'],
    gradient: 'from-accent/20 via-champagne/10 to-secondary/20',
    accentColor: 'accent',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    stats: [{ label: 'Downloads', value: '5K+' }, { label: 'Rating', value: '4.9' }],
  },
  {
    id: 4,
    title: 'Atelier',
    description: 'A digital portfolio builder for artists and designers. Features customizable templates with drag-and-drop functionality.',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'AWS'],
    gradient: 'from-primary/20 via-accent/10 to-lavender/20',
    accentColor: 'primary',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    stats: [{ label: 'Templates', value: '50+' }, { label: 'Artists', value: '2K' }],
  },
];

const ProjectCard3D = ({ project, index, isInView }: { 
  project: Project; 
  index: number; 
  isInView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, type: 'spring' }}
      className={`group relative ${project.featured ? 'md:col-span-2' : ''}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <div className={`relative overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br ${project.gradient} backdrop-blur-xl h-full`}>
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(350, 45%, 70%, 0.3), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={isHovered ? { backgroundPosition: ['200% 0', '-200% 0'] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Content wrapper */}
          <div className="relative p-8 h-full flex flex-col">
            {/* Top section */}
            <div className="flex items-start justify-between mb-6">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.3 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary uppercase tracking-wider">
                  {project.featured ? 'Featured' : 'Project'}
                </span>
              </motion.div>
              
              {/* Action buttons */}
              <motion.div 
                className="flex gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <motion.a
                  href={project.liveUrl}
                  className="p-2.5 rounded-full bg-card/80 border border-border/50 text-foreground hover:text-primary hover:border-primary/50 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  className="p-2.5 rounded-full bg-card/80 border border-border/50 text-foreground hover:text-primary hover:border-primary/50 transition-all"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </div>

            {/* Title with hover effect */}
            <motion.h3 
              className="font-display text-3xl md:text-4xl text-foreground mb-4 relative inline-block"
              whileHover={{ x: 5 }}
            >
              {project.title}
              <motion.span
                className="absolute -right-6 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: -10 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              >
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </motion.span>
            </motion.h3>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            {/* Stats */}
            <motion.div 
              className="flex gap-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {project.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-display text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Tags with stagger animation */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15 + 0.4 + i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 text-xs rounded-full bg-card/60 text-muted-foreground border border-border/30 backdrop-blur-sm hover:border-primary/30 hover:text-foreground transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-4 right-4 w-32 h-32 rounded-full bg-primary/5 blur-3xl pointer-events-none"
            animate={isHovered ? { scale: 1.5, opacity: 0.3 } : { scale: 1, opacity: 0.1 }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-secondary/5 blur-2xl pointer-events-none"
            animate={isHovered ? { scale: 1.3, opacity: 0.3 } : { scale: 1, opacity: 0.1 }}
          />
        </div>
      </motion.div>
    </motion.article>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-secondary/5 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header with reveal animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mb-20"
        >
          <motion.p 
            className="text-primary tracking-[0.3em] uppercase text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Selected Work
          </motion.p>
          
          <div className="overflow-hidden">
            <motion.h2 
              className="font-display text-4xl md:text-6xl mb-6"
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            >
              Featured <span className="text-gradient">Projects</span>
            </motion.h2>
          </div>
          
          <motion.p 
            className="text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            A curated collection of projects that showcase my passion for 
            creating elegant, user-centered digital experiences.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard3D 
              key={project.id} 
              project={project} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* View all button with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border/50 text-foreground overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05, borderColor: 'hsl(350, 45%, 70%, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative font-body">View All Projects</span>
            <motion.span
              className="relative"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
