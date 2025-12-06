import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Award, Sparkles } from 'lucide-react';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'work' | 'education' | 'award';
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: '2024',
    title: 'Senior Frontend Developer',
    organization: 'Stellar Studios',
    description: 'Leading the frontend team to build innovative web applications with a focus on performance and accessibility.',
    type: 'work',
  },
  {
    id: 2,
    year: '2023',
    title: 'Best Web Design Award',
    organization: 'Awwwards',
    description: 'Received recognition for outstanding web design and user experience on the Lumière project.',
    type: 'award',
  },
  {
    id: 3,
    year: '2022',
    title: 'Frontend Developer',
    organization: 'Creative Digital',
    description: 'Developed responsive web applications and collaborated with designers to bring creative visions to life.',
    type: 'work',
  },
  {
    id: 4,
    year: '2020',
    title: 'Junior Developer',
    organization: 'TechStart Inc.',
    description: 'Started my professional journey, learning industry best practices and building foundational skills.',
    type: 'work',
  },
  {
    id: 5,
    year: '2019',
    title: 'Computer Science Degree',
    organization: 'University of Technology',
    description: 'Graduated with honors, specializing in web technologies and human-computer interaction.',
    type: 'education',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'work': return Briefcase;
    case 'education': return GraduationCap;
    case 'award': return Award;
    default: return Sparkles;
  }
};

const TimelineItem = ({ item, index, isInView }: { item: TimelineItem; index: number; isInView: boolean }) => {
  const Icon = getIcon(item.type);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <motion.div
          whileHover={{ y: -5 }}
          className="group relative p-6 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative">
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary mb-3">
              {item.year}
            </span>
            
            <h3 className="font-display text-xl text-foreground mb-1">
              {item.title}
            </h3>
            
            <p className="text-primary/80 text-sm mb-3">
              {item.organization}
            </p>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Center Icon */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute inset-0 w-12 h-12 rounded-full bg-primary/30 blur-xl" />
          
          {/* Icon container */}
          <div className="relative w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </motion.div>
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

const TimelineSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="timeline" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto px-6" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            My Path
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            The <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A timeline of milestones that have shaped my career and 
            fueled my passion for creating beautiful digital experiences.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            {/* Background line */}
            <div className="absolute inset-0 bg-border/30" />
            
            {/* Animated fill */}
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-secondary to-primary/30 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={item.id} 
                item={item} 
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* End decoration */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: timelineData.length * 0.2 + 0.3 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-8 hidden md:block"
          >
            <div className="w-4 h-4 rounded-full bg-primary/50 border-2 border-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
