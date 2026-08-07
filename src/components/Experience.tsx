'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import EyeTracker from './animations/EyeTracker';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const featureWrapperRef = useRef<HTMLDivElement>(null);
  const featureImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Simple marquee animation
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1
    });

    // Feature Image Reveal (Center-out expansion)
    if (featureWrapperRef.current && featureImageRef.current) {
      gsap.fromTo(featureWrapperRef.current,
        { clipPath: 'inset(50% 50% 50% 50%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: featureWrapperRef.current,
            start: "top 85%",
          }
        }
      );
      
      gsap.fromTo(featureImageRef.current,
        { scale: 1.4 },
        {
          scale: 1.15,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featureWrapperRef.current,
            start: "top 85%",
          }
        }
      );

      // Parallax scroll effect
      gsap.fromTo(featureImageRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: featureWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }
  }, []);

  return (
    <section id="experience" className="bg-black text-white overflow-hidden pb-24 md:pb-32">
      {/* Marquee */}
      <div className="py-8 border-y border-zinc-800 mb-8 md:mb-12 flex whitespace-nowrap overflow-hidden">
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
        <Link 
          href="/personal-portfolio"
          ref={featureWrapperRef as any}
          className="relative w-full aspect-video md:aspect-[21/9] bg-zinc-900 overflow-hidden group cursor-pointer block"
          data-cursor="hover"
          style={{ clipPath: 'inset(50% 50% 50% 50%)' }}
        >
          <Image
            ref={featureImageRef}
            src="/featured-work.jpeg"
            alt="Featured Video"
            fill
            className="object-cover grayscale-0 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <EyeTracker />
            </div>
          </div>
        </Link>

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
