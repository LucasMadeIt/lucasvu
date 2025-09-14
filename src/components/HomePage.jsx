import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import NavBar from "./ui/NavBar";
import Hero from "./homepage/Hero";
import Role from "./homepage/Role";
import About from "./homepage/About";
import Services from "./homepage/Services";
import Works from "./homepage/Works";
import Contact from "./homepage/Contact";
import Footer from "./ui/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage({ startHeroAnimation }) {
  const sectionRefs = useRef([]);

  // Scrub animation of section headings
  useEffect(() => {
    if (!startHeroAnimation) return; // Don't run until loading is complete

    const sectionHeadings = document.querySelectorAll(".section-heading");
    sectionHeadings.forEach((heading) => {
      const headings = heading.querySelectorAll(".heading");
      headings.forEach((individualHeading) => {
        ScrollTrigger.create({
          trigger: heading,
          start: "top 550px",
          end: "bottom 550px",
          animation: gsap.to(individualHeading, {
            opacity: 1,
            y: 0,
            ease: "power4.out",
            duration: 1,
          }),
          toggleActions: "play none none none",
        });
      });
    });
    
    ScrollTrigger.refresh();
  }, [startHeroAnimation]);

  return (
    <>
      <NavBar sectionRefs={sectionRefs.current} />
      <Hero startAnimation={startHeroAnimation} />
      <main className="px-5 md:px-10 xl:px-20 2xl:px-28">
        <Role forwardedRef={(el) => (sectionRefs.current[0] = el)} />
        <About />
        <Services />
        <Works forwardedRef={(el) => (sectionRefs.current[1] = el)} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}