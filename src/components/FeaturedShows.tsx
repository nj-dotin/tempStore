'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const shows = [
  { title: "East Point College", subtitle: "Fashion Team Choreography", year: "2024" },
  { title: "New Horizon", subtitle: "Performance Workshop", year: "2023" },
  { title: "O.P. Jindal", subtitle: "Show Concept & Direction", year: "2024" },
  { title: "BCFC 2025", subtitle: "Best Fashion Team Winner", year: "2025" }
];

export default function FeaturedShows() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollWrapper = scrollWrapperRef.current;
    if (!section || !scrollWrapper) return;

    const getScrollAmount = () => -(scrollWrapper.scrollWidth - window.innerWidth);

    const tween = gsap.to(scrollWrapper, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="shows" className="h-screen w-full bg-zinc-950 overflow-hidden text-white flex items-center relative">
      <div className="absolute top-12 left-6 md:left-12 lg:left-24 z-10">
        <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-widest text-gold">Featured Works</h2>
      </div>

      <div ref={scrollWrapperRef} className="flex h-[50vh] md:h-[60vh] mt-16 md:mt-20 items-center pl-6 md:pl-24 gap-8 md:gap-16 w-max">
        {shows.map((show, index) => (
          <div key={index} className="relative w-[85vw] md:w-[45vw] h-full bg-zinc-900 group overflow-hidden flex flex-col justify-between p-8 md:p-12 border border-zinc-800" data-cursor="hover" data-cursor-text="VIEW">
            <div className="absolute inset-0 bg-gold/5 transform scale-y-0 origin-bottom transition-transform duration-700 ease-out group-hover:scale-y-100"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              <span className="text-gold font-sans tracking-widest text-sm">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-zinc-500 font-sans tracking-widest text-sm">{show.year}</span>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-serif uppercase leading-none mb-4 group-hover:text-gold transition-colors duration-500">{show.title}</h3>
              <p className="text-zinc-400 font-sans text-sm md:text-base font-light tracking-wide">{show.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
