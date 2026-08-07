'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.fromTo(sectionRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' } }
    );
  }, []);

  return (
    <footer ref={sectionRef} id="contact" className="bg-black text-white py-24 md:py-32 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center">
      
      <div className="mb-12">
        <p className="text-zinc-400 font-sans text-xs md:text-sm tracking-wide">
          If you have a General Or Project inquiry.<br/>
          please drop me an email — <span className="font-bold text-white">AVAILABLE NOW</span>
        </p>
      </div>

      <a href="mailto:hello@kishorenayak.com" className="group">
        <h2 className="text-5xl md:text-[6vw] font-serif uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-gold">
          SEND AN EMAIL
        </h2>
      </a>

      <div className="w-full mt-24 md:mt-32 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-sans tracking-widest text-zinc-500 gap-6 uppercase">
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">YouTube</a>
        </div>
        
        <div>
          <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        </div>

        <div>
          <span>DESIGN & DEVELOPMENT BY <span className="text-white">KISHORE</span></span>
        </div>
      </div>
    </footer>
  );
}
