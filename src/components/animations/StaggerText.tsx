'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface StaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
  trigger?: any; // Optional ScrollTrigger target
}

export default function StaggerText({ text, className = "", delay = 0, trigger }: StaggerTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars,
      { y: '100%', opacity: 0 },
      { 
        y: '0%', 
        opacity: 1, 
        stagger: 0.03, // Fast stagger for a cool wave effect
        duration: 0.8, 
        ease: 'power3.out',
        delay: delay,
        scrollTrigger: trigger ? {
          trigger: containerRef.current,
          start: "top 90%",
        } : undefined
      }
    );
  }, [text, delay, trigger]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {text.split(' ').map((word, wordIndex, wordsArray) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="inline-block pb-1" style={{ clipPath: 'polygon(-20% 0%, 120% 0%, 120% 100%, -20% 100%)' }}>
              <span className="char inline-block translate-y-[100%] will-change-transform leading-[0.85]">
                {char}
              </span>
            </span>
          ))}
          {/* Add a space after each word, except the last one */}
          {wordIndex < wordsArray.length - 1 && (
            <span className="inline-block pb-1">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}
