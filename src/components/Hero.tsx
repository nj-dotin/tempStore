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
            <div 
              data-cursor="hover"
              className="group relative px-8 py-4 border border-gold/50 rounded-full overflow-hidden inline-block cursor-pointer"
            >
              <span className="relative z-10 text-gold uppercase tracking-widest text-sm transition-colors duration-300 group-hover:text-black">
                View Featured Work
              </span>
              <div className="absolute inset-0 bg-gold transform translate-y-[101%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"></div>
            </div>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
