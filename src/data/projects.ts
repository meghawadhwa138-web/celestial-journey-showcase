import RoamIndia from '../../assets/RoamIndia.png';

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  images?: string[];
  liveUrl: string;
  githubUrl: string;
  features?: string[];
  challenges?: string[];
  year?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'RoamIndia',
    slug: 'roamindia',
    description:
      "RoamIndia is your ultimate travel companion, designed for visitors exploring India's diverse landscapes. It offers personalized trip planning, curated guides, and seamless navigation to help travelers experience the country's cultural richness.",
    longDescription:
      "RoamIndia is a comprehensive travel planning platform designed specifically for exploring India. The application provides personalized itineraries based on user preferences, detailed city and state guides, curated experiences for solo travelers and families alike, and real-time navigation support. Built with the MERN stack and TypeScript, it delivers a seamless, responsive experience across all devices.",
    tags: ['MongoDB', 'Express JS', 'React', 'Node JS', 'Tailwind CSS', 'Daisy UI', 'TypeScript', 'Mongoose'],
    image: RoamIndia,
    images: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1532664189809-02133fee698d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585135497273-1a86d9d4f7d2?w=800&h=600&fit=crop',
    ],
    liveUrl: 'https://roam-india.vercel.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/S53_MeghaWadhwa_Capstone_RoamIndia',
    features: [
      'Personalized trip planning based on user preferences',
      'Detailed city and state travel guides',
      'Curated recommendations for solo & family travelers',
      'Responsive design with modern UI components',
      'RESTful API with MongoDB for data persistence',
    ],
    challenges: [
      'Handling complex itinerary generation logic',
      'Optimizing image-heavy pages for performance',
      'Building a scalable data model for diverse travel content',
    ],
    year: '2024',
  },
  {
    id: 2,
    title: 'TriVault',
    slug: 'trivault',
    description:
      'TriVault is a smart WhatsApp bot that transforms forwarded messages into instant actions — summarizing text, saving notes, and setting AI-powered reminders directly inside WhatsApp.',
    longDescription:
      'TriVault leverages the power of Gemini AI and the GOWA WhatsApp API to create an intelligent assistant that lives inside WhatsApp. Users can forward any message to the bot and instantly get summaries, save important notes to a personal vault, or set context-aware reminders — all without leaving the chat interface.',
    tags: ['Next.js', 'Gemini AI API', 'GOWA API'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=600&fit=crop',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/TriVault',
    features: [
      'AI-powered message summarization using Gemini',
      'Personal note vault accessible via WhatsApp',
      'Smart reminder system with natural language processing',
      'Seamless WhatsApp integration via GOWA API',
    ],
    challenges: [
      'Handling diverse message formats and media types',
      'Ensuring reliable delivery of reminders',
      'Managing conversation context across sessions',
    ],
    year: '2025',
  },
  {
    id: 3,
    title: 'Vibe',
    slug: 'vibe',
    description:
      'Vibe is a pastel-themed mood-based social app that lets users track emotions, express feelings, chat, and explore personalized emotional analytics — blending wellness with social connection.',
    longDescription:
      'Vibe combines emotional wellness tracking with social features in a beautifully designed mobile application. Users log their daily moods, connect with others who share similar emotional states, and receive personalized insights through analytics dashboards. The pastel aesthetic and intuitive UX create a calming, supportive environment.',
    tags: ['React Native', 'TypeScript', 'Firebase', 'Expo'],
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&h=600&fit=crop',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/Vibe',
    features: [
      'Daily mood logging with expressive emoji system',
      'Social feed for sharing emotional experiences',
      'Personalized emotional analytics and trends',
      'Real-time chat with mood-based matching',
      'Calming pastel UI inspired by Pinterest aesthetics',
    ],
    challenges: [
      'Designing sensitive UX for emotional content',
      'Real-time data sync with Firebase',
      'Building cross-platform consistency with React Native',
    ],
    year: '2025',
  },
  {
    id: 4,
    title: 'EdgeStream',
    slug: 'edgestream',
    description:
      'A real-time CDN and streaming server monitoring dashboard that displays node health, traffic metrics, latency, cache stats, and anomaly detection using WebSockets and distributed simulation.',
    longDescription:
      'EdgeStream is a sophisticated monitoring system for CDN and streaming infrastructure. It simulates distributed server nodes, collects real-time metrics via WebSockets, and presents them through an interactive dashboard. Features include live latency graphs, cache hit/miss ratios, traffic heatmaps, and automated anomaly detection alerts.',
    tags: ['Node.js', 'Express.js', 'Socket.io', 'MongoDB', 'AWS', 'Next.js', 'Recharts.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/EdgeStream',
    features: [
      'Real-time WebSocket-based metric streaming',
      'Interactive charts for latency, traffic, and cache performance',
      'Distributed node simulation engine',
      'Automated anomaly detection and alerting',
      'AWS-integrated deployment pipeline',
    ],
    challenges: [
      'Managing high-frequency WebSocket data streams',
      'Building realistic distributed system simulations',
      'Optimizing dashboard rendering for real-time updates',
    ],
    year: '2025',
  },
  {
    id: 5,
    title: 'SimpliShop',
    slug: 'simplishop',
    description:
      'SimpliShop is an AI-powered shopping assistant that helps users search, compare, and discover alternative products using embeddings, vector search, and LLM-powered structured recommendations.',
    longDescription:
      'SimpliShop reimagines online shopping by integrating AI at every step. Users describe what they want in natural language, and the system uses OpenAI embeddings with ChromaDB vector search to find semantically similar products. The LLM then structures and ranks recommendations, providing detailed comparisons and alternative suggestions.',
    tags: ['Node.js', 'Express.js', 'Generative AI', 'ChromaDB', 'OpenAI Embeddings', 'AJV', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/S53_SimpliShop',
    features: [
      'Natural language product search',
      'Vector similarity search with ChromaDB',
      'LLM-powered structured recommendations',
      'Product comparison and alternative discovery',
      'Schema validation with AJV',
    ],
    challenges: [
      'Fine-tuning embedding similarity thresholds',
      'Structuring LLM output for consistent UI rendering',
      'Balancing search accuracy with response speed',
    ],
    year: '2024',
  },
  {
    id: 6,
    title: 'Supermarket Inventory Simulation',
    slug: 'supermarket-inventory',
    description:
      'Developed a supermarket inventory management simulation using C++ and OOP principles. Features include adding/updating products, managing stock levels, simulating billing, and maintaining modular class architecture.',
    longDescription:
      'A console-based C++ application that simulates the complete workflow of a supermarket inventory system. Built with strong OOP principles, it features modular classes for products, inventory operations, billing workflows, and stock management. The architecture demonstrates clean separation of concerns through well-organized header and source files.',
    tags: ['C++', 'OOPS'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/S53_Megha_Wadhwa_OOP_Supermarket_Inventory_Management_Simulation',
    features: [
      'Product CRUD operations with stock tracking',
      'Billing simulation with purchase summaries',
      'Modular class architecture with header files',
      'Input validation and edge case handling',
    ],
    challenges: [
      'Designing a clean OOP hierarchy for diverse operations',
      'Managing state consistency across billing operations',
    ],
    year: '2024',
  },
  {
    id: 7,
    title: 'Decentralized Array Store Pagination',
    slug: 'decentralized-array-store',
    description:
      'Created a C++ program that manages decentralized array stores and implements a custom pagination system for filtering, caching, and retrieving data across distributed-like memory structures.',
    longDescription:
      'This project tackles the challenge of paginating data across multiple heterogeneous array stores. The custom algorithm fetches data page-by-page, supports filtering based on divisibility criteria, and handles multiple dynamic queries efficiently. It demonstrates strong algorithmic thinking and data structure design.',
    tags: ['C++'],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/DecentralizedArrayStorePagination',
    features: [
      'Custom pagination across distributed array stores',
      'Dynamic query handling with filtering',
      'Efficient data retrieval algorithms',
      'Support for heterogeneous data types',
    ],
    challenges: [
      'Designing efficient cross-store pagination logic',
      'Handling edge cases in distributed data access',
    ],
    year: '2024',
  },
  {
    id: 8,
    title: 'CodeGen',
    slug: 'codegen',
    description:
      'CodeGen is an AI-integrated platform offering a chatbot, code debugger, and educational topic searcher to enhance the coding experience using intelligent automation.',
    longDescription:
      'Built during HackVerse hackathon (1st Runner-up), CodeGen is an AI-powered developer platform. It features an intelligent chatbot for navigating coding concepts, an automated code debugger that identifies and suggests fixes, and a topic searcher for deep-diving into programming subjects. The MERN stack powers a responsive, feature-rich interface.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Generative AI'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://codegen-phi.vercel.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/HackVerseHackathon',
    features: [
      'AI chatbot for coding assistance',
      'Automated code debugging with fix suggestions',
      'Educational topic search engine',
      'Real-time code analysis and feedback',
    ],
    challenges: [
      'Integrating multiple AI services seamlessly',
      'Building an intuitive debugging workflow',
      'Handling diverse programming languages in analysis',
    ],
    year: '2024',
  },
  {
    id: 9,
    title: 'FLAMES',
    slug: 'flames',
    description:
      'Built a C++ implementation of the FLAMES game using string manipulation and elimination logic to determine a relationship outcome based on user-input names.',
    longDescription:
      'A fun C++ console application implementing the classic FLAMES game. It takes two names as input, removes common letters, counts unmatched characters, and applies the iterative FLAMES elimination algorithm to predict a playful relationship status. Clean, modular code with proper input validation.',
    tags: ['C++'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/megha-wadhwa12/FLAMES',
    features: [
      'String manipulation and character matching',
      'Iterative elimination algorithm',
      'Input validation and edge case handling',
    ],
    challenges: [
      'Correctly handling duplicate characters in names',
      'Implementing the circular elimination logic',
    ],
    year: '2024',
  },
  {
    id: 10,
    title: 'Weirdest Fashion',
    slug: 'weirdest-fashion',
    description:
      'A full-stack platform enabling users to explore and submit unconventional fashion designs. Built using React + Chakra UI for frontend and Node.js + Express + MongoDB for backend.',
    longDescription:
      'Weirdest Fashion is a community-driven platform celebrating unconventional and creative fashion. Users can browse submissions, upload their own weird fashion finds, and engage with the community. The full-stack application uses React with Chakra UI for a polished frontend and Node.js/Express/MongoDB for robust data management.',
    tags: ['React.js', 'Chakra UI', 'Node.js', 'Express.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://weirdest-fashion.vercel.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/S53_Weirdest_Fashion',
    features: [
      'User-generated fashion content submission',
      'Browse and explore community designs',
      'Responsive UI with Chakra components',
      'RESTful API with MongoDB persistence',
    ],
    challenges: [
      'Handling image uploads and storage',
      'Building engaging content discovery UX',
    ],
    year: '2024',
  },
  {
    id: 11,
    title: 'Kalvium Books',
    slug: 'kalvium-books',
    description:
      'A React-based book management app built with reusable components and hooks. Users can add books, view details, and interact with a dynamically updated UI.',
    longDescription:
      'Kalvium Books is a React application for managing and displaying a book collection. Built with modern React practices including hooks and reusable components, it features dynamic UI updates, book detail views, and an intuitive management interface.',
    tags: ['React.js', 'Vite'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://kalvium-app.vercel.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/Kalvium-Books',
    features: [
      'Book collection management with CRUD operations',
      'Reusable component architecture',
      'Dynamic UI updates with React hooks',
      'Responsive layout design',
    ],
    challenges: [
      'Designing an efficient component hierarchy',
      'Managing state across nested components',
    ],
    year: '2024',
  },
  {
    id: 12,
    title: 'Quizdom',
    slug: 'quizdom',
    description:
      'Quizdom is a React-based quiz platform with theme toggling, smooth question progression, real-time score calculation, and responsive UI.',
    longDescription:
      'A single-page quiz application built with React that presents questions sequentially, captures responses, auto-advances, and calculates scores in real-time. Features include dark/light mode toggle and interactive question components for an engaging user experience.',
    tags: ['React.js', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://qwisdom.netlify.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/Quizdom-Website',
    features: [
      'Sequential question presentation with auto-advance',
      'Real-time score tracking and results display',
      'Dark/light mode theme toggle',
      'Interactive and responsive quiz interface',
    ],
    challenges: [
      'Managing quiz state and transitions smoothly',
      'Implementing accurate real-time scoring',
    ],
    year: '2024',
  },
  {
    id: 13,
    title: 'Calculator',
    slug: 'calculator',
    description:
      'A functional React calculator that supports basic arithmetic operations, built with modular components, state management, and clean UI handling.',
    longDescription:
      'A React-based calculator application featuring modular components for display, buttons, and input handling. Supports addition, subtraction, multiplication, and division with clean state management and smooth user interactions.',
    tags: ['React.js', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://calculator-app-three-iota.vercel.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/code-along-react-calculator-boilerplate',
    features: [
      'Basic arithmetic operations',
      'Modular component architecture',
      'Clean state management with hooks',
      'Responsive calculator UI',
    ],
    challenges: [
      'Handling chained operations correctly',
      'Managing display state for complex calculations',
    ],
    year: '2024',
  },
  {
    id: 14,
    title: 'Meme Generator',
    slug: 'meme-generator',
    description:
      'A fun React application that lets users load images, overlay custom text, and generate memes on the fly.',
    longDescription:
      'A React-based meme creation tool where users can load images, add custom text overlays at different positions, and generate shareable memes. Built to practice React fundamentals including state management, event handling, and component composition.',
    tags: ['JavaScript', 'React.js'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://meme-generator-two-iota.vercel.app/',
    githubUrl: 'https://github.com/megha-wadhwa12/S53_Megha_Wadhwa_Training_MemeGenerator',
    features: [
      'Image loading and display',
      'Custom text overlay with positioning',
      'On-the-fly meme generation',
      'Simple and intuitive interface',
    ],
    challenges: [
      'Positioning text overlays accurately on images',
      'Handling diverse image dimensions',
    ],
    year: '2024',
  },
  {
    id: 15,
    title: 'Flavor Fiesta',
    slug: 'flavor-fiesta',
    description:
      'Flavor-Fiesta is a React-based recipe and food exploration website featuring dynamic content browsing, recipe details, and a responsive user-friendly interface.',
    longDescription:
      'A visually appealing food and recipe exploration platform built with React. Users can browse restaurant-style menu items, view detailed recipe instructions, and enjoy a responsive interface designed to delight food enthusiasts.',
    tags: ['React.js'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
    liveUrl: 'https://megha-wadhwa12.github.io/Flavor-Fiesta/',
    githubUrl: 'https://github.com/megha-wadhwa12/Flavor-Fiesta',
    features: [
      'Dynamic recipe and menu browsing',
      'Detailed recipe/item view pages',
      'Responsive and visually appealing design',
      'Client-side rendering and routing',
    ],
    challenges: [
      'Creating an engaging food content layout',
      'Optimizing image loading for recipe cards',
    ],
    year: '2024',
  },
];
