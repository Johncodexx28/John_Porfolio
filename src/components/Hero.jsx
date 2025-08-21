import { motion as Motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import TextType from "../components/TextType.jsx";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center h-[clamp(300px,60vh,500px)]  sm:h-[600px] mt-[80px]">
      <Motion.h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg leading-snug"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
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
        viewport={{ once: false, amount: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span className="text-gray-300 font-medium text-base sm:text-lg md:text-xl">
          Aspiring{" "}
        </span>
        <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono">
          <TextType
            text={["FullStack-Developer", "Web-Designer"]}
            typingSpeed={75}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
            textColors={["#D93F87"]}
          />
        </span>
      </Motion.div>
      <Motion.p
        className="mt-3 text-sm sm:text-base md:text-lg font-light text-gray-300 max-w-xl px-2 sm:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Every error is my motivation.
      </Motion.p>

      {/* CTA Buttons */}
      <Motion.div
        className="mt-6 flex flex-col sm:flex-row gap-4 justify-center h:w-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <a
          href="#projects"
          className="px-6 py-3 rounded-2xl bg-[#D93F87] hover:bg-[#b82f6b] text-white font-medium shadow-lg flex items-center justify-center gap-2 transition w-full sm:w-auto"
        >
          View Projects <ArrowRight size={18} />
        </a>

        <a
          href="#cv"
          className="px-6 py-3 rounded-2xl border border-gray-500 hover:bg-gray-800 gap-2 text-gray-200 font-medium transition flex items-center justify-center w-full sm:w-auto"
        >
          Download Cv <ArrowDown size={18} />
        </a>
      </Motion.div>
    </section>
  );
};

export default Hero;
