import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import RoamIndia from './../../assets/RoamIndia.png'

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

// const projects: Project[] = [
//   {
//     id: 1,
//     title: 'RoamIndia',
//     description: "RoamIndia is your ultimate travel companion, designed for visitors exploring the diverse and enchanting landscapes of India. Whether you're a family seeking adventure or a solo traveler on a journey of discovery, it offers personalized trip planning and detailed city guides to help you experience India’s rich cultural tapestry.",
//     tags: ['MongoDB', 'Express JS', 'React', 'Node JS', 'Tailwind CSS', 'Daisy UI', 'Typescript', 'Mongoose'],
//     image: RoamIndia,
//     liveUrl: 'https://roam-india.vercel.app/',
//     githubUrl: 'https://github.com/megha-wadhwa12/S53_MeghaWadhwa_Capstone_RoamIndia',
//   },
//   {
//     id: 2,
//     title: 'TriVault',
//     description: 'TriVault is a smart WhatsApp bot that turns any forwarded message into instant actions. Summarize text, save notes to your personal vault, and set AI-powered reminders — all inside WhatsApp.',
//     tags: ['Next.js', 'Gemini AI API', 'GOWA API'],
//     image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
//     liveUrl: '#',
//     githubUrl: 'https://github.com/megha-wadhwa12/TriVault',
//   },
//   {
//     id: 3,
//     title: 'Vibe',
//     description: 'Vibe is a mood-based social app with a soft pastel aesthetic that helps users track, express, and explore emotions through daily mood logs, chats, and personalized analytics — blending Pinterest-style visuals with emotional wellness and connection.',
//     tags: ['React Native', 'TypeScript', 'Firebase', 'Expo'],
//     image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop',
//     liveUrl: '#',
//     githubUrl: 'https://github.com/megha-wadhwa12/Vibe',
//   },
//   {
//     id: 4,
//     title: 'EdgeStream',
//     description: 'Real-time CDN + streaming server monitoring system that shows node health, traffic metrics, latency, cache performance & anomalies using WebSockets + distributed simulation.',
//     tags: ['Node.js', 'Express.js', 'Socket.io', 'MongoDB', 'AWS', 'Next.js', 'Recharts.js', 'Tailwind CSS'],
//     image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop',
//     liveUrl: '#',
//     githubUrl: 'https://github.com/megha-wadhwa12/EdgeStream',
//   },
//   {
//     id: 5,
//     title: 'SimpliShop',
//     description: 'SimpliShop is an AI-powered shopping assistant that enables users to search, compare, and discover alternative products. It utilizes advanced embeddings and large language models to deliver structured recommendations.',
//     tags: ['Node.js', 'Express.js', 'Generative AI', 'ChromaDB', 'OpenAI Embeddings', 'AJV', 'Tailwind CSS'],
//     image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop',
//     liveUrl: '#',
//     githubUrl: 'https://github.com/megha-wadhwa12/S53_SimpliShop',
//   },
//   {
//     id: 5,
//     title: 'Supermarket Inventory Management Simulation',
//     description: 'Developed a supermarket inventory management simulation using C++ and Object-Oriented Programming concepts. Designed modular classes for products, inventory operations, billing, and supermarket workflow. Implemented features such as adding/updating items, managing stock levels, generating purchase summaries, and maintaining clean separation of concerns through header and source files.',
//     tags: ['C++', 'OOPS'],
//     image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
//     liveUrl: '#',
//     githubUrl: 'https://github.com/megha-wadhwa12/S53_Megha_Wadhwa_OOP_Supermarket_Inventory_Management_Simulation',
//   },
//   {
//     id: 6,
//     title: 'Decentralized Array Store Pagination',
//     description: 'Created a C++ program that handles “decentralized array stores” — a set of arrays containing heterogeneous objects — and builds a custom pagination mechanism to fetch data across these stores. Supports filtering (based on divisibility criteria), handles multiple queries dynamically, and returns results page-by-page. Demonstrated ability to design efficient algorithms and manage data across distributed-like in-memory structures.',
//     tags: ['C++'],
//     image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
//     liveUrl: '#',
//     githubUrl: 'https://github.com/megha-wadhwa12/DecentralizedArrayStorePagination',
//   },
//   {
//     id: 7,
//     title: 'CodeGen',
//     description: 'CodeGen is a revolutionary platform aimed at enriching the coding experience through the seamless integration of AI technologies. Our platform offers a chatbot for efficient navigation, a code debugger for error resolution, and an educational topic searcher for in-depth learning.',
//     tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Generative AI'],
//     image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
//     liveUrl: 'https://codegen-phi.vercel.app/',
//     githubUrl: 'https://github.com/megha-wadhwa12/HackVerseHackathon',
//   },
//   {
//     id: 8,
//     title: 'FLAMES',
//     description: 'Created a C++ console application for the FLAMES game: takes two names, removes common letters, counts unmatched letters, then iteratively applies the FLAMES elimination algorithm to predict a playful “relationship status.” Encapsulated the logic in clean, modular code with input validation and correct handling of edge cases.',
//     tags: ['C++'],
//     image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
//     liveUrl: '#',
//     githubUrl: 'https://github.com/megha-wadhwa12/FLAMES',
//   },
//   {
//     id: 9,
//     title: 'Weirdest Fashion',
//     description: 'Developed a full-stack web application for “Weirdest Fashion”, enabling users to explore, submit and browse unconventional & creative fashion designs. Frontend built in React.js with Chakra UI for UI components, backend implemented using Node.js + Express, and MongoDB for storing user-generated fashion entries. Deployed live (frontend and backend) to allow real users to interact with the platform.',
//     tags: ['React.js', 'Chakra UI', 'Node.js', 'Express.js', 'MongoDB'],
//     image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
//     liveUrl: 'https://weirdest-fashion.vercel.app/',
//     githubUrl: 'https://github.com/megha-wadhwa12/S53_Weirdest_Fashion',
//   },
//   {
//     id: 10,
//     title: 'Kalvium Books',
//     description: 'Developed Kalvium-Books, a React.js application that displays and manages a collection of books using reusable components and state management. Implemented features such as adding books, viewing details, and dynamically updating the UI based on user actions. Demonstrated understanding of props, state, component hierarchy, and responsive layout with modern React practices.',
//     tags: ['React.js', 'Vite'],
//     image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
//     liveUrl: 'https://kalvium-app.vercel.app/',
//     githubUrl: 'https://github.com/megha-wadhwa12/Kalvium-Books',
//   },
//   {
//     id: 11,
//     title: 'Qwisdom',
//     description: 'Developed Quizdom-Website — a React-based single-page quiz application that presents a series of questions, captures user responses, transitions automatically to next questions, and displays result score at the end. Incorporated UI features including a dark/light mode toggle and interactive components for question display and results. Managed application state using React hooks and ensured responsive user experience.',
//     tags: ['C++'],
//     image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
//     liveUrl: 'https://qwisdom.netlify.app/',
//     githubUrl: 'https://github.com/megha-wadhwa12/Quizdom-Website',
//   },
//   {
//     id: 12,
//     title: 'Calculator',
//     description: 'Developed a React-based calculator application using functional components and hooks, enabling users to perform basic arithmetic operations (addition, subtraction, multiplication, division) with a clean UI. Organized the app into modular components (display, buttons, input handler), managed application state, and handled user interactions smoothly. Demonstrated understanding of React fundamentals such as component-based architecture, state and event handling, and dynamic UI updates.',
//     tags: ['C++'],
//     image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
//     liveUrl: 'https://calculator-app-three-iota.vercel.app/',
//     githubUrl: 'https://github.com/megha-wadhwa12/code-along-react-calculator-boilerplate',
//   },
//   {
//     id: 13,
//     title: 'Meme Generator',
//     description: 'Welcome to the Meme Generator, a simple yet fun web application built entirely with React. This project serves as a practical exercise for developers who want to practice their React skills by creating a meme generator from scratch. You can load images, add custom text, and generate memes on the fly!',
//     tags: ['Javascript', 'React.js'],
//     image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
//     liveUrl: 'https://meme-generator-two-iota.vercel.app/',
//     githubUrl: 'https://github.com/megha-wadhwa12/S53_Megha_Wadhwa_Training_MemeGenerator',
//   },
//   {
//     id: 14,
//     title: 'Flavor Fiesta',
//     description: 'Developed Flavor-Fiesta — a web application that showcases recipes / restaurant-style menu items (or food content), with features for browsing, viewing item details (or recipe instructions), and a responsive user interface. Employed modern web technologies to build a dynamic, user-friendly, and visually appealing front-end that enhances user experience for food lovers / users. Demonstrated skills in web development, UI design, and client-side data handling / rendering.',
//     tags: ['React.js'],
//     image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
//     liveUrl: 'https://megha-wadhwa12.github.io/Flavor-Fiesta/',
//     githubUrl: 'https://github.com/megha-wadhwa12/Flavor-Fiesta',
//   },


// ];

const projects: Project[] = [
  {
    id: 1,
    title: 'RoamIndia',
    description:
      "RoamIndia is your ultimate travel companion, designed for visitors exploring India's diverse landscapes. It offers personalized trip planning, curated guides, and seamless navigation to help travelers experience the country’s cultural richness.",
    tags: ['MongoDB', 'Express JS', 'React', 'Node JS', 'Tailwind CSS', 'Daisy UI', 'TypeScript', 'Mongoose'],
    image: RoamIndia,
    liveUrl: 'https://roam-india.vercel.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/S53_MeghaWadhwa_Capstone_RoamIndia',
  },
  {
    id: 2,
    title: 'TriVault',
    description:
      'TriVault is a smart WhatsApp bot that transforms forwarded messages into instant actions — summarizing text, saving notes, and setting AI-powered reminders directly inside WhatsApp.',
    tags: ['Next.js', 'Gemini AI API', 'GOWA API'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/TriVault',
  },
  {
    id: 3,
    title: 'Vibe',
    description:
      'Vibe is a pastel-themed mood-based social app that lets users track emotions, express feelings, chat, and explore personalized emotional analytics — blending wellness with social connection.',
    tags: ['React Native', 'TypeScript', 'Firebase', 'Expo'],
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/Vibe',
  },
  {
    id: 4,
    title: 'EdgeStream',
    description:
      'A real-time CDN and streaming server monitoring dashboard that displays node health, traffic metrics, latency, cache stats, and anomaly detection using WebSockets and distributed simulation.',
    tags: ['Node.js', 'Express.js', 'Socket.io', 'MongoDB', 'AWS', 'Next.js', 'Recharts.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/EdgeStream',
  },
  {
    id: 5,
    title: 'SimpliShop',
    description:
      'SimpliShop is an AI-powered shopping assistant that helps users search, compare, and discover alternative products using embeddings, vector search, and LLM-powered structured recommendations.',
    tags: ['Node.js', 'Express.js', 'Generative AI', 'ChromaDB', 'OpenAI Embeddings', 'AJV', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/S53_SimpliShop',
  },
  {
    id: 6,
    title: 'Supermarket Inventory Management Simulation',
    description:
      'Developed a supermarket inventory management simulation using C++ and OOP principles. Features include adding/updating products, managing stock levels, simulating billing, and maintaining modular class architecture.',
    tags: ['C++', 'OOPS'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl:
      'https://github.com/megha-wadhwa12/S53_Megha_Wadhwa_OOP_Supermarket_Inventory_Management_Simulation',
  },
  {
    id: 7,
    title: 'Decentralized Array Store Pagination',
    description:
      'Created a C++ program that manages decentralized array stores and implements a custom pagination system for filtering, caching, and retrieving data across distributed-like memory structures.',
    tags: ['C++'],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/DecentralizedArrayStorePagination',
  },
  {
    id: 8,
    title: 'CodeGen',
    description:
      'CodeGen is an AI-integrated platform offering a chatbot, code debugger, and educational topic searcher to enhance the coding experience using intelligent automation.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Generative AI'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://codegen-phi.vercel.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/HackVerseHackathon',
  },
  {
    id: 9,
    title: 'FLAMES',
    description:
      'Built a C++ implementation of the FLAMES game using string manipulation and elimination logic to determine a relationship outcome based on user-input names.',
    tags: ['C++'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/FLAMES',
  },
  {
    id: 10,
    title: 'Weirdest Fashion',
    description:
      'A full-stack platform enabling users to explore and submit unconventional fashion designs. Built using React + Chakra UI for frontend and Node.js + Express + MongoDB for backend, deployed for real-user interaction.',
    tags: ['React.js', 'Chakra UI', 'Node.js', 'Express.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://weirdest-fashion.vercel.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/S53_Weirdest_Fashion',
  },
  {
    id: 11,
    title: 'Kalvium Books',
    description:
      'A React-based book management app built with reusable components and hooks. Users can add books, view details, and interact with a dynamically updated UI.',
    tags: ['React.js', 'Vite'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://kalvium-app.vercel.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/Kalvium-Books',
  },
  {
    id: 12,
    title: 'Quizdom',
    description:
      'Quizdom is a React-based quiz platform with theme toggling, smooth question progression, real-time score calculation, and responsive UI built using React hooks.',
    tags: ['React.js', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://qwisdom.netlify.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/Quizdom-Website',
  },
  {
    id: 13,
    title: 'Calculator',
    description:
      'A functional React calculator that supports basic arithmetic operations, built with modular components, state management, and clean UI handling.',
    tags: ['React.js', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://calculator-app-three-iota.vercel.app/',
    githubUrl:
      'https://github.com/megha-wadhwa12/code-along-react-calculator-boilerplate',
  },
  {
    id: 14,
    title: 'Meme Generator',
    description:
      'A fun React application that lets users load images, overlay custom text, and generate memes. Built to practice React state, components, and event handling.',
    tags: ['JavaScript', 'React.js'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://meme-generator-two-iota.vercel.app/',
    githubUrl:
      'https://github.com/megha-wadhwa12/S53_Megha_Wadhwa_Training_MemeGenerator',
  },
  {
    id: 15,
    title: 'Flavor Fiesta',
    description:
      'Flavor-Fiesta is a React-based recipe and food exploration website featuring dynamic content browsing, recipe details, and a responsive user-friendly interface.',
    tags: ['React.js'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://megha-wadhwa12.github.io/Flavor-Fiesta/',
    githubUrl: 'https://github.com/megha-wadhwa12/Flavor-Fiesta',
  },
];
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);
  const contentX = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? -30 : 30, 0, isEven ? 30 : -30]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center mb-32 last:mb-0`}
    >
      {/* Image container with unique reveal */}
      <motion.div
        className="relative w-full lg:w-1/2 aspect-[4/3] group"
        style={{ y: isEven ? y : undefined, rotate: imageRotate }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated corner accents */}
        <motion.div
          className="absolute -top-2 -left-2 w-12 h-12 border-l-2 border-t-2 border-primary/40 rounded-tl-xl"
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute -bottom-2 -right-2 w-12 h-12 border-r-2 border-b-2 border-secondary/40 rounded-br-xl"
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-xl"
          animate={{
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Main image */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/20">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Shimmer overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            animate={{ x: isHovered ? '200%' : '-100%' }}
            transition={{ duration: 0.8 }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
            animate={{ opacity: isHovered ? 0.7 : 0.4 }}
          />

          {/* Floating number with glow */}
          <motion.div
            className="absolute top-6 left-6 font-display text-7xl"
            animate={{
              opacity: isHovered ? 1 : 0.3,
              scale: isHovered ? 1.1 : 1,
              textShadow: isHovered ? '0 0 30px hsl(var(--primary))' : 'none',
            }}
            style={{ color: 'hsl(var(--primary) / 0.4)' }}
          >
            0{project.id}
          </motion.div>

          {/* Sparkle decoration */}
          <motion.div
            className="absolute top-4 right-4"
            animate={{
              opacity: isHovered ? 1 : 0,
              rotate: isHovered ? 180 : 0,
              scale: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>

          {/* Action buttons on hover */}
          <motion.div
            className="absolute bottom-6 right-6 flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={project.liveUrl}
              target='_blank'
              className="p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target='_blank'
              className="p-3 rounded-full bg-card/90 border border-border text-foreground backdrop-blur-sm"
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="w-full lg:w-1/2 space-y-6"
        style={{ x: contentX }}
      >
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <span className="text-primary text-sm tracking-widest uppercase">Project</span>
        </motion.div>

        <motion.h3
          className="font-display text-4xl md:text-5xl text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="text-muted-foreground text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {project.description}
        </motion.p>

        {/* Tags with staggered animation */}
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              className="px-4 py-2 text-sm rounded-full bg-card/60 text-muted-foreground border border-border/30 hover:border-primary/40 hover:text-foreground hover:bg-primary/5 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
              whileHover={{ scale: 1.08, y: -2 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* View project link with enhanced animation */}
        <motion.a
          href={project.liveUrl}
          target='_blank'
          className="inline-flex items-center gap-3 text-primary group cursor-pointer pt-4 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ x: 5 }}
        >
          <span className="text-sm tracking-wide uppercase">View Project</span>
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
          <motion.div
            className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 4);
  const hasMoreProjects = projects.length > 4;

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ x: [-50, 50, -50], y: [-30, 30, -30] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
          animate={{ x: [50, -50, 50], y: [30, -30, 30] }}
          transition={{ duration: 25, repeat: Infinity }}
        />

        {/* Additional floating orbs */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-accent/3 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header with enhanced animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mb-24"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="w-8 h-px bg-gradient-to-r from-transparent to-primary"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="text-primary tracking-[0.3em] uppercase text-sm">Selected Work</span>
            <motion.div
              className="w-8 h-px bg-gradient-to-l from-transparent to-primary"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.h2
            className="font-display text-4xl md:text-6xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            A curated collection of projects showcasing elegant digital experiences
          </motion.p>
        </motion.div>

        {/* Projects list with AnimatePresence for smooth transitions */}
        <div className="space-y-8">
          <AnimatePresence mode="sync">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* View All Projects button */}
        {hasMoreProjects && (
          <motion.div
            className="flex justify-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-8 py-4 rounded-full bg-card/60 border border-border/30 text-foreground overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ x: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Border glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.3), hsl(var(--primary) / 0.3))',
                  padding: '1px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />

              <span className="relative flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm tracking-wide">
                  {showAll ? 'Show Less' : `View All Projects (${projects.length - 4} more)`}
                </span>
                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-primary" />
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;