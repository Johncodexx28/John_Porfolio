import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TextType from "../components/TextType.jsx";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Animated Intro */}
      <Motion.h1
        className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hi, I’m <span className="text-purple-400">John</span> 👋
      </Motion.h1>

      {/* Typing Effect */}
      <Motion.div
        className="mt-4 text-2xl sm:text-3xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span className="text-gray-300">I am a </span>
        <span className="text-purple-400">
          <TextType
            text={["Developer", "Designer", "Video Editor"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </span>
      </Motion.div>

      {/* Description */}
      <Motion.p
        className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        I craft clean & modern digital experiences with React, Tailwind, and a
        passion for design and storytelling.
      </Motion.p>

      {/* CTA Buttons */}
      <Motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <a
          href="#projects"
          className="px-6 py-3 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-medium shadow-lg flex items-center gap-2 transition"
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
    </section>
  );
};

export default Hero;
