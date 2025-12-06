import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Lumière',
    description: 'An elegant e-commerce platform for artisanal candles and home fragrances. Features a minimalist design with smooth animations and an immersive shopping experience.',
    tags: ['React', 'Next.js', 'Stripe', 'Tailwind'],
    image: 'linear-gradient(135deg, hsl(350, 45%, 40%) 0%, hsl(280, 30%, 30%) 100%)',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Bloom Studio',
    description: 'A creative agency website with interactive 3D elements and parallax scrolling. Showcases portfolio work with elegant transitions.',
    tags: ['React', 'Three.js', 'GSAP', 'Framer Motion'],
    image: 'linear-gradient(135deg, hsl(270, 40%, 35%) 0%, hsl(320, 35%, 25%) 100%)',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Serene',
    description: 'A mindfulness and meditation app with calming aesthetics, guided sessions, and progress tracking for mental wellness.',
    tags: ['React Native', 'TypeScript', 'Firebase'],
    image: 'linear-gradient(135deg, hsl(200, 40%, 30%) 0%, hsl(240, 35%, 25%) 100%)',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Atelier',
    description: 'A digital portfolio builder for artists and designers. Features customizable templates with drag-and-drop functionality.',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'AWS'],
    image: 'linear-gradient(135deg, hsl(30, 45%, 35%) 0%, hsl(15, 40%, 30%) 100%)',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];

const ProjectCard = ({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`group relative ${project.featured ? 'md:col-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm h-full">
        {/* Image/Gradient placeholder */}
        <div 
          className="relative aspect-[16/10] overflow-hidden"
          style={{ background: project.image }}
        >
          {/* Overlay */}
          <motion.div 
            className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <motion.a
              href={project.liveUrl}
              className="p-3 rounded-full bg-primary/20 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              className="p-3 rounded-full bg-primary/20 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-4 right-4 w-20 h-20 rounded-full bg-stardust/10 blur-2xl"
            animate={isHovered ? { scale: 1.5, opacity: 0.3 } : { scale: 1, opacity: 0.1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <motion.div
              animate={isHovered ? { x: 0, y: 0, opacity: 1 } : { x: -5, y: 5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </motion.div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover border effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary/0 pointer-events-none"
          animate={isHovered ? { borderColor: 'hsl(350, 45%, 70%, 0.3)' } : { borderColor: 'hsl(350, 45%, 70%, 0)' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.article>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A curated collection of projects that showcase my passion for 
            creating elegant, user-centered digital experiences.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/50 text-foreground hover:border-primary/50 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-body text-sm">View All Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
