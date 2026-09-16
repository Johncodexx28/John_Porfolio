import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import bookLifeImage from "../assets/images/booklife.webp";
import uiTubeImage from "../assets/images/uitube.webp";
import breedsmart from "../assets/images/breedsmart.webp";
import ilooparking from "../assets/images/pfinder.webp";

const projects = [
  {
    number: "01",
    title: "Book Life",
    repository: "Book-Life-Project",
    category: "Desktop / Systems",
    description:
      "A feature-rich Python project for organizing books, reading activity, and practical library workflows.",
    technologies: ["Python", "C++", "HTML"],
    image: bookLifeImage,
    githubUrl: "https://github.com/Johncodexx28/Book-Life-Project",
  },
  {
    number: "02",
    title: "UItube Platform",
    repository: "UItube-Platform",
    category: "Web Platform",
    description:
      "A modern JavaScript video platform focused on familiar discovery, viewing, and content browsing flows.",
    technologies: ["JavaScript", "CSS", "HTML"],
    image: uiTubeImage,
    githubUrl: "https://github.com/Johncodexx28/UItube-Platform",
    liveUrl: "https://uitube-platform-dvn9.vercel.app/",
  },
  {
    number: "03",
    title: "Iloilo Agriculture Office System",
    repository: "Ilo-Agricultures-Office-System",
    category: "Government / Agriculture",
    description:
      "A digital agriculture office platform designed to organize livestock records and support clearer local service workflows.",
    technologies: ["JavaScript", "TypeScript", "CSS"],
    image: breedsmart,
    githubUrl:
      "https://github.com/Error-404-not-found-org/Ilo-Agricultures-Office-System",
    liveUrl: "https://breedsmartoton.vercel.app",
  },
  {
    number: "04",
    title: "Iloilo Parking System",
    repository: "IloIlo-ParkingSystem",
    category: "Smart City / Management",
    description:
      "A web-based parking management system built to streamline space monitoring and day-to-day parking operations.",
    technologies: ["JavaScript", "CSS", "HTML"],
    image: ilooparking,
    githubUrl: "https://github.com/Johncodexx28/IloIlo-ParkingSystem",
  },
];

const Projects = () => {
  const prefersReducedMotion = useReducedMotion();
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.58,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hover: prefersReducedMotion ? {} : { y: -6 },
  };

  return (
    <section
      id="projects"
      className="portfolio-projects"
      aria-labelledby="projects-title"
      data-nav-theme="light"
    >
      <div className="portfolio-projects__container">
        <Motion.div
          className="portfolio-projects__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="portfolio-projects__eyebrow">Selected GitHub Work</p>
            <h2 id="projects-title" className="portfolio-projects__title">
              Projects built through curiosity and practice.
            </h2>
          </div>
          <p className="portfolio-projects__lead">
            A compact selection of AI, full-stack, and community-focused systems
            from my active GitHub work.
          </p>
        </Motion.div>

        <Motion.div
          className="portfolio-projects__showcase"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {projects.map((project) => (
            <Motion.article
              key={project.repository}
              className="portfolio-projects__card"
              variants={cardVariants}
              whileHover="hover"
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <Motion.div
                className="portfolio-projects__card-media"
                variants={{
                  hover: prefersReducedMotion ? {} : { scale: 1.015 },
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Motion.img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  className="portfolio-projects__image"
                  loading="lazy"
                  decoding="async"
                  variants={{
                    hover: prefersReducedMotion ? {} : { scale: 1.055 },
                  }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                />
                <Motion.span
                  className="portfolio-projects__card-number"
                  variants={{
                    hover: prefersReducedMotion
                      ? {}
                      : { scale: 1.08, rotate: 6 },
                  }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  {project.number}
                </Motion.span>
              </Motion.div>

              <div className="portfolio-projects__card-info">
                <span className="portfolio-projects__card-badge">
                  {project.category}
                </span>
                <h3 className="portfolio-projects__card-title">
                  {project.title}
                </h3>
                <p className="portfolio-projects__repository">
                  {project.repository}
                </p>
                <p className="portfolio-projects__card-description">
                  {project.description}
                </p>

                <ul
                  className="portfolio-projects__tags"
                  aria-label={`${project.title} technologies`}
                >
                  {project.technologies.map((technology) => (
                    <li key={technology} className="portfolio-projects__tag">
                      {technology}
                    </li>
                  ))}
                </ul>

                <div className="portfolio-projects__card-actions">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="portfolio-projects__secondary-btn"
                    aria-label={`View ${project.title} source on GitHub`}
                  >
                    <Github size={15} aria-hidden="true" /> Source
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="portfolio-projects__primary-btn"
                      aria-label={`Open ${project.title} live website`}
                    >
                      Live <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </Motion.article>
          ))}
        </Motion.div>

        <Motion.aside
          className="portfolio-projects__contributions"
          aria-labelledby="github-contributions-title"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.58,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="portfolio-projects__contributions-header">
            <div>
              <p className="portfolio-projects__contributions-eyebrow">
                <Github size={14} aria-hidden="true" /> GitHub Activity
              </p>
              <h3
                id="github-contributions-title"
                className="portfolio-projects__contributions-title"
              >
                Building consistently, one commit at a time.
              </h3>
            </div>
            <a
              href="https://github.com/Johncodexx28"
              target="_blank"
              rel="noreferrer"
              className="portfolio-projects__contributions-link"
            >
              View profile <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="portfolio-projects__contributions-chart">
            <img
              src="https://ghchart.rshah.org/111111/Johncodexx28"
              alt="John Lloyd Cabanig's GitHub contribution activity over the past year"
              loading="lazy"
            />
          </div>
        </Motion.aside>

        <a
          href="https://github.com/Johncodexx28?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="portfolio-projects__all-link"
        >
          View all repositories <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Projects;
