'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal animation (syncs after preloader roughly, or could use context, but delay works for now)
    const tl = gsap.timeline({ delay: 3.5 }); // Preloader takes ~3s

    gsap.set([title1Ref.current, title2Ref.current], { yPercent: 100 });
    
    tl.fromTo(imageRef.current, 
      { scale: 1.2, filter: 'brightness(0)' },
      { scale: 1, filter: 'brightness(0.6)', duration: 2, ease: 'power3.out' }
    )
    .to([title1Ref.current, title2Ref.current], {
      yPercent: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    }, "-=1.5")
    .fromTo(subtitleRef.current, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.8"
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
          src="/hero-image.jpeg"
          alt="Kishore Nayak"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col justify-end pb-24 md:pb-32 h-full text-white">
        <div className="overflow-hidden mb-[-1vw]">
          <h1 ref={title1Ref} className="text-[12vw] md:text-[8vw] font-serif uppercase leading-none tracking-tighter">
            Where Art
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 ref={title2Ref} className="text-[12vw] md:text-[8vw] font-serif uppercase leading-none tracking-tighter text-gold italic">
            Meets Leadership
          </h1>
        </div>
        
        <div className="mt-8 md:mt-12 max-w-2xl">
          <p ref={subtitleRef} className="text-lg md:text-2xl font-sans font-light tracking-wide opacity-0">
            I don&apos;t just create performances — I build stage presence.
          </p>
        </div>

        <div ref={buttonsRef} className="mt-10 flex gap-6 opacity-0">
          <button 
            data-cursor="hover"
            className="group relative px-8 py-4 border border-gold/50 rounded-full overflow-hidden"
          >
            <span className="relative z-10 text-gold uppercase tracking-widest text-sm transition-colors duration-300 group-hover:text-black">
              View Featured Work
            </span>
            <div className="absolute inset-0 bg-gold transform translate-y-[101%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
