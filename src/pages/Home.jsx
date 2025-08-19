import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Animated Intro */}
      <motion.h1
        className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hi, I’m <span className="text-purple-400">John</span> 👋
      </motion.h1>

      <motion.p
        className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        A passionate <span className="text-purple-300">Web Developer</span>
        crafting clean & modern web experiences.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
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
      </motion.div>
    </section>
  );
};

export default Hero;
