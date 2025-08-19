import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TextType from "../components/TextType.jsx";
import Lanyard from "../components/Lanyard.jsx";

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 lg:px-20">
      {/* Left side → Intro text */}
      <div className="w-full lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
        {/* Animated Intro */}
        <Motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I’m{" "}
          <span>
            John Lloyd
            <br />
            Cabanig{" "}
          </span>
        </Motion.h1>

        {/* Typing Effect */}
        <Motion.div
          className="mt-4 text-2xl sm:text-3xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-gray-300 text-xl font-light">Aspiring </span>
          <span className="text-2xl font-bold font-mono text-red-400">
            <TextType
              text={["FullStack-Developer"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              textColors={["#D93F87"]}
            />
          </span>
        </Motion.div>

        {/* Description */}
        <Motion.p
          className="mt-4 text-base sm:text-[15px] text-gray-300 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Every error is my motivation.
        </Motion.p>

        {/* CTA Buttons */}
        <Motion.div
          className="mt-8 flex gap-4 justify-center lg:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-2xl bg-[#D93F87] hover:bg-[#b82f6b] text-white font-medium shadow-lg flex items-center gap-2 transition"
          >
            View Projects <ArrowRight size={18} />
          </a>

          <a
            href="#contact"
            className="px-6 py-3 rounded-2xl border border-gray-500 hover:bg-gray-800 text-gray-200 font-medium transition"
          >
            Contact Me
          </a>
        </Motion.div>
      </div>

      {/* Right side → Lanyard */}
      <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
        <Lanyard />
      </div>
    </section>
  );
};

export default Hero;
