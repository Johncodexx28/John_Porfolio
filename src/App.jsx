import { useCallback, useState } from "react";
import PortfolioNav from "./components/PortfolioNav.jsx";
import GlowCursor from "./components/GlowCursor.jsx";
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
    <GlowCursor
      color="#000000"
      secondaryColor="#343434"
      trailLength={40}
      trailWidth={7}
      trailTaper={0.84}
      followSpeed={0.16}
      glowIntensity={0.28}
      glowSpread={1.1}
      hotspot={0.16}
      brightness={0.72}
      opacity={0.34}
      pulseSpeed={0.8}
      noiseStrength={0.035}
      idleFade
      idleTimeout={700}
      fadeDuration={900}
      blendMode="screen"
    >
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
    </GlowCursor>
  );
}
