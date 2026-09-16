import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import "./ScrollExpand.css";
import { getEntryRevealProgress, getTrackHeight } from "./scrollProgress";

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);
const smoothstep = (start, end, value) => {
  const progress = clamp((value - start) / (end - start || 0.000001), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

export default function ScrollExpand({
  src,
  alt,
  slides,
  title,
  scrollHint,
  autoplayInterval = 5000,
  startWidth = 62,
  startHeight = 54,
  startRadius = 18,
  endRadius = 10,
  mediaZoom = 1.18,
  holdDistance = 0.08,
  overlayScrim = 0.42,
  children,
}) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  const titleRef = useRef(null);
  const overlayRef = useRef(null);
  const hintRef = useRef(null);
  const navButtonsRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "160px 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const normalizedSlides = useMemo(() => {
    if (Array.isArray(slides) && slides.length > 0) {
      return slides;
    }
    if (src) {
      return [{ src, alt: alt || "" }];
    }
    return [];
  }, [slides, src, alt]);

  const slideCount = normalizedSlides.length;
  const isCarousel = slideCount > 1;

  const goToNext = useCallback(() => {
    if (slideCount <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const goToPrev = useCallback(() => {
    if (slideCount <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Autoplay handler
  useEffect(() => {
    if (!isCarousel || !isPlaying || isHovered || !isInView) return undefined;
    const timer = setInterval(() => {
      goToNext();
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [autoplayInterval, goToNext, isCarousel, isHovered, isInView, isPlaying]);

  // Touch swipe support
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  const handleTouchStart = (e) => {
    if (!isCarousel) return;
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isCarousel || touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (!isCarousel || touchStartX.current === null) return;
    const threshold = 45;
    if (touchDeltaX.current < -threshold) {
      goToNext();
    } else if (touchDeltaX.current > threshold) {
      goToPrev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isCarousel) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  };

  const applyProgress = useCallback(
    (progress) => {
      const frame = frameRef.current;
      const media = mediaRef.current;
      if (!frame || !media) return;
      const eased = smoothstep(0, 1, progress);
      const width = startWidth + (100 - startWidth) * eased;
      const height = startHeight + (100 - startHeight) * eased;
      frame.style.clipPath = `inset(${(100 - height) / 2}% ${(100 - width) / 2}% round ${startRadius + (endRadius - startRadius) * eased}px)`;
      media.style.transform = `scale(${mediaZoom + (1 - mediaZoom) * eased})`;
      frame.style.setProperty(
        "--scroll-expand-scrim",
        `${overlayScrim * eased}`,
      );
      const titleOut = smoothstep(0.35, 0.85, progress);
      if (titleRef.current) {
        titleRef.current.style.opacity = `${1 - titleOut}`;
        titleRef.current.style.transform = `translateY(${-20 * titleOut}px)`;
      }
      if (hintRef.current)
        hintRef.current.style.opacity = `${1 - smoothstep(0, 0.16, progress)}`;
      if (overlayRef.current) {
        const overlayIn = smoothstep(0.62, 1, progress);
        overlayRef.current.style.opacity = `${overlayIn}`;
        overlayRef.current.style.transform = `translateY(${16 * (1 - overlayIn)}px)`;
      }
      if (navButtonsRef.current) {
        const navIn = smoothstep(0.62, 1, progress);
        navButtonsRef.current.style.opacity = `${navIn}`;
        navButtonsRef.current.style.pointerEvents = navIn > 0.5 ? "auto" : "none";
      }
    },
    [endRadius, mediaZoom, overlayScrim, startHeight, startRadius, startWidth],
  );

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return undefined;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stageHeight = 0;
    let animationFrame = 0;
    let current = 0;
    const getProgress = () =>
      getEntryRevealProgress(
        track.getBoundingClientRect().top,
        window.innerHeight,
      );
    const measure = () => {
      stageHeight = Math.min(window.innerHeight * 0.72, 560);
      stage.style.height = `${stageHeight}px`;
      track.style.height = `${getTrackHeight(stageHeight, 0, holdDistance)}px`;
    };
    const update = () => {
      const target = mediaQuery.matches ? 1 : getProgress();
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.002) current = target;
      applyProgress(current);
      if (current !== target) animationFrame = requestAnimationFrame(update);
    };
    const onScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      current = mediaQuery.matches ? 1 : getProgress();
      applyProgress(current);
    };
    measure();
    current = mediaQuery.matches ? 1 : getProgress();
    applyProgress(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [applyProgress, holdDistance]);

  const activeSlide = normalizedSlides[currentIndex] || normalizedSlides[0];

  return (
    <div
      ref={rootRef}
      className="scroll-expand"
      tabIndex={isCarousel ? 0 : undefined}
      role={isCarousel ? "region" : undefined}
      aria-roledescription={isCarousel ? "carousel" : undefined}
      aria-label={isCarousel ? `${title || "Story"} Carousel` : undefined}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            <div ref={mediaRef} className="scroll-expand__media-scaler">
              {isCarousel ? (
                <div
                  className="scroll-expand__carousel-track"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {normalizedSlides.map((slide, index) => (
                    <div
                      key={index}
                      className="scroll-expand__carousel-slide"
                      aria-hidden={index !== currentIndex}
                    >
                      <img
                        className="scroll-expand__media"
                        src={slide.src}
                        alt={slide.alt || ""}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <img
                  className="scroll-expand__media"
                  src={activeSlide?.src}
                  alt={activeSlide?.alt || ""}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
            <div className="scroll-expand__scrim" />

            {isCarousel && (
              <div ref={navButtonsRef} className="scroll-expand__nav-container">
                <button
                  type="button"
                  className="scroll-expand__nav-btn scroll-expand__nav-btn--prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  aria-label={`Previous ${title ? `${title} photo` : "photo"}`}
                >
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="scroll-expand__nav-btn scroll-expand__nav-btn--next"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  aria-label={`Next ${title ? `${title} photo` : "photo"}`}
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              </div>
            )}

            <div ref={overlayRef} className="scroll-expand__overlay">
              {children ? (
                typeof children === "function" ? (
                  children({
                    currentIndex,
                    slideCount,
                    currentSlide: activeSlide,
                    goToNext,
                    goToPrev,
                    goToSlide,
                    isPlaying,
                    setIsPlaying,
                  })
                ) : (
                  children
                )
              ) : isCarousel ? (
                <div className="scroll-expand__carousel-overlay">
                  <div className="scroll-expand__caption-block">
                    {activeSlide?.tag && (
                      <span className="scroll-expand__tag">
                        {activeSlide.tag}
                      </span>
                    )}
                    {activeSlide?.caption && (
                      <p className="scroll-expand__caption">
                        {activeSlide.caption}
                      </p>
                    )}
                  </div>
                  <div className="scroll-expand__controls-bar">
                    <div
                      className="scroll-expand__dots"
                      role="tablist"
                      aria-label="Slides"
                    >
                      {normalizedSlides.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          role="tab"
                          aria-selected={index === currentIndex}
                          aria-label={`Go to slide ${index + 1}`}
                          className={`scroll-expand__dot ${
                            index === currentIndex
                              ? "scroll-expand__dot--active"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            goToSlide(index);
                          }}
                        />
                      ))}
                    </div>
                    <div className="scroll-expand__controls-right">
                      <span className="scroll-expand__counter">
                        {String(currentIndex + 1).padStart(2, "0")} /{" "}
                        {String(slideCount).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        className="scroll-expand__play-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying((prev) => !prev);
                        }}
                        aria-label={
                          isPlaying ? "Pause slideshow" : "Play slideshow"
                        }
                      >
                        {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <h3 ref={titleRef} className="scroll-expand__title">
            {title}
          </h3>
          <p ref={hintRef} className="scroll-expand__hint">
            {scrollHint}
          </p>
        </div>
      </div>
    </div>
  );
}
