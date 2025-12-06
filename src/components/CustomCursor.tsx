import { useEffect, useState, useCallback } from 'react';

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);

    setTrail(prev => {
      const newTrail = [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }];
      return newTrail.slice(-12);
    });
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseLeave]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Trail */}
      {trail.map((dot, index) => (
        <div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: 4 + index * 0.5,
            height: 4 + index * 0.5,
            background: `radial-gradient(circle, hsl(350 45% 70% / ${0.1 + index * 0.05}) 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s ease-out',
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className="absolute transition-transform duration-100 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        {/* Outer ring */}
        <div 
          className={`absolute rounded-full border transition-all duration-300 ${
            isHovering 
              ? 'w-10 h-10 border-primary/60' 
              : 'w-8 h-8 border-primary/40'
          }`}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        
        {/* Inner dot */}
        <div 
          className={`absolute rounded-full bg-primary transition-all duration-300 ${
            isHovering ? 'w-2 h-2' : 'w-1.5 h-1.5'
          }`}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        
        {/* Glow effect */}
        <div 
          className="absolute w-16 h-16 rounded-full opacity-30"
          style={{ 
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, hsl(350 45% 70% / 0.3) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
