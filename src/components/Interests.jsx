import { motion as Motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

import webDesignImg from "../assets/images/web-design.png";
import webDevImg from "../assets/images/web-development.png";
import graphicDesignImg from "../assets/images/graphic-design.png";
import ContentCreation from "../assets/images/content-creation.png";
import readingImg from "../assets/images/reading.png";
import cyclingImg from "../assets/images/cycling.png";

const Interests = () => {
  const cards = [
    {
      title: "Web Design",
      img: webDesignImg,
      color: "rgba(139, 69, 199, 0.15)",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Development",
      img: webDevImg,
      color: "rgba(59, 130, 246, 0.15)",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Design",
      img: graphicDesignImg,
      color: "rgba(245, 158, 11, 0.15)",
      gradient: "from-amber-500/20 to-orange-500/20",
    },
    {
      title: "Content",
      img: ContentCreation,
      color: "rgba(16, 185, 129, 0.15)",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      title: "Reading",
      img: readingImg,
      color: "rgba(239, 68, 68, 0.15)",
      gradient: "from-red-500/20 to-rose-500/20",
    },
    {
      title: "Cycling",
      img: cyclingImg,
      color: "rgba(34, 197, 94, 0.15)",
      gradient: "from-green-500/20 to-lime-500/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Motion.section
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Header */}
      <Motion.div className="text-center mb-8 sm:mb-10" variants={cardVariants}>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          My Interests
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto">
          Passionate about technology, creativity, and continuous learning
        </p>
      </Motion.div>

      {/* Cards Grid */}
      <Motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5"
        variants={containerVariants}
      >
        {cards.map((card, index) => (
          <Motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            className="relative group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                style={{ backgroundImage: `url(${card.img})` }}
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} group-hover:opacity-80 opacity-60 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10 p-3 sm:p-4 h-24 sm:h-28 lg:h-32 flex flex-col items-center justify-center text-center">
                <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-white mb-1 group-hover:scale-105 transition-transform duration-200">
                  {card.title}
                </h3>

                {/* Subtle Icon/Indicator */}
                <div className="w-6 h-0.5 bg-white/60 rounded-full group-hover:bg-white group-hover:w-8 transition-all duration-300" />
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
          </Motion.div>
        ))}
      </Motion.div>

      {/* Optional: Add a subtle bottom border/separator */}
      <Motion.div
        className="mt-8 sm:mt-10 flex justify-center"
        variants={cardVariants}
      >
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50" />
      </Motion.div>
    </Motion.section>
  );
};

export default Interests;
