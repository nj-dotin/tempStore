'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import MagneticButton from './animations/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple marquee animation
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1
    });
  }, []);

  return (
    <section id="experience" className="bg-black text-white overflow-hidden pb-24 md:pb-32">
      {/* Marquee */}
      <div className="py-12 border-y border-zinc-800 mb-12 md:mb-24 flex whitespace-nowrap overflow-hidden">
        <div ref={marqueeRef} className="flex gap-8 items-center text-4xl md:text-7xl font-sans tracking-tight uppercase">
          <span>PERSONAL PORTFOLIO —</span>
          <span>PERSONAL PORTFOLIO —</span>
          <span>PERSONAL PORTFOLIO —</span>
          <span>PERSONAL PORTFOLIO —</span>
          <span>PERSONAL PORTFOLIO —</span>
          <span>PERSONAL PORTFOLIO —</span>
          <span>PERSONAL PORTFOLIO —</span>
          <span>PERSONAL PORTFOLIO —</span>
        </div>
      </div>

      {/* Large Project Feature */}
      <div className="w-full px-6 md:px-12 lg:px-24">
        <div 
          className="relative w-full aspect-video md:aspect-[21/9] bg-zinc-900 overflow-hidden group cursor-pointer"
          data-cursor="hover"
        >
          <Image
            src="/featured-work.jpeg"
            alt="Featured Video"
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <MagneticButton className="pointer-events-auto">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center text-black transform scale-100 group-hover:scale-110 transition-transform duration-500 cursor-pointer">
                {/* Eye Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            </MagneticButton>
          </div>
        </div>

        {/* Project Meta Info */}
        <div className="flex justify-between items-center py-6 border-b border-zinc-800 text-xs md:text-sm font-sans tracking-widest uppercase text-zinc-400">
          <span>KISHORE N.</span>
          <span>PORTFOLIO</span>
          <span>CONTACT</span>
        </div>
      </div>
    </section>
  );
}
