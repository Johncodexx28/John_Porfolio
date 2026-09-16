import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigationItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const PortfolioNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [navTheme, setNavTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let animationFrame = 0;
    const sections = navigationItems
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean)
      .map((anchor) => ({
        anchor,
        boundary: anchor.closest("[data-nav-theme]") || anchor,
      }));
    const updateActiveSection = () => {
      setIsScrolled(window.scrollY > 20);

      const activeMarker = window.innerHeight * 0.35;
      const currentSection = sections.find(({ boundary }) => {
        const bounds = boundary.getBoundingClientRect();
        return bounds.top <= activeMarker && bounds.bottom > activeMarker;
      });
      if (currentSection) {
        setActiveSection(currentSection.anchor.id);
        setNavTheme(
          currentSection.anchor.dataset.navTheme ||
            currentSection.boundary.dataset.navTheme ||
            "light",
        );
      } else {
        setNavTheme("light");
      }
    };
    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigation = () => setIsMenuOpen(false);

  return (
    <header
      className={`portfolio-nav ${navTheme === "dark" ? "is-dark" : ""} ${
        isScrolled ? "is-scrolled" : ""
      } ${isMenuOpen ? "is-open" : ""}`}
    >
      <nav className="portfolio-nav__inner" aria-label="Primary navigation">
        <a className="portfolio-nav__brand" href="#hero" onClick={handleNavigation}>
          JLC
        </a>
        <div className="portfolio-nav__desktop-links">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a className="portfolio-nav__cta" href="#contact" onClick={handleNavigation}>
          Let&apos;s talk <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <button
          type="button"
          className="portfolio-nav__menu-button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="portfolio-mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>
      <div id="portfolio-mobile-menu" className={`portfolio-nav__mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        {navigationItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
            onClick={handleNavigation}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
};

export default PortfolioNav;
