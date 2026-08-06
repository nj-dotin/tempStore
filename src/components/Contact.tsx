'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Reveal text
    const textElements = sectionRef.current?.querySelectorAll('.reveal-text');
    if (textElements) {
      gsap.fromTo(textElements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%"
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-32 md:py-48 bg-black text-white px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center min-h-[80vh] text-center border-t border-zinc-900 relative">
      <div className="absolute inset-0 bg-gold/5 opacity-50 z-0"></div>
      
      <div className="relative z-10 w-full max-w-4xl">
        <p className="reveal-text text-gold font-sans tracking-widest text-sm uppercase mb-6">Let&apos;s Work Together</p>
        
        <h2 className="reveal-text text-5xl md:text-8xl font-serif uppercase leading-none tracking-tighter mb-16 hover:text-gold transition-colors duration-500 cursor-pointer" data-cursor="hover" data-cursor-text="LET'S TALK">
          Contact &<br />Collaboration
        </h2>
        
        <div className="reveal-text flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mt-16 font-sans">
          <div className="flex flex-col gap-4 text-zinc-400">
            <h4 className="text-xs tracking-widest uppercase text-zinc-600 mb-2 border-b border-zinc-800 pb-2">Reach Out</h4>
            <a href="mailto:kishornayak9527@gmail.com" className="hover:text-white transition-colors" data-cursor="hover">kishornayak9527@gmail.com</a>
            <a href="tel:8495014794" className="hover:text-white transition-colors" data-cursor="hover">8495014794</a>
          </div>
          
          <div className="flex flex-col gap-4 text-zinc-400">
            <h4 className="text-xs tracking-widest uppercase text-zinc-600 mb-2 border-b border-zinc-800 pb-2">Location</h4>
            <p>Bengaluru, India</p>
            <p className="text-gold">Status: Open for Projects</p>
          </div>
          
          <div className="flex flex-col gap-4 text-zinc-400">
            <h4 className="text-xs tracking-widest uppercase text-zinc-600 mb-2 border-b border-zinc-800 pb-2">Services</h4>
            <p>Choreography / Training</p>
            <p>Show Direction / Collaborations</p>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 mt-32 text-zinc-600 text-xs font-sans tracking-widest uppercase">
        © {new Date().getFullYear()} Kishore Nayak. All Rights Reserved.
      </div>
    </section>
  );
}
