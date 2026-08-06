import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import FeaturedShows from '@/components/FeaturedShows';
import Gallery from '@/components/Gallery';
import Experience from '@/components/Experience';
import Awards from '@/components/Awards';
import Team from '@/components/Team';
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
        <Services />
        <FeaturedShows />
        <Gallery />
        <Experience />
        <Awards />
        <Team />
        <Contact />
      </main>
    </>
  );
}
