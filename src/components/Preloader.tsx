'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
      }
    });

    // Start with text hidden
    gsap.set([text1Ref.current, text2Ref.current], { yPercent: 100 });

    tl.to([text1Ref.current, text2Ref.current], {
      yPercent: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
    })
    .to([text1Ref.current, text2Ref.current], {
      opacity: 0,
      yPercent: -20,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.in",
      delay: 0.8 // Pause to let user read
    })
    .to(wrapperRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut",
    });

  }, []);

  if (isComplete) return null;

  return (
    <div 
      ref={wrapperRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="overflow-hidden">
          <span ref={text1Ref} className="block text-5xl md:text-8xl font-serif text-white tracking-widest uppercase">
            Kishore
          </span>
        </div>
        <div className="overflow-hidden">
          <span ref={text2Ref} className="block text-5xl md:text-8xl font-serif text-white tracking-widest uppercase">
            Nayak
          </span>
        </div>
      </div>
    </div>
  );
}
