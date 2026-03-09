import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { projects } from '@/data/projects';
import StardustBackground from '@/components/StardustBackground';
import CustomCursor from '@/components/CustomCursor';

const ProjectCaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-foreground mb-4">Project Not Found</h1>
          <button onClick={() => navigate('/')} className="text-primary hover:underline">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <StardustBackground />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate('/#projects')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full glass-card text-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-body text-sm">Back to Projects</span>
      </motion.button>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Title & Meta */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            {project.year && (
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar className="w-4 h-4" />
                <span className="font-body text-sm">{project.year}</span>
              </div>
            )}
            <h1 className="text-5xl md:text-7xl font-display text-gradient mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-body text-sm font-medium hover:bg-accent/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden border border-border/30 mb-20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-10" />
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Features */}
              {project.features && project.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display text-foreground">Key Features</h2>
                  </div>
                  <div className="space-y-4">
                    {project.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-xl glass-card"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="font-body text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display text-foreground">Challenges & Solutions</h2>
                  </div>
                  <div className="space-y-4">
                    {project.challenges.map((challenge, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-xl glass-card"
                      >
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                          {i + 1}
                        </span>
                        <span className="font-body text-muted-foreground">{challenge}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Tag className="w-4 h-4 text-primary" />
                  <h3 className="font-display text-lg text-foreground">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full text-xs font-body font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="font-display text-lg text-foreground mb-5">Links</h3>
                <div className="space-y-3">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body text-sm"
                  >
                    <Github className="w-4 h-4" />
                    GitHub Repository
                  </a>
                </div>
              </motion.div>

              {/* Other Projects */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="font-display text-lg text-foreground mb-5">Other Projects</h3>
                <div className="space-y-3">
                  {projects
                    .filter((p) => p.slug !== slug)
                    .slice(0, 5)
                    .map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => {
                          navigate(`/project/${p.slug}`);
                          window.scrollTo(0, 0);
                        }}
                        className="block w-full text-left text-sm font-body text-muted-foreground hover:text-primary transition-colors cursor-pointer py-1"
                      >
                        → {p.title}
                      </button>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/20 mt-20">
        <div className="max-w-5xl mx-auto text-center">
          <button
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-primary transition-colors font-body text-sm cursor-pointer"
          >
            ← Back to Portfolio
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ProjectCaseStudy;
