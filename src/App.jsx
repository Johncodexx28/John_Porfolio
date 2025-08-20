import DarkBackground from "./components/DarkBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden scroll-smooth">
      {/* Background effect */}
      <DarkBackground />

      {/* Overlay content */}
      <div className="absolute inset-0 z-10 flex flex-col">
        {/* Navbar always visible */}
        <Navbar />

        {/* Page content wrapper */}
        <main className="flex-1 pt-20  max-w-6xl mx-auto w-full">
          <section id="home">
            <Hero />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="contact">
            <Contact />
          </section>
        </main>
      </div>
    </div>
  );
}
