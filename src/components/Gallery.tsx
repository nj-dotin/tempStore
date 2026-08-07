'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'Circadia', image: '/portfolio-13.jpeg' },
  { title: 'Glory Street', image: '/gallery-2.jpeg' },
  { title: 'East Point', image: '/gallery-3.jpeg' },
  { title: 'BCFC 2025', image: '/gallery-4.jpeg' }
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRefs = useRef<(HTMLElement | null)[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Title reveal
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Grid items reveal
    gridRefs.current.forEach((el, index) => {
      if (!el) return;
      
      const img = el.querySelector('img');
      
      // Reveal container left-to-right
      gsap.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
      
      // Scale image down slightly while container reveals
      if (img) {
        gsap.fromTo(img,
          { scale: 1.3 },
          {
            scale: 1.05, // matches the default scale in the className (scale-105)
            duration: 2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            }
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="py-24 md:py-32 bg-black text-white px-6 md:px-12 lg:px-24">
      {/* Section Title */}
      <div className="mb-12">
        <h2 ref={titleRef} className="text-xl md:text-2xl font-serif uppercase tracking-widest text-white">
          Portfolio & Work
        </h2>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(project.image)}
            ref={el => { gridRefs.current[index] = el; }} 
            className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-900 group block cursor-pointer"
            data-cursor="hover" data-cursor-text="VIEW"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="portfolio-img object-cover scale-105 grayscale group-hover:scale-100 group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <h3 className="text-3xl md:text-5xl font-serif text-white tracking-wide">{project.title}</h3>
              <div className="w-0 h-[2px] bg-white mt-2 group-hover:w-16 transition-all duration-500 ease-out"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-pointer p-4 md:p-12"
          onClick={() => setSelectedImage(null)}
          data-cursor="hover"
          data-cursor-text="CLOSE"
        >
          <div className="relative w-full max-w-5xl h-full animate-in fade-in zoom-in-95 duration-500">
            <Image
              src={selectedImage}
              alt="Expanded view"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
