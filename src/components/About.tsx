'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import StaggerText from './animations/StaggerText';
import MagneticButton from './animations/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    // We removed manual GSAP for the heading since StaggerText handles its own ScrollTrigger

    // Paragraph text fade up
    const paragraphs = rightContentRef.current?.querySelectorAll('p, button');
    if (paragraphs) {
      gsap.fromTo(paragraphs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightContentRef.current,
            start: "top 75%",
          }
        }
      );
    }

    // Image reveal animation (left to right wipe + scale down)
    if (imageWrapperRef.current && imageRef.current) {
      gsap.fromTo(imageWrapperRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 80%",
          }
        }
      );
      
      gsap.fromTo(imageRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="about" className="pt-24 pb-12 md:pt-40 md:pb-20 bg-black flex flex-col items-start justify-center text-left text-white px-6 md:px-12 lg:px-24">
      {/* Huge Typography Intro */}
      <div className="w-full max-w-6xl mb-20 md:mb-32">
        <h2 className="text-4xl md:text-6xl lg:text-[7vw] font-serif uppercase tracking-tight leading-[1.1]">
          <StaggerText text="I AM KISHORE NAYAK. I AM A FASHION CHOREOGRAPHER, RUNWAY COACH, AND CREATIVE DIRECTOR." trigger="#about" />
        </h2>
      </div>

      {/* Two Column Layout */}
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row gap-12 md:gap-24 justify-between items-start">
        
        {/* Left Side: Text Section */}
        <div 
          ref={rightContentRef}
          className="w-full md:w-1/2 flex flex-col justify-start text-left gap-6 md:gap-8"
        >
          <p className="text-base md:text-lg lg:text-xl font-sans font-light leading-relaxed text-zinc-300 text-justify">
            Currently a Fashion Choreographer & Runway Coach shaping the next generation of models and stage performers.
          </p>
          <p className="text-base md:text-lg lg:text-xl font-sans font-light leading-relaxed text-zinc-300 text-justify">
            Since my childhood, I've always been passionate about clothes, fashion, and the magic of the stage. That interest naturally evolved into directing full-scale fashion shows and training models to own the runway.
          </p>
          <p className="text-base md:text-lg lg:text-xl font-sans font-light leading-relaxed text-zinc-300 text-justify">
            I have always believed that a performance is more than just walking down a runway—it's about telling a story through movement, presence, and unwavering confidence.
          </p>
          <p className="text-base md:text-lg lg:text-xl font-sans font-light leading-relaxed text-zinc-300 text-justify">
            My mission is to elevate the standard of fashion choreography and empower models to truly own their space in the spotlight.
          </p>
          
          <div className="mt-4 md:mt-8">
            <MagneticButton>
              <a 
                href="/Kishor_Nayak_Portfolio.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div 
                  data-cursor="hover"
                  className="group flex items-center justify-center gap-4 px-6 py-3 md:px-8 md:py-4 border border-zinc-500 rounded-full text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300 w-fit cursor-pointer"
                >
                  <span>View CV</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Right Side: Image Section */}
        <div ref={imageWrapperRef} className="w-full md:w-1/2 relative min-h-[400px] h-full flex-grow bg-zinc-900 overflow-hidden" style={{ clipPath: 'inset(0 100% 0 0)' }}>
          <Image 
            ref={imageRef}
            src="/about-image-v3.jpeg" 
            alt="Kishore Nayak" 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
          />
        </div>

      </div>
    </section>
  );
}
