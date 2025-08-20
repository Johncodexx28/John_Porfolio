import { motion as Motion } from "framer-motion";
import Lanyard from "../components/Lanyard.jsx";
import Socials from "../components/Socials.jsx";

const About = () => {
  return (
    <section
      className="mx-6 sm:mx-10 lg:mx-20 border-4 rounded-2xl px-6 sm:px-10 lg:px-20"
      style={{ borderColor: "#D93F87" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left side - About text */}
        <Motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-[#D93F87]">About Me</h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Hi, I’m John Lloyd P. Cabanig. I’m passionate about building
            interactive, creative, and functional web applications. My work
            focuses on clean UI, smooth animations, and meaningful digital
            experiences.
          </p>
          <Socials />
        </Motion.div>

        {/* Right side - Lanyard */}
        <Motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Lanyard />
        </Motion.div>
      </div>
    </section>
  );
};

export default About;
