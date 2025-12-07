import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

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
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center mb-32 last:mb-0`}
    >
      {/* Image container with unique reveal */}
      <motion.div 
        className="relative w-full lg:w-1/2 aspect-[4/3] group"
        style={{ y: isEven ? y : undefined }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Frame decoration */}
        <motion.div
          className="absolute -inset-4 border border-primary/20 rounded-3xl"
          animate={{ 
            rotate: isHovered ? 2 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Second frame */}
        <motion.div
          className="absolute -inset-2 border border-secondary/20 rounded-2xl"
          animate={{ 
            rotate: isHovered ? -1 : 0,
            scale: isHovered ? 1.01 : 1,
          }}
          transition={{ duration: 0.4, delay: 0.05 }}
        />

        {/* Main image */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
            animate={{ opacity: isHovered ? 0.6 : 0.3 }}
          />

          {/* Floating number */}
          <motion.div
            className="absolute top-6 left-6 font-display text-7xl text-primary/20"
            animate={{ 
              opacity: isHovered ? 1 : 0.5,
              scale: isHovered ? 1.1 : 1,
            }}
          >
            0{project.id}
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
              className="p-3 rounded-full bg-primary text-primary-foreground"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              className="p-3 rounded-full bg-card/90 border border-border text-foreground"
              whileHover={{ scale: 1.1 }}
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
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center gap-4">
          <motion.div 
            className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <span className="text-primary text-sm tracking-widest uppercase">Project</span>
        </div>

        <motion.h3 
          className="font-display text-4xl md:text-5xl text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {project.title}
        </motion.h3>

        <motion.p 
          className="text-muted-foreground text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              className="px-4 py-2 text-sm rounded-full bg-card/60 text-muted-foreground border border-border/30 hover:border-primary/40 hover:text-foreground transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* View project link */}
        <motion.a
          href={project.liveUrl}
          className="inline-flex items-center gap-3 text-primary group cursor-pointer pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="text-sm tracking-wide uppercase">View Project</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
          <motion.div 
            className="h-px bg-primary origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{ width: 60 }}
          />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mb-24"
        >
          <motion.p 
            className="text-primary tracking-[0.3em] uppercase text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Selected Work
          </motion.p>
          
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

        {/* Projects list - alternating layout */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;