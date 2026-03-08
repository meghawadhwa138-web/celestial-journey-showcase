import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Download, Eye, FileText, ExternalLink, Briefcase, GraduationCap, Award, Code } from 'lucide-react';

const resumeHighlights = [
  {
    icon: Briefcase,
    title: 'Experience',
    items: ['Software Developer', 'Full Stack Engineer', 'UI/UX Designer'],
  },
  {
    icon: GraduationCap,
    title: 'Education',
    items: ['B.Tech Computer Science', 'Certified Cloud Practitioner'],
  },
  {
    icon: Code,
    title: 'Tech Stack',
    items: ['React, TypeScript, Node.js', 'Python, Java, SQL', 'AWS, Docker, Git'],
  },
  {
    icon: Award,
    title: 'Achievements',
    items: ['Hackathon Winner', 'Open Source Contributor', '5+ Projects Delivered'],
  },
];

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  // Replace this with your actual resume URL
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Resume Preview Card */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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

            <div className="relative bg-card rounded-2xl p-8 min-h-[420px] flex flex-col items-center justify-center gap-6">
              {/* Document icon with animation */}
              <motion.div
                className="relative"
                animate={isHovered ? { y: -10, scale: 1.05 } : { y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-32 h-40 rounded-lg border-2 border-primary/30 bg-background/50 flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Document lines */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 rounded-full bg-muted-foreground/20 mx-4 my-1"
                      style={{ width: `${60 + Math.random() * 30}%` }}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    />
                  ))}
                  {/* Corner fold */}
                  <div className="absolute top-0 right-0 w-6 h-6">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-primary/20" />
                  </div>
                </div>

                {/* Floating sparkles */}
                <motion.div
                  className="absolute -top-2 -right-2 text-primary"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FileText size={20} />
                </motion.div>
              </motion.div>

              <div className="text-center space-y-2">
                <h3 className="text-2xl text-foreground">Resume Preview</h3>
                <p className="text-sm text-muted-foreground font-body">
                  Click below to view or download my full resume
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-2">
                <motion.a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors font-body text-sm cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={16} />
                  Preview
                </motion.a>
                <motion.a
                  href={resumeUrl}
                  download
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body text-sm cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={16} />
                  Download
                </motion.a>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: 'var(--shadow-rose)' }}
                animate={{ opacity: isHovered ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
              />
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
                          <span className="w-1 h-1 rounded-full bg-primary/50" />
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
