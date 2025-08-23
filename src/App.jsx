import DarkBackground from "./components/DarkBackground.jsx";
import CardNav from "./components/CardNav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import Navcon from "./assets/navcon.png";
import Interests from "./components/Interests.jsx";
import Achievements from "./components/Achievements.jsx";

export default function App() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Who I Am", ariaLabel: "About Me" },
        { label: "Interest", ariaLabel: "My Interests and Activities" },
        { label: "Achievements", ariaLabel: "Achievements" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Web Development", ariaLabel: "Web Development Projects" },
        { label: "Web Design", ariaLabel: "UI and Web Design Projects" },
        {
          label: "Coding Journey",
          ariaLabel: "Coding Documentations and Journey",
        },
      ],
    },
    {
      label: "Skills",
      bgColor: "#1E1030",
      textColor: "#fff",
      links: [
        { label: "Languages", ariaLabel: "Programming Languages" },
        { label: "Frameworks", ariaLabel: "Libraries and Frameworks" },
        { label: "Tools", ariaLabel: "Developer Tools" },
      ],
    },
  ];

  return (
    <div className="overflow-x-hidden text-stone-200 antialiased">
      <div className="fixed inset-0 -z-10">
        <div className="relative h-full w-full ">
          <DarkBackground />
        </div>
      </div>
      <div className="container mx-auto px-8">
        <CardNav
          logo={Navcon}
          logoAlt="Company Logo"
          items={items}
          baseColor="rgba(255, 255, 255, 0.1)"
          menuColor="#fff"
          buttonBgColor="#D93F87"
          buttonTextColor="#fff"
          ease="power3.out"
          className="backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg"
        />
        <Hero />
        <About />
        <Interests />
        <Achievements/>
      </div>
    </div>
  );
}
