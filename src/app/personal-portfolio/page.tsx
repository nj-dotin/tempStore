'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import CustomCursor from '@/components/CustomCursor';

// The images for the infinite canvas
const images = [
  '/portfolio-1.png',
  '/portfolio-3.jpeg',
  '/portfolio-4.jpeg',
  '/portfolio-5.jpeg',
  '/portfolio-6.jpeg',
  '/portfolio-7.jpeg',
  '/portfolio-8.jpeg',
  '/portfolio-9.jpeg',
  '/portfolio-10.jpeg',
  '/portfolio-11.jpeg',
  '/portfolio-12.jpeg',
  '/portfolio-14.jpeg',
  '/portfolio-15.jpeg',
  '/portfolio-16.jpeg',
  '/portfolio-17.jpeg',
];

// How large the virtual bounding box is. 
// Decreased to 1800 to make the images even closer and reduce empty space.
const CANVAS_SIZE = 1800; 

function wrap(value: number, min: number, max: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export default function InfiniteCanvasPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Physics state
  const camera = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [layoutParams, setLayoutParams] = useState<any[]>([]);
  const isDragging = useRef(false);
  const startDrag = useRef({ x: 0, y: 0 });
  const lastTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Generate layout once on mount to avoid hydration mismatch
    // We use a grid-based jitter algorithm to prevent images from overlapping in clumps
    const columns = 4;
    const cellSize = CANVAS_SIZE / columns;

    const params = images.map((src, i) => {
      // Determine the cell grid position
      const col = i % columns;
      const row = Math.floor(i / columns);

      // Base center of the cell
      const cellCenterX = (col * cellSize) - (CANVAS_SIZE / 2) + (cellSize / 2);
      const cellCenterY = (row * cellSize) - (CANVAS_SIZE / 2) + (cellSize / 2);

      // Add random jitter within the cell (max 80% of cell size to maintain some spacing)
      const x = cellCenterX + (Math.random() - 0.5) * (cellSize * 0.8);
      const y = cellCenterY + (Math.random() - 0.5) * (cellSize * 0.8);
      
      // Random rotation -8 to 8 degrees
      const rotation = (Math.random() - 0.5) * 16;
      
      // Random scale 0.5 to 1.3 for editorial variety
      const scale = 0.5 + Math.random() * 0.8;
      
      // Parallax depth: 0.8 to 1.3 (creates 3D layered speed effect)
      const parallax = 0.8 + Math.random() * 0.5;
      
      // Float animation offset and speed
      const floatOffset = Math.random() * Math.PI * 2;
      const floatSpeed = 0.001 + Math.random() * 0.0015;
      const rotateSpeed = (Math.random() - 0.5) * 0.0005;

      // Randomize aspect ratios for editorial feel
      const isPortrait = Math.random() > 0.3;
      const aspectRatioClass = isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]';

      return { x, y, rotation, scale, parallax, floatOffset, floatSpeed, rotateSpeed, src, aspectRatioClass };
    });
    
    setLayoutParams(params);
  }, []);

  useEffect(() => {
    if (layoutParams.length === 0) return;

    // Entry animation: Fade up, scale in, and untwist
    gsap.fromTo(itemsRef.current, 
      { y: 300, opacity: 0, scale: 0.2, rotation: () => (Math.random() - 0.5) * 40 },
      { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 2.5, stagger: 0.08, ease: "expo.out", clearProps: "rotation" }
    );
    gsap.fromTo(containerRef.current,
      { scale: 1.15 },
      { scale: 1, duration: 3, ease: "power3.out" }
    );

    // Fade out the scroll hint indicator after 4 seconds
    gsap.to(scrollIndicatorRef.current, {
      opacity: 0,
      duration: 1.5,
      delay: 4,
      ease: "power2.inOut",
      onComplete: () => {
        if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.display = 'none';
        }
      }
    });

    let animationFrameId: number;

    const render = (time: number) => {
      // Dynamic auto-pan: Uses sin/cos to create an organic meandering path (Lissajous curve)
      // so it slowly wanders in all directions instead of a straight line.
      const panSpeed = 1.2;
      target.current.x += Math.cos(time * 0.0003) * panSpeed;
      target.current.y += Math.sin(time * 0.0004) * panSpeed;

      // Smooth interpolation for camera (inertia)
      camera.current.x += (target.current.x - camera.current.x) * 0.08;
      camera.current.y += (target.current.y - camera.current.y) * 0.08;

      const cx = camera.current.x;
      const cy = camera.current.y;
      const hw = window.innerWidth / 2;
      const hh = window.innerHeight / 2;

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const param = layoutParams[i];

        // Raw distance before wrap
        const rawDx = param.x - camera.current.x;
        const rawDy = param.y - camera.current.y;

        // Calculate which "wrap cycle" this image is currently in
        const wrapCountX = Math.floor((rawDx + CANVAS_SIZE / 2) / CANVAS_SIZE);
        const wrapCountY = Math.floor((rawDy + CANVAS_SIZE / 2) / CANVAS_SIZE);

        // Generate a pseudo-random hash (0.0 to 1.0) specific to this exact wrap clone
        const hash = Math.abs(Math.sin(wrapCountX * 12.9898 + wrapCountY * 78.233 + i * 45.123) * 43758.5453) % 1;

        // Apply wrapping logic
        let dx = rawDx % CANVAS_SIZE;
        let dy = rawDy % CANVAS_SIZE;

        if (dx > CANVAS_SIZE / 2) dx -= CANVAS_SIZE;
        if (dx < -CANVAS_SIZE / 2) dx += CANVAS_SIZE;
        if (dy > CANVAS_SIZE / 2) dy -= CANVAS_SIZE;
        if (dy < -CANVAS_SIZE / 2) dy += CANVAS_SIZE;

        // Add slow float animation
        const floatY = Math.sin(time * param.floatSpeed + param.floatOffset) * 25;
        const driftRotate = Math.sin(time * param.rotateSpeed) * 3;

        // Position on screen relative to center
        const screenX = dx + hw;
        const screenY = dy + hh + floatY;

        // Use the hash to create dynamic variety so repeating images look totally different
        const dynamicScale = param.scale * (0.6 + hash * 0.9); // Scale varies wildly between 60% and 150%
        
        let dynamicFilter = 'none';
        if (hash < 0.15) {
          dynamicFilter = 'invert(1) contrast(1.2)'; // 15% chance to be inverted
        } else if (hash > 0.85) {
          dynamicFilter = 'grayscale(1) contrast(1.3)'; // 15% chance to be black and white
        } else if (hash > 0.4 && hash < 0.5) {
          dynamicFilter = 'sepia(0.8) hue-rotate(320deg) contrast(1.1)'; // 10% chance to be moody warm
        }

        // Apply hardware-accelerated transform and dynamic filters
        el.style.transform = `translate3d(calc(-50% + ${screenX}px), calc(-50% + ${screenY}px), 0) scale(${dynamicScale}) rotate(${param.rotation + driftRotate}deg)`;
        el.style.filter = dynamicFilter;
        
        // Slightly change z-index based on hash to mix up the overlapping order
        el.style.zIndex = Math.floor(hash * 20).toString();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Event Listeners for Interaction
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Disable normal scrolling
      // Pure 1:1 mapping for trackpads. Standard mice will just scroll Y, but drag and auto-pan handle X.
      target.current.x += e.deltaX * 1.5;
      target.current.y += e.deltaY * 1.5;
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Ignore clicks on links
      if ((e.target as HTMLElement).closest('a')) return;
      
      isDragging.current = true;
      startDrag.current = { x: e.clientX, y: e.clientY };
      lastTarget.current = { x: target.current.x, y: target.current.y };
      document.body.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - startDrag.current.x;
      const deltaY = e.clientY - startDrag.current.y;
      
      // Reverse direction because dragging moves the camera, dragging left = camera right
      target.current.x = lastTarget.current.x - deltaX * 1.8;
      target.current.y = lastTarget.current.y - deltaY * 1.8;
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('pointerdown', handlePointerDown);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [layoutParams]);

  return (
    <>
      <CustomCursor />
      {/* 
        Fixed full-screen container. 
        Background is pitch black to match the rest of the site.
      */}
      <main 
        className="fixed inset-0 bg-black overflow-hidden touch-none select-none" 
        ref={containerRef}
      >
        <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
          <Link href="/" className="font-serif text-xl md:text-2xl hover:opacity-70 transition-opacity pointer-events-auto">
            KISHORE N.
          </Link>
          <div className="flex flex-col items-end gap-1">
             <Link href="/" className="font-sans text-[10px] md:text-xs uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2 pointer-events-auto">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <line x1="19" y1="12" x2="5" y2="12"></line>
                 <polyline points="12 19 5 12 12 5"></polyline>
               </svg>
               BACK TO HOME
             </Link>
             <span className="font-sans text-[9px] uppercase tracking-widest opacity-50">Drag or scroll</span>
          </div>
        </nav>

        {/* Scroll Indicator Overlay */}
        <div 
          ref={scrollIndicatorRef}
          className="fixed inset-0 pointer-events-none flex items-center justify-center z-[100]"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-sans text-xs tracking-widest uppercase flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
            Scroll or drag to explore
          </div>
        </div>

        {/* 
          The virtual grid manager.
          Images are absolutely positioned and moved via translate3d in the rAF loop.
        */}
        <div className="relative w-full h-full pointer-events-none">
          {layoutParams.map((param, idx) => (
            <div
              key={idx}
              ref={el => { itemsRef.current[idx] = el; }}
              className={`absolute top-0 left-0 w-[280px] sm:w-[350px] md:w-[450px] ${param.aspectRatioClass} rounded-[8px] overflow-hidden pointer-events-auto group cursor-pointer`}
              // High-quality drop shadow for that printed photo look
              style={{
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                willChange: 'transform'
              }}
              data-cursor="hover" 
              data-cursor-text="VIEW"
            >
              <Image
                src={param.src}
                alt={`Portfolio ${idx}`}
                width={600}
                height={800}
                draggable={false} // Crucial for drag functionality
                className="w-full h-full object-cover transition-all duration-[0.8s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] group-hover:brightness-110"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
