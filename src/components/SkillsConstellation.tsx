import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
  x: number;
  y: number;
}

const skills: Skill[] = [
  { id: 'react', name: 'React', level: 95, category: 'frontend', x: 20, y: 30 },
  { id: 'typescript', name: 'TypeScript', level: 90, category: 'frontend', x: 35, y: 15 },
  { id: 'nextjs', name: 'Next.js', level: 85, category: 'frontend', x: 50, y: 35 },
  { id: 'tailwind', name: 'Tailwind', level: 92, category: 'frontend', x: 65, y: 20 },
  { id: 'nodejs', name: 'Node.js', level: 80, category: 'backend', x: 80, y: 40 },
  { id: 'python', name: 'Python', level: 75, category: 'backend', x: 75, y: 60 },
  { id: 'postgresql', name: 'PostgreSQL', level: 78, category: 'backend', x: 55, y: 70 },
  { id: 'figma', name: 'Figma', level: 88, category: 'tools', x: 30, y: 65 },
  { id: 'git', name: 'Git', level: 85, category: 'tools', x: 15, y: 50 },
  { id: 'docker', name: 'Docker', level: 70, category: 'tools', x: 40, y: 85 },
];

const connections: [string, string][] = [
  ['react', 'typescript'],
  ['typescript', 'nextjs'],
  ['nextjs', 'tailwind'],
  ['tailwind', 'nodejs'],
  ['nodejs', 'python'],
  ['python', 'postgresql'],
  ['postgresql', 'figma'],
  ['figma', 'git'],
  ['git', 'react'],
  ['nextjs', 'postgresql'],
  ['react', 'figma'],
];

const SkillsConstellation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'frontend', label: 'Frontend', color: 'primary' },
    { id: 'backend', label: 'Backend', color: 'secondary' },
    { id: 'tools', label: 'Tools', color: 'accent' },
  ];

  const getSkillPosition = (skill: Skill) => ({
    left: `${skill.x}%`,
    top: `${skill.y}%`,
  });

  const getConnectionPath = (from: Skill, to: Skill) => {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  };

  const isSkillHighlighted = (skill: Skill) => {
    if (!selectedCategory) return true;
    return skill.category === selectedCategory;
  };

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            My Expertise
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Skills <span className="text-gradient">Constellation</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Navigate through my universe of skills. Each star represents a technology
            I've mastered, connected in the constellation of my expertise.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 cursor-pointer ${
              !selectedCategory 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50'
            }`}
          >
            All Stars
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Constellation Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative aspect-[16/9] max-w-4xl mx-auto"
        >
          {/* Connection lines SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {connections.map(([fromId, toId], index) => {
              const from = skills.find(s => s.id === fromId)!;
              const to = skills.find(s => s.id === toId)!;
              const isHighlighted = isSkillHighlighted(from) && isSkillHighlighted(to);
              
              return (
                <motion.path
                  key={`${fromId}-${toId}`}
                  d={getConnectionPath(from, to)}
                  fill="none"
                  stroke={hoveredSkill && (hoveredSkill === fromId || hoveredSkill === toId) 
                    ? 'hsl(350, 45%, 70%)' 
                    : 'hsl(240, 8%, 25%)'}
                  strokeWidth="0.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { 
                    pathLength: 1, 
                    opacity: isHighlighted ? 0.6 : 0.1 
                  } : {}}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Skill nodes */}
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={getSkillPosition(skill)}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { 
                scale: isSkillHighlighted(skill) ? 1 : 0.5, 
                opacity: isSkillHighlighted(skill) ? 1 : 0.3 
              } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <motion.button
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Glow effect */}
                <div 
                  className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-300 ${
                    hoveredSkill === skill.id ? 'opacity-60' : 'opacity-0'
                  }`}
                  style={{
                    background: skill.category === 'frontend' 
                      ? 'hsl(350, 45%, 70%)' 
                      : skill.category === 'backend' 
                        ? 'hsl(270, 30%, 60%)' 
                        : 'hsl(15, 40%, 65%)',
                    width: 60 + skill.level * 0.4,
                    height: 60 + skill.level * 0.4,
                    transform: 'translate(-50%, -50%)',
                    left: '50%',
                    top: '50%',
                  }}
                />

                {/* Star node */}
                <div 
                  className="relative rounded-full border-2 flex items-center justify-center transition-all duration-300"
                  style={{
                    width: 14 + skill.level * 0.3,
                    height: 14 + skill.level * 0.3,
                    borderColor: skill.category === 'frontend' 
                      ? 'hsl(350, 45%, 70%)' 
                      : skill.category === 'backend' 
                        ? 'hsl(270, 30%, 60%)' 
                        : 'hsl(15, 40%, 65%)',
                    background: hoveredSkill === skill.id 
                      ? skill.category === 'frontend' 
                        ? 'hsl(350, 45%, 70%)' 
                        : skill.category === 'backend' 
                          ? 'hsl(270, 30%, 60%)' 
                          : 'hsl(15, 40%, 65%)'
                      : 'hsl(240, 10%, 9%)',
                  }}
                >
                  {/* Inner glow */}
                  <div 
                    className="absolute w-1/2 h-1/2 rounded-full"
                    style={{
                      background: skill.category === 'frontend' 
                        ? 'hsl(350, 45%, 70%)' 
                        : skill.category === 'backend' 
                          ? 'hsl(270, 30%, 60%)' 
                          : 'hsl(15, 40%, 65%)',
                      opacity: 0.5,
                    }}
                  />
                </div>

                {/* Tooltip */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none transition-all duration-300 ${
                  hoveredSkill === skill.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  <div className="bg-card border border-border/50 rounded-lg px-3 py-2 text-center whitespace-nowrap">
                    <p className="font-display text-foreground text-sm">{skill.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full rounded-full"
                          style={{
                            background: skill.category === 'frontend' 
                              ? 'hsl(350, 45%, 70%)' 
                              : skill.category === 'backend' 
                                ? 'hsl(270, 30%, 60%)' 
                                : 'hsl(15, 40%, 65%)',
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ))}

          {/* Background constellation effect */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-champagne/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsConstellation;
