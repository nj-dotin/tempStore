'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Pop up and tilt animation
    if (containerRef.current && imageRef.current) {
      gsap.fromTo(containerRef.current,
        { 
          opacity: 0,
          y: 150,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  return (
    <section className="bg-black py-24 md:py-40 overflow-hidden flex justify-center items-center">
      <div 
        ref={containerRef} 
        className="relative w-[95%] md:w-[90%] aspect-[16/9] md:aspect-[21/9] bg-zinc-900 overflow-hidden shadow-2xl"
      >
        <Image 
          ref={imageRef}
          src="/tilted-image.jpeg" 
          alt="Featured Pop-up" 
          fill 
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          priority
        />
      </div>
    </section>
  );
}
