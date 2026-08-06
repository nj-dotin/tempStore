'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(textRef.current,
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

    if (listRef.current) {
      const items = listRef.current.querySelectorAll('li');
      gsap.fromTo(items,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%"
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="team" className="py-24 md:py-32 bg-zinc-950 text-white px-6 md:px-12 lg:px-24 border-t border-zinc-900">
      <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-24">
        
        <div ref={textRef} className="md:w-1/2">
          <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-widest text-gold mb-6">
            Team DTribe
          </h2>
          <h3 className="text-xl font-sans text-zinc-400 tracking-widest uppercase mb-8">
            The Collective
          </h3>
          <p className="text-xl md:text-2xl font-light font-sans text-zinc-300 leading-relaxed mb-8">
            Team DTribe is a creative fashion collective focused on performance-driven fashion experiences.
          </p>
          <p className="text-lg font-light font-sans text-zinc-400 italic">
            Each show represents a fusion of creativity, discipline, and visual storytelling.
          </p>
        </div>

        <div className="md:w-1/3">
          <h4 className="text-sm font-sans tracking-widest text-zinc-500 uppercase border-b border-zinc-800 pb-4 mb-8">
            Core Strengths
          </h4>
          <ul ref={listRef} className="space-y-6">
            <li className="text-xl font-serif uppercase tracking-widest flex items-center gap-4">
              <span className="text-gold">*</span> Choreography
            </li>
            <li className="text-xl font-serif uppercase tracking-widest flex items-center gap-4">
              <span className="text-gold">*</span> Styling
            </li>
            <li className="text-xl font-serif uppercase tracking-widest flex items-center gap-4">
              <span className="text-gold">*</span> Training
            </li>
            <li className="text-xl font-serif uppercase tracking-widest flex items-center gap-4">
              <span className="text-gold">*</span> Execution
            </li>
          </ul>
        </div>
        
      </div>
    </section>
  );
}
