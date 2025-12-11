import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Award, Sparkles, Star } from 'lucide-react';

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
    year: '2025',
    title: 'WhatsApp Bot Masterclasses',
    organization: 'Self-Learning',
    description: 'Exploring automation and chatbot development through hands-on bot-building masterclasses.',
    type: 'education',
  },
  {
    id: 2,
    year: '2024–2025',
    title: 'Trainee Development Engineer',
    organization: 'MediaKind',
    description: 'Completed a 9-month internship focused on real-world software engineering and collaborative development workflows.',
    type: 'work',
  },
  {
    id: 3,
    year: '2024',
    title: '1st Runner-Up — HackVerse',
    organization: 'HackVerse Hackathon',
    description: 'Won 1st Runner-Up for an AI-driven project built during a competitive 36-hour hackathon.',
    type: 'award',
  },
  {
    id: 4,
    year: '2024',
    title: 'Hackathon Participation',
    organization: 'Multiple Hackathons',
    description: 'Participated in three major hackathons throughout 2024, gaining rapid prototyping and problem-solving experience.',
    type: 'award',
  },
  {
    id: 5,
    year: '2024',
    title: 'Academic Milestone — 4th Sem',
    organization: 'Lovely Professional University',
    description: 'Achieved a CGPA of 9.17, reflecting consistent academic excellence.',
    type: 'education',
  },
  {
    id: 6,
    year: '2023',
    title: 'Started B.Tech CSE',
    organization: 'Lovely Professional University',
    description: 'Began my computer science journey, exploring interests in AI, automation, and full-stack development.',
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

const TimelineCard = ({ item, index, isInView, isEven }: { 
  item: TimelineItem; 
  index: number; 
  isInView: boolean;
  isEven: boolean;
}) => {
  const Icon = getIcon(item.type);
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -80 : 80, rotateY: isEven ? -15 : 15 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100,
      }}
      className={`relative flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <motion.div
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            boxShadow: '0 20px 40px -15px hsl(350, 45%, 70%, 0.15)',
          }}
          className="group relative p-6 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 overflow-hidden"
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          
          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(350, 45%, 70%, 0.1), transparent)',
            }}
          />
          
          <div className="relative">
            <motion.span 
              className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary mb-3"
              whileHover={{ scale: 1.1 }}
            >
              {item.year}
            </motion.span>
            
            <h3 className="font-display text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            
            <p className="text-primary/80 text-sm mb-3 flex items-center gap-1 justify-start md:justify-end">
              {!isEven && <Star className="w-3 h-3" />}
              {item.organization}
              {isEven && <Star className="w-3 h-3" />}
            </p>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Center Icon with pulse */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3, type: 'spring' }}
          className="relative"
        >
          {/* Animated glow rings */}
          <motion.div
            className="absolute inset-0 w-14 h-14 rounded-full"
            animate={{
              boxShadow: [
                '0 0 0 0 hsl(350, 45%, 70%, 0.4)',
                '0 0 0 15px hsl(350, 45%, 70%, 0)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
            style={{ transform: 'translate(-4px, -4px)' }}
          />
          
          {/* Icon container */}
          <motion.div 
            className="relative w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5 text-primary" />
          </motion.div>
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

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section id="timeline" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-6" ref={containerRef}>
        {/* Header with reveal animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.p 
            className="text-primary tracking-[0.3em] uppercase text-sm mb-4"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={isInView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
            transition={{ duration: 1 }}
          >
            My Path
          </motion.p>
          
          <div className="overflow-hidden">
            <motion.h2 
              className="font-display text-4xl md:text-5xl mb-6"
              initial={{ y: 80 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The <span className="text-gradient">Journey</span>
            </motion.h2>
          </div>
          
          <motion.p 
            className="text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            A timeline of milestones that have shaped my career and 
            fueled my passion for creating beautiful digital experiences.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line with scroll progress */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            <div className="absolute inset-0 bg-border/30" />
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-secondary to-accent origin-top"
              style={{ height: lineHeight, opacity: lineOpacity }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <TimelineCard 
                key={item.id} 
                item={item} 
                index={index}
                isInView={isInView}
                isEven={index % 2 === 0}
              />
            ))}
          </div>

          {/* End decoration with bloom effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: timelineData.length * 0.15 + 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-8 hidden md:block"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px 10px hsl(350, 45%, 70%, 0.2)',
                  '0 0 30px 15px hsl(350, 45%, 70%, 0.3)',
                  '0 0 20px 10px hsl(350, 45%, 70%, 0.2)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4 rounded-full bg-primary/50 border-2 border-primary"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
