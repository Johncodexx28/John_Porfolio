import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TextType from "../components/TextType.jsx";

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 sm:px-10 lg:px-20">
      <div className="flex flex-col items-center text-center max-w-3xl">
        {/* Intro Heading */}
        <Motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg leading-snug"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I’m <br />
          <span>John Lloyd Cabanig</span>
        </Motion.h1>

        {/* Typing Effect */}
        <Motion.div
          className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-gray-300 font-medium text-base sm:text-lg md:text-xl">
            Aspiring{" "}
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono">
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
          className="mt-3 text-sm sm:text-base md:text-lg font-light text-gray-300 max-w-xl px-2 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Every error is my motivation.
        </Motion.p>

        {/* CTA Buttons */}
        <Motion.div
          className="mt-6 flex flex-col sm:flex-row gap-4 justify-center w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-2xl bg-[#D93F87] hover:bg-[#b82f6b] text-white font-medium shadow-lg flex items-center justify-center gap-2 transition w-full sm:w-auto"
          >
            View Projects <ArrowRight size={18} />
          </a>

          <a
            href="#contact"
            className="px-6 py-3 rounded-2xl border border-gray-500 hover:bg-gray-800 text-gray-200 font-medium transition flex items-center justify-center w-full sm:w-auto"
          >
            Contact Me
          </a>
        </Motion.div>
      </div>
    </section>
  );
};

export default Hero;
