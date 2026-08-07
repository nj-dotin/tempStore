'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function EyeTracker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<SVGCircleElement>(null);
  const textRingRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !pupilRef.current) return;

    // Pupil tracking
    const xTo = gsap.quickTo(pupilRef.current, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(pupilRef.current, "y", { duration: 0.15, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const rect = containerRef.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY), 8); // Track inside the white center
      
      xTo(Math.cos(angle) * distance);
      yTo(Math.sin(angle) * distance);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isHovered]);

  // Rotating text animation
  useEffect(() => {
    if (textRingRef.current) {
      gsap.to(textRingRef.current, {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none" // Linear rotation for smooth infinite spinning
      });
    }
  }, []);

  return (
    <div className="relative flex items-center justify-center pointer-events-auto" data-cursor="hover">
      {/* Rotating Text Ring */}
      <div ref={textRingRef} className="absolute w-[160px] h-[160px] md:w-[220px] md:h-[220px] pointer-events-none opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
          <path id="textPath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
          <text className="text-[9px] font-sans tracking-[0.25em] uppercase">
            <textPath href="#textPath" startOffset="0%">
              CLICK TO EXPLORE PORTFOLIO • CLICK TO EXPLORE PORTFOLIO • 
            </textPath>
          </text>
        </svg>
      </div>

      {/* Eye Button */}
      <div 
        ref={containerRef}
        className={`relative z-10 w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ease-out ${
          isHovered ? 'bg-white scale-100' : 'bg-black/40 backdrop-blur-md scale-95'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          gsap.to(pupilRef.current, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
        }}
      >
        <svg width="45%" height="45%" viewBox="0 0 100 100" className="overflow-visible">
          {/* Closed Eye (Visible when NOT hovered) */}
          <path 
            d="M 30,50 Q 50,65 70,50" 
            fill="none" 
            stroke={isHovered ? "transparent" : "#d4d4d8"}
            strokeWidth="6" 
            strokeLinecap="round"
            className="transition-colors duration-300"
          />
          
          {/* Open Eye (Visible when hovered) */}
          <g className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {/* Solid black almond shape */}
            <path 
              d="M 5,50 Q 50,15 95,50 Q 50,85 5,50" 
              fill="black" 
            />
            {/* White sclera center */}
            <circle cx="50" cy="50" r="16" fill="white" />
            
            {/* Black tracking pupil */}
            <circle 
              ref={pupilRef}
              cx="50" 
              cy="50" 
              r="8" 
              fill="black" 
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
