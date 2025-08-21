import { motion as Motion } from "framer-motion";
import Lanyard from "../components/Lanyard.jsx";

import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const About = () => {
  return (
    <div>
      <h1></h1>
    </div>
  );
};

export default About;


//<div className="min-h-fit overflow-hidden pb-4 lg:mb-36">
    //   <div className="flex flex-col sm:flex-col md:flex-row-reverse items-center justify-center mx-4 sm:mx-8 md:mx-12 lg:mx-20 mt-0 gap-6 md:gap-8 lg:gap-0 ">
    //     <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
    //       <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none lg:p-8">
    //         <Lanyard />
    //       </div>
    //     </div>

    //     <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left px-4 sm:px-6 order-2 md:order-1">
    //       <Motion.h2
    //         className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-[#D93F87] mb-4 sm:mb-6"
    //         initial={{ opacity: 0, y: 20 }}
    //         whileInView={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.6 }}
    //       >
    //         About Me
    //       </Motion.h2>

    //       <Motion.p
    //         className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md lg:max-w-lg mb-6 sm:mb-8 leading-relaxed"
    //         initial={{ opacity: 0, y: 20 }}
    //         whileInView={{ opacity: 1, y: 0 }}
    //         transition={{ delay: 0.2, duration: 0.6 }}
    //       >
    //         Hi, I'm John Lloyd P. Cabanig. I'm passionate about building
    //         interactive, creative, and functional web applications. My work
    //         focuses on clean UI, smooth animations, and meaningful digital
    //         experiences.
    //       </Motion.p>

    //       <Motion.div
    //         className="flex gap-4 sm:gap-5 md:gap-6"
    //         initial={{ opacity: 0, y: 20 }}
    //         whileInView={{ opacity: 1, y: 0 }}
    //         transition={{ delay: 0.4, duration: 0.6 }}
    //       >
    //         <a
    //           href="https://github.com/yourusername"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-gray-300 hover:text-[#D93F87] transition-colors duration-300 hover:scale-110 transform"
    //           aria-label="GitHub Profile"
    //         >
    //           <FaGithub size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
    //         </a>
    //         <a
    //           href="https://instagram.com/yourusername"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-gray-300 hover:text-[#D93F87] transition-colors duration-300 hover:scale-110 transform"
    //           aria-label="Instagram Profile"
    //         >
    //           <FaInstagram size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
    //         </a>
    //         <a
    //           href="https://facebook.com/yourusername"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-gray-300 hover:text-[#D93F87] transition-colors duration-300 hover:scale-110 transform"
    //           aria-label="Facebook Profile"
    //         >
    //           <FaFacebook size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
    //         </a>
    //         <a
    //           href="https://linkedin.com/in/yourusername"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-gray-300 hover:text-[#D93F87] transition-colors duration-300 hover:scale-110 transform"
    //           aria-label="LinkedIn Profile"
    //         >
    //           <FaLinkedin size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
    //         </a>
    //       </Motion.div>
    //     </div>
    //   </div>
    // </div>