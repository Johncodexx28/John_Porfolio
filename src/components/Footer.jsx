import { ArrowUp, Briefcase, Github, Mail } from "lucide-react";
import "./Footer.css";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Johncodexx28",
    icon: Github,
  },
  {
    label: "Jobs180 Profile",
    href: "https://johnlloydcabanig28.jobs180.com/",
    icon: Briefcase,
  },
  {
    label: "Email",
    href: "mailto:cabanigjohnlloyd@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="portfolio-footer" aria-label="Site footer">
      <div className="portfolio-footer__container">
        <div className="portfolio-footer__main">
          {/* Brand Info */}
          <div className="portfolio-footer__brand-col">
            <a
              href="#hero"
              onClick={handleScrollToTop}
              className="portfolio-footer__brand-title"
              aria-label="Back to top"
            >
              John Lloyd Cabanig
            </a>
            <p className="portfolio-footer__brand-tagline">
              Full-Stack Developer &amp; Designer crafting thoughtful digital
              interfaces and modern web applications with speed and precision.
            </p>
          </div>

          {/* Navigation Directory */}
          <nav className="portfolio-footer__nav-col" aria-label="Footer navigation">
            <p className="portfolio-footer__col-heading">Navigation</p>
            <div className="portfolio-footer__nav-links">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="portfolio-footer__nav-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Actions & Socials */}
          <div className="portfolio-footer__actions-col">
            <p className="portfolio-footer__col-heading">Connect</p>
            <div className="portfolio-footer__social-list">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={social.label}
                    className="portfolio-footer__social-btn"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            <a
              href="#hero"
              onClick={handleScrollToTop}
              className="portfolio-footer__top-btn"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="portfolio-footer__bottom">
          <p className="portfolio-footer__copyright">
            &copy; {new Date().getFullYear()} John Lloyd Cabanig. All rights reserved.
          </p>

          <div className="portfolio-footer__colophon">
            <span className="portfolio-footer__badge">
              <span className="portfolio-footer__badge-dot" aria-hidden="true" />
              Iloilo City, PH &bull; GMT+8
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
