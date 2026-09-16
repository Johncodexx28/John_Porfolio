import { useEffect } from "react";
import { stagger, useAnimate, useReducedMotion } from "framer-motion";
import "./LoadingScreen.css";

const terminalLines = [
  "> booting john_lloyd.portfolio",
  "[ OK ] identity ........ Full-Stack Developer",
  "[ OK ] location ........ Iloilo, Philippines",
  "[ OK ] frontend ........ React / React Native",
  "[ OK ] backend ......... Node.js / MongoDB",
  "[ OK ] mindset ......... Lifelong Learner",
  "[ OK ] status .......... Available for Remote Work",
  "> building digital experiences...",
  "> launching portfolio ██████████ 100%",
];

const LoadingScreen = ({ onComplete }) => {
  const [scope, animate] = useAnimate();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const runSequence = async () => {
      if (prefersReducedMotion) {
        await animate(
          ".loading-screen__name-morph",
          { opacity: [0, 1, 0] },
          { duration: 1 }
        );
      } else {
        // 1. Terminal boot lines
        await animate(
          ".loading-screen__line",
          { opacity: 1, y: 0 },
          { delay: stagger(0.12), duration: 0.16 }
        );

        await new Promise((resolve) => setTimeout(resolve, 350));

        // 2. Terminal fades out smoothly
        await animate(
          ".loading-screen__terminal",
          { opacity: 0, scale: 0.94, filter: "blur(4px)" },
          { duration: 0.35, ease: "easeIn" }
        );

        // 3. Reveal full name: "John Lloyd Cabanig"
        await animate(
          ".loading-screen__name-morph",
          {
            opacity: [0, 1],
            scale: [0.94, 1],
            filter: ["blur(6px)", "blur(0px)"],
          },
          { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        );

        // Dwell on "John Lloyd Cabanig" so it is clearly readable
        await new Promise((resolve) => setTimeout(resolve, 1400));

        // 4. Transition: Collapse "ohn", "loyd", "abanig" and spaces, leaving only "JLC"
        await Promise.all([
          animate(
            ".loading-screen__rest",
            {
              opacity: 0,
              maxWidth: "0px",
              scaleX: 0,
              filter: "blur(3px)",
            },
            { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          ),
          animate(
            ".loading-screen__space",
            {
              width: "0px",
              opacity: 0,
            },
            { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          ),
          animate(
            ".loading-screen__name-morph",
            {
              scale: [1, 1.45],
              letterSpacing: "-0.06em",
            },
            { delay: 0.25, duration: 0.85, ease: [0.16, 1, 0.3, 1] }
          ),
        ]);

        // Hold the iconic JLC monogram
        await new Promise((resolve) => setTimeout(resolve, 950));

        // Monogram fades out as curtains split
        animate(
          ".loading-screen__name-morph",
          { opacity: 0, scale: 1.55 },
          { duration: 0.45, ease: "easeIn" }
        );

        // 5. Panels split open to reveal portfolio
        await Promise.all([
          animate(
            ".loading-screen__panel--top",
            { y: "-100%" },
            { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
          ),
          animate(
            ".loading-screen__panel--bottom",
            { y: "100%" },
            { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
          ),
        ]);
      }

      if (!cancelled) onComplete();
    };

    runSequence();

    return () => {
      cancelled = true;
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [animate, onComplete, prefersReducedMotion]);

  return (
    <div ref={scope} className="loading-screen" role="status" aria-live="polite">
      <span className="sr-only">Opening John Lloyd&apos;s portfolio.</span>
      <div
        className="loading-screen__panel loading-screen__panel--top"
        aria-hidden="true"
      />
      <div
        className="loading-screen__panel loading-screen__panel--bottom"
        aria-hidden="true"
      />
      {!prefersReducedMotion ? (
        <div className="loading-screen__terminal" aria-hidden="true">
          {terminalLines.map((line) => (
            <p key={line} className="loading-screen__line">
              {line}
            </p>
          ))}
          <span className="loading-screen__cursor">█</span>
        </div>
      ) : null}

      {/* Morphing typography: John Lloyd Cabanig -> JLC */}
      <div className="loading-screen__name-morph" aria-hidden="true">
        <span className="loading-screen__word">
          <span className="loading-screen__initial">J</span>
          <span className="loading-screen__rest">ohn</span>
        </span>
        <span className="loading-screen__space">&nbsp;</span>
        <span className="loading-screen__word">
          <span className="loading-screen__initial">L</span>
          <span className="loading-screen__rest">loyd</span>
        </span>
        <span className="loading-screen__space">&nbsp;</span>
        <span className="loading-screen__word">
          <span className="loading-screen__initial">C</span>
          <span className="loading-screen__rest">abanig</span>
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
