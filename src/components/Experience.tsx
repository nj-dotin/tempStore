'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%"
        }
      }
    );

    listsRef.current.forEach((list, index) => {
      if (!list) return;
      
      const items = list.querySelectorAll('li');
      
      gsap.fromTo(items, 
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: list,
            start: "top 85%"
          }
        }
      );
    });

  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-24 md:py-48 bg-zinc-950 text-white px-6 md:px-12 lg:px-24">
      <div className="mb-20">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-serif uppercase tracking-widest text-gold mb-16">
          Training & Choreography
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div ref={el => { listsRef.current[0] = el; }}>
            <h3 className="text-xl font-sans tracking-widest uppercase mb-8 text-zinc-500 border-b border-zinc-800 pb-4">Experience Highlights</h3>
            <ul className="space-y-6">
              <li className="text-lg md:text-xl font-light font-sans text-zinc-300">
                Led choreography for multiple college fashion teams across major events
              </li>
              <li className="text-lg md:text-xl font-light font-sans text-zinc-300">
                Conducted runway and performance workshops for large student groups
              </li>
            </ul>
          </div>
          
          <div ref={el => { listsRef.current[1] = el; }}>
            <h3 className="text-xl font-sans tracking-widest uppercase mb-8 text-zinc-500 border-b border-zinc-800 pb-4">Impact</h3>
            <ul className="space-y-6">
              <li className="text-lg md:text-xl font-light font-sans text-zinc-300">
                Elevated overall team performance and stage execution quality
              </li>
              <li className="text-lg md:text-xl font-light font-sans text-zinc-300">
                Transformed beginners into confident, runway-ready performers
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
