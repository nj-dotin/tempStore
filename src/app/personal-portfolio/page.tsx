'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from '@/components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function PersonalPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax on scroll for the hero image
    gsap.to('.portfolio-hero-img', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.portfolio-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Reveal animation for grid items
    const items = document.querySelectorAll('.grid-item');
    items.forEach((item) => {
      gsap.fromTo(item, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  // Use the remaining images for the collage
  const gridImages = [
    '/portfolio-3.jpeg',
    '/portfolio-4.jpeg',
    '/portfolio-5.jpeg',
    '/portfolio-6.jpeg',
    '/portfolio-7.jpeg',
    '/portfolio-8.jpeg',
    '/portfolio-9.jpeg',
    '/portfolio-10.jpeg',
    '/portfolio-11.jpeg',
    '/portfolio-12.jpeg',
    '/portfolio-14.jpeg',
    '/portfolio-15.jpeg',
    '/portfolio-16.jpeg',
    '/portfolio-17.jpeg',
  ];

  return (
    <>
      <CustomCursor />
      <main className="bg-black min-h-screen text-white pt-24" ref={containerRef}>
        <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center mix-blend-difference text-white">
          <Link href="/" className="font-serif text-xl md:text-2xl hover:opacity-70 transition-opacity">
            KISHORE N.
          </Link>
          <Link href="/" className="font-sans text-[10px] md:text-xs uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            BACK TO HOME
          </Link>
        </nav>

        <section className="portfolio-hero relative w-full h-[70vh] md:h-[90vh] overflow-hidden" data-cursor-type="eye">
          <Image
            src="/portfolio-1.png"
            alt="Hero"
            fill
            priority
            className="portfolio-hero-img object-cover opacity-90 scale-110 grayscale"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/20">
            <h1 className="text-5xl md:text-[8vw] font-serif uppercase tracking-tight text-white leading-none px-4 text-center mix-blend-difference">
              Personal Portfolio
            </h1>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4 md:px-12 lg:px-24">
          <div className="text-center mb-20 md:mb-32">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-wide">The Kishore Gallery</h2>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8">
            {gridImages.map((src, idx) => (
              <div 
                key={idx} 
                className="grid-item relative w-full overflow-hidden break-inside-avoid group rounded-sm bg-zinc-900" 
                data-cursor="hover" 
                data-cursor-text="ZOOM"
              >
                <Image
                  src={src}
                  alt={`Portfolio ${idx}`}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05] grayscale group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </section>

        <footer className="py-12 border-t border-zinc-900 text-center flex flex-col items-center">
          <p className="text-zinc-500 font-sans text-xs tracking-widest uppercase mb-4">
            END OF GALLERY
          </p>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center" data-cursor="hover">
            <Link href="/">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-90">
                 <line x1="5" y1="12" x2="19" y2="12"></line>
                 <polyline points="12 5 19 12 12 19"></polyline>
               </svg>
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
