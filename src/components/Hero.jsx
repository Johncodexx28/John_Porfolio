import { motion as Motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useState, useEffect } from "react";
import TextType from "../components/TextType.jsx";

const Hero = () => {
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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0, 1],
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

      
  const getTypographyClasses = () => {
    switch (screenSize) {
      case "mobile":
        return {
          mainHeading: "text-3xl sm:text-4xl font-extrabold leading-tight",
          subText: "text-sm font-medium",
          typingText: "text-lg sm:text-xl font-bold",
          description: "text-sm font-light leading-relaxed",
          buttonText: "text-sm font-medium",
        };
      case "tablet":
        return {
          mainHeading: "text-4xl md:text-5xl font-extrabold leading-tight",
          subText: "text-base font-medium",
          typingText: "text-xl md:text-2xl font-bold",
          description: "text-base font-light leading-relaxed",
          buttonText: "text-base font-medium",
        };
      default: // desktop
        return {
          mainHeading:
            "text-5xl lg:text-6xl xl:text-5xl font-extrabold leading-tight",
          subText: "text-xl font-medium",
          typingText: "text-2xl md:text-2xl lg:text-3xl font-bold",
          description: "text-lg font-light leading-relaxed",
          buttonText: "text-base font-medium",
        };
    }
  };

  const typography = getTypographyClasses();

  return (
    <section className="min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] lg:min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-20">
      <Motion.div
        className="flex flex-col items-center text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Intro Heading */}
        <Motion.h1
          className={`${typography.mainHeading} text-white drop-shadow-2xl mb-2 sm:mb-4`}
          variants={itemVariants}
        >
          <span className="block">Hi, I'm</span>
          <Motion.span
            className="block bg-clip-text "
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            John Lloyd Cabanig
          </Motion.span>
        </Motion.h1>

        {/* Typing Effect */}
        <Motion.div className="mb-4 sm:mb-6" variants={itemVariants}>
          <span className={`${typography.subText} text-[#ffffff] mr-2`}>
            Aspiring{" "}
          </span>
          <span className={`${typography.typingText} font-mono`}>
            <TextType
              text={["FullStack-Developer"]}
              typingSpeed={screenSize === "mobile" ? 100 : 75}
              pauseDuration={screenSize === "mobile" ? 2000 : 1500}
              showCursor={true}
              cursorCharacter="|"
              textColors={["#D93F87"]}
            />
          </span>
        </Motion.div>

        {/* Description */}
        <Motion.p
          className={`${typography.description} text-[#ffffff] max-w-2xl px-2 sm:px-4 mb-6 sm:mb-8`}
          variants={itemVariants}
        >
          Every error is my motivation.
        </Motion.p>

        {/* CTA Buttons */}
        <Motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none"
          variants={itemVariants}
        >
          <Motion.a
            href="#projects"
            className={`${typography.buttonText} px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-[#D93F87] to-[#FF6B9D] hover:from-[#b82f6b] hover:to-[#e55a87] text-white shadow-lg shadow-[#D93F87]/25 flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto group relative overflow-hidden`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span className="relative z-10">View Projects</span>
            <ArrowRight
              size={screenSize === "mobile" ? 16 : 18}
              className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B9D] to-[#D93F87] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Motion.a>

          <Motion.a
            href="#contact"
            className={`${typography.buttonText} px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-2 border-gray-600 hover:border-[#D93F87] bg-transparent hover:bg-[#D93F87]/10 text-gray-200 hover:text-white transition-all duration-300 flex items-center justify-center w-full sm:w-auto group backdrop-blur-sm`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span>Contact Me</span>
          </Motion.a>
        </Motion.div>

        {/* Optional: Scroll indicator for mobile */}
        {screenSize === "mobile" && (
          <Motion.div
            className="mt-8 sm:mt-12"
            variants={itemVariants}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-[#D93F87] to-transparent rounded-full mt-2" />
            </div>
          </Motion.div>
        )}
      </Motion.div>
    </section>
  );
};

export default Hero;
