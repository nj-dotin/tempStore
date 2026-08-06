'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Choreographer & Creative Director',
    items: ['Runway & stage choreography', 'Show concept & theme development', 'Formation design & transitions', 'End-to-end show execution']
  },
  {
    number: '02',
    title: 'Fashion Trainer & Model Coach',
    items: ['Runway walk & posture training', 'Expression & stage confidence building', 'Team coordination & performance readiness']
  },
  {
    number: '03',
    title: 'Fashion Model',
    items: ['Runway shows & editorial campaigns', 'Brand collaborations', 'BCFC 2025 Winner (Best Fashion Team)']
  },
  {
    number: '05',
    title: 'AI Trainer',
    items: ['AI model training & prompt engineering', 'Automation workflows for creative applications']
  },
  {
    number: '06',
    title: 'Fitness Trainer',
    items: ['Strength & conditioning', 'Performance-focused fitness coaching']
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-40 bg-black text-white px-6 md:px-12 lg:px-24">
      <div className="mb-20 md:mb-32">
        <h2 className="text-5xl md:text-8xl font-serif uppercase tracking-tighter text-gold">Core Expertise</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        {services.map((service, index) => (
          <div 
            key={index}
            ref={(el) => { itemsRef.current[index] = el; }}
            className="flex flex-col border-t border-zinc-800 pt-8"
            data-cursor="hover"
          >
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-gold font-sans text-sm md:text-base tracking-widest">{service.number}</span>
              <h3 className="text-2xl md:text-4xl font-serif uppercase tracking-tight">{service.title}</h3>
            </div>
            
            <ul className="flex flex-col gap-4 pl-10 md:pl-12">
              {service.items.map((item, i) => (
                <li key={i} className="text-zinc-400 font-sans text-sm md:text-base font-light flex items-start gap-3">
                  <span className="text-gold/50 mt-1">*</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
