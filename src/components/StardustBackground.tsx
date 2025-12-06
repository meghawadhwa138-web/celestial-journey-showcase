import { useEffect, useState, useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface FloatingOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: 'rose' | 'lavender';
  duration: number;
  delay: number;
}

const StardustBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stars = useMemo<Star[]>(() => 
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    })), []
  );

  const orbs = useMemo<FloatingOrb[]>(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      color: i % 2 === 0 ? 'rose' : 'lavender',
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(280 40% 15% / 0.4) 0%, transparent 50%)',
        }}
      />

      {/* Floating orbs with parallax */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-3xl animate-float"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color === 'rose' 
              ? 'radial-gradient(circle, hsl(350 45% 70% / 0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(270 30% 60% / 0.08) 0%, transparent 70%)',
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
      ))}

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: 'hsl(40 30% 85%)',
            boxShadow: `0 0 ${star.size * 2}px hsl(40 30% 85% / 0.5)`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(350 45% 70% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(350 45% 70% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
    </div>
  );
};

export default StardustBackground;
