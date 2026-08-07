'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useLenis } from '@studio-freight/react-lenis';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      gsap.to('.nav-overlay', {
        yPercent: 100,
        duration: 0.8,
        ease: 'power4.inOut'
      });
      gsap.to('.nav-link', {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power3.out'
      });
    } else {
      lenis?.start();
      gsap.to('.nav-link', {
        yPercent: 100,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power3.in'
      });
      gsap.to('.nav-overlay', {
        yPercent: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power4.inOut'
      });
    }
  }, [isOpen, lenis]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Featured Shows', href: '#shows' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[60] flex items-center justify-between px-5 py-4 md:px-12 md:py-8 mix-blend-difference text-white backdrop-blur-sm bg-black/5">
        <div className="font-serif text-xl tracking-widest uppercase font-bold" data-cursor="hover">
          KN
        </div>
        <button 
          onClick={toggleMenu}
          className="relative z-[70] focus:outline-none"
          data-cursor="hover"
        >
          {isOpen ? (
            <X size={32} className="text-black transition-colors duration-500" />
          ) : (
            <Menu size={32} />
          )}
        </button>
      </header>

      {/* Fullscreen Overlay */}
      <div 
        className="nav-overlay fixed inset-0 bg-gold z-[50] flex flex-col justify-center px-6 md:px-24 transform -translate-y-full"
        style={{ willChange: 'transform' }}
      >
        <nav className="flex flex-col gap-6 md:gap-10">
          {links.map((link, i) => (
            <div key={i} className="overflow-hidden">
              <a 
                href={link.href} 
                onClick={toggleMenu}
                className="nav-link block text-4xl md:text-7xl font-serif text-black uppercase opacity-0 translate-y-full hover:text-white transition-colors duration-300"
                data-cursor="hover"
              >
                {link.name}
              </a>
            </div>
          ))}
        </nav>
        
        <div className="absolute bottom-10 left-6 md:left-24 flex gap-8 text-black font-sans text-sm tracking-widest uppercase">
          <a href="#" data-cursor="hover" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" data-cursor="hover" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </>
  );
}
