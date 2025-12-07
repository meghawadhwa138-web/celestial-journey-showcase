import { useEffect, useState, useCallback, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  // Smooth animation loop using RAF
  useEffect(() => {
    const animate = () => {
      const lerp = 0.15;
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * lerp;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * lerp;
      
      setPosition({ x: positionRef.current.x, y: positionRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
    setIsVisible(true);
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.closest('a') !== null || 
      target.closest('button') !== null ||
      target.classList.contains('cursor-pointer');
    setIsHovering(isInteractive);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
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
      {/* Main cursor */}
      <div
        className="absolute will-change-transform"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Outer ring */}
        <div 
          className={`absolute rounded-full border transition-all duration-200 ${
            isHovering 
              ? 'w-12 h-12 border-primary/80' 
              : 'w-8 h-8 border-primary/50'
          }`}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        
        {/* Inner dot */}
        <div 
          className={`absolute rounded-full transition-all duration-150 ${
            isHovering 
              ? 'w-2 h-2 bg-primary' 
              : 'w-1.5 h-1.5 bg-primary'
          }`}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        
        {/* Glow effect */}
        <div 
          className={`absolute rounded-full transition-all duration-200 ${
            isHovering ? 'w-16 h-16 opacity-30' : 'w-10 h-10 opacity-15'
          }`}
          style={{ 
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, hsl(350 45% 70% / 0.5) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;