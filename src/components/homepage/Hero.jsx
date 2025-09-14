import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const mainTitle = useRef([]);
  const subtitle = useRef(null);
  const scrollLine = useRef(null);
  const scroll = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Font loading detection
    const checkFonts = async () => {
      try {
        await document.fonts.load("400 16px GeneralSans-Variable");
        await document.fonts.load("400 16px CabinetGrotesk-Variable");
        setFontsLoaded(true);
      } catch (error) {
        setTimeout(() => setFontsLoaded(true), 1000);
      }
    };

    if (document.fonts && document.fonts.load) {
      checkFonts();
    } else {
      setTimeout(() => setFontsLoaded(true), 1000);
    }
  }, []);

  useEffect(() => {
    // Scroll indicator animation
    const scrollTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    scrollTl.from(scrollLine.current, {
      translateX: -40,
      duration: 1.5,
      ease: "power4.inOut",
    });
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;

    const tl = gsap.timeline();
    const validTitleRefs = mainTitle.current.filter((el) => el !== null);

    if (validTitleRefs.length > 0) {
      tl.from(validTitleRefs, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.1,
      });
    }

    if (subtitle.current) {
      tl.from(
        subtitle.current,
        {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1"
      );
    }

    if (scroll.current) {
      tl.from(
        scroll.current,
        {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }
  }, [fontsLoaded]);

  const titleLetters = "LUCAS VU".split("");

  return (
    <section
      id="hero"
      className="hero relative flex w-full h-screen select-none items-center justify-center bg-secondary-100"
      aria-label="hero"
    >
      {/* Main content container */}
      <div
        className={`z-10 flex flex-col items-center text-center transition-opacity duration-300 ${
          fontsLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Main title */}
        <div className="flex flex-wrap justify-center items-center mb-4 md:mb-6">
          {titleLetters.map((letter, index) => (
            <span
              key={index}
              ref={(el) => (mainTitle.current[index] = el)}
              className={`text-6xl md:text-[8vw] lg:text-[10vw] xl:text-[12vw] 
                         font-general leading-none tracking-tight text-smooth
                         ${letter === " " ? "w-4 md:w-6 lg:w-8" : ""}`}
              style={{
                color: "#0E0E0C",
                fontWeight: "350",
                fontFamily: "GeneralSans-Variable, Arial, sans-serif",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div ref={subtitle} className="max-w-3xl px-4 mt-0">
          <p
            className="text-lg md:text-xl lg:text-2xl font-grotesk leading-relaxed text-smooth"
            style={{
              color: "#0E0E0C",
              fontWeight: "300",
              fontFamily: "CabinetGrotesk-Variable, Arial, sans-serif",
            }}
          >
            a multidisciplinary engineer who transforms
            <br />
            ideas into interfaces people adore
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scroll}
        className="absolute bottom-16 right-8 md:right-12 flex flex-col items-center justify-center space-y-8"
      >
        <span
          className="rotate-90 text-sm font-grotesk tracking-wider text-smooth"
          style={{ color: "#0E0E0C" }}
        >
          scroll
        </span>
        <div className="relative h-1 w-10 rotate-90 overflow-hidden">
          <span
            ref={scrollLine}
            className="absolute h-[0.08em] w-10 translate-x-10"
            style={{ backgroundColor: "#0E0E0C" }}
          ></span>
        </div>
      </div>
    </section>
  );
}
