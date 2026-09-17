import { useScrollReveal, useScrollProgress } from '@/hooks/useInteractions';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import ShowerTypes from '@/components/ShowerTypes';
import Showcase from '@/components/Showcase';
import GlassStory from '@/components/GlassStory';
import Projects from '@/components/Projects';
import Process from '@/components/Process';
import Why from '@/components/Why';
import Audience from '@/components/Audience';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

function App() {
  useScrollReveal();
  const progress = useScrollProgress();

  return (
    <>
      <div className="fixed top-0 left-0 h-0.5 w-full z-[9999] pointer-events-none">
        <div
          className="block h-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg,var(--glass-deep),var(--glass))',
            transition: 'width .1s linear',
          }}
        />
      </div>

      <Header />

      <main>
        <Hero />
        <Marquee />
        <Services />
        <Gallery />
        <ShowerTypes />
        <Showcase />
        <GlassStory />
        <Projects />
        <Process />
        <Why />
        <Audience />
        <FAQ />
        <CTA />
      </main>

      <Footer />
      <FloatingContact />
    </>
  );
}

export default App;
