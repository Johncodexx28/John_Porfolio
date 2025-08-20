import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; // 👈 use Link for routing
import TextType from "../components/TextType.jsx";
import Lanyard from "../components/Lanyard.jsx";

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center px-6 lg:px-20">
      <div className="flex flex-wrap lg:flex-row-reverse items-center w-full">
        {/* Right Side → Lanyard */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end overflow-hidden">
          <Lanyard />
        </div>

        {/* Left Side → Text Section */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Intro Heading */}
            <Motion.h1
              className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hi, I’m <br />
              <span>John Lloyd Cabanig</span>
            </Motion.h1>

            {/* Typing Effect */}
            <Motion.div
              className="mt-3 text-2xl sm:text-3xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-gray-300 text-xl font-light">
                Aspiring{" "}
              </span>
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
              className="mt-3 text-base sm:text-[15px] text-gray-300 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Every error is my motivation.
            </Motion.p>

            {/* CTA Buttons */}
            <Motion.div
              className="mt-6 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link
                to="/projects"
                className="px-6 py-3 rounded-2xl bg-[#D93F87] hover:bg-[#b82f6b] text-white font-medium shadow-lg flex items-center justify-center gap-2 transition w-full sm:w-auto"
              >
                View Projects <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3 rounded-2xl border border-gray-500 hover:bg-gray-800 text-gray-200 font-medium transition flex items-center justify-center w-full sm:w-auto"
              >
                Contact Me
              </Link>
            </Motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
