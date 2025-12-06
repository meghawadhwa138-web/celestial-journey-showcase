import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'design';
  icon: string;
}

const skills: Skill[] = [
  { id: 'react', name: 'React', level: 95, category: 'frontend', icon: '⚛️' },
  { id: 'typescript', name: 'TypeScript', level: 90, category: 'frontend', icon: '📘' },
  { id: 'nextjs', name: 'Next.js', level: 85, category: 'frontend', icon: '▲' },
  { id: 'tailwind', name: 'Tailwind', level: 92, category: 'frontend', icon: '🎨' },
  { id: 'nodejs', name: 'Node.js', level: 80, category: 'backend', icon: '💚' },
  { id: 'python', name: 'Python', level: 75, category: 'backend', icon: '🐍' },
  { id: 'postgresql', name: 'PostgreSQL', level: 78, category: 'backend', icon: '🐘' },
  { id: 'figma', name: 'Figma', level: 88, category: 'design', icon: '🎯' },
  { id: 'git', name: 'Git', level: 85, category: 'tools', icon: '📦' },
  { id: 'docker', name: 'Docker', level: 70, category: 'tools', icon: '🐳' },
  { id: 'aws', name: 'AWS', level: 72, category: 'backend', icon: '☁️' },
  { id: 'graphql', name: 'GraphQL', level: 82, category: 'backend', icon: '◈' },
];

const SkillOrb = ({ skill, index, totalSkills, isInView }: { 
  skill: Skill; 
  index: number; 
  totalSkills: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  
  // Calculate position in a spiral/orbital pattern
  const angle = (index / totalSkills) * Math.PI * 2;
  const radius = 120 + (index % 3) * 80;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.6;
  
  const categoryColors = {
    frontend: 'from-primary to-rose-glow',
    backend: 'from-secondary to-lavender-glow',
    tools: 'from-accent to-champagne',
    design: 'from-primary via-secondary to-accent',
  };

  return (
    <motion.div
      ref={orbRef}
      className="absolute left-1/2 top-1/2 cursor-pointer"
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1, 
        x: x,
        y: y,
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        className="relative"
        animate={isHovered ? { scale: 1.3, zIndex: 50 } : { scale: 1, zIndex: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${categoryColors[skill.category]} blur-xl`}
          animate={isHovered ? { opacity: 0.6, scale: 1.5 } : { opacity: 0.2, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ width: 60 + skill.level * 0.4, height: 60 + skill.level * 0.4 }}
        />
        
        {/* Main orb */}
        <motion.div
          className={`relative flex items-center justify-center rounded-full bg-gradient-to-br ${categoryColors[skill.category]} border border-border/30 backdrop-blur-sm`}
          style={{ 
            width: 50 + skill.level * 0.3, 
            height: 50 + skill.level * 0.3,
          }}
          animate={{
            y: [0, -5, 0],
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            y: { duration: 3 + index * 0.2, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 0.5 },
          }}
        >
          <span className="text-xl">{skill.icon}</span>
          
          {/* Orbiting particle */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-stardust"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ 
              transformOrigin: '25px 25px',
              top: '50%',
              left: '50%',
            }}
          />
        </motion.div>
        
        {/* Tooltip */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={isHovered ? { opacity: 1, y: -10, bottom: '100%' } : { opacity: 0, y: 10, bottom: '80%' }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl px-4 py-3 text-center whitespace-nowrap shadow-lg">
            <p className="font-display text-foreground text-sm mb-1">{skill.name}</p>
            
            {/* Skill level bar */}
            <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${categoryColors[skill.category]}`}
                initial={{ width: 0 }}
                animate={isHovered ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{skill.level}%</p>
          </div>
        </motion.div>
      </motion.div>
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
    { id: 'design', label: 'Design', emoji: '🎨' },
    { id: 'tools', label: 'Tools', emoji: '🛠️' },
  ];

  const filteredSkills = selectedCategory 
    ? skills.filter(s => s.category === selectedCategory)
    : skills;

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header with stagger animation */}
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
            Explore my universe of skills. Each orb represents a technology I've mastered,
            orbiting in the constellation of my expertise.
          </motion.p>
        </motion.div>

        {/* Category filters with slide animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`group relative px-5 py-2.5 rounded-full text-sm font-body transition-all duration-500 cursor-pointer overflow-hidden ${
              !selectedCategory 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">All Skills</span>
            {!selectedCategory && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ opacity: 0.3 }}
              />
            )}
          </motion.button>
          
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              className={`group px-5 py-2.5 rounded-full text-sm font-body transition-all duration-500 cursor-pointer ${
                selectedCategory === cat.id 
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

        {/* Skills Galaxy Container */}
        <div className="relative h-[500px] md:h-[600px]">
          {/* Central glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
            animate={{
              boxShadow: [
                '0 0 60px 30px hsl(350, 45%, 70%, 0.2)',
                '0 0 80px 40px hsl(350, 45%, 70%, 0.3)',
                '0 0 60px 30px hsl(350, 45%, 70%, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Center piece */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, type: 'spring' }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <motion.span 
                className="text-3xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                ✨
              </motion.span>
            </div>
          </motion.div>

          {/* Orbital rings */}
          {[150, 230, 310].map((radius, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/20"
              style={{ width: radius * 2, height: radius * 1.2 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
            />
          ))}

          {/* Skill orbs */}
          {filteredSkills.map((skill, index) => (
            <SkillOrb
              key={skill.id}
              skill={skill}
              index={index}
              totalSkills={filteredSkills.length}
              isInView={isInView}
            />
          ))}

          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-stardust/50"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;
