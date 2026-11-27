import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";
import { Nav } from "@/components/nav";
import { TamiHero } from "@/components/hero-content";
import { Services, ToolsMarquee } from "@/components/services";
import { Work } from "@/components/work";
import { Reviews } from "@/components/reviews";
import { About, Faq, Process } from "@/components/story";
import { Contact, Footer } from "@/components/contact";

function Mesh() {
  return (
    <div aria-hidden className="mesh">
      <div className="mesh-blob b1" />
      <div className="mesh-blob b2" />
      <div className="mesh-blob b3" />
      <div className="mesh-blob b4" />
      <div className="mesh-grid" />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1 });
    setLenis(lenis);
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <Nav />
      <main id="main">
        <TamiHero />
        <ToolsMarquee />
        <div className="relative">
          <Mesh />
          <div className="relative z-10">
            <Services />
            <Work />
            <Reviews />
            <Process />
            <About />
            <Faq />
            <Contact />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
