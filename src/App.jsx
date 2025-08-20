import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DarkBackground from "./components/DarkBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import reactSvg from "./assets/react.svg";

export default function App() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" },
      ],
    },
  ];
  return (
    <Router>
      <div style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
        {/* Background effect */}
        <DarkBackground />

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col">
          {/* Navbar always visible */}
          <Navbar
            logo={reactSvg}
            logoAlt="Company Logo"
            items={items}
            baseColor="#FF0066"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#3338A0"
            ease="power3.out"
          />

          {/* Page content wrapper */}
          <main className="flex-1 pt-20 px-3 sm:px-3 lg:px-6 max-w-6xl mx-auto w-full ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
