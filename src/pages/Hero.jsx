import { motion as Motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Play } from "lucide-react";
import profilePhoto from "../assets/images/my_photo.png";
import TextType from "../components/TextType.jsx";

const descriptionPhrases = [
  "I build digital experiences through code, interaction, and experimentation.",
  "I develop clean, responsive web applications with craft and detail.",
  "I turn creative ideas into intuitive, interactive reality.",
];

const Hero = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef(null);

  useEffect(
    () => () => {
      window.clearTimeout(transitionTimer.current);
    },
    [],
  );

  const handleScrollToAbout = () => {
    if (!isTransitioning) setIsTransitioning(true);
  };

  const handleCurtainComplete = () => {
    if (!isTransitioning) return;
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    transitionTimer.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  return (
    <section
      id="hero"
      className="portfolio-hero"
      aria-labelledby="hero-title"
      data-nav-theme="light"
    >
      <Motion.div
        className="portfolio-hero__transition-curtain"
        aria-hidden="true"
        initial={false}
        animate={{ scaleY: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.68, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={handleCurtainComplete}
      />
      <div className="portfolio-hero__grid">
        <Motion.div
          className="portfolio-hero__copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="portfolio-hero__eyebrow">Full-stack developer</p>
          <h1 id="hero-title" className="portfolio-hero__title">
            John Lloyd
            <br />
            Cabanig
          </h1>
          <p className="portfolio-hero__description">
            <TextType
              as="span"
              text={descriptionPhrases}
              typingSpeed={38}
              deletingSpeed={20}
              pauseDuration={2400}
              loop={true}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-[#111111] font-light opacity-75"
            />
          </p>

          <div className="portfolio-hero__actions">
            <a href="#projects" className="portfolio-hero__primary-action">
              View my work <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#about"
              className="portfolio-hero__secondary-action"
              onClick={(event) => {
                event.preventDefault();
                handleScrollToAbout();
              }}
            >
              <span className="portfolio-hero__play-icon">
                <Play size={13} fill="currentColor" aria-hidden="true" />
              </span>
              About me
            </a>
          </div>
          <div className="portfolio-hero__meta">
            <span>
              <MapPin size={15} aria-hidden="true" /> Iloilo, Philippines
            </span>
            <span>Available for remote work</span>
          </div>
        </Motion.div>
        <Motion.div
          className="portfolio-hero__visual"
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
        >
          <div className="portfolio-hero__portrait-frame">
            <img
              src={profilePhoto}
              alt="John Lloyd Cabanig holding a laptop"
              className="portfolio-hero__portrait"
            />
          </div>
          <p className="portfolio-hero__side-note">
            Ideas
            <br />
            into
            <br />
            reality
          </p>
          <p className="portfolio-hero__roles">
            Developer
            <br />
            Problem solver
            <br />
            Lifelong learner
          </p>
        </Motion.div>
      </div>

      <Motion.div
        className="portfolio-hero__pull-indicator"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Motion.button
          type="button"
          aria-label="Pull down to transition to About section"
          drag="y"
          dragConstraints={{ top: 0, bottom: 45 }}
          dragElastic={0.35}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            y: {
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 18 || info.velocity.y > 60) {
              handleScrollToAbout();
            }
          }}
          onClick={handleScrollToAbout}
          className="portfolio-hero__pull-button"
        >
          <span className="portfolio-hero__pull-label">
            {isTransitioning ? "Entering my story" : "Click to explore"}
          </span>
          <svg
            className="portfolio-hero__twist-arrow"
            width="24"
            height="34"
            viewBox="0 0 24 34"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2 C16 7, 20 13, 15 19 C10 25, 7 23, 12 29" />
            <path d="M8 25 L12 29 L16 25" />
          </svg>
        </Motion.button>
      </Motion.div>
    </section>
  );
};

export default Hero;
