import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Download, Eye, ExternalLink, Briefcase, GraduationCap, Award, Code } from 'lucide-react';

const resumeHighlights = [
  {
    icon: Briefcase,
    title: 'Experience',
    items: [
      'Trainee Development Engineer @ MediaKind',
      'Built multilingual product modules & reusable UI',
      '20–25% improvement in search UI responsiveness',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Education',
    items: [
      'B.Tech CSE — Lovely Professional University',
      'Kalvium UG Program in Software Product Engineering',
      'Batch: 2023–2027',
    ],
  },
  {
    icon: Code,
    title: 'Tech Stack',
    items: [
      'React, Next.js, TypeScript, React Native, Flutter',
      'Node.js, Express.js, MongoDB, MySQL, Firebase',
      'Docker, Git, Azure DevOps, Vercel, Figma',
    ],
  },
  {
    icon: Award,
    title: 'Achievements',
    items: [
      '1st Runner-up at HackVerse Hackathon',
      '7,700+ lines on CodeGen — highest individual contribution',
      'Led teams & delivered full-stack solutions end-to-end',
    ],
  },
];

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showPreview, setShowPreview] = useState(false);

  const resumeUrl = '/resume.pdf';

  return (
    <section id="resume" ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary)), transparent)' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, hsl(var(--secondary)), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-sm tracking-[0.3em] uppercase text-primary/70 font-body"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={isInView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            My Resume
          </motion.span>
          <h2 className="text-5xl md:text-6xl mt-4 text-gradient">
            Curriculum Vitae
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Resume Preview Card */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Animated border */}
            <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <div className="relative bg-card rounded-2xl p-4 flex flex-col items-center gap-4">
              {/* Embedded PDF Preview or Placeholder */}
              {showPreview ? (
                <div className="w-full rounded-xl overflow-hidden" style={{ height: '500px' }}>
                  <iframe
                    src={`${resumeUrl}#toolbar=0&navpanes=0`}
                    className="w-full h-full border-0 rounded-xl"
                    title="Resume Preview"
                  />
                </div>
              ) : (
                <motion.div
                  className="w-full rounded-xl bg-background/50 border border-border/50 flex flex-col items-center justify-center cursor-pointer"
                  style={{ height: '500px' }}
                  onClick={() => setShowPreview(true)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Eye size={48} className="text-primary/60 mb-4" />
                  </motion.div>
                  <p className="text-lg text-foreground">Click to Preview Resume</p>
                  <p className="text-sm text-muted-foreground font-body mt-1">
                    Tap to load the embedded PDF viewer
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 w-full">
                <motion.button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors font-body text-sm cursor-pointer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Eye size={16} />
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </motion.button>
                <motion.a
                  href={resumeUrl}
                  download="Megha_Wadhwa_Resume.pdf"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body text-sm cursor-pointer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={16} />
                  Download
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Resume Highlights */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {resumeHighlights.map((section, index) => (
              <motion.div
                key={section.title}
                className="group glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
                whileHover={{ x: 8, scale: 1.02 }}
              >
                {/* Hover accent line */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <section.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg text-foreground mb-2">{section.title}</h4>
                    <div className="space-y-1">
                      {section.items.map((item, i) => (
                        <motion.p
                          key={i}
                          className="text-sm text-muted-foreground font-body flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.8 + index * 0.15 + i * 0.1 }}
                        >
                          <span className="w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                          {item}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors"
                    whileHover={{ rotate: 45 }}
                  >
                    <ExternalLink size={16} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
