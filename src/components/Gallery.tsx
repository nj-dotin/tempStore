'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    imageRefs.current.forEach((el) => {
      if (!el) return;
      const img = el.querySelector('.gallery-img');
      
      // Mask reveal
      gsap.fromTo(el,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );

      // Scale down and parallax
      if (img) {
        gsap.fromTo(img,
          { scale: 1.2, yPercent: -5 },
          {
            scale: 1,
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="py-24 md:py-48 bg-black text-white px-6 md:px-12 lg:px-24">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-widest text-white">Visual <span className="text-gold italic">Presence</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <div 
          ref={el => { imageRefs.current[0] = el; }} 
          className="relative w-full aspect-[3/4] overflow-hidden mt-0 md:mt-24 bg-zinc-900"
          data-cursor="hover" data-cursor-text="VIEW"
        >
          <div className="gallery-img absolute inset-0 bg-zinc-800 flex items-center justify-center">
            <span className="text-zinc-600 font-sans tracking-widest uppercase text-sm">Runway Look 01</span>
          </div>
        </div>

        <div 
          ref={el => { imageRefs.current[1] = el; }} 
          className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900"
          data-cursor="hover" data-cursor-text="VIEW"
        >
          <div className="gallery-img absolute inset-0 bg-zinc-900 flex items-center justify-center">
             <span className="text-zinc-700 font-sans tracking-widest uppercase text-sm">Stage Choreography</span>
          </div>
        </div>

        <div 
          ref={el => { imageRefs.current[2] = el; }} 
          className="relative w-full aspect-[16/9] md:col-span-2 overflow-hidden mt-12 md:mt-24 bg-zinc-900"
          data-cursor="hover" data-cursor-text="VIEW"
        >
          <div className="gallery-img absolute inset-0 bg-zinc-950 flex items-center justify-center">
             <span className="text-zinc-800 font-sans tracking-widest uppercase text-sm">Creative Direction</span>
          </div>
        </div>
      </div>
    </section>
  );
}
