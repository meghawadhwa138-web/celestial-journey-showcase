import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'data' | 'cloud' | 'tools' | 'design';
  icon: string;
}

const skills: Skill[] = [
  // ===== LANGUAGES =====
  { id: 'cpp', name: 'C++', level: 90, category: 'backend', icon: '🟦' },
  { id: 'javascript', name: 'JavaScript', level: 92, category: 'frontend', icon: '🟨' },
  { id: 'typescript', name: 'TypeScript', level: 90, category: 'frontend', icon: '📘' },
  { id: 'python', name: 'Python', level: 80, category: 'backend', icon: '🐍' },
  { id: 'dart', name: 'Dart', level: 75, category: 'frontend', icon: '🎯' },
  { id: 'rust', name: 'Rust', level: 70, category: 'backend', icon: '🦀' },

  // ===== FRONTEND =====
  { id: 'react', name: 'React', level: 90, category: 'frontend', icon: '⚛️' },
  { id: 'nextjs', name: 'Next.js', level: 88, category: 'frontend', icon: '▲' },
  { id: 'reactnative', name: 'React Native', level: 80, category: 'frontend', icon: '📱' },
  { id: 'flutter', name: 'Flutter', level: 80, category: 'frontend', icon: '💙' },
  { id: 'redux', name: 'Redux Toolkit', level: 85, category: 'frontend', icon: '🌀' },
  { id: 'tailwind', name: 'Tailwind CSS', level: 92, category: 'frontend', icon: '🎨' },
  { id: 'mui', name: 'Material UI', level: 82, category: 'frontend', icon: '🎛️' },
  { id: 'shadcn', name: 'Shadcn UI', level: 88, category: 'frontend', icon: '🌗' },
  { id: 'html', name: 'HTML5', level: 95, category: 'frontend', icon: '📄' },
  { id: 'css', name: 'CSS3', level: 90, category: 'frontend', icon: '🎀' },

  // ===== BACKEND =====
  { id: 'nodejs', name: 'Node.js', level: 85, category: 'backend', icon: '💚' },
  { id: 'express', name: 'Express.js', level: 82, category: 'backend', icon: '🚀' },
  { id: 'rest', name: 'REST APIs', level: 88, category: 'backend', icon: '🔗' },
  { id: 'graphql', name: 'GraphQL', level: 80, category: 'backend', icon: '◈' },
  { id: 'jwt', name: 'JWT Auth', level: 85, category: 'backend', icon: '🔐' },
  { id: 'mongoose', name: 'Mongoose', level: 82, category: 'backend', icon: '🍃' },
  { id: 'axum', name: 'Axum', level: 65, category: 'backend', icon: '⚡' },

  // ===== DATABASES =====
  { id: 'postgresql', name: 'PostgreSQL', level: 80, category: 'backend', icon: '🐘' },
  { id: 'mongodb', name: 'MongoDB', level: 85, category: 'backend', icon: '🍃' },
  { id: 'mysql', name: 'MySQL', level: 78, category: 'backend', icon: '🐬' },
  { id: 'firebase', name: 'Firebase', level: 75, category: 'backend', icon: '🔥' },
  { id: 'sqlite', name: 'SQLite', level: 78, category: 'backend', icon: '📁' },

  // ===== DATA / ANALYTICS =====
  { id: 'pandas', name: 'Pandas', level: 85, category: 'data', icon: '📊' },
  { id: 'numpy', name: 'NumPy', level: 80, category: 'data', icon: '🔢' },
  { id: 'eda', name: 'EDA', level: 85, category: 'data', icon: '📈' },
  { id: 'matplotlib', name: 'Matplotlib', level: 80, category: 'data', icon: '📉' },
  { id: 'seaborn', name: 'Seaborn', level: 78, category: 'data', icon: '🌊' },
  { id: 'etl', name: 'ETL Pipelines', level: 82, category: 'data', icon: '⚙️' },
  { id: 'datacleaning', name: 'Data Cleaning', level: 85, category: 'data', icon: '🧹' },

  // ===== CLOUD =====
  { id: 'gcp', name: 'Google Cloud Platform', level: 75, category: 'cloud', icon: '☁️' },
  { id: 'bigquery', name: 'BigQuery', level: 70, category: 'cloud', icon: '📊' },
  { id: 'cloudstorage', name: 'Cloud Storage', level: 72, category: 'cloud', icon: '🗄️' },
  { id: 'iam', name: 'IAM', level: 65, category: 'cloud', icon: '🔐' },
  { id: 'azure', name: 'Azure', level: 70, category: 'cloud', icon: '🔷' },

  // ===== TOOLS =====
  { id: 'git', name: 'Git', level: 85, category: 'tools', icon: '📦' },
  { id: 'githubactions', name: 'GitHub Actions', level: 78, category: 'tools', icon: '⚙️' },
  { id: 'docker', name: 'Docker', level: 75, category: 'tools', icon: '🐳' },
  { id: 'postman', name: 'Postman', level: 85, category: 'tools', icon: '📮' },
  { id: 'vscode', name: 'VSCode', level: 95, category: 'tools', icon: '🧩' },
  { id: 'vercel', name: 'Vercel', level: 90, category: 'tools', icon: '▲' },
  { id: 'figma', name: 'Figma', level: 88, category: 'design', icon: '🎯' },
];

const categoryColors = {
  frontend: { bg: 'bg-primary/20', border: 'border-primary/40', glow: 'shadow-primary/30' },
  backend: { bg: 'bg-secondary/20', border: 'border-secondary/40', glow: 'shadow-secondary/30' },
  data: { bg: 'bg-pink-500/20', border: 'border-green-500/40', glow: 'shadow-green-500/30' },
  cloud: { bg: 'bg-sky-500/20', border: 'border-sky-500/40', glow: 'shadow-sky-500/30' },
  tools: { bg: 'bg-accent/20', border: 'border-accent/40', glow: 'shadow-accent/30' },
  design: { bg: 'bg-lavender/20', border: 'border-lavender/40', glow: 'shadow-lavender/30' },
};

const SkillBubble = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = categoryColors[skill.category];

  // Random movement parameters
  const randomDuration = 4 + Math.random() * 3;
  const randomDelayX = Math.random() * 2;
  const randomDelayY = Math.random() * 2;
  const moveRangeX = 15 + Math.random() * 20;
  const moveRangeY = 10 + Math.random() * 15;

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [0, moveRangeX, -moveRangeX * 0.5, moveRangeX * 0.7, 0],
        y: [0, -moveRangeY, moveRangeY * 0.6, -moveRangeY * 0.4, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.08 },
        scale: { duration: 0.5, delay: index * 0.08, type: 'spring' },
        x: { duration: randomDuration, repeat: Infinity, ease: 'easeInOut', delay: randomDelayX },
        y: { duration: randomDuration * 1.3, repeat: Infinity, ease: 'easeInOut', delay: randomDelayY },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.15, zIndex: 50 }}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl blur-xl ${colors.bg}`}
        animate={{
          opacity: isHovered ? 0.8 : 0.3,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main bubble */}
      <div className={`relative px-5 py-3 rounded-2xl ${colors.bg} ${colors.border} border backdrop-blur-sm
        shadow-lg ${isHovered ? colors.glow : ''} transition-shadow duration-300`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{skill.icon}</span>
          <div>
            <p className="font-display text-foreground text-sm whitespace-nowrap">{skill.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-16 h-1 bg-muted/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.08 + 0.5 }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{skill.level}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillsConstellation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'frontend', label: 'Frontend', emoji: '✨' },
    { id: 'backend', label: 'Backend', emoji: '⚡' },
    { id: 'data', label: 'Data', emoji: '📊' },
    { id: 'cloud', label: 'Cloud', emoji: '☁️' },
    { id: 'tools', label: 'Tools', emoji: '🛠️' },
    { id: 'design', label: 'Design', emoji: '🎨' },
  ];

  const filteredSkills = selectedCategory
    ? skills.filter(s => s.category === selectedCategory)
    : skills;

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.p
            className="text-primary tracking-[0.3em] uppercase text-sm mb-4"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={isInView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            My Expertise
          </motion.p>
          <motion.h2
            className="font-display text-4xl md:text-5xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Skills <span className="text-gradient">Galaxy</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Technologies and tools I work with to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`group relative px-5 py-2.5 rounded-full text-sm font-body transition-all duration-300 cursor-pointer ${!selectedCategory
              ? 'bg-primary text-primary-foreground'
              : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Skills
          </motion.button>

          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              className={`px-5 py-2.5 rounded-full text-sm font-body transition-all duration-300 cursor-pointer ${selectedCategory === cat.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/30'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills floating grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          layout
        >
          {filteredSkills.map((skill, index) => (
            <SkillBubble key={skill.id} skill={skill} index={index} />
          ))}
        </motion.div>

        {/* Decorative floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;