import { useCallback, useState } from "react";
import PortfolioNav from "./components/PortfolioNav.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { Hero, About, Experience, Projects, Contact } from "./pages";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIsIntroComplete(true), []);

  if (!isIntroComplete) {
    return <LoadingScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden text-stone-200 antialiased">
      <PortfolioNav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
