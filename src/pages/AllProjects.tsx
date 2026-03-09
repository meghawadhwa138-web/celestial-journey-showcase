import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Github, ArrowLeft, ArrowRight, Sparkles, Star } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import CustomCursor from '@/components/CustomCursor';
import StardustBackground from '@/components/StardustBackground';

const ProjectGridCard = ({ project, index }: { project: Project; index: number }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative rounded-2xl border border-border/20 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <span className="text-xs text-primary font-medium">Featured</span>
          </div>
        )}

        {/* Hover actions */}
        <motion.div
          className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <a
            href={project.liveUrl}
            target="_blank"
            className="p-2.5 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            className="p-2.5 rounded-full bg-card/90 border border-border text-foreground backdrop-blur-sm hover:scale-110 transition-transform"
          >
            <Github className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.year && (
            <span className="text-xs text-muted-foreground">{project.year}</span>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/20"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2.5 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/20">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <motion.button
          onClick={() => {
            navigate(`/project/${project.slug}`);
            window.scrollTo(0, 0);
          }}
          className="inline-flex items-center gap-2 text-primary text-sm pt-2 cursor-pointer"
          whileHover={{ x: 4 }}
        >
          <span className="tracking-wide">View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const AllProjects = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="hidden md:block">
        <CustomCursor />
      </div>
      <StardustBackground />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* Back button */}
        <motion.button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wide">Back to Home</span>
        </motion.button>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary tracking-[0.3em] uppercase text-sm">Portfolio</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>

          <h1 className="font-display text-4xl md:text-6xl mb-4">
            All <span className="text-gradient">Projects</span>
          </h1>

          <p className="text-muted-foreground max-w-lg mx-auto">
            A complete collection of {projects.length} projects spanning web, mobile, AI, and systems programming
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectGridCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
