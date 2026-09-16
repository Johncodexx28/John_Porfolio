import { useState } from "react";
import {
  Braces,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Figma,
  Flame,
  GitBranch,
  Layers3,
  Palette,
  Server,
  Workflow,
} from "lucide-react";
import LogoLoop from "../components/LogoLoop.jsx";
import ScrollExpand from "../components/ScrollExpand.jsx";
import uipcGroup from "../assets/images/uipc1.jpeg";
import uipcPhoto1 from "../assets/images/uipc1.jpg";
import uipcPhoto4 from "../assets/images/achievement4.jpg";
import uipcEvent from "../assets/images/uipc6.jpeg";
import championImage1 from "../assets/images/webdesign_champion1.jpg";
import championImage2 from "../assets/images/webdesign_champion2.jpg";
import championImage3 from "../assets/images/webdesign_champion3.jpg";
import award1 from "../assets/images/award1.png";
import award2 from "../assets/images/award2.png";
import award4 from "../assets/images/award4.jpg";
import "./Experience.css";
import "./ExperienceGallery.css";

const chapters = [
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "community", label: "Community" },
  { id: "recognition", label: "Recognition" },
];
const technologyItems = [
  { name: "JavaScript", icon: Braces, category: "Language" },
  { name: "TypeScript", icon: Code2, category: "Language" },
  { name: "React", icon: Layers3, category: "Frontend" },
  { name: "Node.js", icon: Server, category: "Backend" },
  { name: "Express", icon: Workflow, category: "Backend" },
  { name: "MongoDB", icon: Database, category: "Database" },
  { name: "Python", icon: Code2, category: "Language" },
  { name: "Git", icon: GitBranch, category: "Workflow" },
  { name: "Figma", icon: Figma, category: "Design" },
  { name: "Tailwind CSS", icon: Palette, category: "Frontend" },
  { name: "Firebase", icon: Flame, category: "Platform" },
  { name: "AI Tools", icon: Code2, category: "Workflow" },
];
const uipcPhotos = [
  {
    src: uipcPhoto1,
    alt: "University of Iloilo Programming Circle members",
    tag: "Community",
    caption: "Programming grows faster when it is shared.",
  },
  {
    src: uipcGroup,
    alt: "University of Iloilo Programming Circle activity",
    tag: "Community",
    caption:
      "Collaborating on code, sharing debugging insights, and building momentum.",
  },
  {
    src: uipcPhoto4,
    alt: "UIPC members participating in environmental awareness program",
    tag: "Environmental Awareness",
    caption:
      "Supporting environmental advocacy through community outreach and initiatives.",
  },

  {
    src: uipcEvent,
    alt: "UIPC event team at University of Iloilo campus activity",
    tag: "Campus Events",
    caption:
      "Organizing workshops and activities that celebrate student developer culture.",
  },
];

const championPhotos = [
  {
    src: championImage1,
    alt: "Web Design Champion - 1st Place Awarding ceremony",
  },
  {
    src: championImage2,
    alt: "Web Design Champion - Competition moment",
  },
  {
    src: championImage3,
    alt: "Web Design Champion - Trophy and celebration",
  },
];

const educationHistory = [
  {
    period: "2027 Jun",
    school: "PHINMA University of Iloilo",
    program: "Computer Science/Information Technology",
    degree: "Bachelor's/College Degree",
  },
  {
    period: "2023 Jun",
    school: "Notre Dame of Makilala",
    program:
      "Academic Track: Science, Technology, Engineering and Mathematics (STEM)",
    degree: "Senior High School Diploma",
  },
  {
    period: "2021 May",
    school: "Notre Dame of Makilala Inc.",
    program: null,
    degree: "High School Diploma",
  },
];

function ChapterDetail({ activeChapter }) {
  if (activeChapter === "education") {
    return (
      <div className="experience-story__detail">
        <div className="experience-story__education-list">
          {educationHistory.map((item, index) => (
            <article key={index} className="experience-story__education-item">
              <div className="experience-story__education-meta">
                <span className="experience-story__education-period">
                  {item.period}
                </span>
                <span className="experience-story__education-badge">
                  {item.degree}
                </span>
              </div>
              <h3 className="experience-story__education-school">{item.school}</h3>
              {item.program && (
                <p className="experience-story__education-program">{item.program}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    );
  }

  const details = {
    work: [
      "2024 — Present",
      "Independent Web Developer",
      "Building responsive interfaces and practical systems through personal, school, and collaborative projects.",
      "BreedSmart · Iloilo Parking System · Personal projects",
    ],
    community: [
      "2023 — Present · Student organization",
      "University of Iloilo Programming Circle",
      "A space for workshops, events, collaboration, and people who turn curiosity about technology into shared momentum.",
      "Member · Workshops · Events · Technical community",
    ],
    recognition: [
      "Academic recognition",
      "Learning made visible",
      "A collection of programming milestones, course completions, and competition recognition earned through hands-on practice.",
      "Best in Programming · Programming 2 Completion · Web Design Champion",
    ],
  }[activeChapter];

  if (!details) return null;

  return (
    <div className="experience-story__detail">
      <p className="experience-story__detail-meta">{details[0]}</p>
      <h3>{details[1]}</h3>
      <p>{details[2]}</p>
      <p className="experience-story__detail-meta">{details[3]}</p>
    </div>
  );
}

export default function Experience() {
  const [activeChapter, setActiveChapter] = useState("community");
  const [championPhotoIndex, setChampionPhotoIndex] = useState(0);
  const activeChampionPhoto = championPhotos[championPhotoIndex];

  const nextChampionPhoto = () => {
    setChampionPhotoIndex((prev) => (prev + 1) % championPhotos.length);
  };
  const prevChampionPhoto = () => {
    setChampionPhotoIndex(
      (prev) => (prev - 1 + championPhotos.length) % championPhotos.length,
    );
  };

  return (
    <section
      id="experience"
      className="experience-story"
      aria-labelledby="experience-title"
      data-nav-theme="dark"
    >
      <div className="experience-story__container">
        <header className="experience-story__header">
          <div>
            <p className="experience-story__eyebrow">Experience</p>
            <h2 id="experience-title">Learning, building, contributing.</h2>
            <p>
              People, projects, and communities that have shaped how I work.
            </p>
          </div>
          <p className="experience-story__note">
            A growing practice in technology, design, and collaboration.
          </p>
        </header>
        <section
          className="experience-story__tools"
          aria-labelledby="tools-title"
        >
          <div>
            <p className="experience-story__eyebrow">Languages &amp; tools</p>
            <h3 id="tools-title">The toolkit behind the work.</h3>
          </div>
          <LogoLoop items={technologyItems} />
        </section>
        <div className="experience-story__explorer">
          <nav
            className="experience-story__rail"
            aria-label="Experience chapters"
          >
            {chapters.map(({ id, label }, index) => (
              <button
                key={id}
                type="button"
                className={activeChapter === id ? "is-active" : ""}
                onClick={() => setActiveChapter(id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {label}
              </button>
            ))}
          </nav>
          <ChapterDetail activeChapter={activeChapter} />
        </div>
        <section
          className="experience-story__community"
          aria-labelledby="uipc-title"
        >
          <div className="experience-story__community-heading">
            <div>
              <p className="experience-story__eyebrow">Community</p>
              <h3 id="uipc-title">University of Iloilo Programming Circle</h3>
            </div>
            <p>Member · Workshops, events, and technical community</p>
          </div>
          <ScrollExpand
            slides={uipcPhotos}
            title="UIPC"
            scrollHint="Scroll to expand the story"
          />
          <div className="experience-story__community-copy">
            <img src={uipcEvent} alt="UIPC event team" />
            <div>
              <p>
                UIPC has given me room to learn with others, take part in campus
                activities, and contribute to a community built around curiosity
                and technology.
              </p>
              <p>
                From workshops to events, it is a reminder that the work is
                always stronger with people around it.
              </p>
            </div>
          </div>
        </section>
        <section
          className="experience-story__recognition"
          aria-labelledby="recognition-title"
        >
          <div>
            <p className="experience-story__eyebrow">Recognition</p>
            <h3 id="recognition-title">Web Design Champion</h3>
            <p>Citedelia 2025 · 1st Place, Web Design Competition</p>
          </div>
          <div className="experience-story__recognition-media">
            <img
              src={activeChampionPhoto.src}
              alt={activeChampionPhoto.alt}
              className="experience-story__recognition-img"
              onClick={nextChampionPhoto}
            />
            <div className="experience-story__recognition-controls">
              <div className="experience-story__recognition-dots">
                {championPhotos.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`experience-story__recognition-dot ${
                      index === championPhotoIndex
                        ? "experience-story__recognition-dot--active"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setChampionPhotoIndex(index);
                    }}
                    aria-label={`Show champion photo ${index + 1}`}
                  />
                ))}
              </div>
              <div className="experience-story__recognition-nav">
                <button
                  type="button"
                  className="experience-story__recognition-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevChampionPhoto();
                  }}
                  aria-label="Previous champion photo"
                >
                  <ChevronLeft size={15} aria-hidden="true" />
                </button>
                <span className="experience-story__recognition-counter">
                  {championPhotoIndex + 1} / {championPhotos.length}
                </span>
                <button
                  type="button"
                  className="experience-story__recognition-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextChampionPhoto();
                  }}
                  aria-label="Next champion photo"
                >
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section
          className="experience-story__certificates"
          aria-label="Certificates and awards"
        >
          {[
            { image: award1, title: "Best in Programming", year: "2024" },
            { image: award2, title: "Programming 2 Completion", year: "2024" },
            {
              image: award4,
              title: "Coding Training for Basic JavaScript",
              year: "2024",
            },
          ].map((item) => (
            <article key={item.title}>
              <img src={item.image} alt="" />
              <div>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}
