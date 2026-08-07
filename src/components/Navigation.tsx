'use client';

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 w-full z-[60] flex items-center justify-between px-5 py-4 md:px-12 md:py-8 mix-blend-difference text-white backdrop-blur-sm bg-black/5 pointer-events-none">
      <div className="font-serif text-xl tracking-widest uppercase font-bold pointer-events-auto" data-cursor="hover">
        KN
      </div>
    </header>
  );
}
