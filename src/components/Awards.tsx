'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      gsap.fromTo(item, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%"
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="awards" className="py-24 md:py-32 bg-black text-white px-6 md:px-12 lg:px-24">
      <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-widest text-gold mb-12">
            Judging &<br />Recognition
          </h2>
          
          <div ref={el => { itemsRef.current[0] = el; }} className="space-y-6 text-lg font-light font-sans text-zinc-300 mb-16">
            <p>Invited as a judge at prestigious college fashion events in Bengaluru.</p>
            <p>Evaluated choreography, styling, and stage presence.</p>
            <p>Provided mentorship and performance feedback.</p>
          </div>
        </div>

        <div className="lg:w-1/2 lg:mt-32">
          <h3 className="text-2xl font-serif uppercase tracking-widest text-zinc-500 mb-8 border-b border-zinc-800 pb-4">
            Awards & Honours
          </h3>
          
          <div ref={el => { itemsRef.current[1] = el; }} className="space-y-8">
            <div className="group" data-cursor="hover">
              <h4 className="text-xl md:text-2xl font-serif uppercase text-white group-hover:text-gold transition-colors">
                BCFC 2025
              </h4>
              <p className="text-zinc-400 font-sans mt-2">Best Fashion Team (Team DTribe)</p>
            </div>
            <div className="group" data-cursor="hover">
              <h4 className="text-xl md:text-2xl font-serif uppercase text-white group-hover:text-gold transition-colors">
                Excellence
              </h4>
              <p className="text-zinc-400 font-sans mt-2">Recognized for excellence in choreography & training</p>
            </div>
            <div className="group" data-cursor="hover">
              <h4 className="text-xl md:text-2xl font-serif uppercase text-white group-hover:text-gold transition-colors">
                Collaborations
              </h4>
              <p className="text-zinc-400 font-sans mt-2">Multiple brand collaborations in fashion & fitness</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
