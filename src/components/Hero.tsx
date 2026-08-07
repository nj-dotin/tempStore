'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import StaggerText from './animations/StaggerText';
import MagneticButton from './animations/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal animation (syncs after preloader roughly, or could use context, but delay works for now)
    const tl = gsap.timeline({ delay: 3.5 }); // Preloader takes ~3s

    tl.fromTo(imageRef.current, 
      { scale: 1.2, filter: 'brightness(0)' },
      { scale: 1, filter: 'brightness(0.6)', duration: 2, ease: 'power3.out' }
    )
    .fromTo(buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.6"
    );

    // Parallax on scroll
    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

  }, []);

  return (
    <section ref={heroRef} id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <Image
          ref={imageRef}
          src="/hero-bg.jpeg"
          alt="Kishore Nayak"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center h-full text-white text-center">
        <div className="overflow-hidden mb-[-1vw]">
          <h1 className="text-[12vw] md:text-[8vw] font-serif uppercase leading-none tracking-tighter">
            <StaggerText text="Where Art" delay={4.0} />
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-[12vw] md:text-[8vw] font-serif uppercase leading-none tracking-tighter text-gold italic">
            <StaggerText text="Meets Leadership" delay={4.3} />
          </h1>
        </div>

        <div ref={buttonsRef} className="mt-12 flex gap-6 opacity-0">
          <MagneticButton>
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-cursor="hover"
              className="group relative pl-8 pr-2 py-2 bg-white rounded-full flex items-center gap-6 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 text-black font-semibold uppercase tracking-widest text-xs">
                Contact
              </span>
              <div className="relative z-10 w-8 h-8 bg-black rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
