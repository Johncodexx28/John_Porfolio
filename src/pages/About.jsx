import { motion as Motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import DriftWall from "../components/DriftWall";
import bookLifeImage from "../assets/images/booklife.webp";
import uiTubeImage from "../assets/images/uitube.webp";
import breedsmartImage from "../assets/images/breedsmart.webp";
import driftwall1 from "../assets/images/driftwall1.webp";
import driftwall2 from "../assets/images/driftwall2.webp";
import driftwall3 from "../assets/images/driftwall3.webp";
import pfinderImage from "../assets/images/pfinder.webp";

const stats = [
  { value: "20+", label: "Projects completed" },
  { value: "5+", label: "Core technologies" },
  { value: "100+", label: "Hours spent building" },
];

const disciplines = [
  {
    number: "01",
    title: "Product-minded development",
    description:
      "I begin with the person using the product, then shape the interface and code around what they need to accomplish.",
  },
  {
    number: "02",
    title: "Thoughtful interaction",
    description:
      "Motion, feedback, and responsive behavior are treated as part of the experience—not decoration added at the end.",
  },
  {
    number: "03",
    title: "Reliable foundations",
    description:
      "I value readable components, practical architecture, and details that keep a product fast and maintainable.",
  },
];

const workPreviewItems = [
  { image: bookLifeImage, title: "Book Life", href: "#projects" },
  { image: uiTubeImage, title: "UItube Platform", href: "#projects" },
  { image: breedsmartImage, title: "BreedSmart", href: "#projects" },
  { image: pfinderImage, title: "Iloilo Parking System", href: "#projects" },
  { image: driftwall1, title: "UI-LearningHub", href: "#projects" },
  { image: driftwall2, title: "BreedSmart Mobile", href: "#projects" },
  { image: driftwall3, title: "Espresso Grove", href: "#projects" },
];

const About = () => (
  <section
    id="about"
    className="portfolio-about"
    aria-labelledby="about-title"
    data-nav-theme="dark"
  >
    <div className="portfolio-about__container">
      <Motion.div
        className="portfolio-about__intro-layout"
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="portfolio-about__intro">
          <p className="portfolio-about__eyebrow">About / John Lloyd Cabanig</p>
          <h2 id="about-title" className="portfolio-about__title">
            I build digital work that feels clear, useful, and alive.
          </h2>
        </div>
        <aside
          className="portfolio-about__work-preview"
          aria-label="Future work preview"
        >
          <DriftWall
            items={workPreviewItems}
            columns={3}
            tileWidth={200}
            tileHeight={156}
            gap={18}
            radius={14}
            direction="up"
            speed={54}
            variance={0.45}
            tilt={6}
            turn={-14}
            roll={-2}
            perspective={2400}
            depth={120}
            parallax={0.4}
            lift={64}
            fade={0.05}
            dim={0.55}
            pauseOnHover={false}
            grayscale
            overlayColor="#060010"
          />
        </aside>
      </Motion.div>

      <div className="portfolio-about__story">
        <Motion.div
          className="portfolio-about__bio"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="portfolio-about__lead">
            I’m an aspiring full-stack developer and student at PHINMA
            University of Iloilo, focused on turning ambitious ideas into
            polished digital products.
          </p>
          <p>
            My work sits between engineering and visual design. I enjoy shaping
            responsive interfaces, building dependable application logic, and
            using motion to make each interaction feel intentional. Every
            project is a chance to learn deeply, simplify complexity, and ship
            something people enjoy using.
          </p>
          <div className="portfolio-about__actions">
            <a href="#projects" className="portfolio-about__cta">
              Explore selected work{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </Motion.div>

        <Motion.div
          className="portfolio-about__disciplines"
          aria-label="How I approach my work"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.16, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {disciplines.map((discipline) => (
            <article
              key={discipline.number}
              className="portfolio-about__discipline"
            >
              <span>{discipline.number}</span>
              <div>
                <h3>{discipline.title}</h3>
                <p>{discipline.description}</p>
              </div>
            </article>
          ))}
        </Motion.div>
      </div>

      <Motion.div
        className="portfolio-about__stats"
        aria-label="Key milestones"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ delay: 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="portfolio-about__stat">
            <span className="portfolio-about__stat-value">{stat.value}</span>
            <span className="portfolio-about__stat-label">{stat.label}</span>
          </div>
        ))}
        <p className="portfolio-about__availability">
          Based in Iloilo, Philippines
          <span>Available for remote opportunities</span>
        </p>
      </Motion.div>
    </div>
  </section>
);

export default About;
