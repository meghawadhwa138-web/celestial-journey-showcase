import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react';
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/megha-wadhwa12', label: 'GitHub', target: '_blank' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/megha-wadhwa-799bb7283', label: 'LinkedIn', target: '_blank' },
    { icon: SiLeetcode, href: 'https://leetcode.com/u/meghawadhwa20', label: 'Leetcode', target: '_blank' },
    { icon: Instagram, href: 'https://www.instagram.com/wadhwamegha769', label: 'Instagram', target: '_blank' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 border-t border-border/30 overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-primary/5 blur-3xl rounded-full"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Scroll to top button */}
        <motion.button
          onClick={scrollToTop}
          className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all cursor-pointer"
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8">
          {/* Logo/Name with hover effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <motion.p
              className="font-display text-2xl text-gradient cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={scrollToTop}
            >
              Megha Wadhwa
            </motion.p>
            <p className="text-sm text-muted-foreground mt-1">
              Software Developer
            </p>
          </motion.div>

          {/* Social Links with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.target}
                className="group relative p-3 rounded-full text-muted-foreground hover:text-primary transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
                aria-label={social.label}
              >
                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <social.icon className="relative w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright with animated heart */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span>© {currentYear}</span>
            <span>Made with</span>
            <motion.span
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -10, 10, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </motion.span>
            <span>& lots of coffee</span>
          </motion.p>
        </div>

        {/* Bottom flourish */}
        <motion.div
          className="mt-12 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-primary/50"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
