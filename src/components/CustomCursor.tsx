'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const label = cursorLabelRef.current;
    if (!cursor || !label) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
        xPercent: -50,
        yPercent: -50
      });
    };

    gsap.ticker.add(render);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const cursorTarget = target.closest('[data-cursor]');
      
      if (cursorTarget) {
        const cursorText = cursorTarget.getAttribute('data-cursor-text');
        const cursorType = cursorTarget.getAttribute('data-cursor-type');
        
        if (cursorType === 'eye') {
          gsap.to(cursor, {
            width: 80,
            height: 80,
            backgroundColor: 'transparent',
            border: 'none',
            mixBlendMode: 'normal',
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to('#eye-cursor-content', { opacity: 1, scale: 1, duration: 0.3 });
          gsap.to(label, { opacity: 0, duration: 0.1 });
        } else if (cursorText) {
          label.textContent = cursorText;
          gsap.to(cursor, {
            width: 80,
            height: 80,
            backgroundColor: 'rgba(212, 175, 55, 1)', // Gold
            mixBlendMode: 'normal',
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(label, { opacity: 1, duration: 0.3 });
        } else {
          // Standard magnetic/hover scale
          gsap.to(cursor, {
            scale: 2.5,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            mixBlendMode: 'difference',
            duration: 0.3,
            ease: "power2.out"
          });
        }
      } else {
        // Reset
        label.textContent = '';
        gsap.to('#eye-cursor-content', { opacity: 0, scale: 0, duration: 0.2 });
        gsap.to(cursor, {
          width: 16,
          height: 16,
          scale: 1,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          border: 'none',
          mixBlendMode: 'difference',
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(label, { opacity: 0, duration: 0.3 });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      gsap.ticker.remove(render);
    };
  }, []);

  // Hide default cursor globally
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
      style={{ willChange: 'transform, width, height' }}
    >
      <span ref={cursorLabelRef} className="absolute text-[10px] font-sans font-bold text-black uppercase opacity-0 tracking-wider pointer-events-none whitespace-nowrap"></span>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-0" id="eye-cursor-content">
        <svg viewBox="0 0 100 100" className="w-[180%] h-[180%] absolute animate-[spin_8s_linear_infinite] text-white">
          <path id="cursorTextPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
          <text className="text-[10px] font-sans tracking-[0.25em] uppercase fill-current">
            <textPath href="#cursorTextPath" startOffset="0%">
              THIS IS KISHORE PORTFOLIO • THIS IS KISHORE PORTFOLIO • 
            </textPath>
          </text>
        </svg>
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center z-10">
          <svg viewBox="0 0 24 24" fill="black" className="w-1/2 h-1/2">
             <path d="M12 4.5C7 4.5 2.73 7.61 1 12.5c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
             <circle cx="12" cy="12.5" r="3" fill="black"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
