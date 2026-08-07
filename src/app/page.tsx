import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import FeaturedImage from '@/components/FeaturedImage';

import Gallery from '@/components/Gallery';
import Experience from '@/components/Experience';

import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navigation />
      <main className="w-full bg-black">
        <Hero />
        <About />
        <FeaturedImage />

        <Gallery />
        <Experience />

        <Contact />
      </main>
    </>
  );
}
