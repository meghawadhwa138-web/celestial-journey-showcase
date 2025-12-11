import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, MapPin, Sparkles, ArrowUpRight, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Magnetic button effect
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);
  const springX = useSpring(buttonX, { stiffness: 300, damping: 20 });
  const springY = useSpring(buttonY, { stiffness: 300, damping: 20 });

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    buttonX.set((e.clientX - centerX) * 0.2);
    buttonY.set((e.clientY - centerY) * 0.2);
  };

  const handleButtonMouseLeave = () => {
    buttonX.set(0);
    buttonY.set(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      access_key: import.meta.env.VITE_Mail_Access_Key,
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I’ll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } else {
      toast.error("Failed to send message.");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Animated background */}
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl"
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-4"
          >
            <MessageCircle className="w-8 h-8 text-primary mx-auto" />
          </motion.div>
          
          <motion.p 
            className="text-primary tracking-[0.3em] uppercase text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Get In Touch
          </motion.p>
          
          <div className="overflow-hidden">
            <motion.h2 
              className="font-display text-4xl md:text-5xl mb-6"
              initial={{ y: 80 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let's Create <span className="text-gradient">Together</span>
            </motion.h2>
          </div>
          
          <motion.p 
            className="text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Have a project in mind or just want to say hello? 
            I'd love to hear from you. Let's bring your ideas to life.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl mb-8 text-foreground">
              Let's connect
            </h3>

            <div className="space-y-6 mb-10">
              <motion.a
                href="mailto:meghawadhwa20@gmail.com"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-card/30 border border-border/30 hover:border-primary/40 transition-all duration-500 overflow-hidden relative"
                whileHover={{ x: 8, scale: 1.02 }}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <motion.div 
                  className="relative p-3 rounded-full bg-primary/10"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="w-5 h-5 text-primary" />
                </motion.div>
                <div className="flex-1 relative">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground group-hover:text-primary transition-colors">
                    meghawadhwa20@gmail.com
                  </p>
                </div>
                <ArrowUpRight className="relative w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </motion.a>

              <motion.div
                className="group flex items-center gap-4 p-5 rounded-2xl bg-card/30 border border-border/30"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
                whileHover={{ x: 8 }}
              >
                <motion.div 
                  className="p-3 rounded-full bg-secondary/10"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="w-5 h-5 text-secondary" />
                </motion.div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground">Rohtak, Haryana</p>
                </div>
              </motion.div>
            </div>

            {/* Quote with animation */}
            <motion.div 
              className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/20 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-10 -right-10 w-20 h-20 rounded-full border border-primary/10"
              />
              
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
              >
                <Sparkles className="w-6 h-6 text-primary mb-4" />
              </motion.div>
              <p className="font-display text-xl text-foreground italic leading-relaxed">
                "Clean code is not just what you write, 
                but how it scales, evolves, and empowers others."   
              </p>
              <p className="text-primary text-sm mt-4">—— Software Development Philosophy</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Jane Doe' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
              ].map((field, i) => (
                <motion.div 
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <label htmlFor={field.id} className="block text-sm text-muted-foreground mb-2">
                    {field.label}
                  </label>
                  <motion.div
                    animate={focusedField === field.id ? { scale: 1.02 } : { scale: 1 }}
                  >
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.id)}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all duration-300"
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                  Your Message
                </label>
                <motion.div
                  animate={focusedField === 'message' ? { scale: 1.02 } : { scale: 1 }}
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-4 rounded-xl bg-primary text-primary-foreground font-body font-medium overflow-hidden disabled:opacity-70 cursor-pointer"
                style={{ x: springX, y: springY }}
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'linear-gradient(90deg, hsl(350, 45%, 70%) 0%, hsl(270, 30%, 60%) 100%)',
                      'linear-gradient(90deg, hsl(270, 30%, 60%) 0%, hsl(350, 45%, 70%) 100%)',
                      'linear-gradient(90deg, hsl(350, 45%, 70%) 0%, hsl(270, 30%, 60%) 100%)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-stardust/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.span>
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
