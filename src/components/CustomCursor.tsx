import { useEffect, useState, useCallback, useRef } from 'react';

interface TrailDot {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const frameRef = useRef<number>();
  const trailRef = useRef<TrailDot[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);

    const newDot: TrailDot = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 4 + 2,
      opacity: 0.6,
    };

    trailRef.current = [...trailRef.current, newDot].slice(-20);
    setTrail([...trailRef.current]);
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.closest('a') || 
      target.closest('button') ||
      target.classList.contains('cursor-pointer')
    ) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseDown, handleMouseUp]);

  // Fade out trail dots
  useEffect(() => {
    const interval = setInterval(() => {
      trailRef.current = trailRef.current
        .map(dot => ({ ...dot, opacity: dot.opacity - 0.05 }))
        .filter(dot => dot.opacity > 0);
      setTrail([...trailRef.current]);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Trail with gradient */}
      {trail.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            background: `radial-gradient(circle, hsl(350 45% 70% / ${dot.opacity}) 0%, hsl(270 30% 60% / ${dot.opacity * 0.5}) 50%, transparent 100%)`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className="absolute transition-all duration-75 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`,
        }}
      >
        {/* Outer ring with animation */}
        <div 
          className={`absolute rounded-full border transition-all duration-300 ${
            isHovering 
              ? 'w-14 h-14 border-primary/80' 
              : 'w-10 h-10 border-primary/50'
          }`}
          style={{ 
            transform: 'translate(-50%, -50%)',
            animation: isHovering ? 'pulse 1.5s ease-in-out infinite' : 'none',
          }}
        />
        
        {/* Secondary ring */}
        <div 
          className={`absolute rounded-full border border-secondary/30 transition-all duration-500 ${
            isHovering ? 'w-20 h-20' : 'w-12 h-12'
          }`}
          style={{ 
            transform: 'translate(-50%, -50%)',
            animation: 'spin 8s linear infinite',
          }}
        />
        
        {/* Inner dot */}
        <div 
          className={`absolute rounded-full transition-all duration-200 ${
            isHovering 
              ? 'w-2 h-2 bg-primary' 
              : isClicking 
                ? 'w-4 h-4 bg-secondary' 
                : 'w-1.5 h-1.5 bg-primary'
          }`}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        
        {/* Glow effect */}
        <div 
          className={`absolute rounded-full transition-all duration-300 ${
            isHovering ? 'w-24 h-24 opacity-40' : 'w-16 h-16 opacity-20'
          }`}
          style={{ 
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, hsl(350 45% 70% / 0.4) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />

        {/* Sparkle particles on hover */}
        {isHovering && (
          <>
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div
                key={angle}
                className="absolute w-1 h-1 rounded-full bg-stardust"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(30px)`,
                  animation: `twinkle 1s ease-in-out infinite ${angle / 360}s`,
                }}
              />
            ))}
          </>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) rotate(var(--angle)) translateX(30px) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--angle)) translateX(35px) scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;
