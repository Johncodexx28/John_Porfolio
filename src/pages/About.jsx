import { motion as Motion } from "framer-motion";
import { useState, useEffect } from "react";
import Lanyard from "../components/Lanyard.jsx";
import Socials from "../components/Socials.jsx";

const About = () => {
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive configurations for Lanyard
  const getLanyardConfig = () => {
    switch (screenSize) {
      case "mobile":
        return {
          position: [0, 0, 18], // closer (25 → 18)
          fov: 15, // slightly narrower view = zoomed in
          gravity: [0, -30, 0],
          containerClass: "w-full h-[280px] sm:h-[300px]", // slightly taller for better fit
        };

      case "tablet":
        return {
          position: [0, 0, 20],
          fov: 15,
          gravity: [0, -35, 0],
          containerClass: "w-full h-[320px] md:h-[350px]",
        };
      default: // desktop
        return {
          position: [0, 0, 15],
          fov: 20,
          gravity: [0, -40, 0],
          containerClass: "w-full h-[400px] lg:h-[450px]",
        };
    }
  };

  const lanyardConfig = getLanyardConfig();

  return (
    <>
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d93f87 rgba(255, 255, 255, 0.1);
        }

        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d93f87;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c1356f;
        }
      `}</style>

      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="mx-4 sm:mx-8 lg:mx-28 border-4 border-[#D93F87] rounded-2xl 
         px-4 sm:px-8 lg:px-20 py-6 sm:py-8 lg:py-12 mb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left side - About text */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="space-y-4 sm:space-y-5 text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold  leading-tight page-title">
              About Me
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-prose">
              Hi, I'm John Lloyd P. Cabanig, a 3rd-year high school student at
              PHINMA University of Iloilo. I enjoy exploring web development and
              love building creative projects that are simple, interactive, and
              fun to use. I'm still learning, but I'm passionate about improving
              my skills and creating designs with smooth animations and clean
              layouts.
            </p>
            {/* <div className="flex justify-center lg:justify-start pt-2">
              <Socials />
            </div> */}
            <div className="flex justify-between pt-4 text-center">
              <div>
                <h1 className="text-2xl font-bold text-[#D93F87]">20+</h1>
                <h3 className="text-sm text-gray-300">Projects Finished</h3>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#D93F87]">5+</h1>
                <h3 className="text-sm text-gray-300">Technologies Learned</h3>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#D93F87]">100+</h1>
                <h3 className="text-sm text-gray-300">Hours Coding</h3>
              </div>
            </div>
          </Motion.div>

          {/* Right side - Lanyard */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
            className="flex justify-center items-center order-1 lg:order-2"
          >
            <div
              className={`${lanyardConfig.containerClass} flex items-center justify-center `}
            >
              <Lanyard
                position={lanyardConfig.position}
                fov={lanyardConfig.fov}
                gravity={lanyardConfig.gravity}
                transparent={true}
              />
            </div>
          </Motion.div>
        </div>
      </Motion.div>
    </>
  );
};

export default About;
