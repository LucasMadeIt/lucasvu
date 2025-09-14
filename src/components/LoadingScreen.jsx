import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";

export default function LoadingScreen({ onLoadingComplete }) {
  const loadingRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  const fullText = "hello, welcome to the portfolio of";
  
  // 100 WPM = ~500 characters per minute = ~120ms per character
  const typingSpeed = 95;

  useEffect(() => {
    let currentIndex = 0;
    
    const typeWriter = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        // Finished typing, start exit animation after pause
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setIsComplete(true);
              onLoadingComplete();
            }
          });
          
          tl.to(textRef.current, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power3.in",
          })
          .to(loadingRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut",
          });
        }, 1000); // Pause for 1 second after typing completes
      }
    };

    // Start typing after brief delay
    setTimeout(typeWriter, 500);
    
    // Animate cursor blinking
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, [onLoadingComplete]);

  if (isComplete) {
    return null;
  }

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div
        ref={textRef}
        className="text-center text-white font-medium text-2xl md:text-4xl lg:text-5xl leading-relaxed"
      >
        <span>{displayText}</span>
        <span 
          ref={cursorRef}
          className="inline-block w-1 h-8 md:h-12 lg:h-16 bg-white ml-1"
        ></span>
      </div>
    </div>
  );
}