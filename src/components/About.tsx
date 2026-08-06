'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const words = textRef.current?.querySelectorAll('.word');
    if (words && words.length > 0) {
      gsap.fromTo(words, 
        { opacity: 0.2, y: 20 }, 
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.05, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            scrub: true
          }
        }
      );
    }
  }, []);

  const text = "A multidisciplinary creative professional specializing in choreography, fashion performance training, and creative show direction.";
  const words = text.split(" ");

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-56 bg-zinc-950 flex flex-col items-center justify-center text-center px-6 md:px-12">
      <p className="text-gold font-sans tracking-widest text-xs md:text-sm uppercase mb-12" data-cursor="hover">About</p>
      <h2 ref={textRef} className="text-3xl md:text-5xl lg:text-7xl font-serif text-white max-w-5xl leading-[1.3] md:leading-[1.2]">
        {words.map((word, i) => (
          <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
        ))}
      </h2>
    </section>
  );
}
